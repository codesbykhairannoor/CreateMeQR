const fs = require('fs');
const path = require('path');

const pages = [
  'AboutUs.jsx', 'Compare.jsx', 'Languages.jsx', 'Pricing.jsx',
  'Privacy.jsx', 'Security.jsx', 'Terms.jsx', 'UseCases.jsx'
];

pages.forEach(page => {
  const filePath = path.join(__dirname, 'src', 'pages', page);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <title>{t(...)} | {t(...)}</title> with <title>{`${t(...)} | ${t(...)}`}</title>
  const regex = /<title>({t\([^)]+\)})\s*\|\s*({t\([^)]+\)})<\/title>/g;
  
  content = content.replace(regex, (match, p1, p2) => {
    return `<title>{\`${p1.slice(1, -1)} | ${p2.slice(1, -1)}\`}</title>`;
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched ${page}`);
});
