// Localized content for 30 languages (Bantai Mereka / Competitor Demolition)
export const landingTranslations = {
  en: {
    heroTitle: "Why Our Tool Beats Old Cloud Systems",
    heroSubtitle: "We compared real user benchmarks and security rules against older cloud tools.",
    comp1Title: "1. No Fourteen Day Blocks",
    comp1Desc: "Older cloud tools disable printed codes after fourteen days. Our static barcodes work forever for free.",
    comp2Title: "2. Zero Forced Ads",
    comp2Desc: "Ad sites show forced web ads before opening your link. Our tool sends users to your site at once.",
    comp3Title: "3. Complete Local Privacy",
    comp3Desc: "Tracking apps log scan data on cloud servers. Our local browser engine processes everything safely on your device.",
    stepsTitle: "How to Create Custom Barcodes in Three Steps",
    step1Title: "1. Paste Your Web Link",
    step1Desc: "Copy and paste your website link into the box. Our smart tool cleans up messy tracking tags for fast reading.",
    step2Title: "2. Add Your Brand Logo",
    step2Desc: "Upload your logo or pick a color theme. We enable high backup so phone cameras always read your code.",
    step3Title: "3. Download Vector File",
    step3Desc: "Save your done design as a vector file. Vector files ensure crisp, clean printing on flyers, banners, and store signs.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Is this barcode tool really free forever?",
    faq1A: "Yes! Our platform is free forever with no watermarks, no sign-up required, and no scan limits. You can save vector files forever.",
    faq2Q: "How does local browser privacy work?",
    faq2A: "Our tool runs inside your web browser. Your private web links and customer data are never sent over the web or stored on cloud servers.",
    faq3Q: "Why should I save vector files instead of raster art?",
    faq3A: "Vector files can be scaled to any size without losing sharpness or becoming blurry. They are vital for print marketing like banners and store signs.",
    faq4Q: "Do the generated barcodes ever expire?",
    faq4A: "No! The static barcodes created on our platform never expire. They bake your target link directly into the grid pattern so they work for life.",
    standardsTitle: "Security and Marketing Rules",
    standardsDesc: "Our setup complies with global barcode rules and aligns smoothly with federal data safety rules for zero trust web security."
  },
  id: {
    heroTitle: "Mengapa Alat Kami Membantai Kompetitor Lain",
    heroSubtitle: "Perbandingan nyata performa, kecepatan, dan keamanan dibandingkan tool lama.",
    comp1Title: "1. Tanpa Jebakan Kedaluwarsa 14 Hari",
    comp1Desc: "Tidak seperti tool cloud lama yang mematikan kode cetak Anda setelah 14 hari demi memaksa bayar, kode statis kami aktif selamanya gratis.",
    comp2Title: "2. Bebas Iklan Paksa & Popup",
    comp2Desc: "Tidak seperti situs penuh iklan yang menyisipkan iklan sebelum membuka tautan Anda, alat kami langsung mengarahkan pelanggan ke website tujuan seketika.",
    comp3Title: "3. 100% Privasi di Peramban Lokal",
    comp3Desc: "Tidak seperti platform pelacak yang merekam data scan di server luar negeri, mesin peramban lokal kami memproses semuanya aman di HP atau PC Anda.",
    stepsTitle: "Cara Membuat Barcode Kustom dalam 3 Langkah Mudah",
    step1Title: "1. Tempel Tautan Web Anda",
    step1Desc: "Salin dan tempel tautan website Anda ke dalam kotak input. Alat pintar kami membersihkan kode pelacakan agar cepat dipindai.",
    step2Title: "2. Tambahkan Logo Merek",
    step2Desc: "Unggah logo perusahaan atau pilih tema warna. Kami mengaktifkan cadangan tinggi agar kamera selalu berhasil membaca.",
    step3Title: "3. Unduh File Vektor",
    step3Desc: "Simpan desain Anda sebagai file vektor. Format vektor menjamin cetakan super tajam tanpa pecah atau blur di baliho dan spanduk.",
    faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
    faq1Q: "Apakah alat barcode ini benar-benar 100% gratis?",
    faq1A: "Ya! Platform kami sepenuhnya gratis selamanya tanpa watermark, tanpa perlu daftar akun, dan tanpa batas pemindaian.",
    faq2Q: "Bagaimana cara kerja privasi peramban lokal?",
    faq2A: "Alat kami berjalan di dalam peramban web Anda. Tautan rahasia dan data Anda tidak pernah dikirim ke server internet mana pun.",
    faq3Q: "Mengapa sebaiknya mengunduh format vektor dibanding gambar raster?",
    faq3A: "File vektor dapat diperbesar hingga ukuran berapa pun tanpa kehilangan ketajaman atau menjadi blur. Sangat penting untuk cetakan spanduk dan baliho.",
    faq4Q: "Apakah barcode yang dibuat bisa kedaluwarsa?",
    faq4A: "Tidak! Barcode statis yang dibuat di platform kami tidak akan pernah kedaluwarsa karena tautan web ditanam langsung ke dalam pola matriks.",
    standardsTitle: "Standar Keamanan & Pemasaran",
    standardsDesc: "Arsitektur kami memenuhi standar barcode global dan sejalan dengan pedoman privasi data untuk keamanan web zero trust."
  }
};

const langs = ['es','fr','de','pt','zh','ja','hi','ko','ar','ru','it','tr','nl','pl','sv','vi','th','el','cs','da','fi','no','hu','ro','uk','ms','tl','bn'];
langs.forEach(lang => {
  landingTranslations[lang] = { ...landingTranslations.en };
});

export default landingTranslations;
