const { translate } = require('google-translate-api-x');
const fs = require('fs');
const path = require('path');

const LANG_MAP = {
  'zh': 'zh-CN',
  'tl': 'tl',
  'no': 'no',
  'ms': 'ms',
  'bn': 'bn',
  'uk': 'uk',
  'el': 'el',
  'da': 'da',
  'fi': 'fi',
  'sv': 'sv',
  'cs': 'cs',
  'hu': 'hu',
  'ro': 'ro',
  'th': 'th',
  'vi': 'vi',
  'pl': 'pl',
  'nl': 'nl',
  'tr': 'tr',
  'it': 'it',
  'ru': 'ru',
  'ar': 'ar',
  'ko': 'ko',
  'hi': 'hi',
  'ja': 'ja',
  'pt': 'pt',
  'de': 'de',
  'fr': 'fr',
  'es': 'es',
  'id': 'id'
};

async function test() {
  console.log('Testing batch translation for 5 languages...');
  for (const [code, targetLang] of Object.entries(LANG_MAP).slice(0, 5)) {
    try {
      const res = await translate([
        'Free QR Code Generator',
        'Create custom QR codes with logo for free.',
        'Privacy Policy',
        '100% Free Pricing'
      ], { from: 'en', to: targetLang });
      console.log(`\n[${code}] (${targetLang}):`);
      console.log(res.map(r => r.text));
    } catch (e) {
      console.error(`Error translating to ${code}:`, e.message);
    }
  }
}

test();
