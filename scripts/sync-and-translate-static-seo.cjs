const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

const LOCALES_DIR = path.join(__dirname, '../public/locales');
const EN_PATH = path.join(LOCALES_DIR, 'en', 'translation.json');

const langCodeMap = {
  'zh': 'zh-cn',
  'he': 'iw',
  'tl': 'tl'
};

const languages = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar',
  'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs',
  'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateWithRetry(text, targetLang, retries = 3) {
  const gLang = langCodeMap[targetLang] || targetLang;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await translate(text, { to: gLang });
      if (res && res.trim()) return res.trim();
    } catch (e) {
      if (attempt === retries) {
        console.warn(`[WARN] Translation failed for ${targetLang} after ${retries} attempts:`, e.message);
        return text;
      }
      await sleep(1000 * attempt);
    }
  }
  return text;
}

async function main() {
  console.log('--- Starting Static SEO Meta Translation Sync ---');
  if (!fs.existsSync(EN_PATH)) {
    console.error('Error: en/translation.json not found');
    process.exit(1);
  }

  const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
  const staticKeys = Object.keys(enData.static || {});

  console.log(`Found ${staticKeys.length} static sections in English to sync across ${languages.length} languages.`);

  for (const lang of languages) {
    const langFile = path.join(LOCALES_DIR, lang, 'translation.json');
    if (!fs.existsSync(langFile)) {
      console.warn(`[SKIP] Missing locale file for ${lang}`);
      continue;
    }

    const langData = JSON.parse(fs.readFileSync(langFile, 'utf8'));
    if (!langData.static) langData.static = {};

    console.log(`\nTranslating static descriptions for [${lang.toUpperCase()}]...`);

    for (const key of staticKeys) {
      const enSection = enData.static[key] || {};
      const enDesc = enSection.seoDesc || enSection.desc;
      if (!enDesc) continue;

      const translated = await translateWithRetry(enDesc, lang);
      
      if (!langData.static[key]) langData.static[key] = {};
      langData.static[key].seoDesc = translated;
      langData.static[key].desc = translated;
      console.log(`  ✓ static.${key} [${translated.length} chars]`);
      await sleep(150);
    }

    fs.writeFileSync(langFile, JSON.stringify(langData, null, 2), 'utf8');
    console.log(`Saved [${lang.toUpperCase()}] translations.`);
  }

  console.log('\n=== Translation Sync Completed Successfully ===');
}

main().catch(err => {
  console.error('Fatal translation error:', err);
  process.exit(1);
});
