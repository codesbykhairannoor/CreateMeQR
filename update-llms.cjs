const fs = require('fs');
const txt = fs.readFileSync('./build-llms.cjs', 'utf8');
const m = txt.split('const MASTER_EN = `')[1].split('`;')[0];
const langs = ['en', 'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'];
fs.writeFileSync('public/llms.txt', m, 'utf8');
langs.forEach(l => fs.writeFileSync('public/llms-'+l+'.txt', m, 'utf8'));
console.log("Done updating all llms files!");
