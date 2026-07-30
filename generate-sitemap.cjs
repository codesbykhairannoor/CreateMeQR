const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://createmy-qr.com';

async function run() {
  console.log("Reading localizedRoutes.js...");
  const routesPath = path.join(__dirname, 'src', 'config', 'localizedRoutes.js');
  let routesContent = fs.readFileSync(routesPath, 'utf-8');
  
  // Extract the JSON part
  const match = routesContent.match(/export const localizedRoutes = (\{[\s\S]*?\n\});/);
  if (!match) {
    console.error("Failed to parse localizedRoutes.js");
    process.exit(1);
  }
  
  let localizedRoutes;
  try {
    localizedRoutes = JSON.parse(match[1]);
  } catch (e) {
    console.error("Failed to parse JSON", e);
    process.exit(1);
  }

  const langs = Object.keys(localizedRoutes);
  const toolIds = Object.keys(localizedRoutes['en']);

  console.log(`Found ${langs.length} languages and ${toolIds.length} tools. Generating sitemap...`);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Also include static routes manually
  const staticRoutes = ['/about', '/privacy', '/terms', '/contact', '/compare', '/barcode-generator', '/scan-qr'];
  
  // 1. Generate URLs for all Tools across all Languages
  for (const toolId of toolIds) {
    for (const lang of langs) {
      const slug = localizedRoutes[lang][toolId] || '/';
      const langPrefix = lang === 'en' ? '' : '/' + lang;
      const url = DOMAIN + langPrefix + (slug === '/' ? '' : slug);
      
      xml += '  <url>\n';
      xml += '    <loc>' + url + '</loc>\n';
      xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>' + (toolId === 'url' ? '1.0' : '0.8') + '</priority>\n';
      
      // Hreflang tags
      for (const altLang of langs) {
        const altSlug = localizedRoutes[altLang][toolId] || '/';
        const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
        const altUrl = DOMAIN + altLangPrefix + (altSlug === '/' ? '' : altSlug);
        xml += '    <xhtml:link rel="alternate" hreflang="' + altLang + '" href="' + altUrl + '" />\n';
      }
      
      // x-default
      const defaultSlug = localizedRoutes['en'][toolId] || '/';
      const defaultUrl = DOMAIN + (defaultSlug === '/' ? '' : defaultSlug);
      xml += '    <xhtml:link rel="alternate" hreflang="x-default" href="' + defaultUrl + '" />\n';
      
      xml += '  </url>\n';
    }
  }

  // 2. Generate URLs for Static Routes
  for (const route of staticRoutes) {
    for (const lang of langs) {
      const langPrefix = lang === 'en' ? '' : '/' + lang;
      const url = DOMAIN + langPrefix + route;
      
      xml += '  <url>\n';
      xml += '    <loc>' + url + '</loc>\n';
      xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.5</priority>\n';
      
      for (const altLang of langs) {
        const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
        const altUrl = DOMAIN + altLangPrefix + route;
        xml += '    <xhtml:link rel="alternate" hreflang="' + altLang + '" href="' + altUrl + '" />\n';
      }
      
      const defaultUrl = DOMAIN + route;
      xml += '    <xhtml:link rel="alternate" hreflang="x-default" href="' + defaultUrl + '" />\n';
      
      xml += '  </url>\n';
    }
  }

  xml += '</urlset>';

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml);
  console.log("✅ Successfully generated public/sitemap.xml");
}

run();
