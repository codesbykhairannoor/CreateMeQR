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

const researchDataEnglish = {
  homeStandards: {
    badge: "Scientific & Engineering Foundations",
    title: "Built on Verified Global Standards & Academic Research",
    subtitle: "CreateMy-QR implements open specifications from ISO, IEEE, and NIST to deliver mathematical precision and client-side zero-trust security.",
    card1Title: "ISO/IEC 18004:2015 Specification",
    card1Desc: "Full adherence to the international QR Code matrix symbology standard with 1:1:3:1:1 finder patterns and 4-module quiet zones.",
    card1Meta: "International Organization for Standardization",
    card2Title: "Reed-Solomon Error Correction",
    card2Desc: "Polynomial Galois field algorithms (Reed & Solomon, SIAM 1960) allowing up to 30% visual data restoration and custom logo embedding.",
    card2Meta: "SIAM Journal of Applied Mathematics",
    card3Title: "NIST SP 800-207 Zero-Trust Architecture",
    card3Desc: "Pure in-browser memory execution that eliminates cloud database middleman risk and mitigates QR phishing threats (IEEE ARES 2015).",
    card3Meta: "National Institute of Standards & Technology",
    card4Title: "ISO/IEC 15415 Optical Contrast",
    card4Desc: "Real-time symbol modulation and contrast checking aligning with W3C WCAG 2.1 standards for universal 360° camera readability.",
    card4Meta: "Optical Symbology & Accessibility Standard"
  },
  securityResearch: {
    badge: "Peer-Reviewed Security Literature",
    title: "Architectural Alignment with Academic Cybersecurity Research",
    subtitle: "Our zero-knowledge client-side model is informed by published vulnerability analyses on dynamic QR servers and cloud tracking.",
    paper1Title: "Quishing & Server-Side Redirect Vulnerabilities",
    paper1Cite: "Krombholz et al., IEEE International Conference on Availability, Reliability and Security (ARES 2015)",
    paper1Desc: "Research demonstrates that centralized dynamic QR servers introduce single-point-of-failure risks, URL hijacking, and unconsented telemetry. CreateMy-QR resolves this by generating 100% static, client-side vector files.",
    paper1Doi: "DOI: 10.1109/ARES.2015.39",
    paper2Title: "Zero-Knowledge In-Browser Cryptography",
    paper2Cite: "NIST SP 800-207 Zero Trust Architecture & W3C Web Cryptography Working Group",
    paper2Desc: "By isolating all payload encoding within the browser's WebAssembly sandbox, no unencrypted credentials, WiFi keys, or vCard identities ever touch a network wire.",
    paper2Doi: "NIST Special Publication 800-207"
  },
  aboutHeritage: {
    badge: "Technological Heritage",
    title: "Honoring the 1994 Open-Standard Invention",
    subtitle: "The QR code was invented to democratize fast, reliable information exchange without proprietary paywalls.",
    card1Title: "Masahiro Hara & Denso Wave (1994)",
    card1Desc: "Invented by Masahiro Hara, the QR code overcame the 20-character limitation of 1D barcodes. Denso Wave made the patent open and free to the world, inspiring our 100% free ethos.",
    card2Title: "Global Standardization Milestones",
    card2Desc: "Standardized as AIM ITS in 1997, JIS X 0510 in 1999, and ISO/IEC 18004 in 2000. We maintain strict backward and forward compatibility with every version.",
    card3Title: "European Inventor Award (2014)",
    card3Desc: "Recognized globally for transforming logistics, healthcare, and digital interaction. We carry forward this mission through high-resolution client-side tooling."
  },
  compareEvidence: {
    badge: "Empirical Architecture Analysis",
    title: "Why Client-Side Beats Cloud-Hosted Generators",
    subtitle: "Comparing the architectural differences between traditional redirect-based generators and CreateMy-QR's local execution model.",
    col1Title: "Cloud Redirect Models (Competitors)",
    col1Point1: "Server downtime breaks your printed QR codes permanently.",
    col1Point2: "User scan data and IP addresses logged in commercial databases.",
    col1Point3: "Subscription fees required to prevent link expiration.",
    col2Title: "Direct Client-Side Model (CreateMy-QR)",
    col2Point1: "Direct encoding: QR codes work forever without any server dependency.",
    col2Point2: "Zero tracking: Scans connect directly from camera to destination.",
    col2Point3: "100% free forever: No paywalls, no scan limits, no expired links."
  },
  barcodePhysics: {
    badge: "Optical Verification",
    title: "ISO/IEC 15416 Print Quality & Contrast Standards",
    subtitle: "Engineered to satisfy industrial barcode verification standards for retail, warehousing, and healthcare.",
    feat1Title: "Symbol Contrast & Reflectance",
    feat1Desc: "Complies with ISO/IEC 15416 minimum reflectance difference (Rmin/Rmax) to prevent scanner laser beam dispersion.",
    feat2Title: "Modulation & Edge Determination",
    feat2Desc: "Vector SVG rendering guarantees razor-sharp bar edges with sub-pixel precision across thermal and laser printers.",
    feat3Title: "Quiet Zone Integrity",
    feat3Desc: "Enforces mandatory leading and trailing white spaces required by GS1 and EAN/UPC specifications."
  }
};

// Flatten English values for batch translation
const keysList = [];
const stringList = [];

function flatten(prefix, obj) {
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object') {
      flatten(fullKey, v);
    } else {
      keysList.push(fullKey);
      stringList.push(v);
    }
  }
}

flatten('', researchDataEnglish);
console.log(`Total strings in research batch to translate: ${stringList.length}`);

function unflatten(flatKeys, values) {
  const result = {};
  for (let i = 0; i < flatKeys.length; i++) {
    const parts = flatKeys[i].split('.');
    let curr = result;
    for (let j = 0; j < parts.length - 1; j++) {
      if (!curr[parts[j]]) curr[parts[j]] = {};
      curr = curr[parts[j]];
    }
    curr[parts[parts.length - 1]] = values[i];
  }
  return result;
}

const localesDir = path.join(__dirname, 'public', 'locales');

async function run() {
  console.log('🚀 Starting Batch Translation of Research & Standards Sections for 30 Languages...\n');

  // Inject English directly first
  const enPath = path.join(localesDir, 'en', 'translation.json');
  const enTrans = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  enTrans.research = researchDataEnglish;
  fs.writeFileSync(enPath, JSON.stringify(enTrans, null, 2), 'utf8');
  console.log('✅ [en] Injected English research structure.');

  for (const [langCode, googleLang] of Object.entries(LANG_MAP)) {
    console.log(`Translating research bundle for [${langCode}] (${googleLang})...`);
    try {
      const res = await translate(stringList, { from: 'en', to: googleLang });
      const translatedTexts = res.map(r => r.text);
      const translatedObject = unflatten(keysList, translatedTexts);

      const transPath = path.join(localesDir, langCode, 'translation.json');
      let trans = {};
      if (fs.existsSync(transPath)) {
        trans = JSON.parse(fs.readFileSync(transPath, 'utf8'));
      }
      trans.research = translatedObject;
      fs.writeFileSync(transPath, JSON.stringify(trans, null, 2), 'utf8');
      console.log(`✅ [${langCode}] Injected 5 research sections.`);
    } catch (err) {
      console.error(`❌ Error translating research for [${langCode}]:`, err.message);
    }
  }

  console.log('\n🎉 Translation of Research & Standards Sections Complete across all 30 Languages!');
}

run();
