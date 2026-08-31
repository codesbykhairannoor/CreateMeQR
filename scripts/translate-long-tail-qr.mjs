import translate from "google-translate-api-x";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = path.join(__dirname, "..", "src", "config", "pseo-locales");

const ROUTE_DELAY = 1500;
const LANG_DELAY = 3000;

// Read english to find the 10 new long-tail keywords
const enData = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, "en.json"), "utf8"));

const TARGET_IDS = [
  "wifi-cafe-restaurants",
  "vcard-real-estate",
  "greview-local-business",
  "whatsapp-customer-support",
  "event-wedding",
  "url-real-estate-signs",
  "pdf-instruction-manuals",
  "instagram-influencers",
  "crypto-bitcoin-donations",
  "menu-free-no-signup"
];

const ROUTES_TO_TRANSLATE = enData.filter(r => TARGET_IDS.includes(r.id));

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function translateBatchWithRetry(texts, to, retries = 4) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await translate(texts, { to, client: "gtx", forceBatch: false, rejectOnPartialFail: false });
      return Array.isArray(res) ? res.map(r => r.text) : [res.text];
    } catch (e) {
      const is429 = e.message && (e.message.includes("429") || e.message.includes("Too Many"));
      const wait = is429 ? (attempt + 1) * 4000 : 2000;
      if (attempt < retries - 1) {
        process.stdout.write(`[wait]`);
        await sleep(wait);
      } else {
        return texts; 
      }
    }
  }
  return texts;
}

async function translateRoute(route, to) {
  const textsToTranslate = [];
  textsToTranslate.push(route.h1Title);
  textsToTranslate.push(route.seoDesc);
  textsToTranslate.push(route.infoGain);
  textsToTranslate.push(route.dynamicSection.heading);
  
  for (const item of route.dynamicSection.items) {
    textsToTranslate.push(item.title);
    textsToTranslate.push(item.content);
  }
  
  for (const faq of route.faqs) {
    textsToTranslate.push(faq.q);
    textsToTranslate.push(faq.a);
  }

  const translatedTexts = await translateBatchWithRetry(textsToTranslate, to);
  
  let idx = 0;
  const h1Title = translatedTexts[idx++];
  const seoDesc = translatedTexts[idx++];
  const infoGain = translatedTexts[idx++];
  
  const dynamicSection = { type: route.dynamicSection.type, heading: '', items: [] };
  dynamicSection.heading = translatedTexts[idx++];
  
  for (const item of route.dynamicSection.items) {
    dynamicSection.items.push({
      title: translatedTexts[idx++],
      content: translatedTexts[idx++]
    });
  }

  const faqs = [];
  for (const faq of route.faqs) {
    faqs.push({
      q: translatedTexts[idx++],
      a: translatedTexts[idx++]
    });
  }

  return { 
    ...route,
    h1Title, 
    seoDesc,
    infoGain,
    dynamicSection, 
    faqs 
  };
}

async function main() {
  console.log("=== Long-Tail QR pSEO Translator (Batched) ===");
  const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith(".json") && f !== "en.json");
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let langCode = file.replace(".json", "");
    // google translate api language overrides
    if (langCode === "zh-TW") langCode = "zh-TW";
    else if (langCode === "zh") langCode = "zh-CN";
    else if (langCode === "he") langCode = "iw";

    const filePath = path.join(LOCALES_DIR, file);
    let langData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Filter out if they already exist
    langData = langData.filter(item => !TARGET_IDS.includes(item.id));

    process.stdout.write(`[${i+1}/${files.length}] ${langCode}: `);
    const translatedRoutes = [];

    for (let rIdx = 0; rIdx < ROUTES_TO_TRANSLATE.length; rIdx++) {
      const route = ROUTES_TO_TRANSLATE[rIdx];
      const translated = await translateRoute(route, langCode);
      translatedRoutes.push(translated);
      process.stdout.write(".");
      if (rIdx < ROUTES_TO_TRANSLATE.length - 1) await sleep(ROUTE_DELAY);
    }

    langData = [...langData, ...translatedRoutes];
    fs.writeFileSync(filePath, JSON.stringify(langData, null, 2));
    console.log(` DONE`);

    if (i < files.length - 1) await sleep(LANG_DELAY);
  }

  console.log("\n\nSELESAI! Semua 10 long-tail QR keyword sudah ditranslasi ke 31 bahasa.");
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
