const fs = require('fs');
const path = require('path');
const https = require('https');

let envConfig = {};
try {
  const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
  envFile.split('\n').forEach(line => {
    if (line && line.includes('=')) {
      const [key, ...value] = line.split('=');
      envConfig[key.trim()] = value.join('=').trim().replace(/^['"]|['"]$/g, '');
    }
  });
} catch(e) {}

const GOOGLE_API_KEY = envConfig.VITE_GOOGLE_TRANSLATE_API_KEY || process.env.VITE_GOOGLE_TRANSLATE_API_KEY;

const languages = [
  'en', 'id', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ru', 'ar', 
  'pt', 'it', 'hi', 'bn', 'ur', 'tr', 'vi', 'th', 'nl', 'pl', 
  'sv', 'fi', 'da', 'no', 'cs', 'el', 'he', 'ms', 'tl', 'uk'
];

function translateText(text, targetLang) {
  return new Promise((resolve) => {
    if (targetLang === 'en') return resolve(text);
    
    const postData = JSON.stringify({ q: text, target: targetLang, format: 'text' });
    const options = {
      hostname: 'translation.googleapis.com',
      path: `/language/translate/v2?key=${GOOGLE_API_KEY}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.data.translations[0].translatedText);
        } catch (e) { resolve(text); }
      });
    });
    req.on('error', () => resolve(text));
    req.write(postData);
    req.end();
  });
}

const enTexts = {
  nav: {
    scanGroup: "Scanner",
    scanqr: "Scan QR Code",
    scanbarcode: "Scan Barcode"
  },
  scanbarcode: {
    hero: {
      badge: "Cyber Scanner V1",
      title: "Instant",
      titleHighlight: "Barcode Scanner",
      desc: "Scan from your webcam or upload an image. 100% private, zero data is sent to our servers."
    },
    workspace: {
      initCam: "Initialize Camera",
      initCamDesc: "Scan a barcode using your device's camera",
      startBtn: "Start Scanning",
      cancelBtn: "Cancel",
      successTitle: "Scan Successful",
      scanAnother: "Scan Another Barcode",
      orUpload: "Or upload an image",
      uploadBtn: "Upload Barcode Image File",
      errorNoBarcode: "No barcode found in image. Please try another one."
    }
  },
  types: {
    scanbarcode: "Barcode Scanner"
  }
};

async function translateObj(obj, lang) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      result[key] = await translateObj(value, lang);
    } else {
      result[key] = await translateText(value, lang);
      console.log(`[${lang}] ${key}: ${result[key]}`);
    }
  }
  return result;
}

async function run() {
  for (const lang of languages) {
    const localePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    if (fs.existsSync(localePath)) {
      const translation = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
      
      console.log(`Translating for ${lang}...`);
      const newNav = await translateObj(enTexts.nav, lang);
      const newScanBarcode = await translateObj(enTexts.scanbarcode, lang);
      const newTypes = await translateObj(enTexts.types, lang);
      
      translation.nav = { ...translation.nav, ...newNav };
      translation.scanbarcode = newScanBarcode;
      translation.types = { ...translation.types, ...newTypes };
      
      fs.writeFileSync(localePath, JSON.stringify(translation, null, 2));
    }
  }
  console.log("Done translating!");
}

run();
