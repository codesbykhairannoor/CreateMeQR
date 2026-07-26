const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const EN_NAV = {
  "allTools": "All Tools",
  "generatorDesc": "Create 34+ QR Types",
  "barcodeDesc": "1D/2D Pro Barcodes",
  "scanDesc": "Read from Camera"
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
    for (const k in EN_NAV) enData.nav[k] = EN_NAV[k];
    fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  }

  // Update others
  for (const lang of LANGS) {
    const p = `public/locales/${lang}/translation.json`;
    if (!fs.existsSync(p)) continue;
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!data.nav) data.nav = {};
    
    let updated = false;
    for (const k in EN_NAV) {
      if (!data.nav[k]) {
        console.log(`Translating ${k} to ${lang}...`);
        data.nav[k] = await translateText(EN_NAV[k], lang);
        updated = true;
      }
    }
    
    if (updated) {
      fs.writeFileSync(p, JSON.stringify(data, null, 2));
    }
  }
  console.log("Done translating nav items.");
}
run();
