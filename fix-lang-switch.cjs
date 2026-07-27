const fs = require('fs');

const layoutPath = 'src/layouts/MainLayout.jsx';
let content = fs.readFileSync(layoutPath, 'utf8');

// 1. Fix decodeURIComponent for location.pathname
content = content.replace(
  /const pathParts = location\.pathname\.split\('\/'\)\.filter\(Boolean\);/g,
  `const decodedPath = decodeURIComponent(location.pathname);\n  const pathParts = decodedPath.split('/').filter(Boolean);`
);

content = content.replace(
  /let slug = location\.pathname;/g,
  `let slug = decodedPath;`
);

// 2. Add prefetch onMouseEnter to language buttons to fix the delay
content = content.replace(
  /onClick=\{\(\) => changeLanguage\(lang\.code\)\}/g,
  `onMouseEnter={() => i18n.loadLanguages(lang.code)} onClick={() => changeLanguage(lang.code)}`
);

fs.writeFileSync(layoutPath, content);
console.log('MainLayout patched successfully.');

// Let's also patch Footer.jsx because it has the exact same path splitting logic!
const footerPath = 'src/components/Footer.jsx';
if (fs.existsSync(footerPath)) {
  let footerContent = fs.readFileSync(footerPath, 'utf8');
  footerContent = footerContent.replace(
    /const pathParts = location\.pathname\.split\('\/'\)\.filter\(Boolean\);/g,
    `const decodedPath = decodeURIComponent(location.pathname);\n  const pathParts = decodedPath.split('/').filter(Boolean);`
  );
  footerContent = footerContent.replace(
    /let slug = location\.pathname;/g,
    `let slug = decodedPath;`
  );
  fs.writeFileSync(footerPath, footerContent);
  console.log('Footer patched successfully.');
}
