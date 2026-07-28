const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. FIX IMAGE LAYOUT TEXT
  if (file === 'LayoutImage.jsx') {
    content = content.replace(
      /\{getTranslation\('featTools', 't', 1\)\}/g,
      "{translate('landing.comp1Title') || 'High Quality Rendering'}"
    );
    content = content.replace(
      /\{getTranslation\('featTools', 'd', 1\)\}/g,
      "{translate('landing.comp1Desc') || 'Get pristine quality images with zero compression artifacts.'}"
    );
    
    content = content.replace(
      /\{getTranslation\('featTools', 't', 2\)\}/g,
      "{translate('landing.comp2Title') || 'Fast & Reliable'}"
    );
    content = content.replace(
      /\{getTranslation\('featTools', 'd', 2\)\}/g,
      "{translate('landing.comp2Desc') || 'Instant processing and generation right in your browser.'}"
    );
    
    content = content.replace(
      /\{getTranslation\('featTools', 't', 3\)\}/g,
      "{translate('landing.comp3Title') || 'Fully Customizable'}"
    );
    content = content.replace(
      /\{getTranslation\('featTools', 'd', 3\)\}/g,
      "{translate('landing.comp3Desc') || 'Personalize colors, frames, and branding to fit your needs.'}"
    );
  }

  // 2. STRIP TOXIC CSS
  content = content.replace(/\/\* GLOBAL MOBILE FIXES[\s\S]*?\}\s*\}\s*\n/g, '');
  content = content.replace(/\/\* STRICTLY SCOPED MOBILE FIXES[\s\S]*?\}\s*\}\s*\n/g, '');

  // 3. INJECT DEEP MOBILE FIXES (PHASE 5)
  const layoutName = file.replace('Layout', '').replace('.jsx', '').toLowerCase();
  const scope = `.hq-layout-${layoutName}`;

  const mobileCSS = `
        /* DEEP MOBILE FIXES (Phase 5) */
        @media (max-width: 768px) {
          /* General Container fixes */
          ${scope} .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* NATIVE MOCKUP SCALING:
             Instead of crushing the height (which destroys internal CSS), 
             we use native transform scale to shrink the mockups proportionally! */
          ${scope} div[class*="-phone"], ${scope} div[class*="-player"], ${scope} div[class*="-mockup"], ${scope} div[class*="-mock"] {
            transform: scale(0.85) !important;
            transform-origin: top center !important;
            margin: 0 auto !important;
            /* Negative margin to eat up the empty space left by scaling */
            margin-bottom: -60px !important;
            /* Do not override height or aspect-ratio so internal CSS stays intact! */
          }
          
          /* Fix Hero Stacking safely */
          ${scope} div[class*="-hero"], ${scope} div[class*="-main"], ${scope} div[class*="-wrapper"], ${scope} div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
            padding: 32px 0 !important;
            gap: 24px !important;
          }
          
          /* Fix Grid Squeezing (Video, Image, PDF features) */
          ${scope} div[class*="-bento"], ${scope} div[class*="-features"], ${scope} div[class*="-grid"], ${scope} div[class*="-row"], ${scope} div[class*="bento"], ${scope} div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* LinkedIn specific avatar overlaps */
          ${scope} div.hq-li-avatar, ${scope} div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          ${scope} div.hq-li-profile-info, ${scope} div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          ${scope} div.hq-li-cover { height: 100px !important; }

          /* Ensure text wraps correctly without horizontal scroll */
          ${scope} h1, ${scope} h2, ${scope} h3, ${scope} p {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            max-width: 100% !important;
          }
        }
    `;

  if (content.includes('</style>')) {
    content = content.replace(/\`\s*\}\s*<\/style>/, mobileCSS + '\n      `}</style>');
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Injected DEEP mobile CSS into ${file}`);
  }
}

console.log(`dY? Phase 5 Deep Fixes injected into ${modifiedCount} files.`);
