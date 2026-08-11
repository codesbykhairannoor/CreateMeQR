const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("Menjalankan Test untuk mengecek HTML murni dan Tampilan Visual UI...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Test 1: Tool Page
  const toolHtmlPath = path.join(__dirname, 'dist', 'es', 'wi-fi-generador-de-codigos-qr-gratis-online', 'index.html');
  console.log(`\n====================================`);
  console.log(`TEST 1: TOOL PAGE (ES WiFi)`);
  console.log(`====================================\n`);
  
  // Baca raw HTML untuk bukti SEO statis
  const rawToolHtml = fs.readFileSync(toolHtmlPath, 'utf8');
  const toolH1 = rawToolHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1];
  const toolTitle = rawToolHtml.match(/<title>([\s\S]*?)<\/title>/)[1];
  
  console.log("[BUKTI HTML RAW DARI DISK - DIBACA BOT]");
  console.log(`<title> ${toolTitle}`);
  console.log(`<h1>    ${toolH1.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()}`); // strip tags for clean console output
  
  // Load di browser (tanpa JS) untuk membuktikan HTML terstruktur rapi
  await page.setJavaScriptEnabled(false);
  await page.goto(`file://${toolHtmlPath}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/screenshot-tool-no-js.png', fullPage: true });
  console.log("\n[!] Screenshot Tool Page (Tanpa JS) disimpan ke scratch/screenshot-tool-no-js.png");

  // Load di browser (dengan JS / Hydration)
  await page.setJavaScriptEnabled(true);
  await page.goto(`file://${toolHtmlPath}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/screenshot-tool-with-js.png', fullPage: true });
  console.log("[!] Screenshot Tool Page (Dengan JS / React Hidup) disimpan ke scratch/screenshot-tool-with-js.png");

  // Test 2: Static Page (Contact)
  const staticHtmlPath = path.join(__dirname, 'dist', 'es', 'contact', 'index.html');
  console.log(`\n====================================`);
  console.log(`TEST 2: STATIC PAGE (ES Contact)`);
  console.log(`====================================\n`);
  
  const rawStaticHtml = fs.readFileSync(staticHtmlPath, 'utf8');
  const staticH1Match = rawStaticHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const staticH1 = staticH1Match ? staticH1Match[1] : "TIDAK ADA H1";
  const staticTitle = rawStaticHtml.match(/<title>([\s\S]*?)<\/title>/)[1];
  
  console.log("[BUKTI HTML RAW DARI DISK - DIBACA BOT]");
  console.log(`<title> ${staticTitle}`);
  console.log(`<h1>    ${staticH1.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()}`);

  await page.goto(`file://${staticHtmlPath}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/screenshot-static-page.png', fullPage: true });
  console.log("\n[!] Screenshot Static Page disimpan ke scratch/screenshot-static-page.png");

  await browser.close();
})();
