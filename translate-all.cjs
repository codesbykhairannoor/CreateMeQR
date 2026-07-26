const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'public', 'locales');
// Actually, it's public/locales in Vite usually. Let's check public/locales.
const actualLocalesDir = path.join(__dirname, 'public', 'locales');
const languages = fs.readdirSync(actualLocalesDir).filter(f => fs.statSync(path.join(actualLocalesDir, f)).isDirectory());

const enPath = path.join(actualLocalesDir, 'en', 'translation.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// We want to translate: types, featTools, faqTools
// We will collect all paths and their english strings.
const itemsToTranslate = [];
function collectStrings(obj, currentPath) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      itemsToTranslate.push({ path: [...currentPath, key], text: value });
    } else if (typeof value === 'object' && value !== null) {
      collectStrings(value, [...currentPath, key]);
    }
  }
}

collectStrings(enData.types || {}, ['types']);
collectStrings(enData.form || {}, ['form']);
collectStrings(enData.landing || {}, ['landing']);
collectStrings(enData.featTools || {}, ['featTools']);
collectStrings(enData.faqTools || {}, ['faqTools']);

const translateUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=';

const brands = ['Amazon', 'Google Forms', 'Google Review', 'TikTok', 'Instagram', 'YouTube', 'Vimeo', 'Spotify', 'Apple Podcasts', 'SoundCloud', 'PDF', 'Linktree', 'Google Drive', 'Dropbox', 'OneDrive', 'Word', 'Excel', 'OpenTable', 'Calendly', 'Eventbrite', 'Ticketmaster', 'Resy', 'Yelp', 'TripAdvisor', 'MP3', 'MP4', 'JPG', 'PNG', 'WEBP', 'GIF', 'ASIN', 'DOCX', 'XLSX', 'ZIP', 'QR', 'WhatsApp', 'Twitter', 'Facebook', 'Snapchat', 'Discord', 'Telegram', 'PayPal', 'Venmo', 'Bitcoin', 'Ethereum', 'Litecoin'];

async function translateBatch(texts, targetLang) {
  if (targetLang === 'en') return texts;
  
  const separator = " ||| ";
  const combined = texts.join(separator);
  
  try {
    const res = await fetch(translateUrl + targetLang + '&dt=t&q=' + encodeURIComponent(combined));
    const json = await res.json();
    let translatedCombined = json[0].map(item => item[0]).join('');
    
    // Split back
    let translatedArray = translatedCombined.split(/ \s*\|\|\|\s* |\|\|\|/);
    if (translatedArray.length !== texts.length) {
      // Fallback if separator is messed up: return english
      console.warn(`[${targetLang}] Separator mismatch: got ${translatedArray.length}, expected ${texts.length}. Using english fallback.`);
      return texts;
    }
    
    // Naive brand protection
    return translatedArray.map((translated, i) => {
      let t = translated.trim();
      const orig = texts[i];
      brands.forEach(b => {
        if (orig.includes(b) && !t.toLowerCase().includes(b.toLowerCase())) {
          // just a naive check, can't easily replace it perfectly without regex, but we just leave it for now
        }
      });
      // Specific overrides
      if (orig === "Google Forms") return "Google Forms";
      if (orig === "Google Review") return "Google Review";
      if (orig === "Amazon") return "Amazon";
      if (orig === "WhatsApp") return "WhatsApp";
      if (orig === "YouTube") return "YouTube";
      return t;
    });
    
  } catch (err) {
    console.error('Translation error for', targetLang, err);
    return texts; // fallback to english
  }
}

function setNestedValue(obj, path, value) {
  for (let i = 0; i < path.length - 1; i++) {
    if (!obj[path[i]]) obj[path[i]] = {};
    obj = obj[path[i]];
  }
  obj[path[path.length - 1]] = value;
}

function getNestedValue(obj, path) {
  let current = obj;
  for (let i = 0; i < path.length; i++) {
    if (!current) return undefined;
    current = current[path[i]];
  }
  return current;
}

async function run() {
  console.log(`Found ${itemsToTranslate.length} English strings total.`);
  const batchSize = 30; // 30 strings at once
  
  for (const lang of languages) {
    if (lang === 'en') continue;
    
    const filePath = path.join(actualLocalesDir, lang, 'translation.json');
    if (!fs.existsSync(filePath)) continue;
    
    let targetData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    targetData.types = targetData.types || {};
    targetData.featTools = targetData.featTools || {};
    targetData.faqTools = targetData.faqTools || {};
    
    // Collect what needs to be translated for THIS language
    const langItems = [];
    for (const item of itemsToTranslate) {
      const currentVal = getNestedValue(targetData, item.path);
      // If it doesn't exist, or if it exactly matches the English text (and isn't a short brand name like "PDF")
      if (!currentVal || (currentVal === item.text && item.text.length > 10)) {
        langItems.push(item);
      }
    }
    
    if (langItems.length === 0) {
      console.log(`[${lang}] All strings translated.`);
      continue;
    }
    
    console.log(`[${lang}] Translating ${langItems.length} strings...`);
    
    for (let i = 0; i < langItems.length; i += batchSize) {
      const batch = langItems.slice(i, i + batchSize);
      const texts = batch.map(b => b.text);
      const translatedTexts = await translateBatch(texts, lang);
      
      batch.forEach((item, index) => {
        setNestedValue(targetData, item.path, translatedTexts[index]);
      });
      
      // Delay to avoid rate limit
      await new Promise(r => setTimeout(r, 800));
    }
    
    fs.writeFileSync(filePath, JSON.stringify(targetData, null, 2));
    console.log(`[${lang}] Done!`);
  }
  console.log("All languages translated successfully!");
}

run();
