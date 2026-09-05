const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://createmy-qr.com';

async function run() {
  const { localizedRoutes } = await import('./src/config/localizedRoutes.js');

  const pseoLocalesDir = path.join(__dirname, 'src', 'config', 'pseo-locales');
  const pseoDataByLang = {};
  if (fs.existsSync(pseoLocalesDir)) {
    const files = fs.readdirSync(pseoLocalesDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const lang = file.replace('.json', '');
        pseoDataByLang[lang] = JSON.parse(fs.readFileSync(path.join(pseoLocalesDir, file), 'utf8'));
      }
    }
  }

  const langs = Object.keys(localizedRoutes);
  const toolIds = Object.keys(localizedRoutes['en']);

  console.log(`Found ${langs.length} languages and ${toolIds.length} tools/static routes. Generating sitemap...`);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  let totalUrlCount = 0;

  // 1. Generate URLs for all Tools & Static Pages across all 30 Languages
  for (const toolId of toolIds) {
    for (const lang of langs) {
      const slug = localizedRoutes[lang]?.[toolId] || '/';
      const langPrefix = lang === 'en' ? '' : '/' + lang;
      const url = DOMAIN + langPrefix + (slug === '/' ? '' : slug);
      
      const isHome = toolId === 'home' || (toolId === 'url' && slug === '/');
      const priority = isHome ? '1.0' : (['about', 'privacy', 'terms'].includes(toolId) ? '0.6' : '0.8');
      const changefreq = isHome ? 'daily' : 'weekly';

      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      
      // Hreflang alternate tags
      for (const altLang of langs) {
        const altSlug = localizedRoutes[altLang]?.[toolId] || '/';
        const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
        const altUrl = DOMAIN + altLangPrefix + (altSlug === '/' ? '' : altSlug);
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
      }
      
      // x-default tag
      const defaultSlug = localizedRoutes['en']?.[toolId] || '/';
      const defaultUrl = DOMAIN + (defaultSlug === '/' ? '' : defaultSlug);
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
      
      xml += '  </url>\n';
      totalUrlCount++;
    }
  }

  // 2. Generate URLs for pSEO Industry Use Cases across all 30 Languages
  const pseoIds = pseoDataByLang['en'] ? pseoDataByLang['en'].map(uc => uc.id) : [];
  for (const pId of pseoIds) {
    for (const lang of langs) {
      const langPseoList = pseoDataByLang[lang] || [];
      const uc = langPseoList.find(item => item.id === pId);
      if (!uc) continue;
      
      const langPrefix = lang === 'en' ? '' : '/' + lang;
      const ucUrlSlug = uc.translatedSlug || uc.slug;
      const safeSlug = ucUrlSlug.startsWith('/') ? ucUrlSlug : '/' + ucUrlSlug;
      const url = DOMAIN + langPrefix + safeSlug;
      
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.9</priority>\n';
      
      for (const altLang of langs) {
        const altPseoList = pseoDataByLang[altLang] || [];
        const altUc = altPseoList.find(item => item.id === pId);
        if (altUc) {
          const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
          const altUrlSlug = altUc.translatedSlug || altUc.slug;
          const safeAltSlug = altUrlSlug.startsWith('/') ? altUrlSlug : '/' + altUrlSlug;
          const altUrl = DOMAIN + altLangPrefix + safeAltSlug;
          xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
        }
      }
      
      const defaultUc = (pseoDataByLang['en'] || []).find(item => item.id === pId);
      if (defaultUc) {
        const defaultUrlSlug = defaultUc.translatedSlug || defaultUc.slug;
        const safeDefaultSlug = defaultUrlSlug.startsWith('/') ? defaultUrlSlug : '/' + defaultUrlSlug;
        const defaultUrl = DOMAIN + safeDefaultSlug;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
      }
      
      xml += '  </url>\n';
      totalUrlCount++;
    }
  }

  xml += '</urlset>';

  const publicSitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml);
  
  const distSitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.writeFileSync(distSitemapPath, xml);
  }

  console.log(`✅ Successfully generated sitemap.xml with ${totalUrlCount} URLs.`);
}

run();
