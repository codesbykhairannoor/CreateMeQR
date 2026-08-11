const { render } = require('./dist/server/entry-server.js');
const fs = require('fs');
const path = require('path');

const lang = 'id';
const transPath = path.join(__dirname, 'public', 'locales', lang, 'translation.json');
const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));

const url = '/id/url-link-generator-qr-code-gratis-online';

global.window = { location: { pathname: url, search: '', hash: '' } };
global.location = global.window.location;
const helmetContext = {};

console.log("Rendering URL:", url);
const html = render(url, helmetContext, lang, translations);

if (html.includes("Generate 37+ types")) {
  console.log("❌ RENDERED HOMEPAGE!");
} else {
  console.log("✅ RENDERED TOOL PAGE!");
}

console.log("Helmet Title:", helmetContext.helmet.title.toString());
