const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  console.log('Googlebot is visiting: https://www.createmy-qr.com/id ...');
  await page.goto('https://www.createmy-qr.com/id', { waitUntil: 'networkidle' });
  const schemas = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    return els.map(el => JSON.parse(el.textContent));
  });
  
  const faq = schemas.find(s => s['@type'] === 'FAQPage');
  
  if(faq) {
    console.log('✅ Googlebot detected JSON-LD FAQ Schema!');
    console.log(`Total Keywords Injected (Questions): ${faq.mainEntity.length}`);
    console.log('Sample of first 3 questions injected:');
    console.log(faq.mainEntity.slice(0, 3).map(e => e.name).join('\n'));
  } else {
    console.log('❌ FAQ Schema not found. Found schemas: ', schemas.map(s => s['@type']));
  }
  await browser.close();
})();
