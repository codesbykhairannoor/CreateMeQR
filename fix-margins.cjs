const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'landing');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

let changedFiles = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Replace `{ marginTop: 120, maxWidth: 800, margin: '0 auto' }` 
  // with `{ marginTop: 120, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }`
  content = content.replace(/marginTop:\s*(\d+),\s*maxWidth:\s*(\d+),\s*margin:\s*'0 auto'/g, "marginTop: $1, maxWidth: $2, marginLeft: 'auto', marginRight: 'auto'");
  
  // also check if they are in different order
  content = content.replace(/maxWidth:\s*(\d+),\s*marginTop:\s*(\d+),\s*margin:\s*'0 auto'/g, "maxWidth: $1, marginTop: $2, marginLeft: 'auto', marginRight: 'auto'");
  
  // also check if margin: '0 auto' comes first
  content = content.replace(/margin:\s*'0 auto',\s*marginTop:\s*(\d+)/g, "marginLeft: 'auto', marginRight: 'auto', marginTop: $1");

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed margins in ${file}`);
    changedFiles++;
  }
});

console.log(`Done. Changed ${changedFiles} files.`);
