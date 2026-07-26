const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace inside <h2 ...> and <h3 ...>
  // We'll use a regex that matches the tag open, its attributes, and closes the tag.
  
  content = content.replace(/<(h[23])([^>]*)>/g, (match, tag, attrs) => {
    let newAttrs = attrs;
    newAttrs = newAttrs.replace(/text-slate-900/g, 'text-zinc-900');
    newAttrs = newAttrs.replace(/font-black/g, 'font-bold');
    newAttrs = newAttrs.replace(/tracking-tight(\s|")/g, 'tracking-tighter$1');
    return `<${tag}${newAttrs}>`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated headings in ${file}`);
  }
});
