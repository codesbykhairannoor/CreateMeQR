const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const STATE_FILE = path.join(__dirname, '../google-indexing-state.json');
const PUBLIC_DIR = path.join(__dirname, '../public');

// 1. Multi-Service Account Key Discovery and Pooling
function findKeyFiles() {
  const keys = [];

  // Check GCP_SA_KEYS (JSON array of accounts)
  if (process.env.GCP_SA_KEYS) {
    try {
      const parsed = JSON.parse(process.env.GCP_SA_KEYS);
      if (Array.isArray(parsed)) {
        for (const k of parsed) {
          if (k.client_email && k.private_key) keys.push(k);
        }
      } else if (parsed.client_email) {
        keys.push(parsed);
      }
    } catch (e) {
      console.warn('Could not parse GCP_SA_KEYS JSON array:', e.message);
    }
  }

  // Check GCP_SA_KEY (Single JSON account)
  if (process.env.GCP_SA_KEY) {
    try {
      const parsed = JSON.parse(process.env.GCP_SA_KEY);
      if (parsed.client_email && !keys.some(k => k.client_email === parsed.client_email)) {
        keys.push(parsed);
      }
    } catch (e) {
      console.warn('Could not parse GCP_SA_KEY JSON:', e.message);
    }
  }

  // Check local JSON service account files in root
  const rootDir = path.join(__dirname, '..');
  const files = fs.readdirSync(rootDir);
  for (const file of files) {
    if (file.endsWith('.json') && (file.startsWith('createmyqr-') || file.includes('serviceaccount') || file.includes('google-key'))) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(rootDir, file), 'utf8'));
        if (content.client_email && content.private_key) {
          if (!keys.some(k => k.client_email === content.client_email)) {
            keys.push(content);
          }
        }
      } catch (e) {}
    }
  }

  if (keys.length === 0) {
    throw new Error('No valid Google Cloud Service Account keys found in environment or local files.');
  }

  return keys;
}

// 2. Generate Google OAuth2 Access Token via JWT
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

// 3. Publish a single URL to Google Indexing API
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

