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
  const distIndexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(distIndexPath)) {
    console.error('dist/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  // Extract compiled assets from dist/index.html built by Vite
  const distContent = fs.readFileSync(distIndexPath, 'utf8');
  const cssMatches = distContent.match(/<link\s+rel="stylesheet"[^>]*href="\/assets\/[^"]+"[^>]*\/?>/gi) || [];
  const jsMatches = distContent.match(/<script\s+type="module"[^>]*src="\/assets\/[^"]+"[^>]*><\/script>/gi) || [];
  const assetTags = '\n    ' + [...cssMatches, ...jsMatches].join('\n    ');

  // Read pristine template from root index.html
  const sourceTemplatePath = path.join(__dirname, 'index.html');
  let baseHtml = fs.readFileSync(sourceTemplatePath, 'utf8');

  // Remove dev script tag and inject compiled Vite assets
  baseHtml = baseHtml.replace(/<script\s+type="module"\s+src="\/src\/main\.jsx"><\/script>/i, '');
  baseHtml = baseHtml.replace('</head>', assetTags + '\n  </head>');

  // Strip static title/meta from source template so they are dynamically injected strictly once
  const headMatch = baseHtml.match(/<head>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    let cleanHead = headMatch[1];
    cleanHead = cleanHead.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
    cleanHead = cleanHead.replace(/<meta\s+name="title"[^>]*\/?>/gi, '');
    cleanHead = cleanHead.replace(/<meta\s+name="description"[^>]*\/?>/gi, '');
    cleanHead = cleanHead.replace(/<meta\s+property="og:(?:title|description|url|locale|image|image:width|image:height|image:alt|site_name|type)"[^>]*\/?>/gi, '');
    cleanHead = cleanHead.replace(/<meta\s+(?:property|name)="twitter:(?:title|description|url|card|image)"[^>]*\/?>/gi, '');
    cleanHead = cleanHead.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '');
    cleanHead = cleanHead.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>/gi, '');
    baseHtml = baseHtml.replace(/<head>[\s\S]*?<\/head>/i, `<head>${cleanHead}</head>`);
  }

  console.log('🚀 Starting Static Site Generation (SSG) for all 30 languages...');

  let generatedCount = 0;

  for (const lang of langCodes) {
    const transPath = path.join(langsDir, lang, 'translation.json');
    if (!fs.existsSync(transPath)) continue;
    
    const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
    const toolMap = routeToToolMap[lang] || {};
    
    const allPages = { ...toolMap };
    
    // Inject pSEO routes for this language
    const langPseo = pseoDataByLang[lang] || [];
    langPseo.forEach(uc => {
      const urlSlug = uc.translatedSlug || uc.slug;
      const safeSlug = urlSlug.startsWith('/') ? urlSlug : '/' + urlSlug;
      allPages[safeSlug] = 'pseo_' + uc.id;
    });
    
    for (const [localizedSlug, toolId] of Object.entries(allPages)) {
      let title, description;
      
      const useCase = toolId.startsWith('pseo_') 
        ? langPseo.find(uc => uc.id === toolId.replace('pseo_', '')) 
        : null;

      if (useCase) {
        title = `${useCase.h1Title} | CreateMy-QR`;
        description = useCase.seoDesc;
      } else if (['about', 'compare', 'languages', 'pricing', 'privacy', 'security', 'terms', 'usecases', 'barcode', 'scanqr', 'scanbarcode'].includes(toolId)) {
        const staticMeta = {
          'about': {
            title: translations.static?.about?.seoTitle || 'About Us',
            desc: 'Democratizing document and QR tools with 100% client-side security and privacy.'
          },
          'compare': {
            title: translations.static?.compare?.seoTitle || 'Compare Tools',
            desc: 'Discover why professionals choose CreateMy-QR for private, client-side generation without API limits.'
          },
          'languages': {
            title: translations.static?.languages?.seoTitle || 'Supported Languages',
            desc: 'Create and scan QR codes and barcodes in 30 languages worldwide with instant client-side generation.'
          },
          'pricing': {
            title: translations.static?.pricing?.seoTitle || '100% Free Pricing',
            desc: 'CreateMy-QR is 100% free with unlimited scans, high-resolution vector downloads, and zero limits.'
          },
          'privacy': {
            title: translations.static?.privacy?.seoTitle || 'Privacy Policy',
            desc: 'Zero-tracking privacy policy. All data processing occurs locally in your browser memory.'
          },
          'security': {
            title: translations.static?.security?.seoTitle || 'Security Architecture',
            desc: 'Explore our zero-trust security model: 100% client-side cryptography, zero cloud transmission, zero data storage.'
          },
          'terms': {
            title: translations.static?.terms?.seoTitle || 'Terms of Service',
            desc: 'Terms and conditions for using CreateMy-QR free online generator and scanner tools.'
          },
          'usecases': {
            title: translations.static?.usecases?.seoTitle || 'Industry Use Cases',
            desc: 'Explore real-world QR code use cases for restaurants, retail, events, payments, and enterprise operations.'
          },
          'barcode': {
            title: translations.static?.barcode?.seoTitle || 'Free Barcode Generator',
            desc: 'Generate linear barcodes (EAN, UPC, Code 128, Code 39) instantly in your browser with high-res download.'
          },
          'scanqr': {
            title: translations.static?.scanqr?.seoTitle || 'Scan QR Code Online',
            desc: 'Scan and decode QR codes from webcam or image files securely in your browser with instant client-side decoding.'
          },
          'scanbarcode': {
            title: translations.static?.scanbarcode?.seoTitle || 'Scan Barcode Online',
            desc: 'Scan barcodes from camera or uploaded image files securely in your browser with zero server uploads.'
          }
        };
        
        const meta = staticMeta[toolId] || { title: 'Tools', desc: 'Free online tools.' };
        title = `${meta.title} | CreateMy-QR`;
        description = meta.desc;
      } else if (toolId === 'url' || toolId === 'home' || toolId === '/' || localizedSlug === '/') {
        title = `CreateMy-QR | ${translations.home?.heroTitle || 'All QR & Barcode'} ${translations.home?.heroTitleHighlight || 'Tools in One Place'}`;
        description = translations.home?.seoDesc || translations.tagline || 'Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO-compliant, 30 languages.';
      } else {
        const toolName = translations.types?.[toolId] || toolId;
        title = `${toolName} - Free QR Code Generator | CreateMy-QR`;
        description = `Create custom ${toolName} QR codes with logo for free. Best editable QR code generator with no watermark. 100% private, client-side generation.`;
      }

      function formatSeoTitle(rawTitle, brandSuffix = ' | CreateMy-QR') {
        if (!rawTitle) return 'CreateMy-QR | Free Custom QR Code Generator';
        let t = rawTitle.replace(/\s+/g, ' ').trim();
        if (t.includes('CreateMy-QR')) {
          if (t.length <= 60) return t;
          const parts = t.split('|');
          const mainPart = parts[0].trim();
          if (mainPart.length + brandSuffix.length <= 60) {
            return `${mainPart}${brandSuffix}`;
          }
          return mainPart.substring(0, 57).trim() + '...';
        }
        if (t.length + brandSuffix.length <= 60) {
          return `${t}${brandSuffix}`;
        }
        if (t.length <= 60) {
          return t;
        }
        return t.substring(0, 57).trim() + '...';
      }

      function formatMetaDescription(rawDesc, fallback = 'Create custom QR codes with logo for free. 100% client-side security with vector SVG and PNG downloads.') {
        let desc = (rawDesc || fallback).replace(/\s+/g, ' ').trim();
        desc = desc.replace(/\{\{[^}]+\}\}/g, '').replace(/types\.[a-z0-9_]+/gi, 'QR Code');
        if (desc.length > 158) {
          return desc.substring(0, 155).trim() + '...';
        }
        if (desc.length < 70) {
          return `${desc} 100% free with no sign-up, unlimited scans, and client-side privacy.`;
        }
        return desc;
      }

      title = formatSeoTitle(title);
      description = formatMetaDescription(description);

      // Determine the self-referencing canonical URL
      const canonicalSlug = toolId.startsWith('pseo_') ? localizedSlug : (localizedRoutes[lang]?.[toolId] || '/');
      const canonicalPrefix = lang === 'en' ? '' : '/' + lang;
      const canonicalUrl = `https://createmy-qr.com${canonicalPrefix}${canonicalSlug === '/' ? '' : canonicalSlug}`;

      let headTags = `
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://createmy-qr.com/og-image.png" />
    <meta property="og:site_name" content="CreateMy-QR" />
    <meta property="og:locale" content="${lang}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:image" content="https://createmy-qr.com/og-image.png" />
    <link rel="canonical" href="${canonicalUrl}" />`;

      // Construct and inject static hreflang matrix
      let hreflangMatrix = '\n    <!-- Static Hreflang Matrix -->';
      
      if (toolId.startsWith('pseo_')) {
        const pId = toolId.replace('pseo_', '');
        for (const altLang of langCodes) {
          const altPseoList = pseoDataByLang[altLang] || [];
          const altUseCase = altPseoList.find(uc => uc.id === pId);
          if (altUseCase) {
            const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
            const altUrlSlug = altUseCase.translatedSlug || altUseCase.slug;
            const safeAltSlug = altUrlSlug.startsWith('/') ? altUrlSlug : '/' + altUrlSlug;
            const altUrl = `https://createmy-qr.com${altLangPrefix}${safeAltSlug}`;
            hreflangMatrix += `\n    <link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
          }
        }
        const defaultUseCase = (pseoDataByLang['en'] || []).find(uc => uc.id === pId);
        if (defaultUseCase) {
          const defaultUrlSlug = defaultUseCase.translatedSlug || defaultUseCase.slug;
          const safeDefaultSlug = defaultUrlSlug.startsWith('/') ? defaultUrlSlug : '/' + defaultUrlSlug;
          const defaultUrl = `https://createmy-qr.com${safeDefaultSlug}`;
          hreflangMatrix += `\n    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`;
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
        hreflangMatrix += `\n    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`;
      }

      let newHtml = baseHtml;
      newHtml = newHtml.replace(/<html(\s+[^>]*)?>/i, `<html lang="${lang}"${lang === 'ar' ? ' dir="rtl"' : ''}>`);
      newHtml = newHtml.replace('</head>', headTags + hreflangMatrix + '\n  </head>');

      const urlPath = lang === 'en' ? localizedSlug : `/${lang}${localizedSlug === '/' ? '' : localizedSlug}`;
      let ssrHtml = '';
      if (serverRender) {
        try {
          // Update location for this route
          global.window.location = { pathname: urlPath, search: '', hash: '' };
          global.location = global.window.location;
          
          const helmetContext = {};
          ssrHtml = serverRender(urlPath, helmetContext, lang, translations);
          
          // Strip any head tags that React 19 / Helmet leaked into the body markup
          if (ssrHtml) {
            ssrHtml = ssrHtml
              .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
              .replace(/<meta\b[^>]*\/?>/gi, '')
              .replace(/<link\s+rel="(?:canonical|alternate|preload)"[^>]*\/?>/gi, '')
              .replace(/<html\b[^>]*>/gi, '')
              .replace(/<\/html>/gi, '');
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
      if (generatedCount % 200 === 0) {
        console.log(`Generated ${generatedCount} pages... (Latest: ${urlPath})`);
      }
    }
  }

  // 3. Generate legacy alias / fallback redirect pages for unmatched English slugs in other languages
  console.log('🔄 Generating legacy fallback redirect pages...');
  let aliasCount = 0;
  
  // Root /usecases -> /use-cases
  const rootLegacyUseCases = path.join(distDir, 'usecases');
  if (!fs.existsSync(rootLegacyUseCases)) {
    fs.mkdirSync(rootLegacyUseCases, { recursive: true });
    fs.writeFileSync(
      path.join(rootLegacyUseCases, 'index.html'),
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=https://createmy-qr.com/use-cases" /><link rel="canonical" href="https://createmy-qr.com/use-cases" /><meta name="robots" content="noindex,follow" /></head><body><p>Redirecting to <a href="https://createmy-qr.com/use-cases">https://createmy-qr.com/use-cases</a>...</p></body></html>`
    );
    aliasCount++;
  }

  for (const lang of langCodes) {
    if (lang === 'en') continue;
    const toolMap = routeToToolMap[lang] || {};
    
    // Check static routes and tools
    const enRoutes = localizedRoutes['en'] || {};
    for (const [toolId, enSlug] of Object.entries(enRoutes)) {
      const locSlug = localizedRoutes[lang]?.[toolId] || '/';
      if (enSlug !== '/' && enSlug !== locSlug) {
        const aliasDir = path.join(distDir, lang, enSlug.startsWith('/') ? enSlug.substring(1) : enSlug);
        if (!fs.existsSync(aliasDir)) {
          fs.mkdirSync(aliasDir, { recursive: true });
          const targetUrl = `https://createmy-qr.com/${lang}${locSlug === '/' ? '' : locSlug}`;
          fs.writeFileSync(
            path.join(aliasDir, 'index.html'),
            `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><meta name="robots" content="noindex,follow" /></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`
          );
          aliasCount++;
        }
      }
    }

    // Additional alias for /usecases
    const locUseCaseSlug = localizedRoutes[lang]?.['usecases'] || '/use-cases';
    const legacyUcDir = path.join(distDir, lang, 'usecases');
    if (!fs.existsSync(legacyUcDir)) {
      fs.mkdirSync(legacyUcDir, { recursive: true });
      const targetUrl = `https://createmy-qr.com/${lang}${locUseCaseSlug === '/' ? '' : locUseCaseSlug}`;
      fs.writeFileSync(
        path.join(legacyUcDir, 'index.html'),
        `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><meta name="robots" content="noindex,follow" /></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`
      );
      aliasCount++;
    }
  }

  console.log(`✨ SSG Complete! Generated ${generatedCount} primary static pages and ${aliasCount} alias redirect pages.`);
}

run();

