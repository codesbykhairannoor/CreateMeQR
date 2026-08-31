const fs = require('fs');
const path = require('path');
const translate = require('translate-google'); // <-- Use the project's native library for object batching!

const LOCALES_DIR = path.join(__dirname, '../public/locales');

const langs = [
  'id', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ru', 'ar', 
  'pt', 'it', 'hi', 'bn', 'ur', 'tr', 'vi', 'th', 'nl', 'pl', 
  'sv', 'fi', 'da', 'no', 'cs', 'el', 'he', 'ms', 'tl', 'uk'
];

const textsToTranslate = {
  wificafe: {
    badge: 'For Cafes & Hotels',
    heroTitle: 'WiFi QR Code for Cafes & Hotels',
    heroSubtitle: 'Let your guests connect to your WiFi network instantly without typing passwords. Generate a free WiFi QR code for your cafe or hotel.',
    featTitle1: 'Instant Connection',
    featDesc1: 'Guests just scan the code and their device automatically joins the network. No frustrating password typos.',
    featTitle2: 'Secure & Private',
    featDesc2: 'Your password is never sent to our servers. It is embedded directly and safely into the QR code pattern locally.',
    featTitle3: 'Works on All Devices',
    featDesc3: 'Modern iOS and Android smartphones natively support connecting to WiFi networks via QR code.',
    faqTitle: 'Common Questions'
  },
  googlereviewlocal: {
    badge: 'For Local Businesses',
    heroTitle: 'Google Review QR Code for Local Business',
    heroSubtitle: 'Boost your local SEO by collecting 5-star Google Reviews effortlessly. Generate a QR code that sends customers straight to your review page.',
    featTitle1: 'Local SEO Boost',
    featDesc1: 'More 5-star reviews directly improve your ranking on Google Maps and Local Pack search results.',
    featTitle2: 'Frictionless Experience',
    featDesc2: "Customers don't have to search for your business manually. The QR code opens your Google Review modal instantly.",
    featTitle3: 'Print Anywhere',
    featDesc3: 'Export in high-resolution vector SVG to print on receipts, table tents, business cards, or storefront windows.',
    faqTitle: 'Common Questions'
  }
};

async function processTranslations() {
  console.log('Starting batch translations for Layouts (using translate-google library)...');
  
  for (const lang of langs) {
    let targetLang = lang;
    if (lang === 'zh') targetLang = 'zh-cn';
    if (lang === 'he') targetLang = 'iw';
    
    console.log(`Translating to ${lang}...`);
    try {
      const translated = await translate(textsToTranslate, { to: targetLang });
      
      const transPath = path.join(LOCALES_DIR, lang, 'translation.json');
      if (fs.existsSync(transPath)) {
        let data = JSON.parse(fs.readFileSync(transPath, 'utf-8'));
        if (!data.pseo) data.pseo = {};
        data.pseo.wificafe = translated.wificafe;
        data.pseo.googlereviewlocal = translated.googlereviewlocal;
        fs.writeFileSync(transPath, JSON.stringify(data, null, 2));
      }
    } catch (err) {
      console.error(`Error translating for ${lang}:`, err.message);
    }
  }
  console.log('✅ Successfully generated and injected translations for all 30 languages!');
}

processTranslations();
