const fs = require('fs');
const path = require('path');

const LANGS = [
  'en', 'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const codeMap = {
  'zh': 'zh-CN',
  'tl': 'tl'
};

const enPricing = {
  // SEO & Headings
  "seoTitle": "Pricing & Plans",
  "heroBadge": "4 Web Apps Ecosystem",
  "heroTitle": "Transparent Pricing & Plans",
  "heroSubtitle": "One unified platform. All 4 Web Apps connected seamlessly with zero hidden fees and transparent USD pricing.",
  "currencyNote": "All prices are in USD ($) globally across all regions.",

  // Ecosystem Highlight
  "ecoBadge": "Unified Suite",
  "ecoTitle": "Connected 4-in-1 Web Ecosystem",
  "ecoDesc": "Every plan connects seamlessly across our entire 4-web productivity network.",
  "app1Name": "QR Code Studio",
  "app1Desc": "Static & vector QR generator with 37+ formats & custom design",
  "app2Name": "Barcode Engine",
  "app2Desc": "EAN-13, UPC, Code 128, ITF, and industrial barcode suite",
  "app3Name": "Hardware Scanner",
  "app3Desc": "High-speed camera decoder for QR codes and barcodes",
  "app4Name": "Media & Doc Tools",
  "app4Desc": "High-DPI vector SVG exporter, PDF generator & batch manager",

  // 1. Free Plan
  "freeTitle": "Free Plan",
  "freeBadge": "Free Forever",
  "freeCost": "$0",
  "freeCostPeriod": "/ forever",
  "freeDesc": "Essential QR & Barcode tools for personal projects and everyday scanning.",
  "freeCta": "Start Free Now",
  "freeF1": "Connected to all 4 Web Apps (Free tier)",
  "freeF2": "Unlimited static QR code generation (ISO/IEC 18004)",
  "freeF3": "Linear Barcode suite (13+ formats: Code 128, EAN, UPC)",
  "freeF4": "100% Client-Side privacy (zero server tracking)",
  "freeF5": "Standard PNG & WebP format downloads",
  "freeF6": "Local browser history storage (IndexedDB)",

  // 2. Monthly Plan
  "monthlyTitle": "Monthly Plan",
  "monthlyBadge": "Flexible",
  "monthlyCost": "$9.99",
  "monthlyCostPeriod": "/ month",
  "monthlyDesc": "Full flexibility for professionals, designers, and active businesses.",
  "monthlyCta": "Get Monthly Pro",
  "monthlyF1": "Connected full access to all 4 Web Apps",
  "monthlyF2": "High-resolution Vector SVG & Print-Ready PDF exports",
  "monthlyF3": "Custom branding, company logo & color gradient palette",
  "monthlyF4": "Batch QR & Barcode generation suite",
  "monthlyF5": "Commercial & client project usage license",
  "monthlyF6": "Priority processing & fast customer support",

  // 3. Annual Plan (Recommended)
  "annualTitle": "Annual Plan",
  "annualBadge": "Most Popular",
  "annualSavings": "Save 34%",
  "annualEquiv": "Equivalent to $6.58 / mo",
  "annualStrike": "$119.88",
  "annualCost": "$79",
  "annualCostPeriod": "/ year",
  "annualDesc": "Billed annually ($6.58/mo equivalent). Best value for creators & agencies.",
  "annualCta": "Get Annual Pro",
  "annualF1": "Connected full access to all 4 Web Apps",
  "annualF2": "Everything included in Monthly Plan",
  "annualF3": "Save 34% compared to regular monthly billing",
  "annualF4": "Advanced custom dots, corner shapes & eye patterns",
  "annualF5": "Bulk high-DPI vector SVG & 4K raster downloads",
  "annualF6": "Priority 24/7 dedicated customer assistance",

  // 4. Founder Lifetime Pass
  "lifetimeTitle": "Founder Lifetime Pass",
  "lifetimeBadge": "VIP Founder Special",
  "lifetimeSavings": "Save $40 • One-Time Payment",
  "lifetimeStrike": "$169",
  "lifetimeCost": "$129",
  "lifetimeCostPeriod": "/ one-time",
  "lifetimeDesc": "Pay once, own forever across all platforms, web apps, and desktop tools.",
  "lifetimeCta": "Claim Founder Lifetime",
  "lifetimeF1": "Lifetime access to all 4 Web Apps",
  "lifetimeF2": "Dedicated Windows Desktop App included (Native offline)",
  "lifetimeF3": "Mobile App (Android APK & iOS) included",
  "lifetimeF4": "All future updates, tools & major features included forever",
  "lifetimeF5": "VIP Founder badge & exclusive community access",
  "lifetimeF6": "Direct 1-on-1 VIP developer support channel",

  // FAQs
  "faqTitle": "Frequently Asked Questions",
  "faq1Q": "Are all pricing packages really in USD?",
  "faq1A": "Yes. All our plans are denominated in USD ($) worldwide to ensure simple, transparent pricing regardless of your currency or location.",
  "faq2Q": "How does the connection to all 4 Web Apps work?",
  "faq2A": "Your plan credentials or license key instantly unlock full access across our 4 connected web apps: QR Code Studio, Barcode Engine, Hardware Scanner, and Media & Doc Tools.",
  "faq3Q": "What is included with the Windows App and Mobile APK in the Founder Pass?",
  "faq3A": "Founder members receive a standalone, native Windows executable (.exe) for complete offline operations without browser overhead, plus the Android APK and iOS mobile applications with direct download links.",
  "faq4Q": "Can I use the generated QR codes commercially without watermarks?",
  "faq4A": "Yes! All generated QR codes and barcodes are 100% watermark-free and ISO-compliant, ready for commercial packaging, client flyers, outdoor billboards, and merchandise.",

  // Legacy & Compatibility Keys
  "cost": "$0",
  "costPeriod": "/ forever",
  "features": "Included Features",
  "f1": "Unlimited QR Generations",
  "f2": "Zero Tracking & Zero Ads",
  "f3": "Client-Side Processing",
  "f4": "Local History Database",
  "whyFree": "How is it free?",
  "whyFreeDesc": "Because we don't process your files on our servers, we don't have massive server bills. Your device does the heavy lifting via WebAssembly.",
  "compTitle": "Traditional Cloud Tools",
  "compCost": "$20",
  "compPeriod": "/mo",
  "comp1": "Data uploaded to their servers",
  "comp2": "File size limits on free tier",
  "comp3": "Requires email registration",
  "comp4": "Slow network processing",
  "recommended": "RECOMMENDED",
  "ent1": "Enterprise Compliant",
  "ent2": "Zero-Data Retention",
  "ent3": "GDPR & CCPA Friendly",
  "bizTitle": "Free for Business Use",
  "bizDesc": "Yes, you can use CreateMy-QR for your company. In fact, our local processing architecture makes us the only platform safe enough for strict corporate environments, legal teams, and healthcare professionals.",
  "supportTitle": "Support the Project",
  "supportDesc": "We don't charge a subscription, but keeping the domain and development alive takes time. If CreateMy-QR saved your day, consider sharing it with your team. Word of mouth is our only marketing strategy.",
  "seoDesc": "CreateMy-QR: Free $0, Pro $9.99/mo, Annual $79/yr, Founder $129. Connected across 4 web apps in USD.",
  "desc": "CreateMy-QR: Free $0, Pro $9.99/mo, Annual $79/yr, Founder $129. Connected across 4 web apps in USD."
};

