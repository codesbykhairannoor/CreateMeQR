const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const STATE_FILE = path.join(__dirname, '../google-indexing-state.json');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Find Google Service Account Key
function findKeyFile() {
  if (process.env.GCP_SA_KEY) {
    try {
      return JSON.parse(process.env.GCP_SA_KEY);
    } catch (e) {
      console.error('Error parsing GCP_SA_KEY environment variable:', e.message);
    }
  }

  const rootDir = path.join(__dirname, '..');
  const files = fs.readdirSync(rootDir);
  const keyFile = files.find(f => f.startsWith('createmyqr-') && f.endsWith('.json')) 
               || files.find(f => f.includes('serviceaccount') && f.endsWith('.json'));

  if (keyFile) {
    const fullPath = path.join(rootDir, keyFile);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  }

  throw new Error('Google Cloud Service Account key JSON file not found in root directory or GCP_SA_KEY env.');
}

// Generate Google OAuth2 Access Token via JWT
async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64url = (str) => Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signInput = base64url(JSON.stringify(header)) + '.' + base64url(JSON.stringify(claimSet));
  
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  const signature = base64url(signer.sign(key.private_key));
  const jwt = signInput + '.' + signature;

  const postData = 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + encodeURIComponent(jwt);

  return new Promise((resolve, reject) => {
    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (data.access_token) {
            resolve(data.access_token);
          } else {
            reject(new Error(`Failed to get access token: ${body}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Publish a single URL to Google Indexing API
async function publishUrl(url, token) {
  const payload = JSON.stringify({
    url: url,
    type: 'URL_UPDATED'
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'indexing.googleapis.com',
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: body
        });
      });
    });

    req.on('error', (err) => {
      resolve({ status: 500, data: err.message });
    });

    req.write(payload);
    req.end();
  });
}

// Sleep helper
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function main() {
  console.log('='.repeat(75));
  console.log('🚀 GOOGLE INDEXING API AUTOMATION (DAILY BATCH SUBMITTER)');
  console.log('='.repeat(75));

  const key = findKeyFile();
  console.log(`🔑 Service Account: ${key.client_email}`);

  // 1. Collect all URLs from 30 language sitemaps
  const sitemapFiles = fs.readdirSync(PUBLIC_DIR).filter(f => f.startsWith('sitemap-') && f.endsWith('.xml'));
  const allUrlsSet = new Set();
  const locRegex = /<loc>(.*?)<\/loc>/g;

  for (const f of sitemapFiles) {
    const content = fs.readFileSync(path.join(PUBLIC_DIR, f), 'utf8');
    let m;
    while ((m = locRegex.exec(content)) !== null) {
      if (m[1] && !m[1].endsWith('.xml')) {
        allUrlsSet.add(m[1].trim());
      }
    }
  }

  const allUrls = Array.from(allUrlsSet);
  console.log(`📑 Total URLs discovered in sitemaps: ${allUrls.length} across ${sitemapFiles.length} language files.`);

  // 2. Load submission state
  let state = { submitted: {}, lastRun: null };
  if (fs.existsSync(STATE_FILE)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    } catch (e) {
      console.warn('Could not parse existing state file, creating new one.');
    }
  }

  // 3. Filter URLs: pending ones first
  const pendingUrls = allUrls.filter(u => !state.submitted[u]);
  console.log(`⏳ Pending URLs never submitted: ${pendingUrls.length}`);

  // If all are submitted, reset cycle to keep refreshing
  let targetQueue = pendingUrls;
  if (targetQueue.length === 0) {
    console.log('🔄 All URLs have been submitted at least once! Starting refresh cycle on oldest URLs.');
    targetQueue = allUrls.sort((a, b) => {
      const timeA = state.submitted[a] ? new Date(state.submitted[a]).getTime() : 0;
      const timeB = state.submitted[b] ? new Date(state.submitted[b]).getTime() : 0;
      return timeA - timeB;
    });
  }

  // Daily quota limit: Google Indexing API default is 200 URLs/day
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const DAILY_LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : 200;
  const batch = targetQueue.slice(0, DAILY_LIMIT);

  console.log(`🎯 Submitting batch of ${batch.length} URLs to Google Indexing API today (Limit: ${DAILY_LIMIT})...\n`);

  const token = await getAccessToken(key);
  console.log('✅ Google OAuth2 Bearer Token successfully generated.\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const url = batch[i];
    const res = await publishUrl(url, token);

    if (res.status === 200) {
      successCount++;
      state.submitted[url] = new Date().toISOString();
      console.log(`[${i + 1}/${batch.length}] ✅ 200 OK: ${url}`);
    } else {
      failCount++;
      console.warn(`[${i + 1}/${batch.length}] ❌ ${res.status}: ${url} -> ${res.data}`);
      if (res.status === 429) {
        console.error('⚠️ Quota 429 reached for today. Stopping batch to avoid penalty.');
        break;
      }
    }

    // Polite rate limit (100ms between requests)
    await sleep(100);
  }

  state.lastRun = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');

  console.log('\n' + '='.repeat(75));
  console.log(`📊 BATCH SUMMARY:`);
  console.log(`   - Successful Submissions: ${successCount}`);
  console.log(`   - Failed Submissions:     ${failCount}`);
  console.log(`   - Total URLs in History:  ${Object.keys(state.submitted).length} / ${allUrls.length}`);
  console.log(`   - Next Batch Ready:       ${Math.max(0, allUrls.length - Object.keys(state.submitted).length)} pending`);
  console.log(`💾 State saved to: ${STATE_FILE}`);
  console.log('='.repeat(75));
}

main().catch(err => {
  console.error('Fatal error in Google Indexing automation:', err);
  process.exit(1);
});
