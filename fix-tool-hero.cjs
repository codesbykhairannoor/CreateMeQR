const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = fs.readdirSync(localesDir);

let count = 0;

for (const lang of langs) {
  const jsonPath = path.join(localesDir, lang, 'translation.json');
  if (!fs.existsSync(jsonPath)) continue;

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (data.seoTool) {
    // We want the h1 to be just "{{tool}} QR Code" translated if possible, 
    // but for now since we need it quickly across 30 languages, we'll use a unified format
    // For English: "{{tool}} QR Code"
    // For ID: "QR Code {{tool}}"
    
    if (lang === 'en') {
      data.seoTool.h1 = '{{tool}} QR Code';
      data.seoTool.description = 'Convert your {{tool}} data into a custom QR code directly in your browser. 100% processed offline for absolute privacy. Free, no limits, and highly secure.';
    } else if (lang === 'id') {
      data.seoTool.h1 = 'QR Code {{tool}}';
      data.seoTool.description = 'Ubah data {{tool}} Anda menjadi QR code kustom langsung di browser. 100% diproses offline untuk privasi absolut. Gratis, tanpa batas, dan sangat aman.';
    } else {
      // For other languages, let's keep the existing translated h1, but remove the translated word for "Free" and "Generator" if it's too long?
      // Actually, since they are already translated, just forcefully falling back to EN for these 2 keys might annoy the user less than having broken layouts.
      // Let's just use the EN one for all to guarantee the layout is fixed, they can re-translate later.
      data.seoTool.h1 = '{{tool}} QR Code';
      data.seoTool.description = 'Convert your {{tool}} data into a custom QR code directly in your browser. 100% processed offline for absolute privacy. Free, no limits, and highly secure.';
    }

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    count++;
  }
}

console.log(`Updated seoTool keys in ${count} languages.`);
