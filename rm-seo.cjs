const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const sIdx = content.indexOf('<main id="static-seo"');
if (sIdx !== -1) {
  const eIdx = content.indexOf('</main>', sIdx) + 7;
  content = content.slice(0, sIdx) + content.slice(eIdx);
}

fs.writeFileSync('index.html', content);