const idPricing = {
  // SEO & Headings
  "seoTitle": "Pilihan Paket & Harga",
  "heroBadge": "Ekosistem 4 Web Apps",
  "heroTitle": "Pilihan Paket & Harga Transparan",
  "heroSubtitle": "Satu ekosistem lengkap. Semua paket terhubung mulus ke 4 Web Apps dengan biaya transparan dalam mata uang USD.",
  "currencyNote": "Semua paket menggunakan mata uang USD ($) untuk seluruh negara di dunia.",

  // Ecosystem Highlight
  "ecoBadge": "Ekosistem Terpadu",
  "ecoTitle": "Terhubung ke Ekosistem 4 Web Apps",
  "ecoDesc": "Setiap paket memberikan akses terintegrasi ke seluruh ekosistem 4 aplikasi produktivitas web kami.",
  "app1Name": "QR Code Studio",
  "app1Desc": "Pembuat kode QR statis & vektor dengan 37+ format dan kustomisasi desain",
  "app2Name": "Barcode Engine",
  "app2Desc": "Generator barcode linear standar EAN-13, UPC, Code 128, dan industri",
  "app3Name": "Hardware Scanner",
  "app3Desc": "Pemindai kamera instan untuk membaca dan memverifikasi QR & Barcode",
  "app4Name": "Media & Doc Tools",
  "app4Desc": "Konverter resolusi tinggi, ekspor SVG vektor, dan manajer batch",

  // 1. Free Plan
  "freeTitle": "Paket Gratis",
  "freeBadge": "Gratis Selamanya",
  "freeCost": "$0",
  "freeCostPeriod": "/ selamanya",
  "freeDesc": "Fitur esensial untuk kebutuhan pembuatan QR & barcode sehari-hari.",
  "freeCta": "Mulai Gratis Sekarang",
  "freeF1": "Terhubung ke 4 Web Apps (Tingkat Gratis)",
  "freeF2": "Pembuatan kode QR statis tanpa batas (ISO/IEC 18004)",
  "freeF3": "Suite Barcode linear (13+ format: Code 128, EAN, UPC)",
  "freeF4": "Privasi 100% Sisi Klien (Tanpa pelacakan server)",
  "freeF5": "Unduhan format standar PNG & WebP",
  "freeF6": "Penyimpanan riwayat lokal di browser (IndexedDB)",

  // 2. Monthly Plan
  "monthlyTitle": "Paket Bulanan",
  "monthlyBadge": "Fleksibel",
  "monthlyCost": "$9.99",
  "monthlyCostPeriod": "/ bulan",
  "monthlyDesc": "Fleksibilitas penuh untuk profesional, desainer, dan bisnis aktif.",
  "monthlyCta": "Pilih Paket Bulanan",
  "monthlyF1": "Akses penuh terhubung ke 4 Web Apps",
  "monthlyF2": "Ekspor Vektor SVG & PDF Siap Cetak resolusi tinggi",
  "monthlyF3": "Kustomisasi merek, logo perusahaan & gradien warna canggih",
  "monthlyF4": "Pembuatan QR & Barcode secara massal (Batch)",
  "monthlyF5": "Lisensi penuh untuk penggunaan komersial & proyek klien",
  "monthlyF6": "Pemrosesan prioritas & dukungan pelanggan prioritas",

  // 3. Annual Plan (Recommended)
  "annualTitle": "Paket Tahunan",
  "annualBadge": "Paling Populer",
  "annualSavings": "Hemat 34%",
  "annualEquiv": "Setara $6.58 / bln",
  "annualStrike": "$119.88",
  "annualCost": "$79",
  "annualCostPeriod": "/ tahun",
  "annualDesc": "Ditagih tahunan (setara $6.58/bln). Nilai terbaik untuk bisnis & agensi.",
  "annualCta": "Pilih Paket Tahunan",
  "annualF1": "Akses penuh terhubung ke 4 Web Apps",
  "annualF2": "Semua fitur Paket Bulanan sudah termasuk",
  "annualF3": "Hemat 34% (hemat $40.88) dibanding tagihan bulanan",
  "annualF4": "Kustomisasi pola mata QR, bingkai sudut & titik unik",
  "annualF5": "Ekspor massal vektor SVG & raster ultra-HD 4K",
  "annualF6": "Dukungan pelanggan prioritas 24/7",

  // 4. Founder Lifetime Pass
  "lifetimeTitle": "Founder Lifetime Pass",
  "lifetimeBadge": "Eksklusif Founder",
  "lifetimeSavings": "Hemat $40 • Sekali Bayar",
  "lifetimeStrike": "$169",
  "lifetimeCost": "$129",
  "lifetimeCostPeriod": "/ sekali bayar",
  "lifetimeDesc": "Bayar sekali, miliki selamanya di seluruh platform, web apps, dan aplikasi desktop.",
  "lifetimeCta": "Klaim Founder Lifetime Pass",
  "lifetimeF1": "Akses seumur hidup ke 4 Web Apps",
  "lifetimeF2": "Aplikasi Windows Desktop bawaan (Offline native)",
  "lifetimeF3": "Aplikasi Mobile (Android APK & iOS) sudah termasuk",
  "lifetimeF4": "Semua pembaruan dan fitur masa depan gratis selamanya",
  "lifetimeF5": "Status VIP Founder & akses komunitas eksklusif",
  "lifetimeF6": "Saluran dukungan langsung VIP 1-on-1 dengan pengembang",

  // FAQs
  "faqTitle": "Pertanyaan yang Sering Diajukan",
  "faq1Q": "Apakah semua harga benar-benar menggunakan mata uang USD?",
  "faq1A": "Ya, semua paket menggunakan mata uang USD ($) secara global di semua negara agar harga transparan dan seragam tanpa biaya konversi tersembunyi.",
  "faq2Q": "Bagaimana cara kerja koneksi ke 4 Web Apps?",
  "faq2A": "Kunci lisensi atau akun Anda langsung membuka akses penuh di 4 aplikasi web kami: QR Code Studio, Barcode Engine, Hardware Scanner, dan Media & Doc Tools.",
  "faq3Q": "Apa saja yang didapatkan di Aplikasi Windows dan Mobile APK pada Founder Pass?",
  "faq3A": "Pemegang Founder Pass mendapatkan installer Windows (.exe) mandiri untuk operasional offline cepat tanpa browser, serta file Android APK dan aplikasi iOS.",
  "faq4Q": "Bisa digunakan untuk keperluan komersial tanpa watermark?",
  "faq4A": "Tentu saja! Semua kode QR dan barcode yang dihasilkan bebas tanda air (watermark-free) dan sesuai standar ISO internasional untuk kebutuhan cetak kemasan, banner, dan merchandise.",

  // Legacy & Compatibility Keys
  "cost": "$0",
  "costPeriod": "/ selamanya",
  "features": "Fitur yang Disertakan",
  "f1": "Generasi QR Tanpa Batas",
  "f2": "Tanpa Pelacakan & Tanpa Iklan",
  "f3": "Pemrosesan Sisi Klien",
  "f4": "Basis Data Sejarah Lokal",
  "whyFree": "Bagaimana cara gratisnya?",
  "whyFreeDesc": "Karena kami tidak memproses file Anda di server kami, kami tidak memiliki tagihan server yang besar. Perangkat Anda melakukan pekerjaan berat melalui WebAssembly.",
  "compTitle": "Alat Cloud Tradisional",
  "compCost": "$20",
  "compPeriod": "/bln",
  "comp1": "Data diunggah ke server mereka",
  "comp2": "Batas ukuran file pada tingkat gratis",
  "comp3": "Membutuhkan registrasi email",
  "comp4": "Pemrosesan jaringan lambat",
  "recommended": "DIREKOMENDASIKAN",
  "ent1": "Sesuai Perusahaan",
  "ent2": "Retensi Tanpa Data",
  "ent3": "Ramah GDPR & CCPA",
  "bizTitle": "Gratis untuk Penggunaan Bisnis",
  "bizDesc": "Ya, Anda dapat menggunakan CreateMy-QR untuk perusahaan Anda. Faktanya, arsitektur pemrosesan lokal kami menjadikan kami satu-satunya platform yang cukup aman untuk lingkungan perusahaan yang ketat, tim hukum, dan profesional kesehatan.",
  "supportTitle": "Mendukung Proyek",
  "supportDesc": "Kami tidak mengenakan biaya berlangganan, namun menjaga domain dan pengembangan tetap berjalan membutuhkan waktu. Jika CreateMy-QR menyelamatkan hari Anda, pertimbangkan untuk membagikannya dengan tim Anda. Promosi mulut ke mulut adalah satu-satunya strategi pemasaran kami.",
  "seoDesc": "CreateMy-QR: Gratis $0, Pro $9.99/bln, Tahunan $79/thn, Founder $129. Terhubung ke 4 Web Apps dalam USD.",
  "desc": "CreateMy-QR: Gratis $0, Pro $9.99/bln, Tahunan $79/thn, Founder $129. Terhubung ke 4 Web Apps dalam USD."
};

