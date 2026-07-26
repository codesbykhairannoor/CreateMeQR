const fs = require('fs');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const NEW_KEYS = {
  "catSocial": "Social & Media",
  "catBusiness": "Business & Links",
  "catFinance": "Finance & Store",
  "catFiles": "Files & Data",
  "catRetail": "Retail & Products",
  "catIndustrial": "Industrial & Data",
  "company": "Company",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service"
};

async function translateText(text, targetLang) {
  const code = targetLang === 'zh' ? 'zh-CN' : targetLang;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${code}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch(e) {
    console.error(e);
    return text;
  }
}

async function run() {
  // Update EN first
  const enPath = 'public/locales/en/translation.json';
  if (fs.existsSync(enPath)) {
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    if (!enData.nav) enData.nav = {};
    for (const k in NEW_KEYS) enData.nav[k] = NEW_KEYS[k];
    fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  }

  // Update others
  for (const lang of LANGS) {
    const p = `public/locales/${lang}/translation.json`;
    if (!fs.existsSync(p)) continue;
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!data.nav) data.nav = {};
    
    let updated = false;
    for (const k in NEW_KEYS) {
      if (!data.nav[k]) {
        console.log(`Translating ${k} to ${lang}...`);
        data.nav[k] = await translateText(NEW_KEYS[k], lang);
        updated = true;
      }
    }
    
    if (updated) {
      fs.writeFileSync(p, JSON.stringify(data, null, 2));
    }
  }
  console.log("Done translating mega menu categories.");
}
run();
