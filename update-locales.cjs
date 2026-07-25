const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const folders = fs.readdirSync(localesDir);

const newTypes = {
  "whatsapp": "WhatsApp",
  "youtube": "YouTube",
  "instagram": "Instagram",
  "crypto": "Crypto",
  "appstore": "App Store"
};

const newFormFields = {
  "waNumber": "WhatsApp Number",
  "waMessage": "Pre-filled Message",
  "youtubeUrl": "YouTube URL",
  "igUsername": "Instagram Username",
  "cryptoCoin": "Cryptocurrency",
  "cryptoAddress": "Wallet Address",
  "cryptoAmount": "Amount",
  "appStoreUrl": "App URL (iOS/Android)"
};

for (const folder of folders) {
  const filePath = path.join(localesDir, folder, 'translation.json');
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const json = JSON.parse(data);
      
      // Update types
      if (json.types) {
        json.types = { ...json.types, ...newTypes };
      }
      
      // Update form
      if (json.form) {
        json.form = { ...json.form, ...newFormFields };
      }
      
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
      console.log(`Updated ${folder}`);
    } catch (err) {
      console.error(`Error updating ${folder}:`, err);
    }
  }
}
console.log('Done!');
