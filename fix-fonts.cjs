const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'landing');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the font-family declarations in the components to match index.css
  content = content.replace(/font-family:\s*[^;]+;/g, 'font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated font in ${file}`);
});
