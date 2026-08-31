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

  const pseoUseCase = getPseoUseCase(slug, currentLangCode);
  const resolvedToolType = pseoUseCase ? pseoUseCase.baseTool : (routeToToolMap[currentLangCode]?.[slug] || 'url');

  const [qrType, setQrType] = useState(resolvedToolType);

  // Sync route with qrType state
  useEffect(() => {
    const rType = pseoUseCase ? pseoUseCase.baseTool : routeToToolMap[currentLangCode]?.[slug];
    if (rType && rType !== qrType) {
      setQrType(rType);
    }
  }, [slug, qrType, pseoUseCase]);

  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    // localizedRoutes now maps 'url' -> '/url-qr-code-generator' (not '/')
    const localizedSlug = localizedRoutes[currentLangCode]?.[newType] || `/${newType}`;
    if (localizedSlug !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${localizedSlug === '/' ? '' : localizedSlug}`, { replace: true });
    }
  };


  
  // Home landing page: '/' means the new HomePage (not the URL QR tool)
  const isHome = slug === '/' || slug === '' || slug === '/home';
  
  const toolType = routeToToolMap[currentLangCode]?.[slug];
  
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

  const currentType = routeToToolMap[currentLangCode]?.[slug] || 'url';
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
        title: `CreateMy-QR | ${t('home.heroTitle', 'All QR & Barcode')} ${t('home.heroTitleHighlight', 'Tools in One Place')}`,
        h1Title: `${t('home.heroTitle', 'All QR & Barcode')} ${t('home.heroTitleHighlight', 'Tools in One Place')}`,
        description: t('home.seoDesc', 'Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO-compliant, 30 languages.'),
      }
    : effectiveType === 'url'
    ? {
        title: `${t('appTitle')} | CreateMy-QR`, // Keep main SEO title for the URL tool (homepage fallback)
        h1Title: t('seoTool.h1', { tool: typeName }),
        description: t('seoTool.description', { tool: typeName }),
      }
    : {
        title: `${t('seoTool.title', { tool: typeName })} | CreateMy-QR`,
        h1Title: t('seoTool.h1', { tool: typeName }),
        description: t('seoTool.description', { tool: typeName }),
      };

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
        <meta property="og:url" content={`https://createmy-qr.com${currentLangCode === 'en' ? '' : '/' + currentLangCode}${slug === '/' ? '' : slug}`} />
        <meta property="og:site_name" content="CreateMy-QR" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSeo.title} />
        <meta name="twitter:description" content={currentSeo.description} />
        
        <link rel="canonical" href={`https://createmy-qr.com${currentLangCode === 'en' ? '' : '/' + currentLangCode}${(() => {
          if (pseoUseCase) {
            const allPseo = getAllPseoData();
            const langCases = allPseo[currentLangCode] || [];
            const matchingUc = langCases.find(uc => uc.id === pseoUseCase.id);
            if (matchingUc) {
              const uSlug = matchingUc.translatedSlug || matchingUc.slug;
              return uSlug.startsWith('/') ? uSlug : '/' + uSlug;
            }
          }
          return slug === '/' ? '' : slug;
        })()}`} />
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
