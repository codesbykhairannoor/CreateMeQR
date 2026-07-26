const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'generate-sitemap.js');
let content = fs.readFileSync(filePath, 'utf8');

// Insert static pages loop
const staticLoop = `
const staticPages = ['/about', '/privacy', '/terms', '/compare'];
for (const page of staticPages) {
  for (const lang of langCodes) {
    const langPrefix = lang === 'en' ? '' : \`/\${lang}\`;
    const url = \`\${DOMAIN}\${langPrefix}\${page}\`;
    
    sitemap += \`  <url>\\n\`;
    sitemap += \`    <loc>\${url}</loc>\\n\`;
    sitemap += \`    <lastmod>\${currentDate}</lastmod>\\n\`;
    sitemap += \`    <changefreq>monthly</changefreq>\\n\`;
    sitemap += \`    <priority>0.5</priority>\\n\`;
    
    for (const altLang of langCodes) {
        const altLangPrefix = altLang === 'en' ? '' : \`/\${altLang}\`;
        const altUrl = \`\${DOMAIN}\${altLangPrefix}\${page}\`;
        sitemap += \`    <xhtml:link rel="alternate" hreflang="\${altLang}" href="\${altUrl}" />\\n\`;
    }
    
    sitemap += \`    <xhtml:link rel="alternate" hreflang="x-default" href="\${DOMAIN}\${page}" />\\n\`;
    sitemap += \`  </url>\\n\`;
  }
}
`;

content = content.replace(/sitemap \+= '<\/urlset>\\n';/, staticLoop + `\nsitemap += '</urlset>\\n';`);
content = content.replace(/console\.log\('✅ sitemap\.xml generated with', toolKeys\.length \* langCodes\.length,/, `console.log('✅ sitemap.xml generated with', (toolKeys.length + staticPages.length) * langCodes.length,`);
fs.writeFileSync(filePath, content);
console.log("Updated sitemap generator for static pages!");
