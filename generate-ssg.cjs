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
  global.localStorage = { getItem: () => null, setItem: () => { } };
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
    cleanHead = cleanHead.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');
    baseHtml = baseHtml.replace(/<head>[\s\S]*?<\/head>/i, `<head>${cleanHead}</head>`);
  }

  console.log('🚀 Starting Static Site Generation (SSG) for all 30 languages...');

  let generatedCount = 0;

  // Load localized master templates
  const templatesPath = path.join(__dirname, 'src', 'config', 'localizedTemplates.json');
  const localizedTemplates = fs.existsSync(templatesPath)
    ? JSON.parse(fs.readFileSync(templatesPath, 'utf8'))
    : {};

  for (const lang of langCodes) {
    const transPath = path.join(langsDir, lang, 'translation.json');
    if (!fs.existsSync(transPath)) continue;

    const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
    const langTemplates = localizedTemplates[lang] || localizedTemplates['en'] || {};
    const toolMap = routeToToolMap[lang] || {};

    const allPages = { ...toolMap };

    for (const [localizedSlug, toolId] of Object.entries(allPages)) {
      let title, description;

      if (['about', 'compare', 'languages', 'pricing', 'privacy', 'security', 'terms', 'usecases', 'barcode', 'bulk', 'scanqr', 'scanbarcode'].includes(toolId)) {
        const staticMeta = translations.static?.[toolId] || {};
        const fallbackTitle = translations.types?.[toolId] || toolId;
        const pageTitle = staticMeta.seoTitle || staticMeta.title || fallbackTitle;
        const pageDesc = staticMeta.seoDesc || staticMeta.desc || langTemplates.toolDescTemplate?.replace(/\{\{toolName\}\}/g, fallbackTitle) || '100% private, client-side generation.';

        title = `${pageTitle} | CreateMy-QR`;
        description = pageDesc;
      } else if (toolId === 'url' || toolId === 'home' || toolId === '/' || localizedSlug === '/') {
        const heroTitle = translations.home?.heroTitle || langTemplates.homeHeroTitle || 'All QR & Barcode';
        const heroHighlight = translations.home?.heroTitleHighlight || langTemplates.homeHeroTitleHighlight || 'Tools in One Place';
        const combinedHero = `${heroTitle} ${heroHighlight}`.replace(/\s+/g, ' ').trim();
        title = combinedHero.length <= 46
          ? `${combinedHero} | CreateMy-QR`
          : (translations.home?.seoTitle ? `${translations.home.seoTitle} | CreateMy-QR` : `${combinedHero} | CreateMy-QR`);
        description = translations.home?.seoDesc || langTemplates.homeSeoDesc || 'Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO-compliant, 30 languages.';
      } else {
        const toolName = translations.types?.[toolId] || toolId;
        const suffix = langTemplates.toolTitleSuffix || 'Free QR Code Generator';
        title = `${toolName} - ${suffix} | CreateMy-QR`;
        const descTpl = langTemplates.toolDescTemplate || 'Create custom {{toolName}} QR codes with logo for free. Best editable QR code generator with no watermark. 100% private, client-side generation.';
        description = descTpl.replace(/\{\{toolName\}\}/g, toolName);
      }

      function formatSeoTitle(rawTitle, brandSuffix = ' | CreateMy-QR') {
        if (!rawTitle) return 'Free Custom QR Code Generator | CreateMy-QR';
        let t = rawTitle.replace(/\s+/g, ' ').trim();
        const maxLen = 60;

        // Strip existing brand prefix or suffix (any separator: |, —, –, -, :) so brand never appears twice
        let core = t
          .replace(/^CreateMy-QR\s*[|—–\-:]\s*/i, '')
          .replace(/\s*[|—–\-:]\s*CreateMy-QR$/i, '')
          .trim();

        if (!core || /^CreateMy-QR$/i.test(core)) {
          core = 'Free Custom QR Code Generator';
        }

        const maxCoreLen = maxLen - brandSuffix.length;
        if (core.length <= maxCoreLen) {
          return `${core}${brandSuffix}`;
        }

        // Truncate cleanly at a word boundary
        let cut = core.substring(0, maxCoreLen);
        const lastSpace = cut.lastIndexOf(' ');
        if (lastSpace > Math.floor(maxCoreLen * 0.5)) {
          cut = cut.substring(0, lastSpace);
        }
        cut = cut.replace(/[\s,.;:\-|–—]+$/, '').trim();
        return `${cut}${brandSuffix}`;
      }

      function formatMetaDescription(rawDesc, fallback = 'Create custom QR codes with logo free. 100% client-side privacy with instant PNG and vector exports.') {
        let desc = (rawDesc || '').replace(/\s+/g, ' ').trim();
        desc = desc.replace(/\{\{[^}]+\}\}/g, '').replace(/types\.[a-z0-9_]+/gi, 'QR Code').trim();
        if (!desc || desc.length < 20) {
          desc = fallback;
        }
        if (desc.length > 158) {
          let cut = desc.substring(0, 155);
          const lastSpace = cut.lastIndexOf(' ');
          if (lastSpace > 90) {
            cut = cut.substring(0, lastSpace);
          }
          desc = cut.replace(/[\s,.;:\-|–—]+$/, '').trim() + '...';
        }
        return desc;
      }

      title = formatSeoTitle(title);
      description = formatMetaDescription(description);

      // Determine the self-referencing canonical URL
      const canonicalSlug = localizedRoutes[lang]?.[toolId] || '/';
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
      for (const altLang of langCodes) {
        const actualAltSlug = localizedRoutes[altLang]?.[toolId] || '/';
        const altLangPrefix = altLang === 'en' ? '' : '/' + altLang;
        const altUrl = `https://createmy-qr.com${altLangPrefix}${actualAltSlug === '/' ? '' : actualAltSlug}`;
        hreflangMatrix += `\n    <link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
      }

      const defaultSlug = localizedRoutes['en']?.[toolId] || '/';
      const defaultUrl = `https://createmy-qr.com${defaultSlug === '/' ? '' : defaultSlug}`;
      hreflangMatrix += `\n    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`;

      let newHtml = baseHtml;
      newHtml = newHtml.replace(/<html(\s+[^>]*)?>/i, `<html lang="${lang}"${lang === 'ar' ? ' dir="rtl"' : ''}>`);

      // Inject initial i18n payload synchronously for non-English pages so React never flashes a loading spinner over SSR HTML
      let i18nPayloadScript = '';
      if (lang !== 'en') {
        const safeJson = JSON.stringify({ lang, data: translations }).replace(/</g, '\\u003c');
        i18nPayloadScript = `\n    <script>window.__INITIAL_I18N__=${safeJson};</script>`;
      }

      newHtml = newHtml.replace('</head>', headTags + hreflangMatrix + i18nPayloadScript + '\n  </head>');

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
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=https://createmy-qr.com/use-cases" /><link rel="canonical" href="https://createmy-qr.com/use-cases" /><script>window.location.replace("https://createmy-qr.com/use-cases");</script></head><body><p>Redirecting to <a href="https://createmy-qr.com/use-cases">https://createmy-qr.com/use-cases</a>...</p></body></html>`
    );
    aliasCount++;
  }

  // Root /en -> /
  const rootLegacyEn = path.join(distDir, 'en');
  if (!fs.existsSync(rootLegacyEn)) {
    fs.mkdirSync(rootLegacyEn, { recursive: true });
    fs.writeFileSync(
      path.join(rootLegacyEn, 'index.html'),
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=https://createmy-qr.com" /><link rel="canonical" href="https://createmy-qr.com" /><script>window.location.replace("https://createmy-qr.com");</script></head><body><p>Redirecting to <a href="https://createmy-qr.com">https://createmy-qr.com</a>...</p></body></html>`
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
            `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><script>window.location.replace("${targetUrl}");</script></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`
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
        `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><script>window.location.replace("${targetUrl}");</script></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`
      );
      aliasCount++;
    }

    // Additional alias for /contact -> /about
    const locAboutSlug = localizedRoutes[lang]?.['about'] || '/about';
    const legacyContactDir = path.join(distDir, lang, 'contact');
    if (!fs.existsSync(legacyContactDir)) {
      fs.mkdirSync(legacyContactDir, { recursive: true });
      const targetUrl = `https://createmy-qr.com/${lang}${locAboutSlug === '/' ? '' : locAboutSlug}`;
      fs.writeFileSync(
        path.join(legacyContactDir, 'index.html'),
        `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><script>window.location.replace("${targetUrl}");</script></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`
      );
      aliasCount++;
    }

    // Short tool ID aliases (e.g. /ja/wifi -> /ja/wi-fi-...)
    for (const [toolId, locSlug] of Object.entries(localizedRoutes[lang] || {})) {
      if (toolId !== 'home' && locSlug !== `/${toolId}`) {
        const shortDir = path.join(distDir, lang, toolId);
        if (!fs.existsSync(shortDir)) {
          fs.mkdirSync(shortDir, { recursive: true });
          const targetUrl = `https://createmy-qr.com/${lang}${locSlug === '/' ? '' : locSlug}`;
          fs.writeFileSync(
            path.join(shortDir, 'index.html'),
            `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><script>window.location.replace("${targetUrl}");</script></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`
          );
          aliasCount++;
        }
      }
    }
  }

  // Consolidated pSEO URLs -> canonical core tool redirects across all 30 languages
  const pseoToCoreTool = {
    restaurantmenu: 'pdf',
    wificafe: 'wifi',
    googlereviewlocal: 'greview',
    vcardrealestate: 'vcard',
    urleventtickets: 'url',
    whatsappsupport: 'whatsapp',
    paypaldonation: 'paypal',
    emailsignup: 'email',
    appstoregame: 'appstore',
    youtubemanual: 'youtube',
  };
  for (const lang of langCodes) {
    const langPseo = pseoDataByLang[lang] || [];
    const prefix = lang === 'en' ? '' : '/' + lang;
    for (const uc of langPseo) {
      const targetTool = pseoToCoreTool[uc.baseTool];
      const targetSlug = localizedRoutes[lang]?.[targetTool] || '/';
      const targetUrl = `https://createmy-qr.com${prefix}${targetSlug === '/' ? '' : targetSlug}`;
      for (const rawSlug of new Set([uc.translatedSlug, uc.slug].filter(Boolean))) {
        const cleanSlug = rawSlug.replace(/^\/+/, '');
        const pDir = lang === 'en' ? path.join(distDir, cleanSlug) : path.join(distDir, lang, cleanSlug);
        if (!fs.existsSync(pDir)) {
          fs.mkdirSync(pDir, { recursive: true });
          fs.writeFileSync(
            path.join(pDir, 'index.html'),
            `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><script>window.location.replace("${targetUrl}");</script></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`
          );
          aliasCount++;
        }
      }
    }
  }

  // 4. Known Legacy Crawled URLs from Google Search Console
  console.log('🔄 Generating static alias pages for known legacy GSC URLs...');
  let knownLegacyGscRoutes = [];
  try {
    knownLegacyGscRoutes = require('./src/config/legacyGscRedirects.cjs');
  } catch (e) {
    console.warn('Could not load legacyGscRedirects.cjs:', e.message);
  }

  for (const item of knownLegacyGscRoutes) {
    try {
      const targetUrl = `https://createmy-qr.com/${item.to.startsWith('/') ? item.to.substring(1) : item.to}`;
      const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>CreateMy-QR | Redirecting</title><meta http-equiv="refresh" content="0; url=${targetUrl}" /><link rel="canonical" href="${targetUrl}" /><script>window.location.replace("${targetUrl}");</script></head><body><p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p></body></html>`;

      // Decoded directory
      const aliasDir = path.join(distDir, item.from);
      if (!fs.existsSync(aliasDir)) {
        fs.mkdirSync(aliasDir, { recursive: true });
      }
      fs.writeFileSync(path.join(aliasDir, 'index.html'), htmlContent);
      aliasCount++;
    } catch (e) {
      console.warn(`Could not create legacy alias for ${item.from}:`, e.message);
    }
  }

  console.log(`✨ SSG Complete! Generated ${generatedCount} primary static pages and ${aliasCount} alias redirect pages.`);
}

run();

