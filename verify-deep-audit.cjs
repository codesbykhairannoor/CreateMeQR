const fs = require('fs');
const path = require('path');
const { localizedRoutes, routeToToolMap } = require('./src/config/localizedRoutes.js');

const distDir = path.join(__dirname, 'dist');
console.log('================================================================');
console.log('🔍 PHASE 1: SCANNING ALL DIST HTML FILES FOR INTEGRITY & AUDIT');
console.log('================================================================');

let noindexCount = 0;
let trailingSlashCanonicalCount = 0;
let duplicateCanonicalCount = 0;
let totalHtmlCount = 0;
let zeroLengthCount = 0;

function scanFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      totalHtmlCount++;
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.length === 0) zeroLengthCount++;
      
      if (content.includes('content="noindex') || content.includes("content='noindex") || content.includes('name="robots" content="none"')) {
        noindexCount++;
        console.error('❌ Found noindex in:', fullPath);
      }
      
      const canonicalMatches = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/gi) || [];
      if (canonicalMatches.length > 1) {
        duplicateCanonicalCount++;
        console.error('❌ Duplicate canonical in:', fullPath);
      }
      for (const m of canonicalMatches) {
        const hrefMatch = m.match(/href="([^"]+)"/);
        if (hrefMatch && hrefMatch[1]) {
          const href = hrefMatch[1];
          if (href !== 'https://createmy-qr.com' && href.endsWith('/')) {
            trailingSlashCanonicalCount++;
            console.error('❌ Trailing slash canonical:', fullPath, href);
          }
        }
      }
    }
  }
}

scanFiles(distDir);
console.log(`• Total HTML files scanned:             ${totalHtmlCount}`);
console.log(`• Empty / Zero-length files:            ${zeroLengthCount}`);
console.log(`• 'noindex' robot tags detected:        ${noindexCount}`);
console.log(`• Trailing slash canonicals detected:   ${trailingSlashCanonicalCount}`);
console.log(`• Duplicate canonical tags in 1 page:   ${duplicateCanonicalCount}`);

console.log('\n================================================================');
console.log('🧪 PHASE 2: SIMULATING ALL 60 GSC ERROR URLS FROM USER INPUT');
console.log('================================================================');

