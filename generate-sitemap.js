import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PSEO_ROUTES, LANGS } from './src/config/site.js';
import { localizedRoutes, routeToToolMap } from './src/config/localizedRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolKeys = Object.values(PSEO_ROUTES);
const langCodes = LANGS.map(l => l.code);

const DOMAIN = 'https://createmy-qr.com';
const currentDate = new Date().toISOString().split('T')[0];

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

// We iterate over all tools
for (const tool of toolKeys) {
  for (const lang of langCodes) {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const slug = localizedRoutes[lang]?.[tool] || '/';
    const url = `${DOMAIN}${langPrefix}${slug === '/' ? '' : slug}`;
    
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${tool === 'url' ? '1.0' : '0.8'}</priority>\n`;
    
    // Add hreflang links for this specific tool across all languages
    for (const altLang of langCodes) {
        const altLangPrefix = altLang === 'en' ? '' : `/${altLang}`;
        const altSlug = localizedRoutes[altLang]?.[tool] || '/';
        const altUrl = `${DOMAIN}${altLangPrefix}${altSlug === '/' ? '' : altSlug}`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
    }
    
    // Add x-default pointing to English version
    const defaultSlug = localizedRoutes['en']?.[tool] || '/';
    sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}${defaultSlug === '/' ? '' : defaultSlug}" />\n`;
    
    sitemap += `  </url>\n`;
  }
}


const staticPages = ['/about', '/privacy', '/terms', '/compare', '/barcode-generator', '/scan-qr'];
for (const page of staticPages) {
  for (const lang of langCodes) {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const url = `${DOMAIN}${langPrefix}${page}`;
    
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.5</priority>\n`;
    
    for (const altLang of langCodes) {
        const altLangPrefix = altLang === 'en' ? '' : `/${altLang}`;
        const altUrl = `${DOMAIN}${altLangPrefix}${page}`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
    }
    
    sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}${page}" />\n`;
    sitemap += `  </url>\n`;
  }
}

sitemap += '</urlset>\n';

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('✅ sitemap.xml generated with', (toolKeys.length + staticPages.length) * langCodes.length, 'URLs and perfectly localized hreflang maps.');
