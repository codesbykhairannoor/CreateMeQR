// scripts/translate-pseo-insight-keys.cjs
// Injects 'pseo.insights_badge' and 'pseo.insights_title' into all 30 language translation.json files
const fs = require('fs');
const path = require('path');
const https = require('https');

const LOCALES_DIR = path.resolve('public/locales');

const GT_MAP = {
  ar:'ar', bn:'bn', cs:'cs', da:'da', de:'de', el:'el', es:'es', fi:'fi',
  fr:'fr', he:'iw', hi:'hi', hu:'hu', id:'id', it:'it', ja:'ja', ko:'ko',
  ms:'ms', nl:'nl', no:'no', pl:'pl', pt:'pt', ro:'ro', ru:'ru', sv:'sv',
  th:'th', tr:'tr', uk:'uk', vi:'vi', 'zh':'zh-CN', tl:'tl'
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function googleTranslate(text, targetLang) {
  if (targetLang === 'en') return Promise.resolve(text);
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(text);
    const gtCode = GT_MAP[targetLang] || targetLang;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${gtCode}&dt=t&q=${encoded}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const translated = parsed[0].map(seg => seg[0]).join('');
          resolve(translated);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const dirs = fs.readdirSync(LOCALES_DIR);
  
  for (const lang of dirs) {
    const transPath = path.join(LOCALES_DIR, lang, 'translation.json');
    if (!fs.existsSync(transPath)) continue;

    console.log(`\n⏳ Translating UI keys for [${lang}] …`);
    const data = JSON.parse(fs.readFileSync(transPath, 'utf8'));

    // Initialize pseo block if missing
    if (!data.pseo) {
      data.pseo = {};
    }

    try {
      const badgeText = await googleTranslate('PRO GUIDE', lang);
      const titleText = await googleTranslate('Expert Insights & Best Practices', lang);

      data.pseo.insights_badge = badgeText.toUpperCase();
      data.pseo.insights_title = titleText;

      fs.writeFileSync(transPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✅ ${badgeText} | ${titleText}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
    
    await sleep(500); // polite delay
  }

  console.log('\n🎉 Done! New pSEO UI keys added to all locales.');
}

main().catch(console.error);
