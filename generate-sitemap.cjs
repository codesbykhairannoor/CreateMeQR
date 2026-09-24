const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://createmy-qr.com';
const TODAY = new Date().toISOString().split('T')[0];

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
  const pseoIds = pseoDataByLang['en'] ? pseoDataByLang['en'].map(uc => uc.id) : [];

  console.log(`Found ${langs.length} languages, ${toolIds.length} tools/static routes, and ${pseoIds.length} pSEO cases.`);
  console.log('Generating per-language sitemaps and master sitemap index...');

  const publicDir = path.join(__dirname, 'public');
  const distDir = path.join(__dirname, 'dist');

  let totalGeneratedUrls = 0;
  const generatedSitemapFiles = [];

  // 1. Generate individual sitemap for each language: sitemap-[lang].xml
  for (const lang of langs) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    let langUrlCount = 0;

    // A. Tools & Static pages for this language
    for (const toolId of toolIds) {
      const slug = localizedRoutes[lang]?.[toolId] || '/';
      const langPrefix = lang === 'en' ? '' : '/' + lang;
      const url = DOMAIN + langPrefix + (slug === '/' ? '' : slug);

      const isHome = toolId === 'home' || (toolId === 'url' && slug === '/');
      const priority = isHome ? '1.0' : (['about', 'privacy', 'terms'].includes(toolId) ? '0.6' : '0.8');
      const changefreq = isHome ? 'daily' : 'weekly';

      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${TODAY}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;

      // Hreflang alternate tags for all languages
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
      langUrlCount++;
    }

    // B. pSEO Industry Use Cases for this language
    for (const pId of pseoIds) {
      const langPseoList = pseoDataByLang[lang] || [];
      const uc = langPseoList.find(item => item.id === pId);
      if (!uc) continue;

      const langPrefix = lang === 'en' ? '' : '/' + lang;
      const ucUrlSlug = uc.translatedSlug || uc.slug;
      const safeSlug = ucUrlSlug.startsWith('/') ? ucUrlSlug : '/' + ucUrlSlug;
      const url = DOMAIN + langPrefix + safeSlug;

      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${TODAY}</lastmod>\n`;
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
      langUrlCount++;
    }

    xml += '</urlset>';

    const fileName = `sitemap-${lang}.xml`;
    fs.writeFileSync(path.join(publicDir, fileName), xml);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, fileName), xml);
    }

    generatedSitemapFiles.push(fileName);
    totalGeneratedUrls += langUrlCount;
  }

  // 2. Generate Master Sitemap Index (sitemap_index.xml and sitemap.xml)
  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const sitemapFile of generatedSitemapFiles) {
    indexXml += '  <sitemap>\n';
    indexXml += `    <loc>${DOMAIN}/${sitemapFile}</loc>\n`;
    indexXml += `    <lastmod>${TODAY}</lastmod>\n`;
    indexXml += '  </sitemap>\n';
  }

  indexXml += '</sitemapindex>';

  // Save sitemap_index.xml
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), indexXml);
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap_index.xml'), indexXml);
  }

  // Save sitemap.xml as identical sitemap index (standard Google pattern)
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml);
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), indexXml);
  }

  console.log(`✅ Successfully generated:`);
  console.log(`   - 30 individual language sitemaps (sitemap-[lang].xml) covering ${totalGeneratedUrls} URLs`);
  console.log(`   - sitemap_index.xml with ${generatedSitemapFiles.length} child sitemaps`);
  console.log(`   - sitemap.xml (master index) for seamless Google Search Console compatibility.`);
}

run().catch(err => {
  console.error('Fatal error generating sitemaps:', err);
  process.exit(1);
});
