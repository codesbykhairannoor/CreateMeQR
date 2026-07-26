const fs = require('fs');

const megaNavPath = 'src/components/nav/MegaNav.jsx';
let content = fs.readFileSync(megaNavPath, 'utf8');

if (content.includes('const QR_CATEGORIES')) {
  content = content.replace('const QR_CATEGORIES', 'export const QR_CATEGORIES');
}
if (content.includes('const BARCODE_CATEGORIES')) {
  content = content.replace('const BARCODE_CATEGORIES', 'export const BARCODE_CATEGORIES');
}

fs.writeFileSync(megaNavPath, content);
console.log('Exported categories from MegaNav');
