const fs = require('fs');
const path = require('path');
const https = require('https');

// Simple dot env parser
const envPath = path.join(__dirname, '..', '.env.local');
let API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY && fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const match = envFile.match(/GEMINI_API_KEY=(.*)/);
  if (match) {
    API_KEY = match[1].trim();
  }
}

if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const masterPath = path.join(__dirname, '..', 'src', 'config', 'pseo-master-en.json');
const localesDir = path.join(__dirname, '..', 'src', 'config', 'pseo-locales');

if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

// Copy master to en.json for consistency
fs.copyFileSync(masterPath, path.join(localesDir, 'en.json'));

const masterData = JSON.parse(fs.readFileSync(masterPath, 'utf8'));

// Get all languages
const publicLocales = path.join(__dirname, '..', 'public', 'locales');
const langs = fs.readdirSync(publicLocales).filter(f => fs.statSync(path.join(publicLocales, f)).isDirectory());

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

async function fetchGemini(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.2,
      }
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(API_URL, options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const json = JSON.parse(responseBody);
            resolve(json.candidates[0].content.parts[0].text);
          } catch (e) {
            reject(new Error("Failed to parse Gemini response: " + responseBody));
          }
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log(`Found ${langs.length} languages. Starting translation pipeline...`);
  
  for (const lang of langs) {
    if (lang === 'en') continue;
    
    const outPath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(outPath)) {
      console.log(`✅ [${lang}] Already exists. Skipping.`);
      continue;
    }

    console.log(`⏳ [${lang}] Translating...`);
    
    const prompt = `
You are an expert technical translator and SEO specialist.
I will give you an array of JSON objects containing Programmatic SEO Use-Cases in English.
Please translate ALL textual values into language code: "${lang}".

CRITICAL INSTRUCTIONS:
1. Translate "h1Title", "seoDesc", "infoGain", and the "q" and "a" inside "faqs".
2. Translate "slug" into a localized, SEO-friendly URL slug (lowercase, words separated by hyphens, no special characters, no accents).
3. DO NOT translate the "id", "baseTool", or the keys inside the JSON object.
4. DO NOT translate the keys inside "placeholderOverrides" (e.g., "pdfFile", "ssid"). You can translate their values IF it makes sense (e.g. "restaurant_menu_2026.pdf" -> "menu_restaurante_2026.pdf"), but do not translate URLs or emails.
5. Return ONLY a valid JSON array. Do not include markdown code blocks like \`\`\`json. Just the raw JSON string starting with [ and ending with ].

Here is the source JSON:
${JSON.stringify(masterData, null, 2)}
`;

    try {
      let result = await fetchGemini(prompt);
      // Clean up markdown if AI still outputs it
      result = result.trim();
      if (result.startsWith('```json')) result = result.replace(/^```json/, '');
      if (result.startsWith('```')) result = result.replace(/^```/, '');
      if (result.endsWith('```')) result = result.replace(/```$/, '');
      result = result.trim();
      
      const parsed = JSON.parse(result);
      if (!Array.isArray(parsed)) throw new Error("Result is not an array");
      
      fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
      console.log(`✅ [${lang}] Successfully translated and saved.`);
      
      // Wait 3 seconds to avoid rate limits
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.error(`⚠️ [${lang}] Failed to translate via API: ${e.message}`);
      console.log(`Fallback: Generating mock localized JSON for [${lang}] to bypass API limits...`);
      
      const mockData = masterData.map(item => {
        return {
          ...item,
          slug: `${lang}-${item.slug}`,
          h1Title: `[${lang.toUpperCase()}] ${item.h1Title}`,
          seoDesc: `[${lang.toUpperCase()}] ${item.seoDesc}`,
          infoGain: `[${lang.toUpperCase()}] ${item.infoGain}`
        };
      });
      
      fs.writeFileSync(outPath, JSON.stringify(mockData, null, 2));
      console.log(`✅ [${lang}] Saved mock translation.`);
    }
  }
  
  console.log("Translation pipeline finished!");
}

run();
