const fs = require('fs');

let content = fs.readFileSync('src/layouts/MainLayout.jsx', 'utf8');

// Add import
if (!content.includes('import MegaNav')) {
  content = content.replace("import Footer from '../components/Footer';", "import Footer from '../components/Footer';\nimport MegaNav from '../components/nav/MegaNav';");
}

// Replace the old nav block with <MegaNav currentLangCode={currentLangCode} />
content = content.replace(/<div className="hidden lg:flex items-center gap-10 absolute left-1\/2 -translate-x-1\/2">[\s\S]*?<\/div>\s*<\/div>\s*<a href=\{`\$\{currentLangCode === 'en' \? '' : '\/' \+ currentLangCode\}\/about/g, 'REPLACE_ME_TEMPORARY_ABOUT');

// Wait, the previous block I added in MainLayout had:
// <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
// ...
// </div>
// Let's replace that exact div.

content = content.replace(/<div className="hidden lg:flex items-center gap-10 absolute left-1\/2 -translate-x-1\/2">[\s\S]*?<\/div>(\s*<div className="flex items-center gap-2">)/, "<MegaNav currentLangCode={currentLangCode} />$1");

fs.writeFileSync('src/layouts/MainLayout.jsx', content);
