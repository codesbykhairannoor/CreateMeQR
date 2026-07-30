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

const EN_DICT = {
  "contact": {
    "title": "Contact Us",
    "desc": "Have questions about our free QR code generator? Need help with an integration? Our support team is here to assist you.",
    "email_support": "Email Support",
    "email_desc": "We aim to respond to all inquiries within 24 hours.",
    "community": "Community",
    "community_desc": "Join our developer community on GitHub to report bugs or request features.",
    "open_issue": "Open an Issue",
    "hq": "HQ",
    "hq_desc": "CreateMy-QR Technologies, Global Remote Team",
    "availability": "Available 24/7"
  }
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  const localesDir = path.join(__dirname, 'public', 'locales');
  
  // Flatten EN_DICT
  const flatDict = [];
  for (const k in EN_DICT.contact) {
    flatDict.push({ path: `contact.${k}`, text: EN_DICT.contact[k] });
  }
  
  console.log(`Starting SEO translation for ${LANGS.length} languages. Total strings per lang: ${flatDict.length}`);
  
  // Write EN first
  const enPath = path.join(localesDir, 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  enData.contact = EN_DICT.contact;
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

  for (const lang of LANGS) {
    const tl = codeMap[lang] || lang;
    console.log(`Translating ${lang}...`);
    
    const filePath = path.join(localesDir, lang, 'translation.json');
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.contact) {
      console.log(`Skipping ${lang} - already translated`);
      continue;
    }
    
    const textsToTranslate = flatDict.map(item => item.text);
    const combinedText = textsToTranslate.join(' ||| ');
    
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combinedText)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed');
      const apiData = await res.json();
      
      let translated = '';
      for (const chunk of apiData[0]) {
        translated += chunk[0];
      }
      
      const splitTranslated = translated.split(/\s*\|\|\|\s*/);
      
      if (splitTranslated.length !== textsToTranslate.length) {
        console.error(`Mismatch in ${lang}: got ${splitTranslated.length} instead of ${textsToTranslate.length}`);
        // Fallback to English
        data.contact = EN_DICT.contact;
      } else {
        // Reconstruct
        data.contact = {};
        for (let i = 0; i < flatDict.length; i++) {
          const key = flatDict[i].path.split('.')[1];
          data.contact[key] = splitTranslated[i].trim();
        }
      }
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Saved ${lang}`);
      await delay(1000); // Prevent rate limit
    } catch (err) {
      console.error(`Error translating ${lang}:`, err.message);
      data.contact = EN_DICT.contact;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  }
  
  console.log('All done!');
}

run();
