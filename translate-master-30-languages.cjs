const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const LANG_MAP = {
  'id': 'id',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'pt': 'pt',
  'zh': 'zh-CN',
  'ja': 'ja',
  'hi': 'hi',
  'ko': 'ko',
  'ar': 'ar',
  'ru': 'ru',
  'it': 'it',
  'tr': 'tr',
  'nl': 'nl',
  'pl': 'pl',
  'vi': 'vi',
  'th': 'th',
  'sv': 'sv',
  'da': 'da',
  'fi': 'fi',
  'el': 'el',
  'cs': 'cs',
  'hu': 'hu',
  'ro': 'ro',
  'uk': 'uk',
  'ms': 'ms',
  'tl': 'tl',
  'bn': 'bn',
  'no': 'no'
};

const staticPagesSource = {
  about: {
    seoTitle: "About Us",
    seoDesc: "Democratizing document and QR tools with 100% client-side security and privacy."
  },
  compare: {
    seoTitle: "Compare Tools",
    seoDesc: "Discover why professionals choose CreateMy-QR for private, client-side generation without API limits."
  },
  languages: {
    seoTitle: "Supported Languages",
    seoDesc: "Create and scan QR codes and barcodes in 30 languages worldwide with instant client-side generation."
  },
  pricing: {
    seoTitle: "100% Free Pricing",
    seoDesc: "CreateMy-QR is 100% free with unlimited scans, high-resolution vector downloads, and zero limits."
  },
  privacy: {
    seoTitle: "Privacy Policy",
    seoDesc: "Zero-tracking privacy policy. All data processing occurs locally in your browser memory."
  },
  security: {
    seoTitle: "Security Architecture",
    seoDesc: "Explore our zero-trust security model: 100% client-side cryptography, zero cloud transmission, zero data storage."
  },
  terms: {
    seoTitle: "Terms of Service",
    seoDesc: "Terms and conditions for using CreateMy-QR free online generator and scanner tools."
  },
  usecases: {
    seoTitle: "Industry Use Cases",
    seoDesc: "Explore real-world QR code use cases for restaurants, retail, events, payments, and enterprise operations."
  },
  barcode: {
    seoTitle: "Free Barcode Generator",
    seoDesc: "Generate linear barcodes (EAN, UPC, Code 128, Code 39) instantly in your browser with high-res download."
  },
  scanqr: {
    seoTitle: "Scan QR Code Online",
    seoDesc: "Scan and decode QR codes from webcam or image files securely in your browser with instant client-side decoding."
  },
  scanbarcode: {
    seoTitle: "Scan Barcode Online",
    seoDesc: "Scan barcodes from camera or uploaded image files securely in your browser with zero server uploads."
  }
};

const templatesSource = [
  "Free QR Code Generator",
  "Create custom {{toolName}} QR codes with logo for free. Best editable QR code generator with no watermark. 100% private, client-side generation.",
  "Free Barcode Generator",
  "Generate custom {{toolName}} linear barcodes for free. Instant SVG and PNG download with high-density barcode encoding.",
  "Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO-compliant, 30 languages.",
  "All QR & Barcode Tools",
  "in One Place"
];

const localesDir = path.join(__dirname, 'public', 'locales');

async function run() {
  console.log('🚀 Starting Full 30-Language Batch Translation Engine via google-translate-api-x...\n');

  // Prepare static list of strings to translate in 1 single batch per language
  const staticKeys = Object.keys(staticPagesSource);
  const staticStrings = [];
  for (const k of staticKeys) {
    staticStrings.push(staticPagesSource[k].seoTitle);
    staticStrings.push(staticPagesSource[k].seoDesc);
  }

  const allStringsToTranslate = [...staticStrings, ...templatesSource];
  console.log(`Total strings in batch per language: ${allStringsToTranslate.length}`);

  const localizedTemplates = {
    en: {
      toolTitleSuffix: "Free QR Code Generator",
      toolDescTemplate: "Create custom {{toolName}} QR codes with logo for free. Best editable QR code generator with no watermark. 100% private, client-side generation.",
      barcodeTitleSuffix: "Free Barcode Generator",
      barcodeDescTemplate: "Generate custom {{toolName}} linear barcodes for free. Instant SVG and PNG download with high-density barcode encoding.",
      homeSeoDesc: "Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO-compliant, 30 languages.",
      homeHeroTitle: "All QR & Barcode Tools",
      homeHeroTitleHighlight: "in One Place"
    }
  };

  for (const [langCode, googleLang] of Object.entries(LANG_MAP)) {
    console.log(`Translating [${langCode}] (${googleLang})...`);
    try {
      const res = await translate(allStringsToTranslate, { from: 'en', to: googleLang });
      const translatedTexts = res.map(r => r.text);

      // Parse static pages translations
      const staticTrans = {};
      let idx = 0;
      for (const k of staticKeys) {
        staticTrans[k] = {
          seoTitle: translatedTexts[idx++],
          seoDesc: translatedTexts[idx++],
          desc: translatedTexts[idx - 1] // also store as desc for compatibility
        };
      }

      // Parse templates
      localizedTemplates[langCode] = {
        toolTitleSuffix: translatedTexts[idx++],
        toolDescTemplate: translatedTexts[idx++],
        barcodeTitleSuffix: translatedTexts[idx++],
        barcodeDescTemplate: translatedTexts[idx++],
        homeSeoDesc: translatedTexts[idx++],
        homeHeroTitle: translatedTexts[idx++],
        homeHeroTitleHighlight: translatedTexts[idx++]
      };

      // Load existing translation.json and inject translated keys
      const transPath = path.join(localesDir, langCode, 'translation.json');
      let trans = {};
      if (fs.existsSync(transPath)) {
        trans = JSON.parse(fs.readFileSync(transPath, 'utf8'));
      }

      if (!trans.static) trans.static = {};
      for (const [k, v] of Object.entries(staticTrans)) {
        if (!trans.static[k]) trans.static[k] = {};
        trans.static[k].seoTitle = v.seoTitle;
        trans.static[k].seoDesc = v.seoDesc;
        trans.static[k].desc = v.desc;
      }

      if (!trans.home) trans.home = {};
      trans.home.seoDesc = localizedTemplates[langCode].homeSeoDesc;
      trans.home.heroTitle = localizedTemplates[langCode].homeHeroTitle;
      trans.home.heroTitleHighlight = localizedTemplates[langCode].homeHeroTitleHighlight;

      if (!trans.templates) trans.templates = {};
      trans.templates = localizedTemplates[langCode];

      fs.writeFileSync(transPath, JSON.stringify(trans, null, 2), 'utf8');
      console.log(`✅ [${langCode}] Injected 11 static SEO keys + 7 templates.`);
    } catch (err) {
      console.error(`❌ Error translating to [${langCode}]:`, err.message);
    }
  }

  // Save the master localizedTemplates to src/config/localizedTemplates.json
  const templatesOutPath = path.join(__dirname, 'src', 'config', 'localizedTemplates.json');
  fs.writeFileSync(templatesOutPath, JSON.stringify(localizedTemplates, null, 2), 'utf8');
  console.log(`\n💾 Saved master localized templates to src/config/localizedTemplates.json`);

  console.log('\n🎉 Master 30-Language Translation Complete!');
}

run();
