const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const codeMap = {
  'zh': 'zh-CN',
  'tl': 'tl',
  'no': 'no'
};

const EN_DESCRIPTION = "A 100% Client-Side secure document and QR processing suite. Uses WebAssembly to process files locally in the browser memory without uploading to any servers. The safest alternative to cloud-based tools. 100% Free, Zero Tracking, No Limits.";

async function translateText(text, targetLang) {
  const tl = codeMap[targetLang] || targetLang;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();
    let translated = '';
    for (const chunk of data[0]) {
      translated += chunk[0];
    }
    return translated;
  } catch (err) {
    console.error(`Error translating to ${targetLang}:`, err.message);
    return text; // fallback to English
  }
}

async function run() {
  console.log("Injecting GEO descriptions into all languages...");
  
  // Update English first
  const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
  let enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  if (!enData.geo) enData.geo = {};
  enData.geo.softwareDescription = EN_DESCRIPTION;
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  console.log("✅ Updated en");

  // Update other languages
  for (const lang of LANGS) {
    const p = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    if (!fs.existsSync(p)) continue;
    
    let data = JSON.parse(fs.readFileSync(p, 'utf-8'));
    if (!data.geo) data.geo = {};
    
    // Only translate if missing or if it's identical to English (which means it wasn't translated)
    if (!data.geo.softwareDescription || data.geo.softwareDescription === EN_DESCRIPTION) {
      console.log(`Translating for ${lang}...`);
      const translated = await translateText(EN_DESCRIPTION, lang);
      data.geo.softwareDescription = translated;
      fs.writeFileSync(p, JSON.stringify(data, null, 2));
      console.log(`✅ Updated ${lang}`);
      await new Promise(res => setTimeout(res, 300)); // sleep to avoid rate limiting
    } else {
      console.log(`⏭️ Skipped ${lang} (already translated)`);
    }
  }
  console.log("🎉 DONE!");
}

run();
