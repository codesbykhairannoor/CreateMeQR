const fs = require('fs');
const path = require('path');

async function run() {
  // Polyfills for SSR
  global.window = { location: { pathname: '/', search: '', hash: '' } };
  global.document = {
    documentElement: { dir: 'ltr' },
    querySelector: () => null,
    createElement: () => ({}),
    cookie: '',
  };
  global.location = global.window.location;
  global.localStorage = { getItem: () => null, setItem: () => {} };
  global.navigator = { language: 'en' };

  // Use dynamic import for ES modules
  const { localizedRoutes, routeToToolMap } = await import('./src/config/localizedRoutes.js');
  
  // Load all pSEO locales
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
  
  let serverRender = null;
  try {
    const serverEntryPath = path.join(__dirname, 'dist', 'server', 'entry-server.js');
    if (fs.existsSync(serverEntryPath)) {
      const serverModule = await import('file://' + serverEntryPath.replace(/\\/g, '/'));
      serverRender = serverModule.render;
      console.log('✅ Loaded React Server-Side Rendering (SSR) bundle.');
    }
  } catch (e) {
    console.error('Failed to load SSR bundle:', e);
  }

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
    
    const allPages = { ...toolMap };
    
    // Inject pSEO routes for this language (use translatedSlug if available)
    const langPseo = pseoDataByLang[lang] || [];
    langPseo.forEach(uc => {
      const urlSlug = uc.translatedSlug || uc.slug;
      const safeSlug = urlSlug.startsWith('/') ? urlSlug : '/' + urlSlug;
      allPages[safeSlug] = 'pseo_' + uc.id; // use unique ID to map later
    });
    
    for (const [localizedSlug, toolId] of Object.entries(allPages)) {
      let title, description;
      
      const useCase = toolId.startsWith('pseo_') 
        ? langPseo.find(uc => uc.id === toolId.replace('pseo_', '')) 
        : null;

      if (useCase) {
        title = `${useCase.h1Title} | CreateMy-QR`;
        description = useCase.seoDesc;
      } else if (['about', 'compare', 'languages', 'pricing', 'privacy', 'security', 'terms', 'usecases'].includes(toolId)) {
        // Fallback or exact titles for static pages
        const staticTitles = {
          'about': 'About Us',
          'compare': 'Compare Tools',
          'languages': 'Supported Languages',
          'pricing': '100% Free Pricing',
          'privacy': 'Privacy Policy',
          'security': 'Security Architecture',
          'terms': 'Terms of Service',
          'usecases': 'Use Cases'
        };
        
        let translatedTitle = staticTitles[toolId];
        if (translations.static && translations.static[toolId] && translations.static[toolId].seoTitle) {
          translatedTitle = translations.static[toolId].seoTitle;
        }
        
        title = `${translatedTitle} | CreateMy-QR`;
        description = `Learn more about CreateMy-QR ${staticTitles[toolId].toLowerCase()}.`;
      } else if (toolId === 'url' || toolId === '/') {
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
      const canonicalSlug = toolId.startsWith('pseo_') ? localizedSlug : (localizedRoutes[lang]?.[toolId] || '/');
      const canonicalPrefix = lang === 'en' ? '' : '/' + lang;
      const canonicalUrl = `https://createmy-qr.com${canonicalPrefix}${canonicalSlug === '/' ? '' : canonicalSlug}`;

      newHtml = newHtml.replace(
        /<link rel="canonical" href=".*?"\s*\/>/,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );

      // Construct and inject static hreflang matrix
      let hreflangMatrix = '\n    <!-- Static Hreflang Matrix -->';
      
      if (toolId.startsWith('pseo_')) {
        const pId = toolId.replace('pseo_', '');
        for (const altLang of langCodes) {
          const altPseoList = pseoDataByLang[altLang] || [];
          const altUseCase = altPseoList.find(uc => uc.id === pId);
          if (altUseCase) {
            const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
            const altUrl = `https://createmy-qr.com${altLangPrefix}/${altUseCase.slug}`;
            hreflangMatrix += `\n    <link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
          }
        }
        const defaultUseCase = (pseoDataByLang['en'] || []).find(uc => uc.id === pId);
        if (defaultUseCase) {
          const defaultUrl = `https://createmy-qr.com/${defaultUseCase.slug}`;
          hreflangMatrix += `\n    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
        }
      } else {
        for (const altLang of langCodes) {
          const actualAltSlug = localizedRoutes[altLang]?.[toolId] || '/';
          const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
          const altUrl = `https://createmy-qr.com${altLangPrefix}${actualAltSlug === '/' ? '' : actualAltSlug}`;
          hreflangMatrix += `\n    <link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
        }
        
        const defaultSlug = localizedRoutes['en']?.[toolId] || '/';
        const defaultUrl = `https://createmy-qr.com${defaultSlug === '/' ? '' : defaultSlug}`;
        hreflangMatrix += `\n    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
      }

      newHtml = newHtml.replace('</head>', hreflangMatrix + '  </head>');

      const urlPath = lang === 'en' ? localizedSlug : `/${lang}${localizedSlug === '/' ? '' : localizedSlug}`;
      let ssrHtml = '';
      if (serverRender) {
        try {
          // Update location for this route
          global.window.location = { pathname: urlPath, search: '', hash: '' };
          global.location = global.window.location;
          
          const helmetContext = {};
          ssrHtml = serverRender(urlPath, helmetContext, lang, translations);
          
          if (helmetContext.helmet) {
            newHtml = newHtml.replace(
              /<title>.*?<\/title>/,
              helmetContext.helmet.title.toString()
            );
            newHtml = newHtml.replace(
              /<meta name="description".*?>/,
              helmetContext.helmet.meta.toString()
            );
          }
        } catch (e) {
          console.error(`Error SSR rendering ${urlPath}:`, e);
        }
      }
      
      newHtml = newHtml.replace('<!--ssr-outlet-->', ssrHtml);


      const routeDir = lang === 'en' ? 
        path.join(distDir, localizedSlug === '/' ? '' : localizedSlug.substring(1)) : 
        path.join(distDir, lang, localizedSlug === '/' ? '' : localizedSlug.substring(1));
      
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
      generatedCount++;
      if (generatedCount % 100 === 0) {
        console.log(`Generated ${generatedCount} pages... (Latest: ${urlPath})`);
      }
    }
  }

  const staticRoutes = [
    { path: '/about', title: 'About CreateMy-QR', desc: 'Learn more about CreateMy-QR.' },
    { path: '/privacy', title: 'Privacy Policy - CreateMy-QR', desc: 'Read our privacy policy.' },
    { path: '/terms', title: 'Terms of Service - CreateMy-QR', desc: 'Read our terms of service.' },
    { path: '/contact', title: 'Contact Us - CreateMy-QR', desc: 'Contact the CreateMy-QR team.' },
    { path: '/compare', title: 'Compare Plans - CreateMy-QR', desc: 'Compare our free features.' },
    { path: '/barcode-generator', title: 'Free Barcode Generator', desc: 'Generate barcodes instantly.' },
    { path: '/scan-qr', title: 'Scan QR Code Online', desc: 'Scan QR codes directly from your browser.' },
    { path: '/scan-barcode', title: 'Scan Barcode Online', desc: 'Scan Barcodes directly from your browser.' }
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

      if (serverRender) {
        try {
          const urlPath = lang === 'en' ? routePath : `/${lang}${routePath}`;
          global.window.location = { pathname: urlPath, search: '', hash: '' };
          global.location = global.window.location;
          
          let localTranslations = {};
          if (typeof translations !== 'undefined') {
            localTranslations = translations;
          } else {
            const transPath = path.join(langsDir, lang, 'translation.json');
            if (fs.existsSync(transPath)) {
              localTranslations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
            }
          }
          
          const helmetContext = {};
          const ssrHtml = serverRender(urlPath, helmetContext, lang, localTranslations);
          newHtml = newHtml.replace('<!--ssr-outlet-->', ssrHtml);
        } catch (e) {
          console.error(`Error SSR rendering static ${routePath}:`, e);
        }
      }


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
