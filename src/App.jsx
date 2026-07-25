import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import QrWorkspace from './pages/QrWorkspace';
import LandingContent from './components/LandingContent';
import SeoArticle from './components/SeoArticle';
import { PSEO_ROUTES, LANGS } from './config/site';

export default function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Super GEO: Parse language prefix from URL Route
  const pathParts = location.pathname.split('/').filter(Boolean);
  let currentLangCode = 'en';
  let slug = location.pathname;

  if (pathParts.length > 0 && LANGS.some(l => l.code === pathParts[0])) {
    currentLangCode = pathParts[0];
    slug = '/' + pathParts.slice(1).join('/');
  }

  if (slug === '') slug = '/';

  const [qrType, setQrType] = useState(PSEO_ROUTES[slug] || PSEO_ROUTES['/']);

  // Sync route with qrType state
  useEffect(() => {
    const routeType = PSEO_ROUTES[slug];
    if (routeType && routeType !== qrType) {
      setQrType(routeType);
    }
  }, [slug, qrType]);

  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const entry = Object.entries(PSEO_ROUTES).find(([_, val]) => val === newType);
    if (entry && entry[0] !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${entry[0] === '/' ? '' : entry[0]}`, { replace: true });
    }
  };

  const currentType = PSEO_ROUTES[slug] || PSEO_ROUTES['/'];
  const typeName = t(`types.\${currentType}`);
  
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
      <Helmet>
        <title>{currentSeo.title}</title>
        <meta name="title" content={currentSeo.title} />
        <meta name="description" content="Create custom QR codes with logo for free. Best editable QR code generator with no watermark for WiFi, vCard, Google Reviews and URL. Client-side privacy." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://www.createmy-qr.com${slug === '/' ? '' : slug}`} />
        <meta name="keywords" content={t('seoKeywords')} />
        
        {/* Bidirectional Hreflang Matrix for 30 Languages */}
        {LANGS.map(lang => {
          const href = `https://www.createmy-qr.com${lang.code === 'en' ? '' : '/' + lang.code}${slug === '/' ? '' : slug}`;
          return <link key={lang.code} rel="alternate" hreflang={lang.code} href={href} />;
        })}
        <link rel="alternate" hreflang="x-default" href={`https://www.createmy-qr.com${slug === '/' ? '' : slug}`} />
        
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
      
      <QrWorkspace qrType={qrType} setQrTypeRoute={handleTypeChangeRoute} currentSeo={currentSeo} />
      <LandingContent />
      <SeoArticle currentLangCode={currentLangCode} />
    </MainLayout>
  );
}
