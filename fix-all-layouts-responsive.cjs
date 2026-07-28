const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // We inject a robust mobile override CSS block INSIDE the template literal!
  const mobileCSS = `
        /* GLOBAL MOBILE FIXES (Phase 3) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling (TikTok, Snapchat, WhatsApp, YouTube, etc.) */
          [class*="-phone"], [class*="-player"], [class*="-mockup"], [class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          [class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          [class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-li-avatar, [class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-li-profile-info, [class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          div[style*="flexDirection: 'row'"], div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Phase 2 & 3: PDF, App Store, WiFi, Link In Bio, Video, Audio, File fixes */
          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          [class*="-bento"], [class*="-features"], [class*="-grid"], [class*="-row"], [class*="bento"], [class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          [class*="-main"], [class*="-wrapper"], [class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    `;

  if (content.includes('/* GLOBAL MOBILE FIXES')) {
    // Replace the old block
    content = content.replace(/\/\* GLOBAL MOBILE FIXES[\s\S]*?\}\s*\}\s*\n/g, mobileCSS + '\n');
  } else if (content.includes('</style>')) {
    // Insert new block
    content = content.replace(/\`\s*\}\s*<\/style>/, mobileCSS + '\n      `}</style>');
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Injected updated mobile CSS into ${file}`);
  }
}

console.log(`dY? Updated Phase 3 mobile CSS fixes injected into ${modifiedCount} files.`);