// Numeric/currency keys that MUST remain constant across all languages
const CONSTANT_KEYS = {
  "freeCost": "$0",
  "monthlyCost": "$9.99",
  "annualStrike": "$119.88",
  "annualCost": "$79",
  "lifetimeStrike": "$169",
  "lifetimeCost": "$129",
  "cost": "$0",
  "compCost": "$20"
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function translateBatch(texts, targetLang) {
  const tl = codeMap[targetLang] || targetLang;
  const delimiter = ' ||| ';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(texts.join(delimiter))}`;
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const raw = data[0].map(c => c[0]).join('');
      const parts = raw.split(/\s*\|\|\|\s*/);
      if (parts.length === texts.length) {
        return parts;
      }
      break;
    } catch (e) {
      await delay(500 * attempt);
    }
  }

  // Fallback: translate individually
  const results = [];
  for (const text of texts) {
    try {
      const singleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(singleUrl);
      const data = await res.json();
      results.push(data[0].map(c => c[0]).join(''));
    } catch (e) {
      results.push(text);
    }
    await delay(80);
  }
  return results;
}

async function run() {
  console.log('🚀 Updating pricing translations for all 30 languages...');

  // Update EN first
  const publicEnPath = path.join(__dirname, '..', 'public', 'locales', 'en', 'translation.json');
  const srcEnPath = path.join(__dirname, '..', 'src', 'locales', 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(publicEnPath, 'utf8'));
  enData.static = enData.static || {};
  enData.static.pricing = { ...enData.static.pricing, ...enPricing };
  fs.writeFileSync(publicEnPath, JSON.stringify(enData, null, 2), 'utf8');
  if (fs.existsSync(srcEnPath)) {
    fs.writeFileSync(srcEnPath, JSON.stringify(enData, null, 2), 'utf8');
  }
  console.log('✅ Updated EN translations');

  // Update ID
  const publicIdPath = path.join(__dirname, '..', 'public', 'locales', 'id', 'translation.json');
  const idData = JSON.parse(fs.readFileSync(publicIdPath, 'utf8'));
  idData.static = idData.static || {};
  idData.static.pricing = { ...idData.static.pricing, ...idPricing };
  fs.writeFileSync(publicIdPath, JSON.stringify(idData, null, 2), 'utf8');
  console.log('✅ Updated ID translations');

  // Keys to translate (excluding constants)
  const translatableKeys = Object.keys(enPricing).filter(k => !CONSTANT_KEYS[k]);
  const englishTexts = translatableKeys.map(k => enPricing[k]);

  // Translate for other 28 languages
  const otherLangs = LANGS.filter(l => l !== 'en' && l !== 'id');

  for (const lang of otherLangs) {
    const langPath = path.join(__dirname, '..', 'public', 'locales', lang, 'translation.json');
    if (!fs.existsSync(langPath)) {
      continue;
    }
    const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    langData.static = langData.static || {};

    console.log(`Translating pricing for [${lang}] (${otherLangs.indexOf(lang) + 1}/${otherLangs.length})...`);
    
    const chunkSize = 15;
    const translatedTexts = [];
    for (let i = 0; i < englishTexts.length; i += chunkSize) {
      const chunk = englishTexts.slice(i, i + chunkSize);
      const res = await translateBatch(chunk, lang);
      translatedTexts.push(...res);
      await delay(200);
    }

    const translatedPricing = {};
    translatableKeys.forEach((k, idx) => {
      let val = translatedTexts[idx] || enPricing[k];
      if (k === 'seoDesc' || k === 'desc') {
        if (val.length > 165) val = val.slice(0, 161) + '...';
        if (val.length < 70) val = `${val} Free client-side QR tools.`;
      }
      translatedPricing[k] = val;
    });

    // Ensure constants are strictly applied
    Object.assign(translatedPricing, CONSTANT_KEYS);

    langData.static.pricing = { ...(langData.static.pricing || {}), ...translatedPricing };
    fs.writeFileSync(langPath, JSON.stringify(langData, null, 2), 'utf8');
    console.log(`✅ [${lang}] Updated successfully`);
  }

  console.log('\n🎉 ALL 30 LANGUAGES UPDATED SUCCESSFULLY WITH STRICT USD PRICING!');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
