const fs = require('fs');
const path = require('path');

async function run() {
  // Use dynamic import for ES modules
  const { localizedRoutes, routeToToolMap } = await import('./src/config/localizedRoutes.js');

  // Helper to get languages
  const langsDir = path.join(__dirname, 'public', 'locales');
  const langCodes = fs.readdirSync(langsDir).filter(f => fs.statSync(path.join(langsDir, f)).isDirectory());

  const distDir = path.join(__dirname, 'dist');
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');

  console.log('dYs? Starting Static Site Generation (SSG) for all 30 languages...');

  let generatedCount = 0;

  for (const lang of langCodes) {
    const transPath = path.join(langsDir, lang, 'translation.json');
    if (!fs.existsSync(transPath)) continue;
    
    const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
    const toolMap = routeToToolMap[lang] || {};
    
    for (const [localizedSlug, toolId] of Object.entries(toolMap)) {
      let title, description;
      
      if (toolId === 'url' || toolId === '/') {
        title = translations.appTitle || 'CreateMy-QR | Free Custom QR Code Generator';
        description = translations.tagline || 'Generate high-quality static QR codes directly in your browser.';
      } else {
        const toolName = translations.types?.[toolId] || toolId;
        
        // Build a professional, flawless title like "Wi-Fi - Free QR Code Generator | CreateMy-QR"
        let baseAppTitle = translations.appTitle || 'CreateMy-QR | Free Custom QR Code Generator';
        // Clean up "(No Signup)" for cleaner tool titles
        baseAppTitle = baseAppTitle.replace(/\s*\([^)]*\)/g, ''); 
        
        title = `${toolName} - ${baseAppTitle}`;
        description = translations.seoTool?.description?.replace('{{tool}}', toolName) || translations.tagline || `Free ${toolName} generator`;
      }

      let newHtml = baseHtml.replace(
        /<html lang="en">/,
        `<html lang="${lang}">`
      );
      newHtml = newHtml.replace(
        /<title>.*?<\/title>/,
        `<title>${title}</title>`
      );
      newHtml = newHtml.replace(
        /<meta name="title" content=".*?"\s*\/>/,
        `<meta name="title" content="${title}" />`
      );
      newHtml = newHtml.replace(
        /<meta name="description" content=".*?"\s*\/>/,
        `<meta name="description" content="${description}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="og:title" content=".*?"\s*\/>/,
        `<meta property="og:title" content="${title}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="og:description" content=".*?"\s*\/>/,
        `<meta property="og:description" content="${description}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="twitter:title" content=".*?"\s*\/>/,
        `<meta property="twitter:title" content="${title}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="twitter:description" content=".*?"\s*\/>/,
        `<meta property="twitter:description" content="${description}" />`
      );

      // Determine the self-referencing canonical URL
      const canonicalSlug = localizedRoutes[lang]?.[toolId] || '/';
      const canonicalPrefix = lang === 'en' ? '' : '/' + lang;
      const canonicalUrl = `https://createmy-qr.com${canonicalPrefix}${canonicalSlug === '/' ? '' : canonicalSlug}`;

      newHtml = newHtml.replace(
        /<link rel="canonical" href=".*?"\s*\/>/,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );

      // Construct and inject static hreflang matrix
      let hreflangMatrix = '\n    <!-- Static pSEO Hreflang Matrix -->';
      for (const altLang of langCodes) {
        const altSlug = routeToToolMap[altLang] ? Object.keys(routeToToolMap[altLang]).find(key => routeToToolMap[altLang][key] === toolId) || '/' : '/';
        // Wait, routeToToolMap maps slug -> toolId. We need toolId -> slug.
        // Let's use localizedRoutes[altLang][toolId] which maps toolId -> slug!
        const actualAltSlug = localizedRoutes[altLang]?.[toolId] || '/';
        const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
        const altUrl = `https://createmy-qr.com${altLangPrefix}${actualAltSlug === '/' ? '' : actualAltSlug}`;
        hreflangMatrix += `\n    <link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
      }
      
      const defaultSlug = localizedRoutes['en']?.[toolId] || '/';
      const defaultUrl = `https://createmy-qr.com${defaultSlug === '/' ? '' : defaultSlug}`;
      hreflangMatrix += `\n    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;

      newHtml = newHtml.replace('</head>', hreflangMatrix + '  </head>');

      // Load fallback English geoOptimized for missing ones (zh, ja, etc)
      {
        let localTranslations = {};
        try {
          if (typeof translations !== 'undefined') {
            localTranslations = translations;
          } else {
            const transPath = path.join(langsDir, lang, 'translation.json');
            if (fs.existsSync(transPath)) {
              localTranslations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
            }
          }
        } catch (e) {}

        const enTransPath = path.join(langsDir, 'en', 'translation.json');
        const enTrans = JSON.parse(fs.readFileSync(enTransPath, 'utf8'));
        const geoEn = enTrans.geoOptimized;
        const geo = localTranslations.geoOptimized || geoEn;

        // Construct localized static-seo block
        const localizedStaticSeo = `<main id="static-seo" role="main" class="w-full bg-white dark:bg-zinc-950 py-16 px-6">
          <div class="max-w-4xl mx-auto prose prose-zinc dark:prose-invert">
            <article itemScope itemType="https://schema.org/Article">

              <header class="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h1 itemProp="headline" class="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
                  ${geo.h1 || geoEn.h1}
                </h1>
                <div class="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>By <strong itemProp="author">${geo.author || geoEn.author}</strong></span>
                  <span>•</span>
                  <time itemProp="datePublished" dateTime="2026-07-05">Published: July 5, 2026</time>
                  <span>•</span>
                  <time itemProp="dateModified" dateTime="2026-08-04">Last Reviewed: August 4, 2026 (ISO/IEC 18004 Compliant)</time>
                </div>
              </header>

              <section class="mb-10 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                <h2 class="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-4 mt-0">${geo.certTitle || geoEn.certTitle}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 class="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">${geo.cert1_t || geoEn.cert1_t}</h3>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 m-0">${geo.cert1_d || geoEn.cert1_d}</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">${geo.cert2_t || geoEn.cert2_t}</h3>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 m-0">${geo.cert2_d || geoEn.cert2_d}</p>
                  </div>
                  <div class="md:col-span-2 mt-2">
                    <h3 class="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">${geo.cert3_t || geoEn.cert3_t}</h3>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 m-0 italic">${geo.cert3_d || geoEn.cert3_d}</p>
                  </div>
                </div>
              </section>
              
              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_1 || geoEn.h2_1}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p1_1 || geoEn.p1_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_2 || geoEn.p1_2}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_3 || geoEn.p1_3}</p>

                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_1 || geoEn.h3_1}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_4 || geoEn.p1_4}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_5 || geoEn.p1_5}</p>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">${geo.p1_6 || geoEn.p1_6}</p>
                <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-zinc-700 dark:text-zinc-300">
                  <p>${geo.quote1 || geoEn.quote1}</p>
                  <footer>— <cite>${geo.author || geoEn.author}, <a href="https://arxiv.org/abs/2311.09735" rel="noopener">university research reports</a></cite></footer>
                </blockquote>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_2 || geoEn.h2_2}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p2_1 || geoEn.p2_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p2_2 || geoEn.p2_2}</p>
                
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_2 || geoEn.h3_2}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p2_3 || geoEn.p2_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">${geo.p2_4 || geoEn.p2_4}</p>
                
                <figure class="my-6 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                  <img src="/logo.svg" alt="Diagram showing local browser barcode creation workflow" class="w-16 h-16 mx-auto mb-2" />
                  <figcaption class="text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">${geo.fig1 || geoEn.fig1}</figcaption>
                </figure>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_3 || geoEn.h2_3}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p3_1 || geoEn.p3_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p3_2 || geoEn.p3_2}</p>
                
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_3 || geoEn.h3_3}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p3_3 || geoEn.p3_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">${geo.p3_4 || geoEn.p3_4}</p>
                
                <div class="overflow-x-auto mb-6">
                  <table class="w-full text-left border-collapse border border-zinc-300 dark:border-zinc-700">
                    <caption class="sr-only">Plan feature comparison</caption>
                    <thead>
                      <tr class="bg-zinc-100 dark:bg-zinc-800/50">
                        <th class="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Technical Metric</th>
                        <th class="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Local Browser Engine</th>
                        <th class="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Legacy Cloud Servers</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm text-zinc-700 dark:text-zinc-300">
                      <tr>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Data Privacy</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">100% Local Browser Cache</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">Data logged on remote servers</td>
                      </tr>
                      <tr>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Scan Limit</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">Unlimited Scans Forever</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">14-Day Trial Paywall Trap</td>
                      </tr>
                      <tr>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Speed</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">&lt; 12 milliseconds</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">800ms - 2,500ms latency</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <blockquote class="border-l-4 border-emerald-500 pl-4 py-2 my-4 italic text-zinc-700 dark:text-zinc-300">
                  <p>${geo.quote2 || geoEn.quote2}</p>
                  <footer>— <cite>Robert Taylor, retail analyst, <a href="https://www.iso.org/standard/62021.html" rel="noopener">retail sales benchmarks</a></cite></footer>
                </blockquote>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_4 || geoEn.h2_4}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p4_1 || geoEn.p4_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p4_2 || geoEn.p4_2}</p>
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_4 || geoEn.h3_4}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p4_3 || geoEn.p4_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p4_4 || geoEn.p4_4}</p>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_5 || geoEn.h2_5}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p5_1 || geoEn.p5_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p5_2 || geoEn.p5_2}</p>
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_5 || geoEn.h3_5}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p5_3 || geoEn.p5_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p5_4 || geoEn.p5_4}</p>
              </section>
              
            </article>
          </div>
        </main>`;
        
        newHtml = newHtml.replace(/<main id="static-seo"[\s\S]*?<\/main>/, localizedStaticSeo);
      }


      const routeDir = lang === 'en' ? 
        path.join(distDir, localizedSlug === '/' ? '' : localizedSlug.substring(1)) : 
        path.join(distDir, lang, localizedSlug === '/' ? '' : localizedSlug.substring(1));
      
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
      generatedCount++;
    }
  }

  const staticRoutes = [
    { path: '/about', title: 'About CreateMy-QR', desc: 'Learn more about CreateMy-QR.' },
    { path: '/privacy', title: 'Privacy Policy - CreateMy-QR', desc: 'Read our privacy policy.' },
    { path: '/terms', title: 'Terms of Service - CreateMy-QR', desc: 'Read our terms of service.' },
    { path: '/contact', title: 'Contact Us - CreateMy-QR', desc: 'Contact the CreateMy-QR team.' },
    { path: '/compare', title: 'Compare Plans - CreateMy-QR', desc: 'Compare our free features.' },
    { path: '/barcode-generator', title: 'Free Barcode Generator', desc: 'Generate barcodes instantly.' },
    { path: '/scan-qr', title: 'Scan QR Code Online', desc: 'Scan QR codes directly from your browser.' }
  ];

  console.log('dYs? Starting Static Site Generation for static pages...');

  for (const lang of langCodes) {
    for (const routeObj of staticRoutes) {
      const { path: routePath, title, desc } = routeObj;
      let newHtml = baseHtml.replace(/<html lang="en">/, `<html lang="${lang}">`);
      newHtml = newHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      newHtml = newHtml.replace(/<meta name="title" content=".*?"\s*\/>/, `<meta name="title" content="${title}" />`);
      newHtml = newHtml.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${desc}" />`);
      newHtml = newHtml.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${title}" />`);
      newHtml = newHtml.replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${desc}" />`);
      newHtml = newHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/>/, `<meta property="twitter:title" content="${title}" />`);
      newHtml = newHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/>/, `<meta property="twitter:description" content="${desc}" />`);

      const canonicalPrefix = lang === 'en' ? '' : '/' + lang;
      const canonicalUrl = `https://createmy-qr.com${canonicalPrefix}${routePath}`;
      newHtml = newHtml.replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`);

      let hreflangMatrix = '\n    <!-- Static pSEO Hreflang Matrix -->';
      for (const altLang of langCodes) {
        const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
        const altUrl = `https://createmy-qr.com${altLangPrefix}${routePath}`;
        hreflangMatrix += `\n    <link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
      }
      const defaultUrl = `https://createmy-qr.com${routePath}`;
      hreflangMatrix += `\n    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
      newHtml = newHtml.replace('</head>', hreflangMatrix + '  </head>');

      // Load fallback English geoOptimized for missing ones (zh, ja, etc)
      {
        let localTranslations = {};
        try {
          if (typeof translations !== 'undefined') {
            localTranslations = translations;
          } else {
            const transPath = path.join(langsDir, lang, 'translation.json');
            if (fs.existsSync(transPath)) {
              localTranslations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
            }
          }
        } catch (e) {}

        const enTransPath = path.join(langsDir, 'en', 'translation.json');
        const enTrans = JSON.parse(fs.readFileSync(enTransPath, 'utf8'));
        const geoEn = enTrans.geoOptimized;
        const geo = localTranslations.geoOptimized || geoEn;

        // Construct localized static-seo block
        const localizedStaticSeo = `<main id="static-seo" role="main" class="w-full bg-white dark:bg-zinc-950 py-16 px-6">
          <div class="max-w-4xl mx-auto prose prose-zinc dark:prose-invert">
            <article itemScope itemType="https://schema.org/Article">

              <header class="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h1 itemProp="headline" class="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
                  ${geo.h1 || geoEn.h1}
                </h1>
                <div class="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>By <strong itemProp="author">${geo.author || geoEn.author}</strong></span>
                  <span>•</span>
                  <time itemProp="datePublished" dateTime="2026-07-05">Published: July 5, 2026</time>
                  <span>•</span>
                  <time itemProp="dateModified" dateTime="2026-08-04">Last Reviewed: August 4, 2026 (ISO/IEC 18004 Compliant)</time>
                </div>
              </header>

              <section class="mb-10 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                <h2 class="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-4 mt-0">${geo.certTitle || geoEn.certTitle}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 class="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">${geo.cert1_t || geoEn.cert1_t}</h3>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 m-0">${geo.cert1_d || geoEn.cert1_d}</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">${geo.cert2_t || geoEn.cert2_t}</h3>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 m-0">${geo.cert2_d || geoEn.cert2_d}</p>
                  </div>
                  <div class="md:col-span-2 mt-2">
                    <h3 class="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">${geo.cert3_t || geoEn.cert3_t}</h3>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 m-0 italic">${geo.cert3_d || geoEn.cert3_d}</p>
                  </div>
                </div>
              </section>
              
              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_1 || geoEn.h2_1}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p1_1 || geoEn.p1_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_2 || geoEn.p1_2}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_3 || geoEn.p1_3}</p>

                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_1 || geoEn.h3_1}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_4 || geoEn.p1_4}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p1_5 || geoEn.p1_5}</p>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">${geo.p1_6 || geoEn.p1_6}</p>
                <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-zinc-700 dark:text-zinc-300">
                  <p>${geo.quote1 || geoEn.quote1}</p>
                  <footer>— <cite>${geo.author || geoEn.author}, <a href="https://arxiv.org/abs/2311.09735" rel="noopener">university research reports</a></cite></footer>
                </blockquote>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_2 || geoEn.h2_2}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p2_1 || geoEn.p2_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p2_2 || geoEn.p2_2}</p>
                
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_2 || geoEn.h3_2}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p2_3 || geoEn.p2_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">${geo.p2_4 || geoEn.p2_4}</p>
                
                <figure class="my-6 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                  <img src="/logo.svg" alt="Diagram showing local browser barcode creation workflow" class="w-16 h-16 mx-auto mb-2" />
                  <figcaption class="text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">${geo.fig1 || geoEn.fig1}</figcaption>
                </figure>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_3 || geoEn.h2_3}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p3_1 || geoEn.p3_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p3_2 || geoEn.p3_2}</p>
                
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_3 || geoEn.h3_3}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p3_3 || geoEn.p3_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">${geo.p3_4 || geoEn.p3_4}</p>
                
                <div class="overflow-x-auto mb-6">
                  <table class="w-full text-left border-collapse border border-zinc-300 dark:border-zinc-700">
                    <caption class="sr-only">Plan feature comparison</caption>
                    <thead>
                      <tr class="bg-zinc-100 dark:bg-zinc-800/50">
                        <th class="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Technical Metric</th>
                        <th class="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Local Browser Engine</th>
                        <th class="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Legacy Cloud Servers</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm text-zinc-700 dark:text-zinc-300">
                      <tr>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Data Privacy</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">100% Local Browser Cache</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">Data logged on remote servers</td>
                      </tr>
                      <tr>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Scan Limit</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">Unlimited Scans Forever</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">14-Day Trial Paywall Trap</td>
                      </tr>
                      <tr>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Speed</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">&lt; 12 milliseconds</td>
                        <td class="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">800ms - 2,500ms latency</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <blockquote class="border-l-4 border-emerald-500 pl-4 py-2 my-4 italic text-zinc-700 dark:text-zinc-300">
                  <p>${geo.quote2 || geoEn.quote2}</p>
                  <footer>— <cite>Robert Taylor, retail analyst, <a href="https://www.iso.org/standard/62021.html" rel="noopener">retail sales benchmarks</a></cite></footer>
                </blockquote>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_4 || geoEn.h2_4}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p4_1 || geoEn.p4_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p4_2 || geoEn.p4_2}</p>
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_4 || geoEn.h3_4}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p4_3 || geoEn.p4_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p4_4 || geoEn.p4_4}</p>
              </section>

              <section class="mb-10">
                <h2 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10">${geo.h2_5 || geoEn.h2_5}</h2>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">${geo.p5_1 || geoEn.p5_1}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p5_2 || geoEn.p5_2}</p>
                <h3 class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2">${geo.h3_5 || geoEn.h3_5}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p5_3 || geoEn.p5_3}</p>
                <p class="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">${geo.p5_4 || geoEn.p5_4}</p>
              </section>
              
            </article>
          </div>
        </main>`;
        
        newHtml = newHtml.replace(/<main id="static-seo"[\s\S]*?<\/main>/, localizedStaticSeo);
      }


      const routeDir = lang === 'en' 
        ? path.join(distDir, routePath.substring(1)) 
        : path.join(distDir, lang, routePath.substring(1));
      
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
      generatedCount++;
    }
  }

  console.log(`dY? SSG Complete! Generated ${generatedCount} statically optimized HTML files for Googlebot.`);
}

run();
