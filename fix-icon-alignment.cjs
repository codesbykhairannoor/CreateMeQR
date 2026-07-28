const fs = require('fs');
const path = require('path');

// 1. Fix LayoutImage.jsx (Center Icon and Text)
const imgPath = path.join(__dirname, 'src/components/landing/LayoutImage.jsx');
let imgContent = fs.readFileSync(imgPath, 'utf8');
imgContent = imgContent.replace(
  '<div className="hq-img-card main" style={{ padding: 40, flexDirection: \'column\', textAlign: \'center\' }}>',
  '<div className="hq-img-card main" style={{ padding: 40, display: \'flex\', flexDirection: \'column\', alignItems: \'center\', textAlign: \'center\' }}>'
);
fs.writeFileSync(imgPath, imgContent);

// 2. Fix LayoutWiFi.jsx (Center Icon and Text on feature cards)
const wifiPath = path.join(__dirname, 'src/components/landing/LayoutWiFi.jsx');
let wifiContent = fs.readFileSync(wifiPath, 'utf8');
wifiContent = wifiContent.replace(
  /<div style=\{\{ background: 'var\(--hq-card\)', borderRadius: 32, padding: 48, border: '1px solid var\(--hq-border\)' \}\}>/g,
  '<div style={{ background: \'var(--hq-card)\', borderRadius: 32, padding: 48, border: \'1px solid var(--hq-border)\', display: \'flex\', flexDirection: \'column\', alignItems: \'center\', textAlign: \'center\' }}>'
);
fs.writeFileSync(wifiPath, wifiContent);

// 3. Fix LayoutAppStore.jsx (Force left alignment to override mobile hero center)
const appPath = path.join(__dirname, 'src/components/landing/LayoutAppStore.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(
  '<div className="hq-app-features">',
  '<div className="hq-app-features" style={{ textAlign: \'left\' }}>'
);
fs.writeFileSync(appPath, appContent);

console.log("Fixed icon alignments in Image, WiFi, and AppStore layouts!");
