const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

// Mapping for Google Translate API codes if they differ
const codeMap = {
  'zh': 'zh-CN',
  'tl': 'tl'
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  
  const tl = codeMap[targetLang] || targetLang;
  
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`);
    if (!res.ok) {
        console.error(`Fetch failed for ${targetLang}`);
        return text;
    }
    const data = await res.json();
    let translated = '';
    for (const chunk of data[0]) {
      translated += chunk[0];
    }
    return translated;
  } catch (err) {
    console.error(`Translation error for ${targetLang}:`, err.message);
    return text;
  }
}

async function main() {
  const enData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'locales', 'en', 'translation.json'), 'utf8'));
  const enLanding = enData.landing;

  // We only translate strings inside landing
  const keysToTranslate = Object.keys(enLanding).filter(k => typeof enLanding[k] === 'string');

  for (const lang of LANGS) {
    console.log(`Processing ${lang}...`);
    const filePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Check if heroTitle is same as English (means it wasn't translated)
    if (data.landing && data.landing.heroTitle === enLanding.heroTitle) {
      console.log(`  Translating ${keysToTranslate.length} keys for ${lang}...`);
      
      for (let i = 0; i < keysToTranslate.length; i++) {
        const key = keysToTranslate[i];
        
        // Skip ctaTitle, ctaSubtitle, ctaButton as they are already translated
        if (['ctaTitle', 'ctaSubtitle', 'ctaButton'].includes(key)) {
            continue;
        }

        const originalText = enLanding[key];
        const translatedText = await translateText(originalText, lang);
        
        data.landing[key] = translatedText;
        
        // Wait 300ms to avoid rate limits
        await delay(300);
      }
      
      // Save back to file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  Saved ${lang}.`);
    } else {
      console.log(`  ${lang} seems already translated or landing object missing.`);
    }
  }
  
  console.log('Done all translations!');
}

main();
