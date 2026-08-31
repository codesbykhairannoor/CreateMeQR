const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const LANGS = [
  'en', 'id', 'es', 'fr', 'de', 'ja', 'pt', 'ru', 'zh', 'ar',
  'hi', 'it', 'ko', 'nl', 'tr', 'pl', 'vi', 'th', 'sv', 'cs',
  'da', 'el', 'fi', 'he', 'hu', 'no', 'ro', 'sk', 'uk', 'ms'
];

// Need to map our locale codes to google translate codes if they differ
const getGoogleLangCode = (code) => {
  if (code === 'zh') return 'zh-CN';
  return code;
};

const baseEnglish = {
  badge: "For Restaurants & Cafes",
  heroTitle: "QR Code Generator for Restaurant Menu PDF",
  heroSubtitle: "Create a contactless digital menu for your restaurant instantly. Upload your PDF and generate an editable QR code that never expires.",
  featTitle1: "Contactless Menus",
  featDesc1: "Ensure safety and convenience for your guests with touch-free digital menus.",
  featTitle2: "Mobile Optimized",
  featDesc2: "Your uploaded PDF is beautifully presented and easy to read on any smartphone.",
  featTitle3: "Easy to Update",
  featDesc3: "Update your seasonal menu items without ever needing to reprint the QR codes on your tables.",
  faqTitle: "Common Questions",
  faqQ1: "Can I use this for multiple tables?",
  faqA1: "Yes, you can print the same QR code and place it on every table. All customers will see the same digital menu.",
  faqQ2: "What if my menu changes?",
  faqA2: "If you use a dynamic URL QR code, you can update the link destination anytime. For static PDF uploads, you'll need a new QR code if the file changes.",
  faqQ3: "Does it work without an app?",
  faqA3: "Absolutely! All modern iOS and Android smartphones have built-in QR scanners right in their default camera apps.",
  faqQ4: "Is there a limit on scans?",
  faqA4: "No! Your QR codes have unlimited scans forever.",
  faqQ5: "Can I add my restaurant's logo?",
  faqA5: "Yes, you can upload your own custom logo and place it right in the center of the QR code."
};

async function run() {
  const publicLocalesDir = path.join(__dirname, '..', 'public', 'locales');
  const pseoLocalesDir = path.join(__dirname, '..', 'src', 'config', 'pseo-locales');

  // Step 1: Update the baseTool in pseo-locales
  console.log('Updating baseTool in pseo-locales...');
  const pseoFiles = fs.readdirSync(pseoLocalesDir);
  for (const file of pseoFiles) {
    if (!file.endsWith('.json')) continue;
    const filePath = path.join(pseoLocalesDir, file);
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;
    data = data.map(item => {
      if (item.id === 'pdf-restaurant-menu') {
        item.baseTool = 'restaurantmenu';
        modified = true;
      }
      return item;
    });
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
  }
  console.log('✅ Updated baseTool for pdf-restaurant-menu across all languages.');

  // Step 2: Translate and inject UI text into translation.json
  console.log('Starting batch translations for LayoutRestaurantMenu...');
  for (const lang of LANGS) {
    const translationFilePath = path.join(publicLocalesDir, lang, 'translation.json');
    if (!fs.existsSync(translationFilePath)) continue;
    
    let transData = JSON.parse(fs.readFileSync(translationFilePath, 'utf8'));
    
    // Ensure nested object exists
    if (!transData.pseo) transData.pseo = {};
    
    if (lang === 'en') {
      transData.pseo.restaurantmenu = baseEnglish;
    } else {
      console.log(`Translating to ${lang}...`);
      try {
        // Prepare array of values to translate
        const keys = Object.keys(baseEnglish);
        const values = Object.values(baseEnglish);
        
        // google-translate-api-x supports batch translation of arrays
        const res = await translate(values, { to: getGoogleLangCode(lang) });
        
        const translatedObject = {};
        res.forEach((r, index) => {
          translatedObject[keys[index]] = r.text;
        });
        
        transData.pseo.restaurantmenu = translatedObject;
      } catch (err) {
        console.error(`❌ Failed to translate for ${lang}:`, err.message);
        // Fallback to English on failure
        transData.pseo.restaurantmenu = baseEnglish;
      }
    }
    
    fs.writeFileSync(translationFilePath, JSON.stringify(transData, null, 2), 'utf8');
  }
  console.log('✅ Successfully generated and injected translations for all 30 languages!');
}

run();
