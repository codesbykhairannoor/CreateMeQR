const fs = require('fs');
const path = require('path');

async function run() {
  console.log("Generating llms-full.txt...");
  const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
  if (!fs.existsSync(enPath)) {
    console.error("translation.json for 'en' not found.");
    return;
  }
  
  const translations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  let fullContent = `# CreateMy-QR - Comprehensive Developer and AI Documentation\n\n`;
  fullContent += `> CreateMy-QR is a 100% Free, Privacy-First, Local-Processing QR Code Suite that operates entirely within the user's browser using advanced WebAssembly (WASM) and local client-side processing.\n\n`;
  
  // App Title and Tagline
  fullContent += `## Platform Overview\n`;
  fullContent += `- **App Title**: ${translations.appTitle}\n`;
  fullContent += `- **Tagline**: ${translations.tagline}\n`;
  fullContent += `- **Privacy Guarantee**: 100% Client-Side. No servers, no tracking, no 14-day trials, no scan limits. QR codes never expire.\n\n`;

  // Tools
  fullContent += `## Available QR Code Tools\n`;
  for (const [key, name] of Object.entries(translations.types || {})) {
    fullContent += `### ${name} (ID: ${key})\n`;
    if (translations.placeholders?.[key]) {
        fullContent += `- Input Data Type: ${translations.placeholders[key]}\n`;
    }
    // Add specific SEO description if it exists
    if (translations.seoTool?.description) {
        fullContent += `- Summary: ${translations.seoTool.description.replace('{{tool}}', name)}\n`;
    }
    fullContent += `\n`;
  }

  // Features (Fact Density)
  if (translations.landing?.features) {
    fullContent += `## Core Platform Features\n`;
    for (const feature of translations.landing.features) {
      fullContent += `### ${feature.title}\n`;
      fullContent += `${feature.description}\n\n`;
    }
  }

  // FAQs (Extractable Format)
  if (translations.landing?.faq) {
    fullContent += `## Frequently Asked Questions (FAQ)\n`;
    for (const faq of translations.landing.faq) {
      fullContent += `**Q: ${faq.question}**\n`;
      fullContent += `A: ${faq.answer}\n\n`;
    }
  }

  // GEO Specific FAQs injected previously
  if (translations.geo?.faqs) {
    fullContent += `## Advanced Technical FAQs\n`;
    for (const faq of translations.geo.faqs) {
      fullContent += `**Q: ${faq.question}**\n`;
      fullContent += `A: ${faq.answer}\n\n`;
    }
  }

  const outputPath = path.join(__dirname, 'public', 'llms-full.txt');
  fs.writeFileSync(outputPath, fullContent, 'utf8');
  console.log("✅ Successfully generated public/llms-full.txt");
}

run();
