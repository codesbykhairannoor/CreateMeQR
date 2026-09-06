const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

console.log(`Found ${langs.length} languages to audit in public/locales:\n`);

const enTrans = JSON.parse(fs.readFileSync(path.join(localesDir, 'en', 'translation.json'), 'utf8'));

// Sample keys to check
const keysToCheck = [
  'types.url', 'types.wifi', 'types.vcard', 'types.barcode', 'types.scanqr', 'types.scanbarcode',
  'static.about.seoTitle', 'static.about.seoDesc', 'static.about.desc',
  'static.pricing.seoTitle', 'static.pricing.seoDesc', 'static.pricing.desc',
  'static.privacy.seoTitle', 'static.privacy.seoDesc', 'static.privacy.desc',
  'static.security.seoTitle', 'static.security.seoDesc', 'static.security.desc',
  'static.terms.seoTitle', 'static.terms.seoDesc', 'static.terms.desc',
  'static.usecases.seoTitle', 'static.usecases.seoDesc', 'static.usecases.desc',
  'static.compare.seoTitle', 'static.compare.seoDesc', 'static.compare.desc',
  'static.languages.seoTitle', 'static.languages.seoDesc', 'static.languages.desc',
  'static.barcode.seoTitle', 'static.barcode.seoDesc', 'static.barcode.desc',
  'static.scanqr.seoTitle', 'static.scanqr.seoDesc', 'static.scanqr.desc',
  'static.scanbarcode.seoTitle', 'static.scanbarcode.seoDesc', 'static.scanbarcode.desc',
  'home.heroTitle', 'home.seoDesc'
];

function getNested(obj, pathStr) {
  const parts = pathStr.split('.');
  let curr = obj;
  for (const p of parts) {
    if (!curr || typeof curr !== 'object') return undefined;
    curr = curr[p];
  }
  return curr;
}

const audit = [];

for (const lang of langs) {
  if (lang === 'en') continue;
  const transPath = path.join(localesDir, lang, 'translation.json');
  const trans = JSON.parse(fs.readFileSync(transPath, 'utf8'));
  
  let identicalToEn = 0;
  let missingKeys = 0;
  let sampleEnglish = [];

  for (const k of keysToCheck) {
    const enVal = getNested(enTrans, k);
    const val = getNested(trans, k);
    if (!val) {
      missingKeys++;
    } else if (typeof val === 'string' && val.trim() === (enVal || '').trim()) {
      identicalToEn++;
      if (sampleEnglish.length < 3) sampleEnglish.push(`${k}: "${val}"`);
    }
  }

  audit.push({
    lang,
    missingKeys,
    identicalToEn,
    sampleEnglish
  });
}

console.log('Language | Missing Keys | Identical to EN (Untranslated) | Sample');
console.log('---|---|---|---');
for (const a of audit) {
  console.log(`${a.lang} | ${a.missingKeys} | ${a.identicalToEn} | ${a.sampleEnglish.join('; ')}`);
}
