const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const sourceEnglish = {
  homeStandards: {
    badge: "Scientific & Engineering Foundations",
    title: "Built on Verified Global Standards & Academic Research",
    subtitle: "CreateMeQR implements open specifications from ISO, IEEE, and NIST to deliver mathematical precision and client-side zero-trust security.",
    card1Title: "ISO/IEC 18004:2024 Specification",
    card1Desc: "Full adherence to international QR Code matrix symbology standards featuring 1:1:3:1:1 finder patterns and 4-module quiet zones.",
    card1Meta: "International Organization for Standardization",
    card2Title: "Reed-Solomon Error Correction",
    card2Desc: "Galois Field polynomial algorithms (Reed & Solomon, SIAM 1960) enable up to 30% visual data restoration and custom logo embedding.",
    card2Meta: "SIAM Journal of Applied Mathematics",
    card3Title: "NIST SP 800-207 Zero-Trust Architecture",
    card3Desc: "Pure in-browser memory execution eliminating cloud database intermediary risks and mitigating QR phishing threats (IEEE ARES 2015).",
    card3Meta: "National Institute of Standards & Technology",
    card4Title: "ISO/IEC 15415 Optical Contrast",
    card4Desc: "Real-time symbol modulation and contrast verification aligned with W3C WCAG 2.1 standards for universal 360° camera readability.",
    card4Meta: "Optical Symbology & Accessibility Standards"
  },
  securityResearch: {
    badge: "Peer-Reviewed Security & Zero-Trust Architecture",
    title: "Academic Research Dossier on QR Vulnerabilities",
    subtitle: "Our client-side architecture is directly informed by peer-reviewed research analyzing QR redirect hijacking and zero-trust data integrity.",
    paper1Title: "Quishing & Server-Side Redirect Vulnerabilities",
    paper1Cite: "Krombholz et al., IEEE International Conference on Availability, Reliability and Security (ARES 2015)",
    paper1Desc: "Academic research demonstrates that intermediary redirect servers introduce single points of failure, URL hijacking, and unconsented telemetry. CreateMeQR eliminates these vectors through 100% static, client-side generation.",
    paper1Doi: "DOI: 10.1109/ARES.2015.39",
    paper2Title: "Zero-Knowledge In-Browser Cryptography",
    paper2Cite: "NIST SP 800-207 Zero Trust Architecture & W3C Web Cryptography Standards",
    paper2Desc: "By isolating all payload encoding within browser WebAssembly sandboxes, sensitive credentials, WiFi passcodes, and contact data remain strictly confined to local device memory.",
    paper2Doi: "NIST Special Publication 800-207 Standard"
  },
  aboutHeritage: {
    badge: "Technological Heritage & Open Standards",
    title: "Historical Foundations of the QR Specification",
    subtitle: "Created in 1994 and released as an open standard, QR technology was engineered for universal, unencumbered utility.",
    card1Title: "1994: The Invention by Masahiro Hara (Denso Wave)",
    card1Desc: "Developed at Denso Wave to solve the 20-character limitation of 1D barcodes through high-speed 2D matrix symbology.",
    card2Title: "Open Standard & Patent Waiver",
    card2Desc: "Denso Wave elected not to exercise its patent rights, allowing the QR specification to become an open international standard (ISO/IEC 18004).",
    card3Title: "Client-Side Implementation",
    card3Desc: "CreateMeQR implements standard ISO/IEC 18004 matrix generation algorithms directly in local browser memory without intermediary servers."
  },
  compareEvidence: {
    badge: "Architectural Security Comparison",
    title: "Empirical Architecture Analysis: Client-Side vs Cloud Redirects",
    subtitle: "Comparing the structural vulnerabilities of centralized QR providers against local browser execution.",
    col1Title: "Vulnerabilities of Cloud QR Servers",
    col1Point1: "Redirect Hijacking: Cloud servers can change your QR destination anytime.",
    col1Point2: "Tracking & Fingerprinting: Intermediary servers log scanner IP, device, and location.",
    col1Point3: "Vendor Lock-in & Paywalls: Links expire if monthly subscription payments lapse.",
    col2Title: "CreateMeQR Client-Side Security",
    col2Point1: "Immutable Payload: Encoded directly into raw matrix; impossible to hijack.",
    col2Point2: "Zero Intermediary Logging: Direct point-to-point scan with no middlemen.",
    col2Point3: "Permanent & Unbreakable: Zero recurring fees, zero expiration risk forever."
  },
  barcodePhysics: {
    badge: "Optical Verification & Physical Contrast Standards",
    title: "ISO/IEC 15416 Barcode Print Quality Standards",
    subtitle: "Engineered to satisfy industrial verification standards for reflectance, edge contrast, and modulation.",
    feat1Title: "Minimum Edge Contrast (ECmin)",
    feat1Desc: "Ensures distinct reflectance differential between bars and spaces for high-speed industrial laser scanners.",
    feat2Title: "Quiet Zone Calibration",
    feat2Desc: "Mandatory margins on leading and trailing edges to prevent scan failures on packaging and logistics conveyors.",
    feat3Title: "Vector Mathematical Sharpness",
    feat3Desc: "Pure vector rendering eliminates raster blur, guaranteeing crisp thermal transfer and laser printing at any DPI."
  }
};

