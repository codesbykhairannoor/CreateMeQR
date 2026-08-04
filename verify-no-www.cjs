const fs = require('fs');
const path = require('path');

const DIRECTORIES = ['src', 'public', '/'];
const EXTENSIONS = ['.js', '.jsx', '.cjs', '.html', '.json', '.txt'];
const EXCLUDE_DIRS = ['node_modules', 'dist', '.git', '.gemini'];
const TARGET = 'www.createmy-qr.com';

let foundCount = 0;
let safeExceptions = 0;

function scan(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (EXCLUDE_DIRS.includes(item)) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scan(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (EXTENSIONS.includes(ext) || item === 'generate-sitemap.cjs' || item === 'generate-ssg.cjs') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(TARGET)) {
          // Allow exception for vercel.json where it MUST exist to match the redirect rule
          if (item === 'vercel.json' && content.includes(`"value": "www.createmy-qr.com"`)) {
             console.log(`\u2705 [SAFE] Found in vercel.json (Used for redirect trigger)`);
             safeExceptions++;
             continue;
          }
          if (item === 'audit_result.json') {
             console.log(`\u2705 [SAFE] Found in old log file: audit_result.json`);
             safeExceptions++;
             continue;
          }
          
          console.error(`\u274C [DANGER] Found WWW string in: ${fullPath}`);
          foundCount++;
        }
      }
    }
  }
}

console.log('--- STARTING WWW ERADICATION TEST ---');
for (const d of DIRECTORIES) {
  const dirPath = d === '/' ? __dirname : path.join(__dirname, d);
  if (d === '/') {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      if (EXCLUDE_DIRS.includes(item)) continue;
      const fullPath = path.join(dirPath, item);
      if (fs.statSync(fullPath).isFile()) {
        const ext = path.extname(item);
        if (EXTENSIONS.includes(ext) && item !== 'package-lock.json') {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes(TARGET)) {
            if (item === 'vercel.json') {
               console.log(`\u2705 [SAFE] Found in vercel.json (Redirect trigger)`);
               safeExceptions++;
               continue;
            }
            if (item === 'audit_result.json') {
               console.log(`\u2705 [SAFE] Found in audit_result.json (Old log)`);
               safeExceptions++;
               continue;
            }
            console.error(`\u274C [DANGER] Found WWW string in root file: ${item}`);
            foundCount++;
          }
        }
      }
    }
  } else {
    scan(dirPath);
  }
}

console.log('\\n--- TEST RESULTS ---');
if (foundCount === 0) {
  console.log(`\u2728 ALL CLEAR! 0 dangerous instances of WWW found.`);
  console.log(`(Ignored ${safeExceptions} safe instances like vercel.json redirect rules)`);
} else {
  console.error(`\u26A0\uFE0F FAILED! Found ${foundCount} dangerous instances.`);
  process.exit(1);
}
