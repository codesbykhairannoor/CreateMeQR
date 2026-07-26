import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import QrWorkspace from './pages/QrWorkspace';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Compare from './pages/Compare';
import BarcodeGenerator from './pages/BarcodeGenerator';
import ScanQr from './pages/ScanQr';
import LandingContent from './components/LandingContent';
import SeoArticle from './components/SeoArticle';
import { PSEO_ROUTES, LANGS } from './config/site';
import { localizedRoutes, routeToToolMap } from './config/localizedRoutes';

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

  const [qrType, setQrType] = useState(routeToToolMap[currentLangCode]?.[slug] || 'url');

  // Sync route with qrType state
  useEffect(() => {
    const routeType = routeToToolMap[currentLangCode]?.[slug];
    if (routeType && routeType !== qrType) {
      setQrType(routeType);
    }
  }, [slug, qrType]);

  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const localizedSlug = localizedRoutes[currentLangCode]?.[newType] || PSEO_ROUTES[newType === 'url' ? '/' : newType] || '/';
    if (localizedSlug !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${localizedSlug === '/' ? '' : localizedSlug}`, { replace: true });
    }
  };

  
  const isAbout = slug === '/about';
  const isPrivacy = slug === '/privacy';
  const isTerms = slug === '/terms';
  const isCompare = slug === '/compare';
  const toolType = routeToToolMap[currentLangCode]?.[slug];
  const isBarcode = toolType === 'barcode' || slug === '/barcode-generator';
  const isScanQr = toolType === 'scanqr' || slug === '/scan-qr';
  const isStaticPage = isAbout || isPrivacy || isTerms || isCompare || isBarcode || isScanQr;

  const currentType = routeToToolMap[currentLangCode]?.[slug] || 'url';
  const typeName = t(`types.${currentType}`);
  
  // Super Partial Lang: Fully localized SEO texts!
  const currentSeo = currentType === 'url' 
    ? {
        title: t('appTitle'),
        h1Title: t('appTitle'), // Changed h1 to h1Title because renderHighlightedTitle returns JSX now, but wait, QrWorkspace renders it! 
        description: t('tagline'),
      }
    : {
        title: t('seoTool.title', { tool: typeName }),
        h1Title: t('seoTool.h1', { tool: typeName }),
        description: t('seoTool.description', { tool: typeName }),
      };

  return (
    <MainLayout>
      <ScrollToTop />
      <Helmet>
        <title>{currentSeo.title}</title>
        <meta name="title" content={currentSeo.title} />
        <meta name="description" content="Create custom QR codes with logo for free. Best editable QR code generator with no watermark for WiFi, vCard, Google Reviews and URL. Client-side privacy." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://www.createmy-qr.com${currentLangCode === 'en' ? '' : '/' + currentLangCode}${slug === '/' ? '' : slug}`} />
        {/* pSEO Hreflang Tags for all 30 languages */}
        <link rel="alternate" hrefLang="x-default" href={`https://www.createmy-qr.com${localizedRoutes['en']?.[currentType] === '/' ? '' : localizedRoutes['en']?.[currentType]}`} />
        {LANGS.map(lang => {
          const lSlug = localizedRoutes[lang.code]?.[currentType] || '/';
          const href = `https://www.createmy-qr.com${lang.code === 'en' ? '' : '/' + lang.code}${lSlug === '/' ? '' : lSlug}`;
          return <link key={lang.code} rel="alternate" hrefLang={lang.code} href={href} />;
        })}
        <meta name="keywords" content={t('seoKeywords')} />
        
        {/* Bidirectional Hreflang Matrix for 30 Languages */}
        {LANGS.map(lang => {
          const href = `https://www.createmy-qr.com${lang.code === 'en' ? '' : '/' + lang.code}${slug === '/' ? '' : slug}`;
          return <link key={lang.code} rel="alternate" hrefLang={lang.code} href={href} />;
        })}
        <link rel="alternate" hrefLang="x-default" href={`https://www.createmy-qr.com${slug === '/' ? '' : slug}`} />
        
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
              "name": "CreateMy-QR",
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
                "item": "https://www.createmy-qr.com/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "${currentSeo.h1Title}",
                "item": "https://www.createmy-qr.com${location.pathname}"
              }]
            }
          `}
        </script>
      </Helmet>
      
      {!isStaticPage ? (
        <>
          <QrWorkspace qrType={qrType} setQrTypeRoute={handleTypeChangeRoute} currentSeo={currentSeo} />
          <LandingContent qrType={qrType} />
          <SeoArticle currentLangCode={currentLangCode} />
        </>
      ) : (
        <>
          {isAbout && <About />}
          {isPrivacy && <PrivacyPolicy />}
          {isTerms && <TermsOfService />}
          {isCompare && <Compare />}
          {isBarcode && <BarcodeGenerator />}
          {isScanQr && <ScanQr />}
        </>
      )}
    </MainLayout>
  );
}
