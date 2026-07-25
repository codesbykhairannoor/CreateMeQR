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

const baseStrings = {
  title: "{{tool}} QR Code Generator - Free & Custom",
  h1: "Free {{tool}} QR Code Generator",
  description: "Create a custom {{tool}} QR Code with logo, color, and design. 100% free, no signup, and no expiration."
};

async function batchTranslate(texts, targetLang) {
  const tl = codeMap[targetLang] || targetLang;
  // Replace {{tool}} with a safe placeholder that Google Translate won't mangle
  const safeTexts = texts.map(t => t.replace(/\{\{tool\}\}/g, 'XYZTOOLXYZ'));
  
  const delimiter = ' ||| ';
  const combinedText = safeTexts.join(delimiter);
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combinedText)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    
    let translated = '';
    for (const chunk of data[0]) translated += chunk[0];
    
    const splitTranslated = translated.split(/\s*\|\|\|\s*/);
    if (splitTranslated.length !== texts.length) return null;
    
    // Restore the {{tool}} placeholder
    return splitTranslated.map(t => t.replace(/XYZTOOLXYZ/gi, '{{tool}}'));
  } catch (err) {
    return null;
  }
}

async function main() {
  const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  enData.seoTool = baseStrings;
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
  console.log('✅ Updated EN translation.json');

  const keys = Object.keys(baseStrings);
  const originalTexts = keys.map(k => baseStrings[k]);

  for (const lang of LANGS) {
    console.log(`Processing ${lang}...`);
    const filePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Always translate if missing
    if (!data.seoTool || data.seoTool.h1 === baseStrings.h1) {
      console.log(`  Translating seoTool for ${lang}...`);
      const translatedTexts = await batchTranslate(originalTexts, lang);
      
      if (translatedTexts) {
         data.seoTool = {};
         for (let i = 0; i < keys.length; i++) {
           data.seoTool[keys[i]] = translatedTexts[i];
         }
         fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
         console.log(`  ✅ Saved ${lang}.`);
      } else {
         console.log(`  ❌ Failed batch for ${lang}`);
      }
      await delay(1000);
    } else {
      console.log(`  ⏭️  ${lang} seoTool is already translated.`);
    }
  }
  
  console.log('🚀 ALL DONE! SEO Tool Strings Translated!');
}

main();
