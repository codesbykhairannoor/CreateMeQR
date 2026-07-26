const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

enData.landing = {
  heroTitle: "Premium QR Codes",
  heroSubtitle: "No 14-day limits, no forced ads, no tracking. Generate high-quality static codes directly in your browser that work forever.",
  faqTitle: "Common Questions"
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log("Injected landing object into en/translation.json!");
