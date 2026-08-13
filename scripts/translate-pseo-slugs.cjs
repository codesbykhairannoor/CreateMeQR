// scripts/translate-pseo-slugs.cjs
// Adds a 'translatedSlug' field to each locale JSON by:
// 1. Translating the English slug phrase via Google Translate
// 2. Converting the translation to a URL-safe kebab-case slug

const fs = require('fs');
const path = require('path');
const https = require('https');

const LOCALES_DIR = path.resolve('src/config/pseo-locales');
const MASTER_FILE = path.resolve('src/config/pseo-master-en.json');
const master = JSON.parse(fs.readFileSync(MASTER_FILE, 'utf8'));

// Languages with non-Latin scripts — keep English slug (UTF-8 URLs are messy for these)
const KEEP_ENGLISH_SLUG = new Set(['ja', 'zh', 'zh-TW', 'ko', 'ar', 'he', 'hi', 'bn', 'th', 'ru', 'uk', 'el', 'tl']);

// Map internal codes to Google Translate codes
const GT_MAP = {
  ar:'ar', bn:'bn', cs:'cs', da:'da', de:'de', el:'el', es:'es', fi:'fi',
  fr:'fr', he:'iw', hi:'hi', hu:'hu', id:'id', it:'it', ja:'ja', ko:'ko',
  ms:'ms', nl:'nl', no:'no', pl:'pl', pt:'pt', ro:'ro', ru:'ru', sv:'sv',
  th:'th', tr:'tr', uk:'uk', vi:'vi', 'zh':'zh-CN', 'zh-TW':'zh-TW', tl:'tl'
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents (é→e, ü→u)
    .replace(/[^\w\s-]/g, '')        // remove special chars
    .replace(/[\s_]+/g, '-')         // spaces → hyphens
    .replace(/^-+|-+$/g, '')         // trim hyphens
    .replace(/-{2,}/g, '-');         // collapse multiple hyphens
}

function googleTranslate(text, targetLang) {
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

// Convert English slug to readable phrase for translation
// e.g. "pdf-qr-code-for-restaurant-menu" → "PDF QR code for restaurant menus"
function slugToPhrase(slug) {
  return slug
    .split('-')
    .join(' ')
    .replace(/\bqr\b/gi, 'QR')
    .replace(/\bpdf\b/gi, 'PDF')
    .replace(/\bwifi\b/gi, 'WiFi')
    .replace(/\bvcard\b/gi, 'vCard')
    .replace(/\burl\b/gi, 'URL');
}

async function main() {
  const localeFiles = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json'));
  
  for (const file of localeFiles) {
    const lang = file.replace('.json', '');
    const filePath = path.join(LOCALES_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (KEEP_ENGLISH_SLUG.has(lang)) {
      // For non-Latin scripts, translatedSlug = original English slug
      const updated = data.map(uc => ({
        ...uc,
        translatedSlug: uc.slug // keep English slug
      }));
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
      console.log(`  ⏭️  [${lang}] kept English slugs (non-Latin script)`);
      continue;
    }

    if (lang === 'en') {
      // English: translatedSlug = slug (same)
      const updated = data.map(uc => ({ ...uc, translatedSlug: uc.slug }));
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
      console.log(`  ✅ [en] self-slug`);
      continue;
    }

    console.log(`\n⏳ Translating slugs for [${lang}] …`);
    const updated = [];

    for (const uc of data) {
      // Find English slug from master
      const masterEntry = master.find(m => m.id === uc.id);
      const englishSlug = masterEntry ? masterEntry.slug : uc.slug;
      const phrase = slugToPhrase(englishSlug);

      try {
        const translated = await googleTranslate(phrase, lang);
        const translatedSlug = slugify(translated);
        updated.push({ ...uc, translatedSlug: translatedSlug || englishSlug });
        process.stdout.write(`  ✅ ${englishSlug} → ${translatedSlug}\n`);
      } catch (err) {
        console.error(`  ❌ ${uc.id}: ${err.message}`);
        updated.push({ ...uc, translatedSlug: englishSlug });
      }
      await sleep(300);
    }

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
    console.log(`  💾 Written → ${filePath}`);
    await sleep(1500);
  }

  console.log('\n🎉 Done! translatedSlug added to all locale files.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
