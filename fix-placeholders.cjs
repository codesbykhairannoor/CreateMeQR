const fs = require('fs');
const path = require('path');

const langsDir = path.join(__dirname, 'public', 'locales');
const langCodes = fs.readdirSync(langsDir).filter(f => fs.statSync(path.join(langsDir, f)).isDirectory());

let fixCount = 0;

for (const lang of langCodes) {
  if (lang === 'en') continue;
  const transPath = path.join(langsDir, lang, 'translation.json');
  if (!fs.existsSync(transPath)) continue;
  
  const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
  
  let changed = false;
  
  if (translations.seoTool) {
    for (const key of ['title', 'h1', 'description']) {
      if (translations.seoTool[key] && translations.seoTool[key].match(/\{\{[^}]+\}\}/)) {
        const oldVal = translations.seoTool[key];
        const newVal = oldVal.replace(/\{\{[^}]+\}\}/g, '{{tool}}');
        if (oldVal !== newVal) {
          translations.seoTool[key] = newVal;
          changed = true;
          fixCount++;
        }
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(transPath, JSON.stringify(translations, null, 2) + '\n');
    console.log(`Fixed placeholders for ${lang}`);
  }
}

console.log(`Done! Fixed ${fixCount} placeholders across all languages.`);
