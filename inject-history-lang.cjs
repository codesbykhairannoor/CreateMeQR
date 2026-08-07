const fs = require('fs');
const path = require('path');
const langs = ['ar','bn','cs','da','de','el','en','es','fi','fr','hi','hu','id','it','ja','ko','ms','nl','no','pl','pt','ro','ru','sv','th','tl','tr','uk','vi','zh'];

const enTranslations = {
  title: 'Local History',
  empty: 'No QR codes saved yet.',
  clear: 'Clear History',
  disclaimer: 'Your QR codes are saved locally on this device and are never sent to our servers.',
  saveBtn: 'Save to Browser History',
  saved: 'Saved to history!',
  savedAt: 'Saved at',
  loadBtn: 'Restore'
};

async function translateText(text, targetLang) {
  if (targetLang === 'en') return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    let translated = '';
    data[0].forEach(t => { translated += t[0]; });
    return translated;
  } catch (e) {
    console.error('Translation failed for', targetLang, text);
    return text;
  }
}

async function run() {
  for (const lang of langs) {
    console.log('Processing', lang);
    const fp = path.join('public', 'locales', lang, 'translation.json');
    const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
    
    json.history = {};
    for (const key in enTranslations) {
      json.history[key] = await translateText(enTranslations[key], lang);
    }
    
    fs.writeFileSync(fp, JSON.stringify(json, null, 2));
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('Done!');
}
run();