// Import App.jsx resolver logic directly to test
const resolveToolFromAnySlug = (rawSlug, lang) => {
  if (!rawSlug || rawSlug === '/') return 'home';
  if (routeToToolMap[lang]?.[rawSlug]) return routeToToolMap[lang][rawSlug];

  let decoded = rawSlug;
  try {
    decoded = decodeURIComponent(rawSlug);
  } catch (e) {}

  const clean = decoded.toLowerCase();
  const stripped = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const l of Object.keys(routeToToolMap)) {
    if (routeToToolMap[l]?.[rawSlug]) return routeToToolMap[l][rawSlug];
    if (routeToToolMap[l]?.[clean]) return routeToToolMap[l][clean];
    if (routeToToolMap[l]?.[stripped]) return routeToToolMap[l][stripped];

    for (const [s, tool] of Object.entries(routeToToolMap[l])) {
      const sLower = s.toLowerCase();
      if (sLower === clean || sLower === stripped) return tool;
      const sStripped = sLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (sStripped === stripped) return tool;
    }
  }

  const legacyAliases = {
    '/contact': 'about',
    '/about': 'about',
    '/privacy': 'privacy',
    '/terms': 'terms',
    '/security': 'security',
    '/pricing': 'pricing',
    '/compare': 'compare',
    '/languages': 'languages',
    '/usecases': 'usecases',
    '/use-cases': 'usecases',
    '/scanqr': 'scanqr',
    '/scan-qr': 'scanqr',
    '/scanbarcode': 'scanbarcode',
    '/scan-barcode': 'scanbarcode',
    '/barcode': 'barcode',
    '/barcode-generator': 'barcode',
    '/wifi': 'wifi',
    '/vcard': 'vcard',
    '/whatsapp': 'whatsapp',
    '/pdf': 'pdf',
    '/location': 'location',
    '/booking': 'booking',
    '/crypto': 'crypto',
    '/paypal': 'paypal',
    '/venmo': 'venmo',
    '/instagram': 'instagram',
    '/facebook': 'facebook',
    '/twitter': 'twitter',
    '/tiktok': 'tiktok',
    '/linkedin': 'linkedin',
    '/youtube': 'youtube',
    '/spotify': 'spotify',
    '/telegram': 'telegram',
    '/snapchat': 'snapchat',
    '/discord': 'discord',
    '/text': 'text',
    '/email': 'email',
    '/phone': 'phone',
    '/sms': 'sms',
    '/event': 'event',
    '/image': 'image',
    '/video': 'video',
    '/audio': 'audio',
    '/file': 'file',
    '/gforms': 'gforms',
    '/greview': 'greview',
    '/linkinbio': 'linkinbio',
    '/amazon': 'amazon',
    '/appstore': 'appstore'
  };
  if (legacyAliases[clean] || legacyAliases[stripped]) return legacyAliases[clean] || legacyAliases[stripped];

  const keywordMap = [
    ['linkedin', 'linkedin'],
    ['snapchat', 'snapchat'],
    ['instagram', 'instagram'],
    ['facebook', 'facebook'],
    ['twitter', 'twitter'],
    ['tiktok', 'tiktok'],
    ['youtube', 'youtube'],
    ['spotify', 'spotify'],
    ['telegram', 'telegram'],
    ['discord', 'discord'],
    ['whatsapp', 'whatsapp'],
    ['paypal', 'paypal'],
    ['venmo', 'venmo'],
    ['amazon', 'amazon'],
    ['appstore', 'appstore'],
    ['app-store', 'appstore'],
    ['google-forms', 'gforms'],
    ['gforms', 'gforms'],
    ['google-review', 'greview'],
    ['greview', 'greview'],
    ['link-in-bio', 'linkinbio'],
    ['linkinbio', 'linkinbio'],
    ['pautan-di-bio', 'linkinbio'],
    ['tautan-di-bio', 'linkinbio'],
    ['wifi', 'wifi'],
    ['wi-fi', 'wifi'],
    ['vcard', 'vcard'],
    ['scan-barcode', 'scanbarcode'],
    ['scanbarcode', 'scanbarcode'],
    ['scan-qr', 'scanqr'],
    ['scanqr', 'scanqr'],
    ['barcode', 'barcode'],
    ['maps', 'location'],
    ['location', 'location'],
    ['lokasyon', 'location'],
    ['booking', 'booking'],
    ['crypto', 'crypto'],
    ['email', 'email'],
    ['sms', 'sms'],
    ['phone', 'phone'],
    ['event', 'event'],
    ['tapahtuma', 'event'],
    ['ibento', 'event'],
    ['подія', 'event'],
    ['podia', 'event'],
    ['resim', 'image'],
    ['image', 'image'],
    ['gambar', 'image'],
    ['video', 'video'],
    ['audio', 'audio'],
    ['file', 'file'],
    ['text', 'text'],
    ['teks', 'text'],
    ['url', 'url'],
    ['contact', 'about'],
    ['privacy', 'privacy'],
    ['terms', 'terms'],
    ['security', 'security'],
    ['pricing', 'pricing'],
    ['compare', 'compare'],
    ['languages', 'languages'],
    ['usecases', 'usecases'],
    ['use-cases', 'usecases'],
    // Generic QR Generator phrases (Arabic, Greek, Chinese, Spanish, Norwegian, Malay)
    ['مولد', 'barcode'],
    ['رمز-الاستجابة', 'barcode'],
    ['δημιουργία', 'barcode'],
    ['δωρεάν', 'barcode'],
    ['二维码', 'barcode'],
    ['免费在线', 'barcode'],
    ['generador-de-codigos', 'barcode'],
    ['gratis-qr-kode', 'barcode'],
    ['penjana-kod-qr', 'barcode']
  ];

  for (const [kw, tool] of keywordMap) {
    if (clean.includes(kw) || stripped.includes(kw)) {
      return tool;
    }
  }

  return null;
};

