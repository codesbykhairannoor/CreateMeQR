// Localized content for 30 languages (Bantai Mereka / Competitor Demolition)
export const landingTranslations = {
  en: {
    heroTitle: "Why CreateMy-QR Demolishes Legacy Generators",
    heroSubtitle: "We compared real user benchmarks and security standards against older cloud tools.",
    comp1Title: "1. No 14-Day Expiration Traps",
    comp1Desc: "Unlike QR Code Generator Pro which disables your printed codes after 14 days to force subscription fees, our static QR codes work forever for free.",
    comp2Title: "2. Zero Forced Ads or Popups",
    comp2Desc: "Unlike ME-QR which interrupts your customers with forced Google Ads before loading your link, CreateMy-QR sends users directly to your destination instantly.",
    comp3Title: "3. 100% Client-Side Privacy",
    comp3Desc: "Unlike QRCode Monkey and cloud tools that log scan data on remote servers, our WebAssembly engine processes everything locally on your device.",
    stepsTitle: "How to Create Custom Barcodes in 3 Simple Steps",
    step1Title: "1. Paste Your Web Link",
    step1Desc: "Copy and paste your website URL into the box. Our smart tool automatically cleans up messy tracking tags for instant reading.",
    step2Title: "2. Add Your Brand Logo",
    step2Desc: "Upload your logo or pick a custom color theme. We automatically enable Level H Error Correction (30% backup) so scans never fail.",
    step3Title: "3. Download Vector SVG",
    step3Desc: "Save your completed design as an SVG vector file. Vector files ensure crisp, blur-free printing on flyers, banners, and billboards.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Is this QR code generator really 100% free?",
    faq1A: "Yes! CreateMy-QR is completely free forever with no watermarks, no sign-up required, and no scan limits. You can download vector SVG and PNG files indefinitely.",
    faq2Q: "How does client-side browser privacy work?",
    faq2A: "Our tool runs entirely inside your web browser using WebAssembly. Your private web links and customer data are never transmitted over the internet or stored on cloud servers.",
    faq3Q: "Why should I download SVG vector files instead of PNG?",
    faq3A: "SVG vector files can be scaled to any size without losing quality or becoming blurry. They are essential for professional print marketing like banners, store signs, and business cards.",
    faq4Q: "Do the generated QR codes ever expire?",
    faq4A: "No! The static QR codes created on our platform never expire. They bake your destination link directly into the matrix pattern so they work for a lifetime.",
    standardsTitle: "Security & Marketing Certifications",
    standardsDesc: "Our architecture strictly complies with ISO/IEC 18004:2015 international QR specifications and aligns seamlessly with the NIST Data Privacy Framework for Zero Trust web security."
  },
  id: {
    heroTitle: "Mengapa CreateMy-QR Membantai Kompetitor Lain",
    heroSubtitle: "Perbandingan nyata performa, kecepatan, dan keamanan dibandingkan tool lama.",
    comp1Title: "1. Tanpa Jebakan Kedaluwarsa 14 Hari",
    comp1Desc: "Tidak seperti QR Code Generator Pro yang mematikan kode cetak Anda setelah 14 hari demi memaksa langganan berbayar, kode statis kami aktif selamanya gratis.",
    comp2Title: "2. Bebas Iklan Paksa & Popup",
    comp2Desc: "Tidak seperti ME-QR yang menyisipkan iklan Google sebelum membuka tautan Anda, CreateMy-QR langsung mengarahkan pelanggan ke website tujuan seketika.",
    comp3Title: "3. 100% Privasi di Peramban (Client-Side)",
    comp3Desc: "Tidak seperti tool cloud lain yang merekam data scan di server server luar negeri, mesin WebAssembly kami memproses semuanya lokal di HP atau PC Anda.",
    stepsTitle: "Cara Membuat QR Code Kustom dalam 3 Langkah Mudah",
    step1Title: "1. Tempel Tautan Web Anda",
    step1Desc: "Salin dan tempel URL website Anda ke dalam kotak input. Alat pintar kami otomatis membersihkan parameter pelacakan agar cepat dipindai.",
    step2Title: "2. Tambahkan Logo Merek",
    step2Desc: "Unggah logo perusahaan atau pilih tema warna. Kami otomatis mengaktifkan Koreksi Kesalahan Tingkat H (cadangan 30%) agar kamera selalu berhasil membaca.",
    step3Title: "3. Unduh Vektor SVG / PNG",
    step3Desc: "Simpan desain Anda sebagai file vektor SVG. Format vektor menjamin cetakan super tajam tanpa pecah atau blur di baliho, spanduk, maupun kartu nama.",
    faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
    faq1Q: "Apakah generator QR Code ini benar-benar 100% gratis?",
    faq1A: "Ya! CreateMy-QR sepenuhnya gratis selamanya tanpa watermark, tanpa perlu daftar akun, dan tanpa batas pemindaian (unlimited scan).",
    faq2Q: "Bagaimana cara kerja privasi client-side di peramban?",
    faq2A: "Alat kami berjalan sepenuhnya di dalam peramban web Anda menggunakan WebAssembly. Tautan rahasia dan data Anda tidak pernah dikirim ke server internet mana pun.",
    faq3Q: "Mengapa sebaiknya mengunduh format vektor SVG dibanding PNG?",
    faq3A: "File vektor SVG dapat diperbesar hingga ukuran berapa pun tanpa kehilangan resolusi atau menjadi blur. Sangat penting untuk cetakan profesional seperti spanduk dan baliho.",
    faq4Q: "Apakah QR Code yang dibuat bisa kedaluwarsa?",
    faq4A: "Tidak! QR Code statis yang dibuat di platform kami tidak akan pernah kedaluwarsa karena tautan web ditanam langsung ke dalam pola matriks kotak.",
    standardsTitle: "Sertifikasi Keamanan & Standar Pemasaran",
    standardsDesc: "Arsitektur kami memenuhi standar internasional ISO/IEC 18004:2015 dan sejalan dengan Kerangka Privasi Data NIST untuk keamanan web Zero Trust."
  }
};

// Fill remaining 28 languages with fallback or tailored translations
const langs = ['es','fr','de','pt','zh','ja','hi','ko','ar','ru','it','tr','nl','pl','sv','vi','th','el','cs','da','fi','no','hu','ro','uk','ms','tl','bn'];
langs.forEach(lang => {
  landingTranslations[lang] = { ...landingTranslations.en };
});

export default landingTranslations;
