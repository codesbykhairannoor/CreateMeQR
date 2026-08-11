const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const codeMap = {
  'zh': 'zh-CN',
  'tl': 'tl'
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function translateBatch(texts, targetLang) {
  if (texts.length === 0) return [];
  const tl = codeMap[targetLang] || targetLang;
  
  // Build query string for multiple 'q' parameters
  const params = new URLSearchParams();
  params.append('client', 'gtx');
  params.append('sl', 'en');
  params.append('tl', tl);
  params.append('dt', 't');
  texts.forEach(t => params.append('q', t));
  
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?${params.toString()}`);
    if (!res.ok) {
        console.error(`Fetch failed for ${targetLang}`);
        return texts;
    }
    const data = await res.json();
    
    // Google returns an array of chunks. If we passed multiple q's, they are usually grouped,
    // but the response structure can be tricky. Let's just fall back to single translates if it fails,
    // or parse it carefully.
    
    // A safer batch: join by a delimiter
    return null; // Force delimiter approach below instead
  } catch (err) {
    return null;
  }
}

async function translateTextDelimiter(texts, targetLang) {
  if (texts.length === 0) return [];
  const tl = codeMap[targetLang] || targetLang;
  
  const delimiter = ' ||| ';
  const combined = texts.join(delimiter);
  
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combined)}`);
    if (!res.ok) {
        console.error(`Fetch failed for ${targetLang}`);
        return texts;
    }
    const data = await res.json();
    let translated = '';
    for (const chunk of data[0]) {
      translated += chunk[0];
    }
    
    const split = translated.split(/\|\|\||\| \| \|/i).map(s => s.trim());
    if (split.length === texts.length) {
      return split;
    } else {
      console.log("Delimiter split mismatch! Falling back to 1-by-1");
      return null;
    }
  } catch (err) {
    console.error(`Translation error for ${targetLang}:`, err.message);
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

async function main() {
  const enData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'locales', 'en', 'translation.json'), 'utf8'));
  const staticEn = enData.static;

  if (!staticEn) return;

  // Flatten
  const flatKeys = [];
  const flatTexts = [];
  
  for (const page of Object.keys(staticEn)) {
    for (const key of Object.keys(staticEn[page])) {
      flatKeys.push({ page, key });
      flatTexts.push(staticEn[page][key]);
    }
  }

  for (const lang of LANGS) {
    console.log(`\nProcessing language: ${lang}`);
    const filePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) { continue; }
    
    if (!data.static) data.static = {};
    for (const page of Object.keys(staticEn)) {
      if (!data.static[page]) data.static[page] = {};
    }

    // Check what needs translating
    const toTranslateKeys = [];
    const toTranslateTexts = [];
    for (let i = 0; i < flatKeys.length; i++) {
        const { page, key } = flatKeys[i];
        if (!data.static[page][key] || data.static[page][key] === staticEn[page][key]) {
            toTranslateKeys.push(flatKeys[i]);
            toTranslateTexts.push(flatTexts[i]);
        }
    }

    if (toTranslateKeys.length === 0) {
        console.log(`  Already translated.`);
        continue;
    }
    
    console.log(`  Need to translate ${toTranslateKeys.length} keys...`);

    // Try batch
    let results = await translateTextDelimiter(toTranslateTexts, lang);
    if (!results) {
        // Fallback 1-by-1
        results = [];
        for (let i = 0; i < toTranslateTexts.length; i++) {
            results.push(await translateText(toTranslateTexts[i], lang));
            await delay(100); // Super fast 100ms
        }
    }

    for (let i = 0; i < toTranslateKeys.length; i++) {
        const { page, key } = toTranslateKeys[i];
        data.static[page][key] = results[i];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`  Saved ${lang}.`);
    await delay(500); // Delay between languages
  }
  
  console.log('All static pages translated successfully!');
}

main();
