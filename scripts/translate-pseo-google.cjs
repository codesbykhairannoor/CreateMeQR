// translate-pseo-google.cjs
// Uses the unofficial Google Translate free endpoint (no API key needed).
// Translates all pSEO strings (h1Title, seoDesc, infoGain, FAQs) into 30 languages.

const fs = require('fs');
const path = require('path');
const https = require('https');

const MASTER_FILE = path.resolve('src/config/pseo-master-en.json');
const LOCALES_DIR = path.resolve('src/config/pseo-locales');
if (!fs.existsSync(LOCALES_DIR)) fs.mkdirSync(LOCALES_DIR, { recursive: true });

const master = JSON.parse(fs.readFileSync(MASTER_FILE, 'utf8'));

// All 30 target languages used by the project
const LANGS = [
  'ar','bn','cs','da','de','el','es','fi','fr','he',
  'hi','hu','id','it','ja','ko','ms','nl','no','pl',
  'pt','ro','ru','sv','th','tr','uk','vi','zh-CN','zh-TW'
];

// Map our internal codes to Google Translate codes
const GT_MAP = {
  ar: 'ar', bn: 'bn', cs: 'cs', da: 'da', de: 'de', el: 'el', es: 'es', fi: 'fi',
  fr: 'fr', he: 'iw', hi: 'hi', hu: 'hu', id: 'id', it: 'it', ja: 'ja', ko: 'ko',
  ms: 'ms', nl: 'nl', no: 'no', pl: 'pl', pt: 'pt', ro: 'ro', ru: 'ru', sv: 'sv',
  th: 'th', tr: 'tr', uk: 'uk', vi: 'vi', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW'
};

// Map internal code to the locale code used in pseo-locales filename
const FILE_MAP = {
  ar: 'ar', bn: 'bn', cs: 'cs', da: 'da', de: 'de', el: 'el', es: 'es', fi: 'fi',
  fr: 'fr', he: 'he', hi: 'hi', hu: 'hu', id: 'id', it: 'it', ja: 'ja', ko: 'ko',
  ms: 'ms', nl: 'nl', no: 'no', pl: 'pl', pt: 'pt', ro: 'ro', ru: 'ru', sv: 'sv',
  th: 'th', tr: 'tr', uk: 'uk', vi: 'vi', 'zh-CN': 'zh', 'zh-TW': 'zh-TW'
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function googleTranslate(text, targetLang) {
  return new Promise((resolve, reject) => {
    const gtCode = GT_MAP[targetLang] || targetLang;
    const encoded = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${gtCode}&dt=t&q=${encoded}`;

    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          // Google returns nested array; join all translation segments
          const translated = parsed[0].map(seg => seg[0]).join('');
          resolve(translated);
        } catch (e) {
          reject(new Error(`Parse error for lang=${targetLang}: ${e.message}\nRaw: ${data.slice(0, 300)}`));
        }
      });
    }).on('error', reject);
  });
}

async function translateUseCase(uc, lang) {
  const [h1Title, seoDesc, infoGain] = await Promise.all([
    googleTranslate(uc.h1Title, lang),
    googleTranslate(uc.seoDesc, lang),
    googleTranslate(uc.infoGain, lang),
  ]);

  const faqs = [];
  for (const faq of (uc.faqs || [])) {
    const [q, a] = await Promise.all([
      googleTranslate(faq.q, lang),
      googleTranslate(faq.a, lang),
    ]);
    faqs.push({ q, a });
    await sleep(120); // small delay to avoid rate limiting
  }

  return {
    id: uc.id,
    slug: uc.slug,
    baseTool: uc.baseTool,
    h1Title,
    seoDesc,
    infoGain,
    faqs
  };
}

async function main() {
  let totalOk = 0;
  let totalFail = 0;

  for (const lang of LANGS) {
    const fileName = FILE_MAP[lang] || lang;
    const outPath = path.join(LOCALES_DIR, `${fileName}.json`);

    console.log(`\n⏳ Translating to [${lang}] …`);
    const results = [];

    for (let i = 0; i < master.length; i++) {
      const uc = master[i];
      try {
        const translated = await translateUseCase(uc, lang);
        results.push(translated);
        process.stdout.write(`  ✅ [${i + 1}/${master.length}] ${uc.id}\n`);
      } catch (err) {
        console.error(`  ❌ Failed: ${uc.id} – ${err.message}`);
        // Fallback: keep English
        results.push({ ...uc });
        totalFail++;
      }
      await sleep(300); // pause between use cases to avoid rate limit
    }

    fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
    console.log(`  💾 Written → ${outPath}`);
    totalOk++;

    await sleep(1500); // pause between languages
  }

  console.log(`\n🎉 Done! ${totalOk} languages OK, ${totalFail} individual failures (kept English fallback).`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
