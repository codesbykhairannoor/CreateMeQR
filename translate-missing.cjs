const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const codeMap = {
  'zh': 'zh-CN',
  'tl': 'tl'
};

async function translateTextDelimiter(texts, targetLang) {
  if (texts.length === 0) return [];
  const tl = codeMap[targetLang] || targetLang;
  
  const delimiter = ' ||| ';
  const combined = texts.join(delimiter);
  
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combined)}`);
    if (!res.ok) return null;
    const data = await res.json();
    let translated = '';
    for (const chunk of data[0]) {
      translated += chunk[0];
    }
    
    const split = translated.split(/\|\|\||\| \| \|/i).map(s => s.trim());
    if (split.length === texts.length) {
      return split;
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function translateText(text, targetLang) {
  const tl = codeMap[targetLang] || targetLang;
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`);
    if (!res.ok) return text;
    const data = await res.json();
    let translated = '';
    for (const chunk of data[0]) {
      translated += chunk[0];
    }
    return translated;
  } catch (err) {
    return text;
  }
}

function flattenObject(obj, prefix = '') {
  let result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenObject(obj[key], prefix + key + '.'));
    } else if (typeof obj[key] === 'string') {
      result[prefix + key] = obj[key];
    }
  }
  return result;
}

function setDeep(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

async function main() {
  const enData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'locales', 'en', 'translation.json'), 'utf8'));
  const flatEn = flattenObject(enData);

  for (const lang of LANGS) {
    console.log(`\nProcessing language: ${lang}`);
    const filePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) { continue; }
    
    const flatTarget = flattenObject(data);
    
    const toTranslatePaths = [];
    const toTranslateTexts = [];
    
    // Find missing or English-identical keys
    // ONLY target the specific namespaces we care about to avoid translating random JSON
    for (const [keyPath, enText] of Object.entries(flatEn)) {
      if (keyPath.startsWith('static.') || keyPath.startsWith('footer.') || keyPath.startsWith('nav.') || keyPath.startsWith('history.')) {
        if (!flatTarget[keyPath] || flatTarget[keyPath] === enText) {
          toTranslatePaths.push(keyPath);
          toTranslateTexts.push(enText);
        }
      }
    }

    if (toTranslatePaths.length === 0) {
        console.log(`  Already fully translated.`);
        continue;
    }
    
    console.log(`  Need to translate ${toTranslatePaths.length} keys...`);
    
    // Batch process
    const chunkSize = 20;
    for (let i = 0; i < toTranslatePaths.length; i += chunkSize) {
        const chunkPaths = toTranslatePaths.slice(i, i + chunkSize);
        const chunkTexts = toTranslateTexts.slice(i, i + chunkSize);
        
        let results = await translateTextDelimiter(chunkTexts, lang);
        
        if (!results) {
            // Fallback 1-by-1
            results = [];
            for (const text of chunkTexts) {
                results.push(await translateText(text, lang));
            }
        }
        
        // Apply back
        for (let j = 0; j < chunkPaths.length; j++) {
            setDeep(data, chunkPaths[j], results[j]);
        }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`  Saved ${lang}.`);
  }
  console.log("All missing keys translated successfully!");
}

main();
