const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASSED: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAILED: ${message}`);
    failed++;
  }
}

console.log("=========================================");
console.log("🚀 STARTING SUPER SEO & GEO QA SCRIPT 🚀");
console.log("=========================================\n");

try {
  // 1. Check AI Bots in robots.txt
  console.log("--- TEST SUITE 1: AI READINESS ---");
  const robotsPath = path.join(publicDir, 'robots.txt');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  assert(robotsContent.includes('GPTBot'), "robots.txt allows GPTBot");
  assert(robotsContent.includes('PerplexityBot'), "robots.txt allows PerplexityBot");
  assert(robotsContent.includes('ClaudeBot'), "robots.txt allows ClaudeBot");
  
  // 2. Check llms.txt and llms-full.txt
  const llmsPath = path.join(publicDir, 'llms.txt');
  const llmsFullPath = path.join(publicDir, 'llms-full.txt');
  assert(fs.existsSync(llmsPath), "llms.txt exists");
  assert(fs.existsSync(llmsFullPath), "llms-full.txt exists");
  
  if (fs.existsSync(llmsFullPath)) {
    const stats = fs.statSync(llmsFullPath);
    assert(stats.size > 2000, `llms-full.txt is rich in content (Size: ${stats.size} bytes)`);
  }

  // 3. Test Canonical and Hreflang on English HTML
  console.log("\n--- TEST SUITE 2: CANONICAL & HREFLANG (ENGLISH) ---");
  const enHtmlPath = path.join(distDir, 'wifi-qr-code-generator', 'index.html');
  assert(fs.existsSync(enHtmlPath), "English static HTML exists");
  
  let enHtml = fs.readFileSync(enHtmlPath, 'utf8');
  assert(enHtml.includes('<link rel="canonical" href="https://www.createmy-qr.com/wifi-qr-code-generator" />'), "English HTML has correct self-referencing canonical");
  
  const hreflangCountEn = (enHtml.match(/hreflang=/g) || []).length;
  assert(hreflangCountEn === 31, `English HTML has exactly 31 hreflang tags (30 langs + 1 x-default). Found: ${hreflangCountEn}`);
  assert(enHtml.includes('hreflang="x-default"'), "English HTML contains x-default hreflang");

  // 4. Test Canonical and Hreflang on German HTML
  console.log("\n--- TEST SUITE 3: CANONICAL & HREFLANG (GERMAN) ---");
  const deHtmlPath = path.join(distDir, 'de', 'wi-fi-kostenloser-qr-code-generator-online', 'index.html');
  assert(fs.existsSync(deHtmlPath), "German static HTML exists");
  
  let deHtml = fs.readFileSync(deHtmlPath, 'utf8');
  assert(deHtml.includes('<link rel="canonical" href="https://www.createmy-qr.com/de/wi-fi-kostenloser-qr-code-generator-online" />'), "German HTML has correct self-referencing canonical");
  
  const hreflangCountDe = (deHtml.match(/hreflang=/g) || []).length;
  assert(hreflangCountDe === 31, `German HTML has exactly 31 hreflang tags (30 langs + 1 x-default). Found: ${hreflangCountDe}`);
  assert(deHtml.includes('hreflang="x-default"'), "German HTML contains x-default hreflang");

  // 5. Test JSON-LD Deduplication
  console.log("\n--- TEST SUITE 4: JSON-LD SCHEMA CLEANUP ---");
  const orgSchemaCount = (enHtml.match(/"@type":\s*"Organization"/g) || []).length;
  const webappSchemaCount = (enHtml.match(/"@type":\s*"WebApplication"/g) || []).length;
  const faqSchemaCount = (enHtml.match(/"@type":\s*"FAQPage"/g) || []).length;
  const articleSchemaCount = (enHtml.match(/"@type":\s*"Article"/g) || []).length;

  assert(orgSchemaCount === 1, `HTML contains EXACTLY ONE Organization schema. Found: ${orgSchemaCount}`);
  assert(webappSchemaCount === 1, `HTML contains EXACTLY ONE WebApplication schema. Found: ${webappSchemaCount}`);
  assert(faqSchemaCount === 1, `HTML contains EXACTLY ONE FAQPage schema. Found: ${faqSchemaCount}`);
  assert(articleSchemaCount === 1, `HTML contains EXACTLY ONE Article schema. Found: ${articleSchemaCount}`);

  // 6. Test Subpath Header Configuration
  console.log("\n--- TEST SUITE 5: VERCEL SUBPATH DISCOVERY ---");
  const vercelPath = path.join(__dirname, 'vercel.json');
  assert(fs.existsSync(vercelPath), "vercel.json exists");
  if (fs.existsSync(vercelPath)) {
    const vercelContent = fs.readFileSync(vercelPath, 'utf8');
    assert(vercelContent.includes('rel=\\"llms-txt\\"'), "vercel.json contains Link header for llms.txt discovery");
  }

} catch (error) {
  console.error("\n❌ SCRIPT ENCOUNTERED A FATAL ERROR:", error.message);
  failed++;
}

console.log("\n=========================================");
console.log(`📊 QA TEST SUMMARY:`);
console.log(`✅ PASSED: ${passed}`);
console.log(`❌ FAILED: ${failed}`);
console.log("=========================================");

if (failed === 0) {
  console.log("🏆 PLATINUM SEO/GEO STANDARD ACHIEVED! NO BUGS FOUND! 🏆");
} else {
  console.log("🚨 FIX REQUIRED: Some tests failed. Please review the logs above. 🚨");
  process.exit(1);
}
