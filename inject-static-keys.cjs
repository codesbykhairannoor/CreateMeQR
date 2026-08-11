const fs = require('fs');
const path = require('path');

const enFile = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

enData.static = {
  about: {
    seoTitle: "About Us",
    heroTitle: "About Us",
    heroSubtitle: "Democratizing Document & QR Tools",
    mission: "Our Mission",
    missionDesc: "We believe premium QR utilities should be completely free, private, and accessible to everyone.",
    privacy: "Absolute Privacy",
    privacyDesc: "Everything is processed locally in your browser. Your files never touch a server.",
    fast: "Lightning Fast",
    fastDesc: "WebAssembly allows CreateMy-QR to run directly on your device CPU, bypassing upload bottlenecks.",
    global: "For Everyone",
    globalDesc: "Translated into 30 languages. No subscriptions, no hidden fees. Just world-class tools.",
    origin: "The Origin",
    originTitle: "The Origin Story",
    architecture: "Architecture",
    architectureTitle: "Technology Stack",
    guarantee: "Our Guarantee",
    guaranteeDesc: "CreateMy-QR is built to remain completely free. Our mission is to democratize utilities for everyone.",
    join: "Join the Movement",
    joinDesc: "Experience the fastest, safest, and most advanced QR suite on the web."
  },
  compare: {
    seoTitle: "Compare Tools",
    heroTitle: "Compare Tools",
    heroSubtitle: "See how we stack up against the competition.",
    why: "Why CreateMy-QR?",
    whyDesc: "We bring the server to your browser. Say goodbye to upload limits, queue times, and privacy risks.",
    vs: "Us vs The Cloud",
    tableFeature: "Feature",
    tableUs: "CreateMy-QR",
    tableThem: "Traditional Cloud Tools",
    cost: "100% Free Forever",
    costThem: "$10-$30 / month",
    privacyText: "Zero-Upload (Browser only)",
    privacyThem: "Uploaded to servers",
    limits: "Unlimited (CPU Bound)",
    limitsThem: "Strict file size & daily limits",
    speed: "Instant (No network delay)",
    speedThem: "Slow (Upload/Download wait)",
    offline: "Works Offline",
    offlineThem: "Requires fast internet"
  },
  languages: {
    seoTitle: "Supported Languages",
    heroTitle: "Supported Languages",
    heroSubtitle: "We speak your language. Available in 30 global languages.",
    globalVision: "A Global Vision",
    globalVisionDesc: "Accessibility is a human right. We painstakingly translated our entire suite so you can work comfortably in your native tongue.",
    listTitle: "Select Your Language",
    localHistory: "Local Storage Enabled",
    nativeSupport: "Native Character Support"
  },
  pricing: {
    seoTitle: "100% Free Pricing",
    heroTitle: "Pricing",
    heroSubtitle: "The best things in life are free.",
    cost: "$0",
    costPeriod: "/ forever",
    features: "Included Features",
    f1: "Unlimited QR Generations",
    f2: "Zero Tracking & Zero Ads",
    f3: "Client-Side Processing",
    f4: "Local History Database",
    whyFree: "How is it free?",
    whyFreeDesc: "Because we don't process your files on our servers, we don't have massive server bills. Your device does the heavy lifting via WebAssembly."
  },
  privacy: {
    seoTitle: "Privacy Policy",
    heroTitle: "Privacy Policy",
    heroSubtitle: "Your data is yours. We keep it that way.",
    zeroTracking: "Zero Tracking",
    zeroTrackingDesc: "We don't use invasive trackers or log your generated contents.",
    clientSide: "Client-Side Only",
    clientSideDesc: "All QR codes are generated directly inside your browser memory.",
    ssl: "SSL Encrypted",
    sslDesc: "Even though nothing is uploaded, our site is served over strict HTTPS.",
    policyTitle: "The Zero-Upload Commitment",
    policyDesc: "Unlike other platforms, CreateMy-QR operates entirely on the client-side. When you generate a QR code, the process happens locally on your machine."
  },
  security: {
    seoTitle: "Security Architecture",
    heroTitle: "Security Architecture",
    heroSubtitle: "Engineered for absolute data safety.",
    wasm: "Powered by WebAssembly",
    wasmDesc: "We compiled high-performance libraries into Wasm, allowing complex generation to happen securely in your browser sandbox.",
    noServers: "No Server Uploads",
    noServersDesc: "Your data physically cannot be breached from our servers, because it never touches them.",
    iso: "ISO Compliant",
    isoDesc: "Our QR generations comply with the strict ISO/IEC 18004:2015 global standards."
  },
  terms: {
    seoTitle: "Terms of Service",
    heroTitle: "Terms of Service",
    heroSubtitle: "Simple, transparent, and user-friendly terms.",
    usage: "Acceptable Use",
    usageDesc: "You may use our free tools for both personal and commercial purposes without attribution.",
    liability: "No Liability",
    liabilityDesc: "The tools are provided 'as is' without warranties. We are not liable for any issues arising from generated codes.",
    localData: "Local Data",
    localDataDesc: "Your history is stored in your own browser via IndexedDB. If you clear your browser data, your history is permanently deleted."
  },
  usecases: {
    seoTitle: "Use Cases",
    heroTitle: "Use Cases",
    heroSubtitle: "Discover how industries leverage our secure QR suite.",
    retail: "Retail & E-Commerce",
    retailDesc: "Generate product-specific barcodes or discount QR codes instantly at the POS without waiting on a slow network.",
    events: "Events & Ticketing",
    eventsDesc: "Create vCard and Event QRs for badges that scan flawlessly across thousands of attendees.",
    restaurants: "Restaurants",
    restaurantsDesc: "Generate beautiful, high-contrast WiFi and Menu PDFs that are perfectly scannable in low-light environments."
  }
};

fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');
console.log('Injected static keys into en/translation.json');
