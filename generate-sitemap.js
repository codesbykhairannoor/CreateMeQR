import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PSEO_ROUTES, LANGS } from './src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routeKeys = Object.keys(PSEO_ROUTES);
const langCodes = LANGS.map(l => l.code);

const DOMAIN = 'https://www.createmy-qr.com';
const currentDate = new Date().toISOString().split('T')[0];

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

for (const route of routeKeys) {
  for (const lang of langCodes) {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const url = `${DOMAIN}${langPrefix}${route === '/' ? '' : route}`;
    
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
    
    // Add hreflang links for this specific route across all languages
    for (const altLang of langCodes) {
        const altLangPrefix = altLang === 'en' ? '' : `/${altLang}`;
        const altUrl = `${DOMAIN}${altLangPrefix}${route === '/' ? '' : route}`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
    }
    sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}${route === '/' ? '' : route}" />\n`;
    
    sitemap += `  </url>\n`;
  }
}

sitemap += '</urlset>\n';

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('✅ sitemap.xml generated with', routeKeys.length * langCodes.length, 'URLs and their hreflang maps.');
