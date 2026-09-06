const fs = require('fs');
const path = require('path');

const pseoDir = path.join(__dirname, 'src', 'config', 'pseo-locales');
const files = fs.readdirSync(pseoDir).filter(f => f.endsWith('.json'));

console.log(`Checking ${files.length} pseo locale files:\n`);

const enData = JSON.parse(fs.readFileSync(path.join(pseoDir, 'en.json'), 'utf8'));

for (const file of files) {
  const lang = file.replace('.json', '');
  if (lang === 'en') continue;
  const data = JSON.parse(fs.readFileSync(path.join(pseoDir, file), 'utf8'));
  let identicalCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].h1Title === enData[i].h1Title) identicalCount++;
  }
  console.log(`[${lang}]: ${data.length} use cases | Identical H1 to EN: ${identicalCount}`);
}
