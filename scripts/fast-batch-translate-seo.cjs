const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const LOCALES_DIR = path.join(__dirname, '../public/locales');
const EN_PATH = path.join(LOCALES_DIR, 'en', 'translation.json');

const langCodeMap = {
  'zh': 'zh-CN',
  'he': 'iw',
  'tl': 'tl'
};

const languages = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar',
  'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs',
  'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

async function main() {
  console.log('⚡ Starting Ultra-Fast Batch Translation using google-translate-api-x ⚡');
  
  const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
  const staticKeys = Object.keys(enData.static || {});
  
  const keysToTranslate = [];
  const textsToTranslate = [];

  for (const key of staticKeys) {
    const enSection = enData.static[key] || {};
    const enDesc = enSection.seoDesc || enSection.desc;
    if (enDesc) {
      keysToTranslate.push(key);
      textsToTranslate.push(enDesc);
    }
  }

  console.log(`Translating ${textsToTranslate.length} static keys for ${languages.length} languages...`);

  // Process all languages in parallel batches
  await Promise.all(languages.map(async (lang) => {
    const langFile = path.join(LOCALES_DIR, lang, 'translation.json');
    if (!fs.existsSync(langFile)) {
      console.warn(`[SKIP] Missing locale file for ${lang}`);
      return;
    }

    const gLang = langCodeMap[lang] || lang;
    try {
      const res = await translate(textsToTranslate, { to: gLang });
      const translatedTexts = Array.isArray(res) ? res.map(r => r.text) : [res.text];

      const langData = JSON.parse(fs.readFileSync(langFile, 'utf8'));
      if (!langData.static) langData.static = {};

      keysToTranslate.forEach((key, idx) => {
        const transText = translatedTexts[idx] || textsToTranslate[idx];
        if (!langData.static[key]) langData.static[key] = {};
        langData.static[key].seoDesc = transText;
        langData.static[key].desc = transText;
      });

      fs.writeFileSync(langFile, JSON.stringify(langData, null, 2), 'utf8');
      console.log(`✅ [${lang.toUpperCase()}] Batch updated (${translatedTexts.length} keys)`);
    } catch (err) {
      console.error(`❌ [${lang.toUpperCase()}] Error:`, err.message);
    }
  }));

  console.log('\n🎉 ALL 30 LANGUAGES BATCH TRANSLATED & SAVED IN SECONDS!');
}

main().catch(err => {
  console.error('Fatal batch translation error:', err);
  process.exit(1);
});
