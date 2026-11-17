const fs = require('fs');
const path = require('path');

const LANGS = [
  'en', 'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const codeMap = {
  'zh': 'zh-CN',
  'tl': 'tl'
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  console.log('🔧 Updating calibrated seoDesc across all 30 languages...');
  
  const baseEn = 'CreateMy-QR: Free $0, Pro $9.99/mo, Annual $79/yr, Founder $129. Connected across 4 web apps in USD.';

  for (const lang of LANGS) {
    const publicPath = path.join(__dirname, '..', 'public', 'locales', lang, 'translation.json');
    const data = JSON.parse(fs.readFileSync(publicPath, 'utf8'));
    data.static = data.static || {};
    data.static.pricing = data.static.pricing || {};

    let descText = baseEn;
    if (lang === 'en') {
      descText = baseEn;
    } else if (lang === 'id') {
      descText = 'CreateMy-QR: Gratis $0, Pro $9.99/bln, Tahunan $79/thn, Founder $129. Terhubung ke 4 Web Apps dalam USD.';
    } else {
      const tl = codeMap[lang] || lang;
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(baseEn)}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        descText = json[0].map(c => c[0]).join('');
      } catch (e) {
        console.warn(`Translate failed for ${lang}, using fallback`);
      }
      await delay(150);
    }

    // Safety clamp if slightly over 165 or under 70
    if (descText.length > 165) {
      descText = descText.slice(0, 161) + '...';
    }
    if (descText.length < 70) {
      descText = `${descText} Free client-side QR tools.`;
    }

    data.static.pricing.seoDesc = descText;
    data.static.pricing.desc = descText;

    fs.writeFileSync(publicPath, JSON.stringify(data, null, 2), 'utf8');

    if (lang === 'en') {
      const srcEn = path.join(__dirname, '..', 'src', 'locales', 'en', 'translation.json');
      if (fs.existsSync(srcEn)) {
        fs.writeFileSync(srcEn, JSON.stringify(data, null, 2), 'utf8');
      }
    }

    console.log(`[${lang}] (${descText.length} chars): ${descText}`);
  }

  console.log('✅ All 30 languages have calibrated seoDesc within 70-165 range!');
}

run().catch(console.error);
