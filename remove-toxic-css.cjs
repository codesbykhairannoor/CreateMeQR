const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Remove Native Mockup Scaling block
  content = content.replace(/\/\*\s*NATIVE MOCKUP SCALING:[\s\S]*?\/\* Do not override height or aspect-ratio so internal CSS stays intact! \*\/\s*\}/g, '');
  
  // Remove Fix Hero Stacking block
  content = content.replace(/\/\*\s*Fix Hero Stacking safely\s*\*\/[\s\S]*?padding: 32px 0 !important;\s*gap: 24px !important;\s*\}/g, '');

  // Remove Fix Grid Squeezing block
  content = content.replace(/\/\*\s*Fix Grid Squeezing \(Video, Image, PDF features\)\s*\*\/[\s\S]*?flex-direction: column !important;\s*\}/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Cleaned toxic CSS from ${file}`);
  }
}

console.log(`Removed toxic CSS from ${modifiedCount} files.`);
