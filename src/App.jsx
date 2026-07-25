import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
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
      const newPrefix = currentLangCode === 'en' ? '' : `/\${currentLangCode}`;
      navigate(`\${newPrefix}\${entry[0] === '/' ? '' : entry[0]}`, { replace: true });
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
      <QrWorkspace qrType={qrType} setQrTypeRoute={handleTypeChangeRoute} currentSeo={currentSeo} />
      <LandingContent />
      <SeoArticle currentLangCode={currentLangCode} />
    </MainLayout>
  );
}