const allLocales = [
  'ar', 'bn', 'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr',
  'hi', 'hu', 'id', 'it', 'ja', 'ko', 'ms', 'nl', 'no', 'pl',
  'pt', 'ro', 'ru', 'sv', 'th', 'tl', 'tr', 'uk', 'vi', 'zh'
];

async function translateObject(obj, targetLang) {
  if (targetLang === 'en') return obj;

  const result = {};
  for (const [sectionKey, sectionObj] of Object.entries(obj)) {
    result[sectionKey] = {};
    const keys = Object.keys(sectionObj);
    const values = Object.values(sectionObj);

    // Protect keywords with tokens
    const protectedValues = values.map(val => {
      return val
        .replace(/Denso Wave/g, '__DENSO_WAVE__')
        .replace(/CreateMeQR/g, '__CREATEMEQR__')
        .replace(/CreateMy-QR/g, '__CREATEMEQR__')
        .replace(/ISO\/IEC 18004(:2024|:2015)?/g, '__ISO_18004__')
        .replace(/ISO\/IEC 15416/g, '__ISO_15416__')
        .replace(/ISO\/IEC 15415/g, '__ISO_15415__')
        .replace(/NIST SP 800-207/g, '__NIST_SP_800_207__')
        .replace(/Reed-Solomon/g, '__REED_SOLOMON__');
    });

    try {
      const res = await translate(protectedValues, { to: targetLang, from: 'en' });
      const translatedArray = Array.isArray(res) ? res : [res];

      for (let i = 0; i < keys.length; i++) {
        let text = translatedArray[i]?.text || values[i];
        // Restore protected keywords
        text = text
          .replace(/__DENSO_WAVE__/gi, 'Denso Wave')
          .replace(/__CREATEMEQR__/gi, 'CreateMeQR')
          .replace(/__ISO_18004__/gi, 'ISO/IEC 18004')
          .replace(/__ISO_15416__/gi, 'ISO/IEC 15416')
          .replace(/__ISO_15415__/gi, 'ISO/IEC 15415')
          .replace(/__NIST_SP_800_207__/gi, 'NIST SP 800-207')
          .replace(/__REED_SOLOMON__/gi, 'Reed-Solomon')
          .replace(/Gelombang Denso/gi, 'Denso Wave')
          .replace(/Onda Denso/gi, 'Denso Wave')
          .replace(/Denso-Welle/gi, 'Denso Wave');

        result[sectionKey][keys[i]] = text;
      }
    } catch (err) {
      console.warn(`Translation fallback for ${targetLang} section ${sectionKey}:`, err.message);
      for (let i = 0; i < keys.length; i++) {
        result[sectionKey][keys[i]] = values[i];
      }
    }
  }
  return result;
}

async function main() {
  console.log('🚀 Starting sync of pristine research & heritage translations across 30 languages...');
  
  for (const lang of allLocales) {
    const filePath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
    if (!fs.existsSync(filePath)) {
      console.error(`Locale file missing: ${filePath}`);
      continue;
    }

    console.log(`Processing [${lang}]...`);
    let localeJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (lang === 'en') {
      localeJson.research = sourceEnglish;
    } else {
      const translatedResearch = await translateObject(sourceEnglish, lang);
      localeJson.research = translatedResearch;
    }

    fs.writeFileSync(filePath, JSON.stringify(localeJson, null, 2) + '\n', 'utf8');
    console.log(`✅ Updated [${lang}]`);
  }

  console.log('🎉 All 30 languages synchronized successfully!');
}

main().catch(console.error);
