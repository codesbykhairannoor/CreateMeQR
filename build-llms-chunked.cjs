/**
 * build-llms-chunked.cjs
 * Translates llms.txt into 29 languages by splitting text into small
 * line-by-line chunks to avoid Google Translate's size limit.
 */
const translate = require('translate-google');
const fs = require('fs');
const path = require('path');

const LANGS = [
  'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el',
  'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const codeMap = { 'zh': 'zh-cn', 'tl': 'tl', 'no': 'no' };

// Brand terms to protect from translation
const PROTECTED = [
  'CreateMy-QR', 'WASM', 'WebAssembly', 'IndexedDB', 'LocalStorage',
  'ISO/IEC 18004:2015', 'GDPR', 'CCPA', 'SVG', 'PNG', 'vCard',
  'WPA', 'WPA2', 'WEP', 'UPC', 'EAN', 'PDF417', 'RAG', 'AEO',
  'QR Code', 'QR', 'GitHub', 'Bitcoin', 'Ethereum', 'PayPal', 'Venmo',
  'WhatsApp', 'TikTok', 'LinkedIn', 'YouTube', 'Instagram', 'Facebook',
  'Telegram', 'Discord', 'Snapchat', 'Spotify', 'Amazon',
  'ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Copilot',
  'Flowcode', 'Beaconstac',
];

const MASTER_SOURCE = fs.readFileSync(path.join(__dirname, 'public', 'llms.txt'), 'utf8');

function maskBrands(text) {
  let masked = text;
  const map = {};
  PROTECTED.forEach((term, i) => {
    const placeholder = `__BRAND${i}__`;
    map[placeholder] = term;
    // Use word boundary-like replacement
    masked = masked.split(term).join(placeholder);
  });
  return { masked, map };
}

function unmaskBrands(text, map) {
  let result = text;
  for (const [placeholder, original] of Object.entries(map)) {
    result = result.split(placeholder).join(original);
    // Handle case variations from translation
    result = result.split(placeholder.toLowerCase()).join(original);
    result = result.split(placeholder.charAt(0) + placeholder.slice(1).toLowerCase()).join(original);
  }
  return result;
}

async function translateChunk(chunk, tl) {
  if (!chunk.trim()) return chunk;
  try {
    const result = await translate(chunk, { to: tl });
    return result;
  } catch(e) {
    // On failure, return original
    return chunk;
  }
}

async function translateText(text, targetLang) {
  const tl = codeMap[targetLang] || targetLang;
  
  // Split into lines and group into small batches (max 500 chars each)
  const lines = text.split('\n');
  const batches = [];
  let currentBatch = [];
  let currentLen = 0;
  
  for (const line of lines) {
    // Don't translate markdown headers, table rows with pipes, or URLs
    const shouldSkip = line.startsWith('#') || line.includes('http') || line.trim() === '' || line.startsWith('| :');
    
    if (shouldSkip || currentLen + line.length > 400) {
      if (currentBatch.length > 0) {
        batches.push({ lines: currentBatch, translate: true });
        currentBatch = [];
        currentLen = 0;
      }
      batches.push({ lines: [line], translate: !shouldSkip && line.trim() !== '' && !line.startsWith('#') && !line.includes('http') });
    } else {
      currentBatch.push(line);
      currentLen += line.length + 1;
    }
  }
  if (currentBatch.length > 0) {
    batches.push({ lines: currentBatch, translate: true });
  }
  
  const outputLines = [];
  
  for (const batch of batches) {
    if (!batch.translate || batch.lines.join('').trim() === '') {
      outputLines.push(...batch.lines);
      continue;
    }
    
    const combined = batch.lines.join('\n');
    const { masked, map } = maskBrands(combined);
    
    let translated = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        translated = await translate(masked, { to: tl });
        break;
      } catch(e) {
        await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
      }
    }
    
    if (translated) {
      const restored = unmaskBrands(translated, map);
      outputLines.push(...restored.split('\n'));
    } else {
      // Fallback to original
      outputLines.push(...batch.lines);
    }
    
    // Small delay between batches
    await new Promise(r => setTimeout(r, 300));
  }
  
  return outputLines.join('\n');
}

async function run() {
  console.log(`Source file: ${MASTER_SOURCE.length} chars`);
  
  for (const lang of LANGS) {
    console.log(`\nTranslating llms-${lang}.txt...`);
    const filePath = path.join(__dirname, 'public', `llms-${lang}.txt`);
    
    try {
      const translated = await translateText(MASTER_SOURCE, lang);
      fs.writeFileSync(filePath, translated, 'utf8');
      console.log(`  ✅ ${lang} saved (${translated.length} chars)`);
    } catch(e) {
      console.error(`  ❌ ${lang} failed:`, e.message);
      // Write English fallback
      fs.writeFileSync(filePath, MASTER_SOURCE, 'utf8');
    }
    
    // Delay between languages to avoid rate limiting
    await new Promise(r => setTimeout(r, 800));
  }
  
  console.log('\n✅ All llms-{lang}.txt files generated!');
}

run();
