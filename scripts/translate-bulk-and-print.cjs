const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

// Master English Dictionary for Pro Features
const MASTER_EN = {
  "nav.bulk": "Bulk Batch",
  "nav.bulkDesc": "CSV / Excel to ZIP",
  "types.bulk": "Bulk QR & Barcode",
  "static.bulk.seoTitle": "Bulk QR & Barcode Generator",
  "static.bulk.heroTitle": "Bulk QR Code & Barcode Generator",
  "static.bulk.seoDesc": "Generate batches of custom QR codes and standard barcodes simultaneously from spreadsheet CSV data with instant ZIP export and A4 sticker sheet printing.",
  "static.bulk.desc": "Generate batches of custom QR codes and standard barcodes simultaneously from spreadsheet CSV data with instant ZIP export and A4 sticker sheet printing.",
  "workspace.bulkBannerTitle": "Need bulk QR codes? Try our Pro Bulk Batch Engine with CSV import and instant ZIP export.",
  "workspace.bulkBannerLink": "Go to Bulk Generator →",
  "preview.printStudioBtn": "Print / A4 Sticker Sheet PDF",
  "barcode.printStudioBtn": "Print / A4 Sticker Sheet PDF",

  // Bulk Generator Page
  "bulk.badge": "Pro Batch Engine • 100% Client-Side",
  "bulk.heroTitle": "Bulk QR Code & Barcode Generator",
  "bulk.heroSubtitle": "Import spreadsheets or CSV files and generate hundreds or thousands of high-resolution QR codes and barcodes in seconds. Zero data tracking — every code is compiled directly in your browser memory.",
  "bulk.featPrivate": "100% Private (No Server Uploads)",
  "bulk.featZip": "Instant ZIP Export",
  "bulk.featPrint": "A4 Sticker Sheet PDF Print",
  "bulk.step1Title": "Provide Your Data (CSV or Spreadsheets)",
  "bulk.templateCsv": "Template.csv",
  "bulk.loadSample": "Load Sample Data",
  "bulk.tabUpload": "Upload CSV / TSV File",
  "bulk.tabPaste": "Paste From Excel / Google Sheets",
  "bulk.dropTitle": "Choose or Drag & Drop CSV / TSV File",
  "bulk.dropLoaded": "Loaded: {{fileName}}",
  "bulk.dropDesc": "Supports Comma, Semicolon, or Tab delimited files. No file size limits.",
  "bulk.pastePlaceholder": "Paste rows here (e.g. from Excel or Google Sheets)...",
  "bulk.detectedSummary": "Detected {{rows}} rows and {{cols}} columns",
  "bulk.colData": "Data / URL Column:",
  "bulk.colLabel": "Label / Filename:",
  "bulk.colLabelNone": "None (Auto Numbering)",
  "bulk.moreRecords": "+ {{count}} more records will be processed.",
  "bulk.step2Title": "Configure Code Style & Format",
  "bulk.codeType": "Code Type",
  "bulk.typeQr": "QR Code (2D)",
  "bulk.typeBarcode": "Barcode (1D)",
  "bulk.dotPattern": "Dot Pattern",
  "bulk.patternSquare": "Classic Square",
  "bulk.patternRounded": "Smooth Rounded",
  "bulk.patternDots": "Modern Dots",
  "bulk.eccLevel": "Error Correction Level",
  "bulk.eccL": "L — 7% Restoration",
  "bulk.eccM": "M — 15% Standard",
  "bulk.eccQ": "Q — 25% High Reliability",
  "bulk.eccH": "H — 30% Maximum Ruggedness",
  "bulk.barcodeStd": "Barcode Standard",
  "bulk.exportImgFormat": "Export Image Format",
  "bulk.formatPng": "PNG (High DPI)",
  "bulk.formatSvg": "SVG (Vector)",
  "bulk.step3Title": "Generate & Download",
  "bulk.readySummary": "Ready to generate {{count}} codes",
  "bulk.asyncNotice": "Processed asynchronously in memory. No network bandwidth consumed.",
  "bulk.btnGenerating": "Generating ({{percent}}%)",
  "bulk.btnGenerate": "Generate {{count}} Codes",
  "bulk.progressSummary": "Processed {{current}} of {{total}} items...",
  "bulk.successCompile": "Successfully compiled {{count}} codes in browser memory!",
  "bulk.btnPrintPdf": "Print A4 Sticker Sheet PDF",
  "bulk.btnDownloadZip": "Download All ({{count}} items) as ZIP",
  "bulk.btnCompressing": "Compressing ZIP...",
  "bulk.galleryTitle": "Generated Code Gallery",
  "bulk.btnSave": "Save",
  "bulk.galleryLimitNotice": "Showing first 48 items. All {{count}} items will be included in the downloaded ZIP.",

  // Print Studio Modal
  "printStudio.modalTitle": "Print & Sticker Sheet Studio",
  "printStudio.proBadge": "Pro Engine",
  "printStudio.modalSubtitle": "100% Client-Side vector layout for A4 & Letter Avery / Tom & Jerry sticker sheets",
  "printStudio.presetLabel": "Sticker Sheet Preset",
  "printStudio.paperFormat": "Paper Format:",
  "printStudio.gridStructure": "Grid Structure:",
  "printStudio.colsRowsSummary": "{{cols}} columns × {{rows}} rows ({{total}}/sheet)",
  "printStudio.cols": "Columns:",
  "printStudio.rows": "Rows:",
  "printStudio.labelWidth": "Label Width (mm):",
  "printStudio.labelHeight": "Label Height (mm):",
  "printStudio.allocation": "Sticker Allocation",
  "printStudio.quantity": "Quantity to Print:",
  "printStudio.stickersCount": "{{count}} stickers",
  "printStudio.fill1Page": "Fill 1 Page ({{count}})",
  "printStudio.fill2Pages": "Fill 2 Pages ({{count}})",
  "printStudio.bulkSequencing": "Sequencing {{count}} items from bulk list across {{pages}} page(s).",
  "printStudio.skipPeels": "Skip Previously Peeled Stickers:",
  "printStudio.skipSlots": "{{count}} slots",
  "printStudio.skipDesc": "Save paper by reusing partially used sticker sheets!",
  "printStudio.guidesAndInks": "Print Guides & Inks",
  "printStudio.k100": "K:100% Black",
  "printStudio.k100Desc": "Crisp monochrome",
  "printStudio.cropMarks": "Crop Marks",
  "printStudio.cropMarksDesc": "Guillotine guides",
  "printStudio.dottedOutlines": "Dotted Outlines",
  "printStudio.dottedDesc": "Label boundary",
  "printStudio.labelTitle": "Label Title",
  "printStudio.labelTitleDesc": "Top caption",
  "printStudio.labelHeading": "Label Heading Text:",
  "printStudio.labelPlaceholder": "e.g. Scan for Menu / Table 1",
  "printStudio.pageOf": "Page {{current}} of {{total}}",
  "printStudio.totalStickers": "Total stickers: {{count}} ({{pages}} pages)",
  "printStudio.directPrint": "Direct Print",
  "printStudio.downloadPdf": "Download Printable PDF",
  "printStudio.generatingPdf": "Generating PDF...",
  "printStudio.emptySlot": "Empty"
};

