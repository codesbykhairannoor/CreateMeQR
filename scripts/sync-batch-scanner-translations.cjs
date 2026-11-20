const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const LOCALES_DIR = path.join(__dirname, '../public/locales');
const EN_PATH = path.join(LOCALES_DIR, 'en', 'translation.json');
const SRC_EN_PATH = path.join(__dirname, '../src/locales/en/translation.json');

const batchScannerEn = {
  tabSingle: "Camera / Single Image",
  tabBatch: "Batch ZIP & Multi-Scan",
  title: "Batch ZIP & Multi-Image Scanner",
  subtitle: "Upload a ZIP archive or multiple image files. Extract and decode all QR codes and barcodes at once, then export to CSV or Excel (.xlsx).",
  guestNoticeTitle: "Guest Restricted",
  guestNoticeDesc: "Sign in to unlock 2 free batch scans every month, or upgrade to PRO.",
  guestSignInBtn: "Sign In (Claim 2/Mo)",
  userUpgradeBtn: "Upgrade to PRO for Unlimited",
  dropzoneTitle: "Upload a ZIP Archive or Multiple Images",
  dropzoneSubtitle: "Upload a .zip file containing tickets, inventory labels, or receipts, or directly select multiple image files.",
  btnSelectZip: "Choose ZIP Archive",
  btnSelectImages: "Select Multiple Images",
  unpackingZip: "Unpacking ZIP...",
  imagesReady: "images ready for processing",
  btnClear: "Choose Different Files",
  targetFormatLabel: "Target Symbologies",
  scopeAll: "All Barcodes",
  scopeQr: "QR Codes Only",
  scope1D: "1D Retail Only",
  scanEngineLabel: "Detection Engine Intensity",
  deepScanTitle: "Deep Inspection",
  deepScanDesc: "Rotated, inverted, and distorted barcodes (recommended)",
  scanningStatus: "Processing with WebAssembly...",
  btnStartScan: "Start Batch Scan",
  statProcessed: "Total Files",
  statDetected: "Barcodes Found",
  statSuccessRate: "Detection Rate",
  statTime: "Total Elapsed",
  searchPlaceholder: "Filter results or filenames...",
  btnCopyAll: "Copy All",
  btnExportCsv: "Export CSV",
  btnExportXlsx: "Export Excel (.xlsx)",
  thIndex: "#",
  thThumb: "Image",
  thFilename: "Filename",
  thFormat: "Format",
  thDecoded: "Decoded Content",
  thCategory: "Type",
  thStatus: "Status",
  thAction: "Action",
  thTimeMs: "Time (ms)",
  noMatchingRows: "No rows match the current search or filter.",
  errZip: "Failed to extract ZIP file. Please ensure it is a valid ZIP archive.",
  errScan: "An error occurred during batch decoding.",
  featureName: "Batch ZIP QR & Barcode Scanner",
  proUnlimitedActive: "PRO Unlimited Active",
  proUnlimitedDesc: "Zero limits on batch ZIP images & exports",
  freeMonthlyQuota: "Free Monthly Quota",
  quotaLeft: "Left",
  filterAllRows: "All Rows",
  filterDetected: "Detected",
  filterNoBarcode: "No Barcode",
  statusDetected: "Detected",
  statusUnreadable: "Unreadable",
  noCodeDetected: "No readable barcode detected",
  copiedAll: "Copied All!"
};

