const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'landing');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

let changedFiles = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Find the h2 that has the faqTitle
  const regex = /<h2\s+style=\{\{([^}]*)\}\}\s*>\s*\{t\('?landing\.faqTitle'?\)\s*\}|\{t\.faqTitle[^\}]*\}\s*<\/h2>/g;
  
  // Wait, let's just do a simple string replace for the wrapper div if possible.
  // Actually, let's just replace `<h2 style={{ ` with `<h2 style={{ paddingTop: 120, `
  // But ONLY for the FAQ h2.
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('{t.faqTitle}') || lines[i].includes("{t('landing.faqTitle')}")) {
      if (lines[i].includes('<h2')) {
        // if it already has paddingTop, don't add
        if (!lines[i].includes('paddingTop')) {
          lines[i] = lines[i].replace('style={{', 'style={{ paddingTop: 120,');
        }
      } else if (lines[i-1] && lines[i-1].includes('<h2')) {
         if (!lines[i-1].includes('paddingTop')) {
          lines[i-1] = lines[i-1].replace('style={{', 'style={{ paddingTop: 120,');
        }
      }
    }
  }
  
  content = lines.join('\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Added spacing to ${file}`);
    changedFiles++;
  }
});

console.log(`Done. Changed ${changedFiles} files.`);
