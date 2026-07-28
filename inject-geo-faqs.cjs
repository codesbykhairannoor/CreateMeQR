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

const FAQ_1_Q = "Is this QR code generator completely free?";
const FAQ_1_A = "Yes, CreateMeQR is 100% free with no hidden fees, no subscriptions, and no 14-day trials. You can generate unlimited QR codes for commercial or personal use.";

const FAQ_2_Q = "Are my files and data uploaded to your servers?";
const FAQ_2_A = "No. Your privacy is our top priority. Our tool uses WebAssembly and Client-Side processing, meaning all QR codes are generated locally inside your browser's memory. No data is ever sent to or stored on our servers.";

const FAQ_3_Q = "Do the generated QR codes expire?";
const FAQ_3_A = "Never. Because we generate static QR codes directly on your device without relying on cloud redirects, your QR codes will work forever with absolutely no expiration dates.";

const delimiter = ' ||| ';

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
    return text;
  }
}

async function run() {
  console.log("Injecting GEO FAQs into all languages...");
  
  // English
  const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
  let enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  enData.geo.faqs = [
    { q: FAQ_1_Q, a: FAQ_1_A },
    { q: FAQ_2_Q, a: FAQ_2_A },
    { q: FAQ_3_Q, a: FAQ_3_A }
  ];
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  console.log("✅ Updated en");

  // Other languages
  for (const lang of LANGS) {
    const p = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    if (!fs.existsSync(p)) continue;
    
    let data = JSON.parse(fs.readFileSync(p, 'utf-8'));
    if (!data.geo) data.geo = {};
    
    if (!data.geo.faqs || data.geo.faqs[0].q === FAQ_1_Q) {
      console.log(`Translating FAQs for ${lang}...`);
      
      const combined = [FAQ_1_Q, FAQ_1_A, FAQ_2_Q, FAQ_2_A, FAQ_3_Q, FAQ_3_A].join(delimiter);
      const translatedCombined = await translateText(combined, lang);
      
      const parts = translatedCombined.split(/\s*\|\|\|\s*/);
      if (parts.length === 6) {
        data.geo.faqs = [
          { q: parts[0], a: parts[1] },
          { q: parts[2], a: parts[3] },
          { q: parts[4], a: parts[5] }
        ];
        fs.writeFileSync(p, JSON.stringify(data, null, 2));
        console.log(`✅ Updated ${lang}`);
      } else {
        console.error(`❌ Mismatch for ${lang} parts length: ${parts.length}`);
      }
      await new Promise(res => setTimeout(res, 500));
    } else {
      console.log(`⏭️ Skipped ${lang}`);
    }
  }
  console.log("🎉 DONE!");
}

run();
