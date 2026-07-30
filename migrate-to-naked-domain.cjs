const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  'src',
  'public',
  '/'
];

const EXTENSIONS = ['.js', '.jsx', '.cjs', '.html', '.json', '.txt'];
const EXCLUDE_DIRS = ['node_modules', 'dist', '.git', '.gemini'];
const TARGET = 'https://createmy-qr.com';
const REPLACEMENT = 'https://createmy-qr.com';

function scanAndReplace(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (EXCLUDE_DIRS.includes(item)) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanAndReplace(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (EXTENSIONS.includes(ext) || item === 'generate-sitemap.cjs' || item === 'generate-ssg.cjs') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(TARGET)) {
          console.log(`Replacing in: ${fullPath}`);
          const newContent = content.split(TARGET).join(REPLACEMENT);
          fs.writeFileSync(fullPath, newContent, 'utf8');
        }
      }
    }
  }
}

console.log('Starting Naked Domain Migration...');
for (const d of DIRECTORIES) {
  const dirPath = d === '/' ? __dirname : path.join(__dirname, d);
  if (d === '/') {
    // Only process files in root, not dirs
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      if (EXCLUDE_DIRS.includes(item)) continue;
      const fullPath = path.join(dirPath, item);
      if (fs.statSync(fullPath).isFile()) {
        const ext = path.extname(item);
        if (EXTENSIONS.includes(ext) && item !== 'package-lock.json') {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes(TARGET)) {
            console.log(`Replacing in root file: ${fullPath}`);
            const newContent = content.split(TARGET).join(REPLACEMENT);
            fs.writeFileSync(fullPath, newContent, 'utf8');
          }
        }
      }
    }
  } else {
    scanAndReplace(dirPath);
  }
}

console.log('Migration Complete.');
