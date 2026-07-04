const fs = require('fs');

// 1. Fix robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: https://www.createmy-qr.com/sitemap.xml
`;
fs.writeFileSync('public/robots.txt', robots);

// 2. Fix llms.txt and llms-full.txt
['public/llms.txt', 'public/llms-full.txt'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/https:\/\/qrgenerator\.id\//g, 'https://www.createmy-qr.com/');
    content = content.replace(/https:\/\/qrgenerator\.id/g, 'https://www.createmy-qr.com');
    fs.writeFileSync(file, content);
  }
});

console.log('Successfully updated domain references to https://www.createmy-qr.com');
