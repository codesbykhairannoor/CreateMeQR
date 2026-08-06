const fs = require('fs');
const https = require('https');

async function submitToIndexNow() {
  console.log('Reading sitemap...');
  const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
  
  // Extract all <loc> tags using regex
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  const urls = new Set();
  
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    if (match[1]) {
      urls.add(match[1].trim());
    }
  }

  const urlList = Array.from(urls);
  console.log(`Found ${urlList.length} unique URLs to submit.`);
  
  if (urlList.length === 0) {
    console.error('No URLs found to submit.');
    return;
  }

  const payload = {
    host: 'createmy-qr.com',
    key: '565fbaeacfaa408d8d0fc312d897bee0',
    keyLocation: 'https://createmy-qr.com/565fbaeacfaa408d8d0fc312d897bee0.txt',
    urlList: urlList
  };

  const payloadStr = JSON.stringify(payload);

  const options = {
    hostname: 'api.indexnow.org',
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payloadStr)
    }
  };

  console.log('Sending request to IndexNow API...');
  
  const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ URLs successfully submitted to IndexNow!');
      } else {
        console.log('❌ Failed to submit URLs. Check status code above.');
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(payloadStr);
  req.end();
}

submitToIndexNow();
