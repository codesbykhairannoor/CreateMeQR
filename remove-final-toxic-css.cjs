const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Remove the final toxic CSS block that was missed
  const toxicRegex = /\/\*\s*LinkedIn specific avatar overlaps\s*\*\/[\s\S]*?\}\s*\.hq-layout-[a-z]+ div\.hq-li-cover \{ height: 100px !important; \}/gi;
  
  content = content.replace(toxicRegex, '');
  
  // Clean up any empty spaces left over
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Cleaned final toxic CSS from ${file}`);
  }
}

console.log(`Removed final toxic CSS from ${modifiedCount} files.`);
