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
  "scanqr": {
    "seo": {
      "title": "Free QR Code Scanner Online - Scan QR Instantly",
      "desc": "Scan QR codes instantly using your camera or by uploading an image. 100% secure, private, and client-side processing."
    }
  },
  "barcode": {
    "seo": {
      "title": "Free Barcode Generator Online - Create 1D Barcodes",
      "desc": "Generate professional 1D barcodes instantly. Support for Code-128, UPC, EAN, ITF-14, and more. Free, secure, and ready to download in high-res PNG."
    }
  }
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  const localesDir = path.join(__dirname, 'src/../public', 'locales');
  
  // Flatten EN_DICT to simple array of paths and values
  const flatDict = [];
  function flatten(obj, prefix = '') {
    for (const k in obj) {
      if (typeof obj[k] === 'string') {
        flatDict.push({ path: prefix + k, text: obj[k] });
      } else {
        flatten(obj[k], prefix + k + '.');
      }
    }
  }
  flatten(EN_DICT);
  
  console.log(`Starting SEO translation for ${LANGS.length} languages. Total strings per lang: ${flatDict.length}`);
  
  // Write EN first
  const enPath = path.join(localesDir, 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  enData.scanqr.seo = EN_DICT.scanqr.seo;
  enData.barcode.seo = EN_DICT.barcode.seo;
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

  for (const lang of LANGS) {
    const tl = codeMap[lang] || lang;
    console.log(`Translating ${lang}...`);
    
    const filePath = path.join(localesDir, lang, 'translation.json');
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.scanqr && data.scanqr.seo) {
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
        data.scanqr.seo = EN_DICT.scanqr.seo;
        data.barcode.seo = EN_DICT.barcode.seo;
      } else {
        // Reconstruct
        data.scanqr.seo = {};
        data.barcode.seo = {};
        
        for (let i = 0; i < flatDict.length; i++) {
          const p = flatDict[i].path.split('.');
          const root = p[0];
          const section = p[1];
          const key = p[2];
          
          data[root][section][key] = splitTranslated[i];
        }
      }
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Saved ${lang}`);
      await delay(1000); // Prevent rate limit
    } catch (err) {
      console.error(`Error translating ${lang}:`, err.message);
    }
  }
  
  console.log('All done!');
}

run();
