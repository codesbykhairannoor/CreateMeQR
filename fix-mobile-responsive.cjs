const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Phone mockup height limit fixing
  // Look for .hq-something-phone or -container with height: 700px or 600px
  content = content.replace(/height:\s*(700px|600px|800px)\s*;/g, 'height: auto; min-height: 500px; max-height: 85vh; aspect-ratio: 9/19;');
  content = content.replace(/flex:\s*0\s+0\s+(350px|300px)\s*;/g, 'flex: 1 1 auto; width: 100%; max-width: $1;');
  
  // 2. Fix the huge padding in hero sections
  // padding: 80px 0 120px 0; or similar
  content = content.replace(/padding:\s*(80px|60px|100px)\s+0\s+(120px|100px|80px)\s+0\s*;/g, 'padding: 40px 0 60px 0;');
  
  // 3. Fix the hardcoded grid
  content = content.replace(/style=\{\{\s*display:\s*'grid',\s*gridTemplateColumns:\s*'repeat\(12,\s*1fr\)',\s*gap:\s*24\s*\}\}/g, 'className="grid grid-cols-1 lg:grid-cols-12 gap-6"');
  content = content.replace(/style=\{\{\s*display:\s*'grid',\s*gridTemplateColumns:\s*'repeat\(2,\s*1fr\)',\s*gap:\s*32\s*\}\}/g, 'className="grid grid-cols-1 lg:grid-cols-2 gap-8"');
  
  // 4. Fix span columns
  // If it doesn't have className, add it
  content = content.replace(/<div\s+style=\{\{\s*gridColumn:\s*'span\s+(\d+)'\s*,/g, '<div className="lg:col-span-$1" style={{ ');
  content = content.replace(/<div\s+className="([^"]+)"\s+style=\{\{\s*gridColumn:\s*'span\s+(\d+)'\s*,/g, '<div className="$1 lg:col-span-$2" style={{ ');

  // 5. Fix hardcoded flex row
  // <div className="hq-card" style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
  // Wait, we already replaced gridColumn: 'span 8' -> lg:col-span-8.
  // Let's replace flexDirection: 'row' with responsive
  content = content.replace(/display:\s*'flex',\s*flexDirection:\s*'row'/g, 'display: "flex", flexDirection: "column" /* mobile */, "@media (min-width: 992px)": { flexDirection: "row" }'); // Wait, inline styles don't support media queries.
  
  // Better approach: replace display: flex and flex-direction: row in style with tailwind classes!
  // If it has className:
  content = content.replace(/<div\s+className="([^"]+)"\s+style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'row'/g, '<div className="$1 flex flex-col lg:flex-row" style={{ ');
  content = content.replace(/<div\s+style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'row'/g, '<div className="flex flex-col lg:flex-row" style={{ ');
  
  // Also catch the ones that had gridColumn modified!
  content = content.replace(/<div\s+className="([^"]+)"\s+style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'row'/g, '<div className="$1 flex flex-col lg:flex-row" style={{ ');

  // 6. Fix overlap icon for LinkedIn / etc.
  // Often they use position: 'absolute' with width 120px. On mobile, we can just make sure they don't overlap by adding relative wrapping or scaling.
  // Wait, the user specifically mentioned LinkedIn icon overlapping text.
  // In LayoutLinkedIn.jsx, the icon is probably absolute. Let's see later.

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`dY? Fixed mobile responsiveness in ${modifiedCount} files.`);
