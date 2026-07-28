const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Extract the layout component name from the file name
  // e.g., LayoutWhatsApp.jsx -> hq-layout-whatsapp
  const layoutName = file.replace('Layout', '').replace('.jsx', '').toLowerCase();
  const scope = `.hq-layout-${layoutName}`;

  // We inject a robust, STRICTLY SCOPED mobile override CSS block INSIDE the template literal!
  // Notice we use "div[class*=...]" to ensure we NEVER target SVG icons (like Lucide React)
  const mobileCSS = `
        /* STRICTLY SCOPED MOBILE FIXES (Phase 4) */
        @media (max-width: 768px) {
          /* General Container fixes */
          ${scope} .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling */
          ${scope} div[class*="-phone"], ${scope} div[class*="-player"], ${scope} div[class*="-mockup"], ${scope} div[class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          ${scope} div[class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          ${scope} div.hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          ${scope} div[class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          ${scope} div.hq-li-avatar, ${scope} div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          ${scope} div.hq-li-profile-info, ${scope} div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          ${scope} div.hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          ${scope} div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          ${scope} div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          ${scope} div[style*="flexDirection: 'row'"], ${scope} div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          ${scope} div[class*="-bento"], ${scope} div[class*="-features"], ${scope} div[class*="-grid"], ${scope} div[class*="-row"], ${scope} div[class*="bento"], ${scope} div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          ${scope} div[class*="-main"], ${scope} div[class*="-wrapper"], ${scope} div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          ${scope} h1, ${scope} h2, ${scope} h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    `;

  // First, completely strip ANY previous GLOBAL MOBILE FIXES block
  content = content.replace(/\/\* GLOBAL MOBILE FIXES[\s\S]*?\}\s*\}\s*\n/g, '');
  content = content.replace(/\/\* STRICTLY SCOPED MOBILE FIXES[\s\S]*?\}\s*\}\s*\n/g, '');

  if (content.includes('</style>')) {
    // Insert new block
    content = content.replace(/\`\s*\}\s*<\/style>/, mobileCSS + '\n      `}</style>');
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Injected strict scoped mobile CSS into ${file}`);
  }
}

console.log(`dY? Scoped CSS fixes injected into ${modifiedCount} files.`);
