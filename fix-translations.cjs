const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'landing');
const files = [
  'LayoutPDF.jsx',
  'LayoutGoogleForms.jsx',
  'LayoutGoogleReview.jsx',
  'LayoutImage.jsx',
  'LayoutLinkInBio.jsx',
  'LayoutVideo.jsx',
  'LayoutAudio.jsx',
  'LayoutAmazon.jsx',
  'LayoutBooking.jsx',
  'LayoutFile.jsx'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix heroTitle
    content = content.replace(/t\('heroTitle'/g, "t('landing.heroTitle'");
    
    // Fix heroDesc -> landing.heroSubtitle
    content = content.replace(/t\('heroDesc'\)/g, "t('landing.heroSubtitle')");
    
    // Fix faqTitle
    content = content.replace(/t\('faqTitle'\)/g, "t('landing.faqTitle')");
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
});
