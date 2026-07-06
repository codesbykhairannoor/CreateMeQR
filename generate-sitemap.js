import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PSEO_ROUTES = [
  '/',
  '/wifi-qr-code-generator',
  '/vcard-qr-code-maker',
  '/text-qr-code-generator',
  '/email-qr-code-generator',
  '/sms-qr-code-generator',
  '/phone-qr-code-generator',
  '/event-qr-code-generator',
  '/google-maps-qr-code'
];

const LANGS = [
  'en', 'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const DOMAIN = 'https://www.createmy-qr.com';
const currentDate = new Date().toISOString().split('T')[0];

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

for (const route of PSEO_ROUTES) {
  for (const lang of LANGS) {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const url = `${DOMAIN}${langPrefix}${route === '/' ? '' : route}`;
    
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
    
    // Add hreflang links for this specific route across all languages
    for (const altLang of LANGS) {
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
console.log('✅ sitemap.xml generated with', PSEO_ROUTES.length * LANGS.length, 'URLs and their hreflang maps.');
