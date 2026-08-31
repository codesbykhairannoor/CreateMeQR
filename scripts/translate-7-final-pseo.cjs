const fs = require('fs');
const path = require('path');
const translate = require('translate-google'); // NATIVE LIBRARY BIAR CEPET!

const LOCALES_DIR = path.join(__dirname, '../public/locales');
const PSEO_DIR = path.join(__dirname, '../src/config/pseo-locales');

const langs = [
  'id', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ru', 'ar', 
  'pt', 'it', 'hi', 'bn', 'ur', 'tr', 'vi', 'th', 'nl', 'pl', 
  'sv', 'fi', 'da', 'no', 'cs', 'el', 'he', 'ms', 'tl', 'uk'
];

const toolsToUpdate = {
  'vcard-real-estate': 'vcardrealestate',
  'url-event-tickets': 'urleventtickets',
  'whatsapp-customer-support': 'whatsappsupport',
  'payment-paypal-donation': 'paypaldonation',
  'email-newsletter-signup': 'emailsignup',
  'appstore-game-download': 'appstoregame',
  'youtube-product-manual': 'youtubemanual'
};

const textsToTranslate = {
  vcardrealestate: {
    badge: 'For Real Estate',
    heroTitle: 'vCard QR Code for Real Estate Agents',
    heroSubtitle: 'Never lose a lead again. Create a digital vCard QR code for your real estate business cards and open house brochures.',
    featTitle1: 'Instant Contacts',
    featDesc1: 'Clients scan your code and instantly save your contact details to their phone.',
    featTitle2: 'Offline Ready',
    featDesc2: 'Your contact info is embedded in the QR itself, no internet connection required.',
    featTitle3: 'High Conversions',
    featDesc3: 'Make it frictionless for open-house visitors to reach out to you later.',
    faqTitle: 'Common Questions'
  },
  urleventtickets: {
    badge: 'For Events',
    heroTitle: 'URL QR Code for Event Tickets & Registration',
    heroSubtitle: 'Boost event attendance by linking physical flyers to your digital ticketing page.',
    featTitle1: 'Boost Sales',
    featDesc1: 'Turn offline flyers into instant online sales.',
    featTitle2: 'Track Attendance',
    featDesc2: 'Use UTM tags to track which posters generate the most scans.',
    featTitle3: 'No Limits',
    featDesc3: 'Unlimited scans, completely free, no expiration dates.',
    faqTitle: 'Common Questions'
  },
  whatsappsupport: {
    badge: 'For Support Teams',
    heroTitle: 'WhatsApp QR Code for Customer Support',
    heroSubtitle: 'Generate a WhatsApp QR code that opens a direct chat with your support team.',
    featTitle1: 'Instant Support',
    featDesc1: 'Customers scan and chat immediately, no need to save your number.',
    featTitle2: 'Pre-filled Messages',
    featDesc2: 'Set a default message to reduce friction for the user.',
    featTitle3: 'Universal',
    featDesc3: 'Works perfectly on standard WhatsApp and WhatsApp Business.',
    faqTitle: 'Common Questions'
  },
  paypaldonation: {
    badge: 'For Charities',
    heroTitle: 'PayPal QR Code for Non-Profits & Donations',
    heroSubtitle: 'Make fundraising frictionless. Generate a PayPal QR code to accept instant donations at charity events.',
    featTitle1: 'Frictionless',
    featDesc1: 'Donors scan and pay immediately using their saved PayPal accounts.',
    featTitle2: 'Secure',
    featDesc2: "Transactions happen inside PayPal's encrypted environment.",
    featTitle3: 'No Hidden Fees',
    featDesc3: 'We charge zero commission. Only standard PayPal fees apply.',
    faqTitle: 'Common Questions'
  },
  emailsignup: {
    badge: 'For Marketing',
    heroTitle: 'Email QR Code for Newsletter Signups',
    heroSubtitle: 'Grow your email list from physical locations. Generate an Email QR code that pre-fills a subscription request.',
    featTitle1: 'Pre-filled Content',
    featDesc1: 'Automatically drafts an email with your chosen subject and body text.',
    featTitle2: 'Native Apps',
    featDesc2: "Opens the user's default mail client like Apple Mail or Gmail automatically.",
    featTitle3: 'Capture Leads',
    featDesc3: 'Perfect for retail checkout counters or trade show booths.',
    faqTitle: 'Common Questions'
  },
  appstoregame: {
    badge: 'For Game Devs',
    heroTitle: 'App Store QR Code for Mobile Games',
    heroSubtitle: 'Drive app installs directly from out-of-home advertising. Link straight to the App Store.',
    featTitle1: 'Boost Installs',
    featDesc1: 'Turn physical ads into digital downloads instantly.',
    featTitle2: 'Direct Routing',
    featDesc2: 'Bypass the web browser and open the native App Store directly.',
    featTitle3: 'Trackable',
    featDesc3: 'Use attribution links like AppsFlyer to track your scan metrics.',
    faqTitle: 'Common Questions'
  },
  youtubemanual: {
    badge: 'For Products',
    heroTitle: 'YouTube Video QR Code for Product Manuals',
    heroSubtitle: 'Replace confusing paper manuals with video tutorials.',
    featTitle1: 'Visual Learning',
    featDesc1: 'Help customers troubleshoot visually to reduce support tickets.',
    featTitle2: 'Timestamp Links',
    featDesc2: 'Link directly to specific moments in the video using ?t= parameter.',
    featTitle3: 'Unlisted Videos',
    featDesc3: 'Works perfectly with private or unlisted instructional videos.',
    faqTitle: 'Common Questions'
  }
};

async function processTranslations() {
  console.log('Updating baseTool in pseo-locales...');
  
  // Update baseTool in all pseo-locales JSON files
  const pseoFiles = fs.readdirSync(PSEO_DIR).filter(f => f.endsWith('.json'));
  for (const file of pseoFiles) {
    const fp = path.join(PSEO_DIR, file);
    let data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
    let modified = false;
    for (const entry of data) {
      if (toolsToUpdate[entry.id]) {
        entry.baseTool = toolsToUpdate[entry.id];
        modified = true;
      }
    }
    if (modified) {
      fs.writeFileSync(fp, JSON.stringify(data, null, 2));
    }
  }
  console.log('✅ Updated baseTool for 7 tools across all languages.');

  // Generate for English immediately
  const transPathEn = path.join(LOCALES_DIR, 'en', 'translation.json');
  if (fs.existsSync(transPathEn)) {
    let dataEn = JSON.parse(fs.readFileSync(transPathEn, 'utf-8'));
    if (!dataEn.pseo) dataEn.pseo = {};
    for (const key of Object.keys(textsToTranslate)) {
      dataEn.pseo[key] = textsToTranslate[key];
    }
    fs.writeFileSync(transPathEn, JSON.stringify(dataEn, null, 2));
  }

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
        for (const key of Object.keys(textsToTranslate)) {
          data.pseo[key] = translated[key];
        }
        fs.writeFileSync(transPath, JSON.stringify(data, null, 2));
      }
    } catch (err) {
      console.error(`Error translating for ${lang}:`, err.message);
    }
  }
  console.log('✅ Successfully generated and injected translations for 7 tools across 30 languages!');
}

processTranslations();
