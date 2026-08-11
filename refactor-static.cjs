const fs = require('fs');
const path = require('path');

const destDir = 'd:\\qr-and-qr\\src\\pages';
const files = ['AboutUs.jsx', 'Compare.jsx', 'Languages.jsx', 'Pricing.jsx', 'Privacy.jsx', 'Security.jsx', 'Terms.jsx', 'UseCases.jsx'];

for (const file of files) {
  const filePath = path.join(destDir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Swap getUiTranslations for useTranslation
  content = content.replace(/const t = getUiTranslations\(currentLang\);/g, 'const { t } = useTranslation();');
  
  // 2. Fix the component signature
  const componentName = file.replace('.jsx', '');
  content = content.replace(new RegExp(`export const ${componentName}Page: React.FC = \\({ currentLang }\\) => {`, 'g'), `export default function ${componentName}() {`);
  content = content.replace(new RegExp(`export const ${componentName}: React.FC = \\({ currentLang }\\) => {`, 'g'), `export default function ${componentName}() {`);
  content = content.replace(/export const \w+Page: React.FC = \([^)]*\) => {/, `export default function ${componentName}() {`);

  // 3. Swap SeoHead for Helmet
  content = content.replace(/<SeoHead[^>]*title=\{`([^`]+)`\}[^>]*\/>/g, `<Helmet>\n        <title>{t('appTitle', 'CreateMy-QR')} | $1</title>\n      </Helmet>`);
  content = content.replace(/<SeoHead[\s\S]*?\/>/g, `<Helmet>\n        <title>{t('appTitle', 'CreateMy-QR')} | Static Page</title>\n      </Helmet>`);
  
  // 4. Strip Breadcrumbs
  content = content.replace(/<Breadcrumbs[^>]*\/>/g, '');
  content = content.replace(/import { Breadcrumbs } from '\.\.\/components\/common\/Breadcrumbs';/g, '');

  // 5. Replace HandleMyFile with CreateMy-QR
  content = content.replace(/HandleMyFile/g, 'CreateMy-QR');
  content = content.replace(/handlemyfile/gi, 'createmy-qr');
  
  // 6. Update text references (PDFs to QR Codes)
  content = content.replace(/PDF and document utilities/gi, 'QR Code and Barcode utilities');
  content = content.replace(/PDF manipulations/gi, 'QR code generations');
  content = content.replace(/document tools/gi, 'QR Code tools');
  content = content.replace(/document utilities/gi, 'QR code utilities');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Refactored ${file}`);
}