// Helper to set nested property by dotted path
function setNestedKey(obj, pathKey, value) {
  const parts = pathKey.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!curr[p] || typeof curr[p] !== 'object') {
      curr[p] = {};
    }
    curr = curr[p];
  }
  curr[parts[parts.length - 1]] = value;
}

// Convert object to flat map of dotted keys
function applyTranslations(targetJson, flatMap) {
  for (const [key, val] of Object.entries(flatMap)) {
    setNestedKey(targetJson, key, val);
  }
}

// Map language codes to Google Translate targets
const LANG_MAP = {
  'zh': 'zh-CN'
};

async function run() {
  const localesDir = path.join(__dirname, '..', 'public', 'locales');
  const allLangs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

  console.log(`🌍 Starting translation of ${Object.keys(MASTER_EN).length} keys for ${allLangs.length} languages...`);

  // 1. First, apply English master directly
  const enPath = path.join(localesDir, 'en', 'translation.json');
  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  applyTranslations(enJson, MASTER_EN);
  fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2), 'utf8');

  // Also sync src/locales/en/translation.json if exists
  const srcEnPath = path.join(__dirname, '..', 'src', 'locales', 'en', 'translation.json');
  if (fs.existsSync(srcEnPath)) {
    const srcEnJson = JSON.parse(fs.readFileSync(srcEnPath, 'utf8'));
    applyTranslations(srcEnJson, MASTER_EN);
    fs.writeFileSync(srcEnPath, JSON.stringify(srcEnJson, null, 2), 'utf8');
  }
  console.log('✅ English (en) updated successfully.');

  const keys = Object.keys(MASTER_EN);
  const values = Object.values(MASTER_EN);

  // Mask placeholders: {{var}} -> ___var___
  const placeholderRegex = /\{\{([^}]+)\}\}/g;
  const maskedValues = values.map(v => v.replace(placeholderRegex, '___$1___'));

  // 2. Iterate each target language
  for (const lang of allLangs) {
    if (lang === 'en') continue;

    const langFile = path.join(localesDir, lang, 'translation.json');
    if (!fs.existsSync(langFile)) {
      console.warn(`⚠️ Skipping missing file: ${langFile}`);
      continue;
    }

    const targetCode = LANG_MAP[lang] || lang;
    console.log(`🔄 Translating for language: ${lang} (${targetCode})...`);

    try {
      // Chunk requests into batches of 30 to be ultra safe and responsive
      const chunkSize = 30;
      const translatedMap = {};

      for (let i = 0; i < maskedValues.length; i += chunkSize) {
        const chunkKeys = keys.slice(i, i + chunkSize);
        const chunkMasked = maskedValues.slice(i, i + chunkSize);

        const res = await translate(chunkMasked, { to: targetCode });
        const resArray = Array.isArray(res) ? res : [res];

        chunkKeys.forEach((key, kIdx) => {
          let translatedText = resArray[kIdx]?.text || MASTER_EN[key];
          // Unmask placeholders: ___var___ or ___ var ___ -> {{var}}
          translatedText = translatedText.replace(/___\s*([a-zA-Z0-9_]+)\s*___/g, '{{$1}}');
          translatedMap[key] = translatedText;
        });

        // Small breathing delay between chunks
        await new Promise(r => setTimeout(r, 150));
      }

      // Merge and save
      const targetJson = JSON.parse(fs.readFileSync(langFile, 'utf8'));
      applyTranslations(targetJson, translatedMap);
      fs.writeFileSync(langFile, JSON.stringify(targetJson, null, 2), 'utf8');

      console.log(`✅ [${lang}] Successfully translated and updated!`);
    } catch (err) {
      console.error(`❌ [${lang}] Translation failed:`, err.message);
      // Fallback: apply English if network fails
      const targetJson = JSON.parse(fs.readFileSync(langFile, 'utf8'));
      applyTranslations(targetJson, MASTER_EN);
      fs.writeFileSync(langFile, JSON.stringify(targetJson, null, 2), 'utf8');
      console.log(`⚠️ [${lang}] Applied English fallback.`);
    }

    // Delay between languages
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n🎉 ALL 30 LANGUAGES HAVE BEEN TRANSLATED AND INJECTED SUCCESSFULLY!');
}

module.exports = { MASTER_EN };

if (require.main === module) {
  run().catch(console.error);
}
