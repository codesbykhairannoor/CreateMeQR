const fs = require('fs');

let content = fs.readFileSync('generate-ssg.cjs', 'utf8');

// There are two identical blocks to remove
for (let i = 0; i < 2; i++) {
  const startStr = 'const localizedStaticSeo = `<main id="static-seo"';
  const endStr = 'newHtml = newHtml.replace(/<main id="static-seo"[\\s\\S]*?<\\/main>/, localizedStaticSeo);';
  
  const sIdx = content.indexOf(startStr);
  if (sIdx !== -1) {
    const eIdx = content.indexOf(endStr, sIdx) + endStr.length;
    // We also want to remove any trailing whitespace/newlines
    content = content.slice(0, sIdx) + content.slice(eIdx);
  }
}

fs.writeFileSync('generate-ssg.cjs', content);
console.log('Removed static-seo injection.');
