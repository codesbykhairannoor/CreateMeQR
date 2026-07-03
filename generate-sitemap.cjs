const fs = require('fs');

const ROUTES = [
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

const LANGS = ['en', 'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko'];
const DOMAIN = 'https://www.createmy-qr.com';
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

ROUTES.forEach(route => {
  LANGS.forEach(lang => {
    const langPrefix = lang === 'en' ? '' : '/' + lang;
    const url = DOMAIN + langPrefix + (route === '/' ? '' : route);
    
    xml += '  <url>\n';
    xml += '    <loc>' + url + '</loc>\n';
    xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>' + (route === '/' ? '1.0' : '0.8') + '</priority>\n';
    
    // Add hreflang links for this specific URL across all languages
    LANGS.forEach(altLang => {
        const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
        const altUrl = DOMAIN + altLangPrefix + (route === '/' ? '' : route);
        xml += '    <xhtml:link rel="alternate" hreflang="' + altLang + '" href="' + altUrl + '" />\n';
    });
    // Add x-default
    const defaultUrl = DOMAIN + (route === '/' ? '' : route);
    xml += '    <xhtml:link rel="alternate" hreflang="x-default" href="' + defaultUrl + '" />\n';
    
    xml += '  </url>\n';
  });
});

xml += '</urlset>';

fs.writeFileSync('public/sitemap.xml', xml);
console.log('Generated sitemap.xml with ' + (ROUTES.length * LANGS.length) + ' URLs and Hreflang tags.');
