const fs = require('fs');
const path = require('path');

const srcDir = 'd:\\HelpMyFile\\src\\pages';
const destDir = 'd:\\qr-and-qr\\src\\pages';

const pageMap = {
  'AboutUsPage.tsx': 'AboutUs.jsx',
  'ComparePage.tsx': 'Compare.jsx',
  'LanguagesPage.tsx': 'Languages.jsx',
  'PricingPage.tsx': 'Pricing.jsx',
  'PrivacyPage.tsx': 'Privacy.jsx',
  'SecurityPage.tsx': 'Security.jsx',
  'TosPage.tsx': 'Terms.jsx',
  'UseCasesPage.tsx': 'UseCases.jsx'
};

for (const [srcFile, destFile] of Object.entries(pageMap)) {
  const srcPath = path.join(srcDir, srcFile);
  const destPath = path.join(destDir, destFile);
  
  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Quick TSX to JSX conversions
    // Remove interfaces
    content = content.replace(/interface\s+Props\s*{[^}]*}/g, '');
    // Change React.FC<Props> to just standard function component signature
    content = content.replace(/React\.FC<Props>/g, 'React.FC');
    // Remove TS types like : string
    content = content.replace(/currentLang: string/g, 'currentLang');
    
    // Swap getUiTranslations for useTranslation
    content = content.replace(/import { getUiTranslations } from '\.\.\/i18n\/translations';/g, "import { useTranslation } from 'react-i18next';");
    
    // Swap SeoHead for Helmet
    content = content.replace(/import { SeoHead } from '\.\.\/components\/seo\/SeoHead';/g, "import { Helmet } from 'react-helmet-async';");
    
    // We will do deeper refactoring after copying
    
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Copied ${srcFile} to ${destFile}`);
  }
}

// Delete old files that are replaced
const oldFiles = ['About.jsx', 'PrivacyPolicy.jsx', 'TermsOfService.jsx', 'Contact.jsx'];
for (const old of oldFiles) {
  const oldPath = path.join(destDir, old);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
    console.log(`Deleted old file ${old}`);
  }
}
