const fs = require('fs');
const path = require('path');
const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  let changed = false;
  
  // Regex to match <h2 ...> or <h3 ...> and replace font-bold with font-extrabold, tracking-tighter with tracking-tight
  content = content.replace(/<(h[2-6])[^>]*>/g, match => {
    if (match.includes('font-bold')) {
      changed = true;
      let newMatch = match.replace('font-bold', 'font-extrabold');
      newMatch = newMatch.replace(/tracking-tighter/g, 'tracking-tight');
      return newMatch;
    }
    return match;
  });
  
  if (changed) {
    fs.writeFileSync(p, content);
    console.log('Updated headings in ' + f);
  }
});
