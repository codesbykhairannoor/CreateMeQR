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
  if (content.includes('</style>') && !content.includes('/* GLOBAL MOBILE FIXES */')) {
    const mobileCSS = `
        /* GLOBAL MOBILE FIXES */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling (TikTok, Snapchat, WhatsApp, YouTube, etc.) */
          [class*="-phone"], [class*="-player"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 480px !important;
            aspect-ratio: 9/18 !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          [class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
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
          
          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    `;
    
    // Replace `}`</style> with mobileCSS + `}</style>
    content = content.replace(/\`\s*\}\s*<\/style>/, mobileCSS + '\n      `}</style>');
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Injected mobile CSS into ${file}`);
  }
}

console.log(`dY? Mobile CSS fixes injected into ${modifiedCount} files.`);