// 4. Verify URL Metadata from Google Indexing API
async function getUrlMetadata(url, token) {
  return new Promise((resolve) => {
    const encodedUrl = encodeURIComponent(url);
    const req = https.request({
      hostname: 'indexing.googleapis.com',
      path: `/v3/urlNotifications/metadata?url=${encodedUrl}`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', (err) => resolve({ status: 500, data: err.message }));
    req.end();
  });
}

// 5. Intelligent Priority Score Algorithm
function calculatePriorityScore(url, lastSubmittedTime) {
  let score = 100;
  
  // A. Root domain / Homepage has top priority
  if (url === 'https://createmy-qr.com' || url === 'https://createmy-qr.com/') {
    return 100000;
  }

  // B. High Priority Languages
  const pathOnly = url.replace('https://createmy-qr.com', '');
  const segments = pathOnly.split('/').filter(Boolean);
  const lang = segments.length > 0 && segments[0].length === 2 ? segments[0] : 'en';

  const langWeights = {
    'en': 500,
    'id': 450,
    'es': 400,
    'de': 350,
    'fr': 300,
    'ja': 300,
    'pt': 300,
    'tr': 250,
    'ar': 250,
    'vi': 200,
    'it': 200,
    'nl': 200
  };
  score += (langWeights[lang] || 100);

  // C. Core "Money" Tools
  const toolWeights = [
    { kw: 'url', weight: 400 },
    { kw: 'wifi', weight: 400 },
    { kw: 'wi-fi', weight: 400 },
    { kw: 'vcard', weight: 400 },
    { kw: 'barcode', weight: 350 },
    { kw: 'link-in-bio', weight: 300 },
    { kw: 'google-review', weight: 300 },
    { kw: 'whatsapp', weight: 300 },
    { kw: 'instagram', weight: 250 },
    { kw: 'facebook', weight: 250 },
    { kw: 'pdf', weight: 250 },
    { kw: 'image', weight: 200 },
    { kw: 'sms', weight: 200 },
    { kw: 'email', weight: 200 },
    { kw: 'location', weight: 200 }
  ];

  const lowerUrl = url.toLowerCase();
  for (const item of toolWeights) {
    if (lowerUrl.includes(item.kw)) {
      score += item.weight;
      break;
    }
  }

  // D. Fixed Legacy GSC URLs (prioritize re-crawling fixed 404s and duplicates)
  const gscTargetTokens = [
    'google-review', 'contact', 'about', 'discord', 'event', 'tapahtuma', 'ibento',
    'podiya', 'resim', 'snapchat', 'amazon', 'pautan-di-bio', 'tautan-di-bio'
  ];
  for (const token of gscTargetTokens) {
    if (lowerUrl.includes(token)) {
      score += 150;
      break;
    }
  }

  // If already submitted, decay score based on freshness (older submissions get higher urgency to refresh)
  if (lastSubmittedTime) {
    const hoursSince = (Date.now() - new Date(lastSubmittedTime).getTime()) / (1000 * 60 * 60);
    score = score * (hoursSince / 24);
  } else {
    // Brand new unsubmitted URLs get a massive boost
    score += 5000;
  }

  return score;
}

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function main() {
  console.log('='.repeat(75));
  console.log('⚡ SUPERCHARGED GOOGLE INDEXING API AUTOMATION (MULTI-POOL & SMART QUEUE)');
  console.log('='.repeat(75));

  const keyPool = findKeyFiles();
  console.log(`🔑 Service Account Pool: ${keyPool.length} active account(s) detected.`);
  keyPool.forEach((k, idx) => console.log(`   [${idx + 1}] ${k.client_email}`));

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

  // 3. Smart Priority Sorting
  const rankedUrls = allUrls.map(url => ({
    url,
    score: calculatePriorityScore(url, state.submitted[url]),
    submittedAt: state.submitted[url] || null
  })).sort((a, b) => b.score - a.score);

  const pendingCount = rankedUrls.filter(u => !u.submittedAt).length;
  console.log(`⏳ Unsubmitted URLs in queue: ${pendingCount}`);
  console.log(`🌟 Top Priority URL in queue: ${rankedUrls[0].url} (Score: ${Math.round(rankedUrls[0].score)})`);

  // Target limit from CLI or default 200 * number of service accounts
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const DAILY_LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : (200 * keyPool.length);
  const batch = rankedUrls.slice(0, DAILY_LIMIT).map(u => u.url);

  console.log(`🎯 Submitting batch of ${batch.length} URLs across pool (Target: ${DAILY_LIMIT})...\n`);

  let currentKeyIdx = 0;
  let currentKey = keyPool[currentKeyIdx];
  let currentToken = await getAccessToken(currentKey);
  console.log(`⚡ Authenticated via Account [1/${keyPool.length}]: ${currentKey.client_email}\n`);

  let successCount = 0;
  let failCount = 0;
  const verifiedSamples = [];

  for (let i = 0; i < batch.length; i++) {
    const url = batch[i];
    let res = await publishUrl(url, currentToken);

    // If quota 429 hit, attempt failover to next Service Account in pool
    if (res.status === 429 && currentKeyIdx < keyPool.length - 1) {
      currentKeyIdx++;
      currentKey = keyPool[currentKeyIdx];
      console.log(`\n🔄 Quota 429 hit. Switching to next Service Account [${currentKeyIdx + 1}/${keyPool.length}]: ${currentKey.client_email}`);
      currentToken = await getAccessToken(currentKey);
      res = await publishUrl(url, currentToken);
    }

    if (res.status === 200) {
      successCount++;
      state.submitted[url] = new Date().toISOString();
      console.log(`[${i + 1}/${batch.length}] ✅ 200 OK: ${url}`);

      // Sample verification on first 2 successful submissions
      if (verifiedSamples.length < 2) {
        try {
          const meta = await getUrlMetadata(url, currentToken);
          if (meta.status === 200 && meta.data?.latestUpdate) {
            verifiedSamples.push({
              url,
              notifyTime: meta.data.latestUpdate.notifyTime
            });
            console.log(`   🔍 Google Acknowledged Notification at: ${meta.data.latestUpdate.notifyTime}`);
          }
        } catch (e) {}
      }
    } else {
      failCount++;
      console.warn(`[${i + 1}/${batch.length}] ❌ ${res.status}: ${url} -> ${res.data}`);
      if (res.status === 429) {
        console.error('⚠️ All Service Accounts in pool have reached daily quota (429). Halting gracefully.');
        break;
      }
    }

    await sleep(80); // Polite rate limit
  }

  state.lastRun = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');

  console.log('\n' + '='.repeat(75));
  console.log(`📊 BATCH SUMMARY:`);
  console.log(`   - Successful Submissions: ${successCount}`);
  console.log(`   - Failed / Quota Exceeded: ${failCount}`);
  console.log(`   - Total URLs in State:     ${Object.keys(state.submitted).length} / ${allUrls.length}`);
  console.log(`   - Active Service Accounts: ${keyPool.length}`);
  console.log(`💾 State saved to: ${STATE_FILE}`);
  console.log('='.repeat(75));

  // Write GitHub Actions Step Summary if running in CI
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summaryMd = `
### ⚡ Google Indexing API Daily Run Summary

- **Status**: Completed at \`${state.lastRun}\`
- **Total Published (200 OK)**: **${successCount} URLs**
- **Quota Exceeded / Failed**: ${failCount}
- **Service Account Pool**: ${keyPool.length} active account(s)
- **Total URLs Cataloged**: ${Object.keys(state.submitted).length} / ${allUrls.length}

#### 🔍 Verified Acknowledgment Samples:
${verifiedSamples.length > 0 
  ? verifiedSamples.map(v => `- [${v.url}](${v.url}) → Notified: \`${v.notifyTime}\``).join('\n')
  : '- All quota submissions recorded.'}
`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryMd, 'utf8');
  }
}

main().catch(err => {
  console.error('Fatal error in Google Indexing automation:', err);
  process.exit(1);
});