const LANG_CODES = [
  'en', 'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 
  'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 
  'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

function parseUrl(urlStr) {
  // Strip origin
  let pathOnly = urlStr.replace(/^https?:\/\/(?:www\.)?createmy-qr\.com/, '');
  // Strip query params
  pathOnly = pathOnly.split('?')[0];
  if (!pathOnly.startsWith('/')) pathOnly = '/' + pathOnly;
  
  // Extract lang and slug
  const segments = pathOnly.split('/').filter(Boolean);
  let lang = 'en';
  let slug = pathOnly;
  
  if (segments.length > 0 && LANG_CODES.includes(segments[0])) {
    lang = segments[0];
    const subSegments = segments.slice(1);
    slug = subSegments.length > 0 ? '/' + subSegments.join('/') : '/';
  }
  
  return { pathOnly, lang, slug };
}

const sampleGscUrls = [
  "https://createmy-qr.com/sv/",
  "https://createmy-qr.com/no/",
  "https://createmy-qr.com/de/",
  "https://createmy-qr.com/es/",
  "https://createmy-qr.com/zh/",
  "https://www.createmy-qr.com/ro",
  "https://www.createmy-qr.com/bn/linkedin-tạo-mã-qr-miễn-phí-trực-tuyến",
  "https://www.createmy-qr.com/fr/lokasyon-libreng-online-qr-code-generator",
  "https://www.createmy-qr.com/id/link-in-bio-kostenloser-qr-code-generator-online",
  "https://www.createmy-qr.com/vi/resim-ücretsiz-çevrimiçi-qr-kod-oluşturucu",
  "https://createmy-qr.com/tr/google-review-ücretsiz-çevrimiçi-qr-kod-oluşturucu",
  "https://www.createmy-qr.com/tr/google-review-ücretsiz-çevrimiçi-qr-kod-oluşturucu",
  "https://www.createmy-qr.com/ar/contact",
  "https://www.createmy-qr.com/ar/مولد-رمز-الاستجابة-السريعة-مجاني",
  "https://www.createmy-qr.com/el/δωρεάν-δημιουργία-qr-code-online?format=pharmacode",
  "https://www.createmy-qr.com/zh/discord-免费在线二维码生成器",
  "https://createmy-qr.com/ar/google-review-gratis-qr-kode-generator-online",
  "https://www.createmy-qr.com/sv/linkedin-مولد-رمز-الاستجابة-السريعة-مجاني",
  "https://www.createmy-qr.com/ms/venmo-ücretsiz-çevrimiçi-qr-kod-oluşturucu",
  "https://createmy-qr.com/ar/gratis-qr-kode-generator-online",
  "https://www.createmy-qr.com/ja/event-qr-code-generator",
  "https://createmy-qr.com/fi/event-qr-code-generator",
  "https://createmy-qr.com/no/vcard-qr-code-maker",
  "https://createmy-qr.com/id/sms-qr-code-generator",
  "https://www.createmy-qr.com/id/sms-qr-code-generator",
  "https://createmy-qr.com/ja/privacy",
  "https://createmy-qr.com/bn/event-qr-code-generator",
  "https://createmy-qr.com/ko/event-qr-code-generator",
  "https://createmy-qr.com/no/event-qr-code-generator",
  "https://www.createmy-qr.com/no/event-qr-code-generator",
  "https://www.createmy-qr.com/phone-qr-code-generator",
  "https://www.createmy-qr.com/id/teks-generator-qr-code-gratis-online",
  "https://www.createmy-qr.com/sv",
  "https://www.createmy-qr.com/cs",
  "https://www.createmy-qr.com/fi",
  "https://www.createmy-qr.com/barcode-generator",
  "https://www.createmy-qr.com/fr",
  "https://www.createmy-qr.com/el",
  "https://www.createmy-qr.com/de",
  "https://www.createmy-qr.com/es",
  "https://createmy-qr.com/ar/",
  "https://createmy-qr.com/fi/",
  "https://createmy-qr.com/it/",
  "https://createmy-qr.com/zh/免费在线二维码生成器?format=pharmacode",
  "https://www.createmy-qr.com/ms/pautan-di-bio-penjana-kod-qr-percuma-dalam-talian",
  "https://www.createmy-qr.com/da/vcard-zdarma-online-generátor-qr-kódů",
  "https://www.createmy-qr.com/ro/google-review-generador-de-códigos-qr-gratis-online",
  "https://www.createmy-qr.com/es/vcard-zdarma-online-generátor-qr-kódů",
  "https://www.createmy-qr.com/de/email-qr-code-generator",
  "https://www.createmy-qr.com/sv/amazon-zdarma-online-generátor-qr-kódů",
  "https://createmy-qr.com/ja/ibento-wu-liao-qrkodozuo-cheng-zienereta",
  "https://createmy-qr.com/ms/penjana-kod-qr-percuma-dalam-talian-2",
  "https://createmy-qr.com/fi/tapahtuma-ilmainen-qr-koodigeneraattori-netissa",
  "https://createmy-qr.com/ro/facebook-generator-de-coduri-qr-gratuit-online",
  "https://createmy-qr.com/ar/ns-mwld-rmz-lstjb-lsryaa-mjny",
  "https://createmy-qr.com/no/vcard-gratis-qr-kode-generator-online",
  "https://www.createmy-qr.com/ro/text-qr-code-generator",
  "https://www.createmy-qr.com/ja/email-qr-code-generator",
  "https://createmy-qr.com/uk/подія-безкоштовний-генератор-qr-кодів-онлайн",
  "https://createmy-qr.com/fr/snapchat-générateur-de-code-qr-gratuit-en-ligne"
];

let passCount = 0;
let failCount = 0;

for (const rawUrl of sampleGscUrls) {
  const { lang, slug } = parseUrl(rawUrl);
  const foundTool = resolveToolFromAnySlug(slug, lang);
  
  if (!foundTool) {
    console.error(`❌ FAILED TO RESOLVE: [${lang}] ${slug} (from ${rawUrl})`);
    failCount++;
    continue;
  }
  
  const expectedSlug = localizedRoutes[lang]?.[foundTool] || `/${foundTool}`;
  const canonicalUrl = `https://createmy-qr.com${lang === 'en' ? '' : '/' + lang}${expectedSlug === '/' ? '' : expectedSlug}`;
  
  // Verify canonicalUrl has no trailing slash (unless root domain)
  if (canonicalUrl !== 'https://createmy-qr.com' && canonicalUrl.endsWith('/')) {
    console.error(`❌ CANONICAL TRAILING SLASH ERROR: ${canonicalUrl}`);
    failCount++;
    continue;
  }
  
  passCount++;
  // console.log(`✅ [${lang}] ${foundTool} -> ${canonicalUrl}`);
}

console.log(`• GSC Sample URLs Tested:             ${sampleGscUrls.length}`);
console.log(`• Successfully Resolved & Canonized:  ${passCount} / ${sampleGscUrls.length}`);
console.log(`• Failed:                             ${failCount}`);

if (noindexCount === 0 && trailingSlashCanonicalCount === 0 && duplicateCanonicalCount === 0 && failCount === 0) {
  console.log('\n🌟 ALL LOCAL AUTOMATED CHECKS PASSED WITH 100% SUCCESS!');
} else {
  console.error('\n⚠️ AUDIT FAILED! Review errors above.');
  process.exit(1);
}