const batchScannerId = {
  tabSingle: "Kamera / Gambar Tunggal",
  tabBatch: "Pemindai Massal ZIP & Multi-Gambar",
  title: "Pemindai Massal ZIP & Multi-Gambar",
  subtitle: "Unggah arsip ZIP atau banyak file gambar. Ekstrak dan pindai semua kode QR dan barcode sekaligus di browser, lalu ekspor ke CSV atau Excel (.xlsx).",
  guestNoticeTitle: "Akses Tamu Dibatasi",
  guestNoticeDesc: "Masuk akun untuk membuka 2x pemindaian massal gratis setiap bulan, atau upgrade ke PRO.",
  guestSignInBtn: "Masuk (Klaim 2x/Bulan)",
  userUpgradeBtn: "Upgrade ke PRO untuk Tanpa Batas",
  dropzoneTitle: "Unggah Arsip ZIP atau Banyak Gambar",
  dropzoneSubtitle: "Unggah file .zip berisi tiket, label inventaris, atau struk, atau pilih langsung beberapa file gambar.",
  btnSelectZip: "Pilih Arsip ZIP",
  btnSelectImages: "Pilih Banyak Gambar",
  unpackingZip: "Mengekstrak ZIP...",
  imagesReady: "gambar siap diproses",
  btnClear: "Pilih File Lain",
  targetFormatLabel: "Format Target",
  scopeAll: "Semua Barcode",
  scopeQr: "Hanya Kode QR",
  scope1D: "Hanya Barcode Retail 1D",
  scanEngineLabel: "Intensitas Mesin Deteksi",
  deepScanTitle: "Inspeksi Mendalam",
  deepScanDesc: "Barcode miring, terbalik, dan terdistorsi (disarankan)",
  scanningStatus: "Sedang memproses pemindaian...",
  btnStartScan: "Mulai Pemindaian Massal",
  statProcessed: "Total File",
  statDetected: "Barcode Ditemukan",
  statSuccessRate: "Tingkat Keberhasilan",
  statTime: "Total Durasi",
  searchPlaceholder: "Cari nama file atau isi barcode...",
  btnCopyAll: "Salin Semua",
  btnExportCsv: "Ekspor CSV",
  btnExportXlsx: "Ekspor Excel (.xlsx)",
  thIndex: "#",
  thThumb: "Gambar",
  thFilename: "Nama File",
  thFormat: "Format",
  thDecoded: "Isi Hasil Pindai",
  thCategory: "Tipe",
  thStatus: "Status",
  thAction: "Aksi",
  thTimeMs: "Waktu (ms)",
  noMatchingRows: "Tidak ada baris yang sesuai pencarian atau filter.",
  errZip: "Gagal mengekstrak file ZIP. Pastikan arsip ZIP valid.",
  errScan: "Terjadi kesalahan saat memproses pemindaian massal.",
  featureName: "Pemindai Massal ZIP QR & Barcode",
  proUnlimitedActive: "PRO Tanpa Batas Aktif",
  proUnlimitedDesc: "Tanpa batas gambar ZIP dan ekspor hasil",
  freeMonthlyQuota: "Kuota Gratis Bulanan",
  quotaLeft: "Tersisa",
  filterAllRows: "Semua Baris",
  filterDetected: "Terdeteksi",
  filterNoBarcode: "Tanpa Barcode",
  statusDetected: "Terdeteksi",
  statusUnreadable: "Tidak Terbaca",
  noCodeDetected: "Tidak ditemukan barcode yang terbaca",
  copiedAll: "Semua Disalin!"
};

const langCodeMap = {
  'zh': 'zh-CN',
  'he': 'iw',
  'tl': 'tl'
};

const otherLanguages = [
  'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar',
  'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs',
  'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

async function translateBatch(texts, targetLang) {
  const gTarget = langCodeMap[targetLang] || targetLang;
  try {
    const res = await translate(texts, { to: gTarget });
    if (Array.isArray(res)) {
      return res.map(r => r.text);
    }
    return [res.text];
  } catch (err) {
    console.warn(`[Translate Error ${targetLang}] Retrying sequential:`, err.message);
    const results = [];
    for (const t of texts) {
      try {
        const single = await translate(t, { to: gTarget });
        results.push(single.text);
      } catch (e) {
        results.push(t);
      }
    }
    return results;
  }
}

async function main() {
  console.log('🚀 Syncing batchScanner translations to all 30 languages...');

  // 1. English
  const enJson = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
  enJson.batchScanner = batchScannerEn;
  fs.writeFileSync(EN_PATH, JSON.stringify(enJson, null, 2), 'utf8');
  fs.writeFileSync(SRC_EN_PATH, JSON.stringify(enJson, null, 2), 'utf8');
  console.log('✅ Updated English (en)');

  // 2. Indonesian
  const idPath = path.join(LOCALES_DIR, 'id', 'translation.json');
  if (fs.existsSync(idPath)) {
    const idJson = JSON.parse(fs.readFileSync(idPath, 'utf8'));
    idJson.batchScanner = batchScannerId;
    fs.writeFileSync(idPath, JSON.stringify(idJson, null, 2), 'utf8');
    console.log('✅ Updated Indonesian (id)');
  }

  // 3. Translate all keys to other 28 languages
  const keys = Object.keys(batchScannerEn);
  const englishValues = keys.map(k => batchScannerEn[k]);

  for (const lang of otherLanguages) {
    const langFilePath = path.join(LOCALES_DIR, lang, 'translation.json');
    if (!fs.existsSync(langFilePath)) {
      console.warn(`⚠️ Skipped missing ${langFilePath}`);
      continue;
    }

    try {
      console.log(`Translating batchScanner for ${lang}...`);
      const translatedValues = await translateBatch(englishValues, lang);

      const targetJson = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
      targetJson.batchScanner = {};
      keys.forEach((k, idx) => {
        targetJson.batchScanner[k] = translatedValues[idx] || batchScannerEn[k];
      });

      fs.writeFileSync(langFilePath, JSON.stringify(targetJson, null, 2), 'utf8');
      console.log(`✅ [${lang}] Successfully translated and saved.`);
    } catch (err) {
      console.error(`❌ Failed translating ${lang}:`, err.message);
    }
  }

  console.log('🎉 All 30 languages have been successfully updated with batchScanner!');
}

main().catch(err => {
  console.error('Fatal error in translation sync:', err);
  process.exit(1);
});
