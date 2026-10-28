const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const files = fs.readdirSync(publicDir).filter(f => f.startsWith('llms-') && f.endsWith('.txt'));

let cleanedCount = 0;

for (const file of files) {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace common brand placeholder patterns
  content = content.replace(/__MEREK0__/g, 'CreateMe-QR');
  content = content.replace(/__MARCA0__/g, 'CreateMe-QR');
  content = content.replace(/__MARQUE0__/g, 'CreateMe-QR');
  content = content.replace(/__品牌0__/g, 'CreateMe-QR');
  content = content.replace(/__ブランド0__/g, 'CreateMe-QR');
  content = content.replace(/__ब्रांड0__/g, 'CreateMe-QR');
  content = content.replace(/__ब्रांड1__/g, 'WASM');
  content = content.replace(/__ब्रांड2__/g, 'WebAssembly');
  content = content.replace(/__ब्रांड6__/g, 'GDPR');
  content = content.replace(/__ब्रांड7__/g, 'CCPA');
  content = content.replace(/__ब्रांड8__/g, 'SVG');
  content = content.replace(/__ब्रांड10__/g, 'vCard');
  content = content.replace(/__ब्रांड11__/g, 'WPA');
  content = content.replace(/__ब्रांड13__/g, 'WEP');
  content = content.replace(/__ब्रांड19__/g, 'QR Code');
  content = content.replace(/__ब्रांड20__/g, 'QR Code');

  // Any remaining generic __...__ brand placeholders
  content = content.replace(/__[A-Za-z0-9\u0900-\u097F]+__/g, 'CreateMe-QR');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    cleanedCount++;
    console.log(`Cleaned placeholders in ${file}`);
  }
}

console.log(`✅ Cleaned placeholders in ${cleanedCount} files.`);
