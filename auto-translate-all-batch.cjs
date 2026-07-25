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

const delay = ms => new Promise(res => setTimeout(res, ms));

// Recursively get all paths of strings in an object
function getAllStringPaths(obj, currentPath = '') {
  let paths = [];
  for (const key in obj) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    if (typeof obj[key] === 'string') {
      paths.push(newPath);
    } else if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      paths = paths.concat(getAllStringPaths(obj[key], newPath));
    }
  }
  return paths;
}

// Get value at dot-separated path
function getDeepValue(obj, pathStr) {
  return pathStr.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Set value at dot-separated path
function setDeepValue(obj, pathStr, value) {
  const parts = pathStr.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

async function batchTranslate(texts, targetLang) {
  if (!texts || texts.length === 0) return [];
  const tl = codeMap[targetLang] || targetLang;
  const delimiter = ' ||| ';
  const combinedText = texts.join(delimiter);
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combinedText)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    
    let translated = '';
    for (const chunk of data[0]) translated += chunk[0];
    
    const splitTranslated = translated.split(/\s*\|\|\|\s*/);
    if (splitTranslated.length !== texts.length) {
       console.error(`Mismatch for ${targetLang}: Expected ${texts.length}, got ${splitTranslated.length}.`);
       return null;
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
  
  // Get all string paths from EN, but skip seoKeywords, landing, geoArticle (already fully handled)
  let allPaths = getAllStringPaths(enData).filter(p => !p.startsWith('seoKeywords') && !p.startsWith('landing') && !p.startsWith('geoArticle') && !p.startsWith('appTitle') && !p.startsWith('tagline'));

  for (const lang of LANGS) {
    console.log(`Processing ${lang}...`);
    const filePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Find keys that need translation (where the text is exactly the same as English)
    const pathsToTranslate = allPaths.filter(p => {
        const enVal = getDeepValue(enData, p);
        const langVal = getDeepValue(data, p);
        // Exclude short acronyms like URL, SMS, WiFi, vCard, QR that might naturally be the same
        if (['URL', 'SMS', 'WiFi', 'vCard', 'Q'].includes(enVal)) return false;
        
        return enVal === langVal;
    });

    if (pathsToTranslate.length > 0) {
      console.log(`  Found ${pathsToTranslate.length} untranslated strings for ${lang}. Batch translating...`);
      const originalTexts = pathsToTranslate.map(p => getDeepValue(enData, p));
      
      const translatedTexts = await batchTranslate(originalTexts, lang);
      
      if (translatedTexts && translatedTexts.length === originalTexts.length) {
         for (let i = 0; i < pathsToTranslate.length; i++) {
           setDeepValue(data, pathsToTranslate[i], translatedTexts[i]);
         }
      } else {
         console.log(`  Batch failed or mismatch for ${lang}, doing 1-by-1...`);
         for (let i = 0; i < pathsToTranslate.length; i++) {
             const t = await translateSingle(originalTexts[i], lang);
             setDeepValue(data, pathsToTranslate[i], t);
             await delay(300);
         }
      }
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✅ Saved ${lang}.`);
      await delay(1000);
    } else {
      console.log(`  ⏭️  ${lang} UI is already fully translated.`);
    }
  }
  
  console.log('🚀 ALL DONE! Global UI Fully Translated!');
}

main();
