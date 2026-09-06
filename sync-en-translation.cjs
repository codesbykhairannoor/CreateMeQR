const fs = require('fs');
const path = require('path');

const enTransPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
const enTrans = JSON.parse(fs.readFileSync(enTransPath, 'utf8'));

if (!enTrans.static) enTrans.static = {};

const enStaticMeta = {
  about: {
    seoTitle: "About Us",
    seoDesc: "Democratizing document and QR tools with 100% client-side security and privacy.",
    desc: "Democratizing document and QR tools with 100% client-side security and privacy."
  },
  compare: {
    seoTitle: "Compare Tools",
    seoDesc: "Discover why professionals choose CreateMy-QR for private, client-side generation without API limits.",
    desc: "Discover why professionals choose CreateMy-QR for private, client-side generation without API limits."
  },
  languages: {
    seoTitle: "Supported Languages",
    seoDesc: "Create and scan QR codes and barcodes in 30 languages worldwide with instant client-side generation.",
    desc: "Create and scan QR codes and barcodes in 30 languages worldwide with instant client-side generation."
  },
  pricing: {
    seoTitle: "100% Free Pricing",
    seoDesc: "CreateMy-QR is 100% free with unlimited scans, high-resolution vector downloads, and zero limits.",
    desc: "CreateMy-QR is 100% free with unlimited scans, high-resolution vector downloads, and zero limits."
  },
  privacy: {
    seoTitle: "Privacy Policy",
    seoDesc: "Zero-tracking privacy policy. All data processing occurs locally in your browser memory.",
    desc: "Zero-tracking privacy policy. All data processing occurs locally in your browser memory."
  },
  security: {
    seoTitle: "Security Architecture",
    seoDesc: "Explore our zero-trust security model: 100% client-side cryptography, zero cloud transmission, zero data storage.",
    desc: "Explore our zero-trust security model: 100% client-side cryptography, zero cloud transmission, zero data storage."
  },
  terms: {
    seoTitle: "Terms of Service",
    seoDesc: "Terms and conditions for using CreateMy-QR free online generator and scanner tools.",
    desc: "Terms and conditions for using CreateMy-QR free online generator and scanner tools."
  },
  usecases: {
    seoTitle: "Industry Use Cases",
    seoDesc: "Explore real-world QR code use cases for restaurants, retail, events, payments, and enterprise operations.",
    desc: "Explore real-world QR code use cases for restaurants, retail, events, payments, and enterprise operations."
  },
  barcode: {
    seoTitle: "Free Barcode Generator",
    seoDesc: "Generate linear barcodes (EAN, UPC, Code 128, Code 39) instantly in your browser with high-res download.",
    desc: "Generate linear barcodes (EAN, UPC, Code 128, Code 39) instantly in your browser with high-res download."
  },
  scanqr: {
    seoTitle: "Scan QR Code Online",
    seoDesc: "Scan and decode QR codes from webcam or image files securely in your browser with instant client-side decoding.",
    desc: "Scan and decode QR codes from webcam or image files securely in your browser with instant client-side decoding."
  },
  scanbarcode: {
    seoTitle: "Scan Barcode Online",
    seoDesc: "Scan barcodes from camera or uploaded image files securely in your browser with zero server uploads.",
    desc: "Scan barcodes from camera or uploaded image files securely in your browser with zero server uploads."
  }
};

for (const [k, v] of Object.entries(enStaticMeta)) {
  if (!enTrans.static[k]) enTrans.static[k] = {};
  enTrans.static[k].seoTitle = v.seoTitle;
  enTrans.static[k].seoDesc = v.seoDesc;
  enTrans.static[k].desc = v.desc;
}

enTrans.templates = {
  toolTitleSuffix: "Free QR Code Generator",
  toolDescTemplate: "Create custom {{toolName}} QR codes with logo for free. Best editable QR code generator with no watermark. 100% private, client-side generation.",
  barcodeTitleSuffix: "Free Barcode Generator",
  barcodeDescTemplate: "Generate custom {{toolName}} linear barcodes for free. Instant SVG and PNG download with high-density barcode encoding.",
  homeSeoDesc: "Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO-compliant, 30 languages.",
  homeHeroTitle: "All QR & Barcode Tools",
  homeHeroTitleHighlight: "in One Place"
};

fs.writeFileSync(enTransPath, JSON.stringify(enTrans, null, 2), 'utf8');
console.log('✅ Injected static metadata and templates into English translation.json');
