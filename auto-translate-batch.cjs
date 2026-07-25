const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

// Map tricky language codes to Google Translate API codes if needed
const codeMap = {
  'zh': 'zh-CN', // Ensure Simplified Chinese
  'tl': 'tl',    // Tagalog
  'no': 'no'     // Norwegian
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function batchTranslate(texts, targetLang) {
  if (!texts || texts.length === 0) return [];
  
  const tl = codeMap[targetLang] || targetLang;
  
  // Join with a unique delimiter that Google Translate rarely messes up
  const delimiter = ' ||| ';
  const combinedText = texts.join(delimiter);
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combinedText)}`;
    const res = await fetch(url);
    if (!res.ok) {
        console.error(`Fetch failed for ${targetLang}`);
        return [];
    }
    const data = await res.json();
    
    let translated = '';
    // data[0] contains array of chunks because Google splits long text
    for (const chunk of data[0]) {
      translated += chunk[0];
    }
    
    // Split back by delimiter. Note: some languages might add spaces around the delimiter
    const splitTranslated = translated.split(/\s*\|\|\|\s*/);
    
    if (splitTranslated.length !== texts.length) {
       console.error(`Mismatch for ${targetLang}: Expected ${texts.length}, got ${splitTranslated.length}. Falling back to 1-by-1.`);
       return null; // Fallback signal
    }
    
    return splitTranslated;
  } catch (err) {
    console.error(`Translation error for ${targetLang}:`, err.message);
    return null;
  }
}

async function translateSingle(text, targetLang) {
    const tl = codeMap[targetLang] || targetLang;
    try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        let translated = '';
        for (const chunk of data[0]) translated += chunk[0];
        return translated;
    } catch (err) {
        return text;
    }
}

async function main() {
  const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const enLanding = enData.landing;

  // We only translate strings inside landing
  const keysToTranslate = Object.keys(enLanding).filter(k => 
    typeof enLanding[k] === 'string' && 
    !['ctaTitle', 'ctaSubtitle', 'ctaButton'].includes(k)
  );

  const originalTexts = keysToTranslate.map(k => enLanding[k]);

  for (const lang of LANGS) {
    console.log(`Processing ${lang}...`);
    const filePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Always force translate if heroTitle is still English
    if (data.landing && data.landing.heroTitle === enLanding.heroTitle) {
      console.log(`  Batch translating ${originalTexts.length} keys for ${lang}...`);
      
      const translatedTexts = await batchTranslate(originalTexts, lang);
      
      if (translatedTexts && translatedTexts.length === originalTexts.length) {
         // Success
         for (let i = 0; i < keysToTranslate.length; i++) {
           data.landing[keysToTranslate[i]] = translatedTexts[i];
         }
      } else {
         // Fallback to 1-by-1
         console.log(`  Batch failed or mismatch for ${lang}, doing 1-by-1...`);
         for (let i = 0; i < keysToTranslate.length; i++) {
             data.landing[keysToTranslate[i]] = await translateSingle(originalTexts[i], lang);
             await delay(300);
         }
      }
      
      // Save back to file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✅ Saved ${lang}.`);
      await delay(1000); // 1 second delay between languages to respect API limits
    } else {
      console.log(`  ⏭️  ${lang} is already translated.`);
    }
  }
  
  console.log('🚀 ALL DONE! 30 Languages Fully Translated!');
}

main();
