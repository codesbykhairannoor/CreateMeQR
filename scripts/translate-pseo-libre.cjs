// scripts/translate-pseo-libre.cjs
// Fast free translation using the public LibreTranslate instance (https://libretranslate.de)
// Translates the core pSEO strings (h1Title, seoDesc, infoGain) into the 30 target languages.

// scripts/translate-pseo-libre.cjs
// Fast free translation using the public LibreTranslate instance (https://libretranslate.de)
// Translates the core pSEO strings (h1Title, seoDesc, infoGain) into the 30 target languages.

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const MASTER_FILE = path.resolve('src/config/pseo-master-en.json');
const LOCALES_DIR = path.resolve('src/config/pseo-locales');
if (!fs.existsSync(LOCALES_DIR)) fs.mkdirSync(LOCALES_DIR, { recursive: true });

const master = JSON.parse(fs.readFileSync(MASTER_FILE, 'utf8'));

// 30 target languages (exclude English which is the source)
const LANGS = [
  'bn','da','de','el','es','fi','fr','hi','id','it','ja','ms','nl','no','pl','pt','ro','ru','sv','th','tr','uk','vi','zh','ar','he','ko','cs','hu','sv'
];

// LibreTranslate language map – most codes match, but we need a few adjustments
const LIBRE_MAP = {
  bn: 'bn', da: 'da', de: 'de', el: 'el', es: 'es', fi: 'fi', fr: 'fr', hi: 'hi', id: 'id', it: 'it',
  ja: 'ja', ms: 'ms', nl: 'nl', no: 'no', pl: 'pl', pt: 'pt', ro: 'ro', ru: 'ru', sv: 'sv', th: 'th',
  tr: 'tr', uk: 'uk', vi: 'vi', zh: 'zh', ar: 'ar', he: 'he', ko: 'ko', cs: 'cs', hu: 'hu'
};

async function translate(text, target) {
  const response = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    body: JSON.stringify({ q: text, source: 'en', target: LIBRE_MAP[target], format: 'text', api_key: '' }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data.translatedText;
}

async function main() {
  for (const lang of LANGS) {
    console.log(`⏳ Translating to ${lang} …`);
    const translated = [];
    for (const uc of master) {
      const t = {
        id: uc.id,
        slug: uc.slug, // keep original slug (or you could translate it too)
        h1Title: await translate(uc.h1Title, lang),
        seoDesc: await translate(uc.seoDesc, lang),
        infoGain: await translate(uc.infoGain, lang),
        // If you have FAQs, translate them as well (placeholder empty array now)
        faqs: []
      };
      translated.push(t);
    }
    const outPath = path.join(LOCALES_DIR, `${lang}.json`);
    fs.writeFileSync(outPath, JSON.stringify(translated, null, 2), 'utf8');
    console.log(`✅ ${lang} written to ${outPath}`);
  }
}

main().catch(err => {
  console.error('❌ Translation failed', err);
  process.exit(1);
});


const MASTER_FILE = path.resolve('src/config/pseo-master-en.json');
const LOCALES_DIR = path.resolve('src/config/pseo-locales');
if (!fs.existsSync(LOCALES_DIR)) fs.mkdirSync(LOCALES_DIR, { recursive: true });

const master = JSON.parse(fs.readFileSync(MASTER_FILE, 'utf8'));

// 30 target languages (exclude English which is the source)
const LANGS = [
  'bn','da','de','el','es','fi','fr','hi','id','it','ja','ms','nl','no','pl','pt','ro','ru','sv','th','tr','uk','vi','zh','ar','he','ko','cs','hu','sv'
];

// LibreTranslate language map – most codes match, but we need a few adjustments
const LIBRE_MAP = {
  bn: 'bn', da: 'da', de: 'de', el: 'el', es: 'es', fi: 'fi', fr: 'fr', hi: 'hi', id: 'id', it: 'it',
  ja: 'ja', ms: 'ms', nl: 'nl', no: 'no', pl: 'pl', pt: 'pt', ro: 'ro', ru: 'ru', sv: 'sv', th: 'th',
  tr: 'tr', uk: 'uk', vi: 'vi', zh: 'zh', ar: 'ar', he: 'he', ko: 'ko', cs: 'cs', hu: 'hu'
};

async function translate(text, target) {
  const response = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    body: JSON.stringify({ q: text, source: 'en', target: LIBRE_MAP[target], format: 'text', api_key: '' }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data.translatedText;
}

async function main() {
  for (const lang of LANGS) {
    console.log(`⏳ Translating to ${lang} …`);
    const translated = [];
    for (const uc of master) {
      const t = {
        id: uc.id,
        slug: uc.slug, // keep original slug (or you could translate it too)
        h1Title: await translate(uc.h1Title, lang),
        seoDesc: await translate(uc.seoDesc, lang),
        infoGain: await translate(uc.infoGain, lang),
        // If you have FAQs, translate them as well (placeholder empty array now)
        faqs: []
      };
      translated.push(t);
    }
    const outPath = path.join(LOCALES_DIR, `${lang}.json`);
    fs.writeFileSync(outPath, JSON.stringify(translated, null, 2), 'utf8');
    console.log(`✅ ${lang} written to ${outPath}`);
  }
}

main().catch(err => {
  console.error('❌ Translation failed', err);
  process.exit(1);
});
