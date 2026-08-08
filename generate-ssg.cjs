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
