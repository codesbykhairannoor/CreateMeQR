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

const EN_DICT = {
  "scanqr": {
    "hero": {
      "badge": "Cyber Scanner V1",
      "title": "Instant",
      "titleHighlight": "QR Scanner",
      "desc": "Scan from your webcam or upload an image. 100% private, zero data is sent to our servers."
    },
    "workspace": {
      "initCam": "Initialize Camera",
      "initCamDesc": "Scan a QR code using your device's camera",
      "startBtn": "Start Scanning",
      "cancelBtn": "Cancel",
      "successTitle": "Scan Successful",
      "scanAnother": "Scan Another Code",
      "orUpload": "Or upload an image",
      "uploadBtn": "Upload QR Image File",
      "decodedResult": "Decoded Result",
      "copyBtn": "Copy Data",
      "copied": "Copied!",
      "openLink": "Open Link",
      "notLink": "Not a link",
      "waiting": "Waiting for scan...",
      "waitingDesc": "Point your camera at a QR code or upload an image.",
      "errCam": "Failed to start camera. Please ensure you have granted camera permissions.",
      "errImg": "No QR code found in the image. Please try another image."
    },
    "features": {
      "whyTitle": "Why use our Scanner?",
      "noAppTitle": "No App Required",
      "noAppDesc": "Scan QR codes directly from your browser without downloading any bloated apps. Works perfectly on iOS, Android, and Desktop.",
      "secureTitle": "100% Secure & Private",
      "secureDesc": "Your images and camera feed are processed entirely on your device. We never send your scan data to any external servers.",
      "fastTitle": "Lightning Fast",
      "fastDesc": "Optimized WASM engine decodes complex QR codes instantly, even in low light conditions or with blurry cameras.",
      "moreTitle": "More Than Just URLs.",
      "moreDesc": "Our advanced scanner instantly recognizes various payload types. It doesn't just read the text, it understands the context.",
      "moreList1": "WiFi Credentials Parsing",
      "moreList2": "vCard Contact Import",
      "moreList3": "Crypto Addresses",
      "formatTitle": "Universal Format Support",
      "formatDesc": "Upload an image containing any of these 2D barcodes, and we will decode it instantly right in your browser."
    }
  },
  "barcode": {
    "hero": {
      "badge": "Professional Barcode Tools",
      "title": "Generate",
      "titleHighlight": "Barcodes",
      "titleSuffix": "Instantly",
      "desc": "Create high-quality inventory tags, shipping labels, and retail codes in seconds."
    },
    "workspace": {
      "dataTitle": "Barcode Data",
      "contentLabel": "Barcode Content",
      "contentPlaceholder": "Enter numbers or text...",
      "formatLabel": "Barcode Standard / Format",
      "visualTitle": "Visual Tuning",
      "widthLabel": "Bar Width",
      "heightLabel": "Bar Height",
      "lineColor": "Line Color",
      "bgColor": "Background Color",
      "showText": "Show Text Value Below Code",
      "liveOutput": "Live Output",
      "enterData": "Enter data to generate",
      "download": "Download High-Res PNG"
    },
    "features": {
      "standardsTitle": "Supported Barcode Formats",
      "standardsDesc": "Choose the right standard for your industry. From retail checkout to warehouse logistics.",
      "c128Desc": "Highly compact and versatile. Supports the full ASCII character set. Ideal for general inventory and internal tracking systems.",
      "itf14Desc": "Designed for packaging levels like cartons or pallets. Uses thick borders to improve scanning accuracy on corrugated cardboard.",
      "upcDesc": "The global standard for point-of-sale retail. EAN-13 is used worldwide, while UPC-A is standard in North America.",
      "mfgTitle": "Built for Production & Logistics",
      "mfgDesc": "Our generator creates crisp, pixel-perfect PNG files that scale beautifully for print. We don't use fuzzy raster images—our engine renders pure SVG math before converting it to high-res PNG downloads.",
      "mfgList1": "Absolute Precision: No blurry edges.",
      "mfgList2": "Custom Padding: Safe zones for thermal printers.",
      "mfgList3": "100% Free: No subscriptions for basic generation.",
      "mfgBadge": "Factory Ready",
      "mfgBadgeDesc": "High contrast for laser scanners",
      "ecoTitle": "Perfect for E-Commerce & Retail",
      "ecoDesc": "Whether you are listing a new product on Amazon (FBA) or setting up your own Shopify storefront, generating UPC and EAN codes is required for global distribution.",
      "btnUpc": "Generate UPC Code Now",
      "btnEan": "Generate EAN-13 Code Now"
    }
  }
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  const localesDir = path.join(__dirname, 'public', 'locales');
  
  // Flatten EN_DICT to simple array of paths and values
  const flatDict = [];
  function flatten(obj, prefix = '') {
    for (const k in obj) {
      if (typeof obj[k] === 'string') {
        flatDict.push({ path: prefix + k, text: obj[k] });
      } else {
        flatten(obj[k], prefix + k + '.');
      }
    }
  }
  flatten(EN_DICT);
  
  console.log(`Starting translation for ${LANGS.length} languages. Total strings per lang: ${flatDict.length}`);
  
  // Write EN first
  const enPath = path.join(localesDir, 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  enData.scanqr = EN_DICT.scanqr;
  enData.barcode = EN_DICT.barcode;
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

  for (const lang of LANGS) {
    const tl = codeMap[lang] || lang;
    console.log(`Translating ${lang}...`);
    
    const filePath = path.join(localesDir, lang, 'translation.json');
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.scanqr && data.barcode) {
      console.log(`Skipping ${lang} - already translated`);
      continue;
    }
    
    const textsToTranslate = flatDict.map(item => item.text);
    const combinedText = textsToTranslate.join(' ||| ');
    
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combinedText)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed');
      const apiData = await res.json();
      
      let translated = '';
      for (const chunk of apiData[0]) {
        translated += chunk[0];
      }
      
      const splitTranslated = translated.split(/\s*\|\|\|\s*/);
      
      if (splitTranslated.length !== textsToTranslate.length) {
        console.error(`Mismatch in ${lang}: got ${splitTranslated.length} instead of ${textsToTranslate.length}`);
        // Fallback to English
        data.scanqr = EN_DICT.scanqr;
        data.barcode = EN_DICT.barcode;
      } else {
        // Reconstruct
        data.scanqr = {};
        data.barcode = {};
        
        for (let i = 0; i < flatDict.length; i++) {
          const p = flatDict[i].path.split('.');
          const root = p[0];
          const section = p[1];
          const key = p[2];
          
          if (!data[root][section]) data[root][section] = {};
          data[root][section][key] = splitTranslated[i];
        }
      }
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Saved ${lang}`);
      await delay(1000); // Prevent rate limit
    } catch (err) {
      console.error(`Error translating ${lang}:`, err.message);
    }
  }
  
  console.log('All done!');
}

run();
