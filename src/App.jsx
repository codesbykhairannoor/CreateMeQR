import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import QrWorkspace from './pages/QrWorkspace';
import AboutUs from './pages/AboutUs';
import Compare from './pages/Compare';
import Languages from './pages/Languages';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import Terms from './pages/Terms';
import UseCases from './pages/UseCases';
import BarcodeGenerator from './pages/BarcodeGenerator';
import ScanQr from './pages/ScanQr';
import ScanBarcode from './pages/ScanBarcode';
import LandingContent from './components/LandingContent';
import SeoArticle from './components/SeoArticle';
import { PSEO_ROUTES, LANGS } from './config/site';
import { localizedRoutes, routeToToolMap } from './config/localizedRoutes';
import { getPseoUseCase, getAllPseoData } from './config/pseo-usecases';

export default function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Super GEO: Parse language prefix from URL Route
  const decodedPathname = decodeURIComponent(location.pathname);
  const pathParts = decodedPathname.split('/').filter(Boolean);
  let currentLangCode = 'en';
  let slug = decodedPathname;

  if (pathParts.length > 0 && LANGS.some(l => l.code === pathParts[0])) {
    currentLangCode = pathParts[0];
    slug = '/' + pathParts.slice(1).join('/');
  }

  if (slug === '') slug = '/';

  // Universal Slug to Tool Resolver (Handles cross-language URLs, legacy URLs, unicode/accents, and aliases)
  const resolveToolFromAnySlug = (rawSlug, lang) => {
    if (!rawSlug || rawSlug === '/') return 'home';
    if (routeToToolMap[lang]?.[rawSlug]) return routeToToolMap[lang][rawSlug];

    let decoded = rawSlug;
    try {
      decoded = decodeURIComponent(rawSlug);
    } catch (e) {}

    const clean = decoded.toLowerCase();
    const stripped = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 1. Direct and normalized check across all language routes
    for (const l of Object.keys(routeToToolMap)) {
      if (routeToToolMap[l]?.[rawSlug]) return routeToToolMap[l][rawSlug];
      if (routeToToolMap[l]?.[clean]) return routeToToolMap[l][clean];
      if (routeToToolMap[l]?.[stripped]) return routeToToolMap[l][stripped];

      for (const [s, tool] of Object.entries(routeToToolMap[l])) {
        const sLower = s.toLowerCase();
        if (sLower === clean || sLower === stripped) return tool;
        const sStripped = sLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (sStripped === stripped) return tool;
      }
    }

    // 2. Legacy aliases & static routes
    const legacyAliases = {
      '/contact': 'about',
      '/about': 'about',
      '/privacy': 'privacy',
      '/terms': 'terms',
      '/security': 'security',
      '/pricing': 'pricing',
      '/compare': 'compare',
      '/languages': 'languages',
      '/usecases': 'usecases',
      '/use-cases': 'usecases',
      '/scanqr': 'scanqr',
      '/scan-qr': 'scanqr',
      '/scanbarcode': 'scanbarcode',
      '/scan-barcode': 'scanbarcode',
      '/barcode': 'barcode',
      '/barcode-generator': 'barcode',
      '/wifi': 'wifi',
      '/vcard': 'vcard',
      '/whatsapp': 'whatsapp',
      '/pdf': 'pdf',
      '/location': 'location',
      '/booking': 'booking',
      '/crypto': 'crypto',
      '/paypal': 'paypal',
      '/venmo': 'venmo',
      '/instagram': 'instagram',
      '/facebook': 'facebook',
      '/twitter': 'twitter',
      '/tiktok': 'tiktok',
      '/linkedin': 'linkedin',
      '/youtube': 'youtube',
      '/spotify': 'spotify',
      '/telegram': 'telegram',
      '/snapchat': 'snapchat',
      '/discord': 'discord',
      '/text': 'text',
      '/email': 'email',
      '/phone': 'phone',
      '/sms': 'sms',
      '/event': 'event',
      '/image': 'image',
      '/video': 'video',
      '/audio': 'audio',
      '/file': 'file',
      '/gforms': 'gforms',
      '/greview': 'greview',
      '/linkinbio': 'linkinbio',
      '/amazon': 'amazon',
      '/appstore': 'appstore'
    };
    if (legacyAliases[clean] || legacyAliases[stripped]) return legacyAliases[clean] || legacyAliases[stripped];

    // 3. Keyword heuristic for malformed or cross-language mixed slugs
    const keywordMap = [
      ['linkedin', 'linkedin'],
      ['snapchat', 'snapchat'],
      ['instagram', 'instagram'],
      ['facebook', 'facebook'],
      ['twitter', 'twitter'],
      ['tiktok', 'tiktok'],
      ['youtube', 'youtube'],
      ['spotify', 'spotify'],
      ['telegram', 'telegram'],
      ['discord', 'discord'],
      ['whatsapp', 'whatsapp'],
      ['paypal', 'paypal'],
      ['venmo', 'venmo'],
      ['amazon', 'amazon'],
      ['appstore', 'appstore'],
      ['app-store', 'appstore'],
      ['google-forms', 'gforms'],
      ['gforms', 'gforms'],
      ['google-review', 'greview'],
      ['greview', 'greview'],
      ['link-in-bio', 'linkinbio'],
      ['linkinbio', 'linkinbio'],
      ['pautan-di-bio', 'linkinbio'],
      ['tautan-di-bio', 'linkinbio'],
      ['wifi', 'wifi'],
      ['wi-fi', 'wifi'],
      ['vcard', 'vcard'],
      ['scan-barcode', 'scanbarcode'],
      ['scanbarcode', 'scanbarcode'],
      ['scan-qr', 'scanqr'],
      ['scanqr', 'scanqr'],
      ['barcode', 'barcode'],
      ['maps', 'location'],
      ['location', 'location'],
      ['lokasyon', 'location'],
      ['booking', 'booking'],
      ['crypto', 'crypto'],
      ['email', 'email'],
      ['sms', 'sms'],
      ['phone', 'phone'],
      ['event', 'event'],
      ['tapahtuma', 'event'],
      ['ibento', 'event'],
      ['подія', 'event'],
      ['podia', 'event'],
      ['resim', 'image'],
      ['image', 'image'],
      ['gambar', 'image'],
      ['video', 'video'],
      ['audio', 'audio'],
      ['file', 'file'],
      ['text', 'text'],
      ['teks', 'text'],
      ['url', 'url'],
      ['contact', 'about'],
      ['privacy', 'privacy'],
      ['terms', 'terms'],
      ['security', 'security'],
      ['pricing', 'pricing'],
      ['compare', 'compare'],
      ['languages', 'languages'],
      ['usecases', 'usecases'],
      ['use-cases', 'usecases'],
      // Generic QR Generator phrases (Arabic, Greek, Chinese, Spanish, Norwegian, Malay)
      ['مولد', 'barcode'],
      ['رمز-الاستجابة', 'barcode'],
      ['δημιουργία', 'barcode'],
      ['δωρεάν', 'barcode'],
      ['二维码', 'barcode'],
      ['免费在线', 'barcode'],
      ['generador-de-codigos', 'barcode'],
      ['gratis-qr-kode', 'barcode'],
      ['penjana-kod-qr', 'barcode']
    ];

    for (const [kw, tool] of keywordMap) {
      if (clean.includes(kw) || stripped.includes(kw)) {
        return tool;
      }
    }

    return null;
  };

  const pseoUseCase = getPseoUseCase(slug, currentLangCode);
  const foundTool = resolveToolFromAnySlug(slug, currentLangCode);
  const resolvedToolType = pseoUseCase ? pseoUseCase.baseTool : (foundTool || 'url');

  const [qrType, setQrType] = useState(resolvedToolType);

  const isHome = slug === '/' || slug === '' || slug === '/home';
  const correctExpectedSlug = foundTool ? (localizedRoutes[currentLangCode]?.[foundTool] || `/${foundTool}`) : slug;

  // Auto-redirect cross-language or legacy URLs on client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && foundTool && correctExpectedSlug && slug !== correctExpectedSlug && !isHome) {
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${correctExpectedSlug}`, { replace: true });
    }
  }, [slug, correctExpectedSlug, foundTool, currentLangCode, isHome, navigate]);

  // Sync route with qrType state
  useEffect(() => {
    const rType = pseoUseCase ? pseoUseCase.baseTool : (foundTool || routeToToolMap[currentLangCode]?.[slug]);
    if (rType && rType !== qrType) {
      setQrType(rType);
    }
  }, [slug, qrType, pseoUseCase, foundTool, currentLangCode]);

  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const localizedSlug = localizedRoutes[currentLangCode]?.[newType] || `/${newType}`;
    if (localizedSlug !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${localizedSlug === '/' ? '' : localizedSlug}`, { replace: true });
    }
  };

  const toolType = foundTool || routeToToolMap[currentLangCode]?.[slug];
  
  const isAbout = toolType === 'about' || slug === '/about';
  const isCompare = toolType === 'compare' || slug === '/compare';
  const isLanguages = toolType === 'languages' || slug === '/languages';
  const isPricing = toolType === 'pricing' || slug === '/pricing';
  const isPrivacy = toolType === 'privacy' || slug === '/privacy';
  const isSecurity = toolType === 'security' || slug === '/security';
  const isTerms = toolType === 'terms' || slug === '/terms';
  const isUseCases = toolType === 'usecases' || slug === '/use-cases';
  
  const isBarcode = toolType === 'barcode' || slug === '/barcode-generator';
  const isScanQr = toolType === 'scanqr' || slug === '/scan-qr';
  const isScanBarcode = toolType === 'scanbarcode' || slug === '/scan-barcode';
  const isStaticPage = isHome || isAbout || isCompare || isLanguages || isPricing || isPrivacy || isSecurity || isTerms || isUseCases || isBarcode || isScanQr || isScanBarcode;

  const currentType = toolType || 'url';
  // For home page, use 'url' as fallback tool type for SEO meta
  const effectiveType = isHome ? 'url' : currentType;
  const typeName = t(`types.${effectiveType}`);
  
  // Build FAQ Schema dynamically from translations
  const rawFaqs = t('geo.faqs', { returnObjects: true });
  const validFaqs = Array.isArray(rawFaqs) ? rawFaqs : [];
  const faqSchema = validFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  // Super Partial Lang: Fully localized SEO texts!
  const currentSeo = pseoUseCase
    ? {
        title: `${pseoUseCase.h1Title} | CreateMy-QR`,
        h1Title: pseoUseCase.h1Title,
        description: pseoUseCase.seoDesc,
      }
    : isHome
    ? {
        title: `CreateMy-QR | ${t('home.heroTitle', 'The QR Code Generator That')} ${t('home.heroTitleHighlight', 'Never Expires.')}`,
        h1Title: `${t('home.heroTitle', 'The QR Code Generator That')} ${t('home.heroTitleHighlight', 'Never Expires.')}`,
        description: t('home.seoDesc', 'Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO-compliant, 30 languages.'),
      }
    : isAbout
    ? {
        title: `${t('static.about.seoTitle', 'About Us')} | CreateMy-QR`,
        h1Title: t('static.about.heroTitle', 'About Us'),
        description: t('static.about.seoDesc', 'Discover CreateMy-QR\'s mission to democratize barcode and QR code tools worldwide with 100% client-side privacy, zero data logging, and offline security.'),
      }
    : isCompare
    ? {
        title: `${t('static.compare.seoTitle', 'Compare Tools')} | CreateMy-QR`,
        h1Title: t('static.compare.heroTitle', 'CreateMy-QR vs The Rest'),
        description: t('static.compare.seoDesc', 'Compare CreateMy-QR with traditional QR generators. Discover why professionals choose our private, client-side tools with no paywalls or scan limits.'),
      }
    : isLanguages
    ? {
        title: `${t('static.languages.seoTitle', 'Supported Languages')} | CreateMy-QR`,
        h1Title: t('static.languages.heroTitle', '30 Supported Languages'),
        description: t('static.languages.seoDesc', 'Generate and scan custom QR codes and barcodes in 30 languages worldwide. Instant client-side generation with full localization and UTF-8 support.'),
      }
    : isPricing
    ? {
        title: `${t('static.pricing.seoTitle', '100% Free Pricing')} | CreateMy-QR`,
        h1Title: t('static.pricing.heroTitle', '100% Free Forever'),
        description: t('static.pricing.seoDesc', 'CreateMy-QR is 100% free forever with unlimited QR code generation, high-resolution vector SVG/PNG exports, zero watermarks, and no registration required.'),
      }
    : isPrivacy
    ? {
        title: `${t('static.privacy.seoTitle', 'Privacy Policy')} | CreateMy-QR`,
        h1Title: t('static.privacy.heroTitle', 'Privacy Policy'),
        description: t('static.privacy.seoDesc', 'Read our strict zero-tracking privacy policy. All QR code and barcode data processing occurs locally in your browser memory with zero server uploads.'),
      }
    : isSecurity
    ? {
        title: `${t('static.security.seoTitle', 'Security Architecture')} | CreateMy-QR`,
        h1Title: t('static.security.heroTitle', 'Security Architecture'),
        description: t('static.security.seoDesc', 'Explore our zero-trust security architecture: 100% client-side WebAssembly cryptography, zero cloud server data transmission, and ISO standard compliance.'),
      }
    : isTerms
    ? {
        title: `${t('static.terms.seoTitle', 'Terms of Service')} | CreateMy-QR`,
        h1Title: t('static.terms.heroTitle', 'Terms of Service'),
        description: t('static.terms.seoDesc', 'Review our transparent terms of service for CreateMy-QR. Free for personal and commercial use with zero licensing fees and 100% client-side data safety.'),
      }
    : isUseCases
    ? {
        title: `${t('static.usecases.seoTitle', 'Industry Use Cases')} | CreateMy-QR`,
        h1Title: t('static.usecases.heroTitle', 'QR Code Industry Use Cases'),
        description: t('static.usecases.seoDesc', 'Explore real-world QR code applications across retail, restaurants, events, payments, and logistics with instant client-side generation and zero limits.'),
      }
    : isBarcode
    ? {
        title: `${t('static.barcode.seoTitle', 'Free Barcode Generator')} | CreateMy-QR`,
        h1Title: t('static.barcode.heroTitle', 'Free Barcode Generator Online'),
        description: t('static.barcode.seoDesc', 'Generate linear barcodes including EAN-13, UPC-A, Code 128, and Code 39 for free. Instant high-resolution SVG and PNG downloads directly in your browser.'),
      }
    : isScanQr
    ? {
        title: `${t('static.scanqr.seoTitle', 'Scan QR Code Online')} | CreateMy-QR`,
        h1Title: t('static.scanqr.heroTitle', 'Scan QR Code Online'),
        description: t('static.scanqr.seoDesc', 'Scan and decode QR codes instantly from webcam or uploaded image files securely in your browser with 100% client-side privacy and zero server transmission.'),
      }
    : isScanBarcode
    ? {
        title: `${t('static.scanbarcode.seoTitle', 'Scan Barcode Online')} | CreateMy-QR`,
        h1Title: t('static.scanbarcode.heroTitle', 'Scan Barcode Online'),
        description: t('static.scanbarcode.seoDesc', 'Scan 1D and 2D barcodes directly from your camera or local image files securely in your browser memory with fast, private client-side decoding.'),
      }
    : effectiveType === 'url'
    ? {
        title: `${t('appTitle', 'CreateMy-QR')} | Free Custom QR Code Generator`,
        h1Title: t('seoTool.h1', { tool: typeName, defaultValue: 'Free QR Code Generator' }),
        description: t('seoTool.description', { tool: typeName, defaultValue: 'Create custom QR codes with logo for free. Best editable QR code generator with no watermark.' }),
      }
    : {
        title: `${t('seoTool.title', { tool: typeName, defaultValue: typeName + ' QR Code Generator' })} | CreateMy-QR`,
        h1Title: t('seoTool.h1', { tool: typeName, defaultValue: typeName + ' QR Code Generator' }),
        description: t('seoTool.description', { tool: typeName, defaultValue: 'Create custom ' + typeName + ' QR codes with logo for free. Best editable QR code generator with no watermark.' }),
      };

  const canonicalPath = (() => {
    if (pseoUseCase) {
      const allPseo = getAllPseoData();
      const langCases = allPseo[currentLangCode] || [];
      const matchingUc = langCases.find(uc => uc.id === pseoUseCase.id);
      if (matchingUc) {
        const uSlug = matchingUc.translatedSlug || matchingUc.slug;
        return uSlug.startsWith('/') ? uSlug : '/' + uSlug;
      }
    }
    if (foundTool) {
      const expected = localizedRoutes[currentLangCode]?.[foundTool];
      if (expected) return expected === '/' ? '' : expected;
    }
    return slug === '/' ? '' : slug;
  })();

  const canonicalUrl = `https://createmy-qr.com${currentLangCode === 'en' ? '' : '/' + currentLangCode}${canonicalPath}`;

  return (
    <MainLayout>
      <ScrollToTop />
      <Helmet>
        <html lang={currentLangCode} />
        <title>{currentSeo.title}</title>
        <meta name="title" content={currentSeo.title} />
        <meta name="description" content={currentSeo.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={currentSeo.title} />
        <meta property="og:description" content={currentSeo.description} />
        <meta property="og:locale" content={currentLangCode} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="CreateMy-QR" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSeo.title} />
        <meta name="twitter:description" content={currentSeo.description} />
        <meta name="twitter:url" content={canonicalUrl} />
        
        <link rel="canonical" href={canonicalUrl} />
        {/* Standard Tool Hreflang Tags for all 30 languages (only if NOT a pSEO page) */}
        {!pseoUseCase && (
          <>
            <link rel="alternate" hrefLang="x-default" href={`https://createmy-qr.com${localizedRoutes['en']?.[currentType] === '/' ? '' : localizedRoutes['en']?.[currentType]}`} />
            {LANGS.map(lang => {
              const lSlug = localizedRoutes[lang.code]?.[currentType] || '/';
              const href = `https://createmy-qr.com${lang.code === 'en' ? '' : '/' + lang.code}${lSlug === '/' ? '' : lSlug}`;
              return <link key={lang.code} rel="alternate" hrefLang={lang.code} href={href} />;
            })}
          </>
        )}
        <meta name="keywords" content={t('seoKeywords')} />
        
        {/* pSEO Bidirectional Hreflang Matrix for 30 Languages (only if IS a pSEO page) */}
        {pseoUseCase && LANGS.map(lang => {
          let targetSlug = slug;
          // If this is a pSEO page, lookup the translated slug for this specific language
          if (pseoUseCase) {
            const allPseo = getAllPseoData();
            const langCases = allPseo[lang.code] || [];
            const matchingUc = langCases.find(uc => uc.id === pseoUseCase.id);
            if (matchingUc) {
              const uSlug = matchingUc.translatedSlug || matchingUc.slug;
              targetSlug = uSlug.startsWith('/') ? uSlug : '/' + uSlug;
            }
          }
          const href = `https://createmy-qr.com${lang.code === 'en' ? '' : '/' + lang.code}${targetSlug === '/' ? '' : targetSlug}`;
          return <link key={lang.code} rel="alternate" hrefLang={lang.code} href={href} />;
        })}
        {pseoUseCase && (() => {
          let defaultSlug = slug;
          if (pseoUseCase) {
            const allPseo = getAllPseoData();
            const enCases = allPseo['en'] || [];
            const matchingUc = enCases.find(uc => uc.id === pseoUseCase.id);
            if (matchingUc) {
              const uSlug = matchingUc.translatedSlug || matchingUc.slug;
              defaultSlug = uSlug.startsWith('/') ? uSlug : '/' + uSlug;
            }
          }
          return <link rel="alternate" hrefLang="x-default" href={`https://createmy-qr.com${defaultSlug === '/' ? '' : defaultSlug}`} />;
        })()}
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to ${currentSeo.h1Title}",
              "description": "${currentSeo.description}",
              "step": [
                {
                  "@type": "HowToStep",
                  "text": "Select the ${currentType} data type."
                },
                {
                  "@type": "HowToStep",
                  "text": "Enter your information into the input fields."
                },
                {
                  "@type": "HowToStep",
                  "text": "Customize the colors, logo, and design."
                },
                {
                  "@type": "HowToStep",
                  "text": "Download the high-resolution vector SVG or PNG."
                }
              ]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CreateMe-QR",
              "description": "${(t('geo.softwareDescription', { defaultValue: 'A 100% Client-Side secure document and QR processing suite. Uses WebAssembly to process files locally in the browser memory without uploading to any servers. The safest alternative to cloud-based tools. 100% Free, Zero Tracking, No Limits.' })).replace(/"/g, '\\"')}",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "15432"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://createmy-qr.com/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "${currentSeo.h1Title}",
                "item": "https://createmy-qr.com${location.pathname}"
              }]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CreateMe-QR",
              "url": "https://createmy-qr.com",
              "logo": "https://createmy-qr.com/icon.svg",
              "sameAs": [
                "https://github.com/createmy-qr",
                "https://twitter.com/createmyqr"
              ]
            }
          `}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>
      
      {isHome ? (
        <HomePage currentLangCode={currentLangCode} />
      ) : !isStaticPage ? (
        <>
          <QrWorkspace qrType={qrType} setQrTypeRoute={handleTypeChangeRoute} currentSeo={currentSeo} pseoUseCase={pseoUseCase} />
          <LandingContent qrType={qrType} pseoUseCase={pseoUseCase} />
          {['url','vcard','text','email','sms','wifi','bitcoin','twitter','epc','pdf','appstore','image','video','audio','paypal','whatsapp','instagram','facebook','viber','telegram','skype','line','spotify','snapchat','tiktok','github','discord','twitch','linkedin','pinterest','reddit','zoom','teams'].includes(qrType) && <SeoArticle currentLangCode={currentLangCode} />}
        </>
      ) : (
        <>
          {isAbout && <AboutUs />}
          {isCompare && <Compare />}
          {isLanguages && <Languages />}
          {isPricing && <Pricing />}
          {isPrivacy && <Privacy />}
          {isSecurity && <Security />}
          {isTerms && <Terms />}
          {isUseCases && <UseCases />}
          {isBarcode && (
            <>
              <BarcodeGenerator />
            </>
          )}
          {isScanQr && (
            <>
              <ScanQr />
            </>
          )}
          {isScanBarcode && (
            <>
              <ScanBarcode />
            </>
          )}
        </>
      )}
    </MainLayout>
  );
}
