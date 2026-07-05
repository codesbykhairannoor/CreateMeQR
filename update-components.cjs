const fs = require('fs');

// 1. Update InputForm.jsx
let inputForm = fs.readFileSync('src/components/InputForm.jsx', 'utf8');
inputForm = inputForm.replace(
  "{hasGenerated ? 'Update QR Code' : 'Generate QR Code'}",
  "{hasGenerated ? t('tabs.update') : t('tabs.generate')}"
);
fs.writeFileSync('src/components/InputForm.jsx', inputForm, 'utf8');
console.log('Updated InputForm.jsx');

// 2. Update Preview.jsx
let preview = fs.readFileSync('src/components/Preview.jsx', 'utf8');
preview = preview.replace(
  '<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Ready to Generate</h2>',
  '<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{t(\'preview.readyTitle\')}</h2>'
);
preview = preview.replace(
  '<p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-[200px]">\n            Fill in your details on the left and click "Generate QR Code" to see your preview here.\n          </p>',
  '<p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-[200px]">\n            {t(\'preview.readyDesc\')}\n          </p>'
);
preview = preview.replace(
  '<Check className="w-3 h-3 mr-1" /> Client-side generated\n            </span>\n            No data sent to server',
  '<Check className="w-3 h-3 mr-1" /> {t(\'preview.clientSide\')}\n            </span>\n            {t(\'preview.noServer\')}'
);
fs.writeFileSync('src/components/Preview.jsx', preview, 'utf8');
console.log('Updated Preview.jsx');

// 3. Update EmbedWidgetModal.jsx
const embedModalContent = `import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EmbedWidgetModal({ onClose }) {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [anchorText, setAnchorText] = useState('CreateMy-QR Generator');

  const langPrefix = i18n.language && i18n.language !== 'en' ? \`/\${i18n.language}\` : '';
  const targetUrl = \`https://www.createmy-qr.com\${langPrefix}\`;

  const embedCode = \`<iframe src="\${targetUrl}" width="100%" height="800" frameborder="0" scrolling="no" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>\\n<div style="text-align: center; font-size: 11px; margin-top: 8px;">Powered by <a href="\${targetUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">\${anchorText}</a></div>\`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{t('embedModal.title')}</h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            {t('embedModal.desc')}
          </p>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">
              {t('embedModal.anchorLabel')}
            </label>
            <select
              value={anchorText}
              onChange={(e) => setAnchorText(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            >
              <option value="CreateMy-QR Generator">CreateMy-QR Generator</option>
              <option value="Free QR Code Generator">Free QR Code Generator</option>
              <option value="QR Code Maker Online">QR Code Maker Online</option>
              <option value="Custom QR Code with Logo">Custom QR Code with Logo</option>
              <option value={t('appTitle')}>{t('appTitle')}</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute top-3 right-3 flex space-x-2">
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors font-semibold shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? t('embedModal.copied') : t('embedModal.copy')}
              </button>
            </div>
            <pre className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl text-sm text-zinc-800 dark:text-zinc-300 overflow-x-auto border border-zinc-200 dark:border-zinc-800 font-mono">
              <code>{embedCode}</code>
            </pre>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">{t('embedModal.whyTitle')}</h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>{t('embedModal.why1')}</li>
              <li>{t('embedModal.why2')}</li>
              <li>{t('embedModal.why3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/components/EmbedWidgetModal.jsx', embedModalContent, 'utf8');
console.log('Updated EmbedWidgetModal.jsx');

// 4. Update App.jsx
const appContent = `import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QrCode, Globe, Moon, Sun, Lock, Palette, Zap, Code2, X } from 'lucide-react';
import InputForm from './components/InputForm';
const CustomizationPanel = React.lazy(() => import('./components/CustomizationPanel'));
import Preview from './components/Preview';
const EmbedWidgetModal = React.lazy(() => import('./components/EmbedWidgetModal'));
import './i18n';

const PSEO_ROUTES = {
  '/': 'url',
  '/wifi-qr-code-generator': 'wifi',
  '/vcard-qr-code-maker': 'vcard',
  '/text-qr-code-generator': 'text',
  '/email-qr-code-generator': 'email',
  '/sms-qr-code-generator': 'sms',
  '/phone-qr-code-generator': 'phone',
  '/event-qr-code-generator': 'event',
  '/google-maps-qr-code': 'location',
};

// 30 Languages Simultaneously for Super GEO & Information Gain PSEO
const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Indonesia' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ko', label: '한국어' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
  { code: 'it', label: 'Italiano' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polski' },
  { code: 'sv', label: 'Svenska' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'cs', label: 'Čeština' },
  { code: 'da', label: 'Dansk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'no', label: 'Norsk' },
  { code: 'hu', label: 'Magyar' },
  { code: 'ro', label: 'Română' },
  { code: 'uk', label: 'Українська' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'tl', label: 'Filipino' },
  { code: 'bn', label: 'বাংলা' }
];

function App() {
  const { t, i18n } = useTranslation();
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

  const currentType = PSEO_ROUTES[slug] || PSEO_ROUTES['/'];
  const typeName = t(\`types.\${currentType}\`);
  
  // Super Partial Lang: Fully localized SEO texts!
  const currentSeo = currentType === 'url' 
    ? {
        title: t('appTitle'),
        h1: t('appTitle'),
        description: t('tagline'),
      }
    : {
        title: \`\${typeName} QR - \${t('appTitle')}\`,
        h1: \`\${typeName} QR\`,
        description: \`\${typeName} QR - \${t('tagline')}\`,
      };

  const [darkMode, setDarkMode] = useState(false);
  const [qrType, setQrType] = useState(currentType);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  const [qrData, setQrData] = useState({});
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState('data');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [softBannerLang, setSoftBannerLang] = useState(null);
  const [dismissBanner, setDismissBanner] = useState(false);
  
  const [visuals, setVisuals] = useState({
    dotsOptions: { color: '#000000', type: 'square' },
    backgroundOptions: { color: '#ffffff' },
    image: null,
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 10 },
    cornersSquareOptions: { type: 'square', color: '#000000' },
    cornersDotOptions: { type: 'square', color: '#000000' },
    qrOptions: { errorCorrectionLevel: 'Q' }
  });

  // Sync route with qrType state
  useEffect(() => {
    const routeType = PSEO_ROUTES[slug];
    if (routeType && routeType !== qrType) {
      setQrType(routeType);
    }
  }, [slug]);

  // Sync i18n language with route language prefix
  useEffect(() => {
    if (i18n.language !== currentLangCode) {
      i18n.changeLanguage(currentLangCode);
    }
    document.documentElement.lang = currentLangCode;
    if (currentLangCode === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [currentLangCode, i18n]);

  // Super GEO: Detect browser language without hard redirecting bots (White/Gray Hat Soft Banner)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator && !dismissBanner) {
      const browserLangFull = window.navigator.language || window.navigator.userLanguage || '';
      const browserLangCode = browserLangFull.split('-')[0].toLowerCase();
      const match = LANGS.find(l => l.code === browserLangCode);
      if (match && match.code !== 'en' && match.code !== currentLangCode && !localStorage.getItem('dismiss_geo_banner_' + match.code)) {
        setSoftBannerLang(match);
      } else {
        setSoftBannerLang(null);
      }
    }
  }, [currentLangCode, dismissBanner]);

  const handleDismissBanner = () => {
    if (softBannerLang) {
      localStorage.setItem('dismiss_geo_banner_' + softBannerLang.code, 'true');
    }
    setDismissBanner(true);
    setSoftBannerLang(null);
  };

  // Sync qrType state to route
  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const entry = Object.entries(PSEO_ROUTES).find(([_, val]) => val === newType);
    if (entry && entry[0] !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : \`/\${currentLangCode}\`;
      navigate(\`\${newPrefix}\${entry[0] === '/' ? '' : entry[0]}\`, { replace: true });
    }
  };

  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
    setSoftBannerLang(null);
    const newPrefix = lang === 'en' ? '' : \`/\${lang}\`;
    navigate(\`\${newPrefix}\${slug === '/' ? '' : slug}\`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-blue-500/30">
      <Helmet>
        <html lang={currentLangCode} dir={currentLangCode === 'ar' ? 'rtl' : 'ltr'} />
        <title>{currentSeo.title}</title>
        <meta name="title" content={currentSeo.title} />
        <meta name="description" content={currentSeo.description} />
        {/* Bidirectional Hreflang Matrix for 30 Languages */}
        {LANGS.map(lang => {
          const href = \`https://www.createmy-qr.com\${lang.code === 'en' ? '' : '/' + lang.code}\${slug === '/' ? '' : slug}\`;
          return <link key={lang.code} rel="alternate" hreflang={lang.code} href={href} />;
        })}
        <link rel="alternate" hreflang="x-default" href={\`https://www.createmy-qr.com\${slug === '/' ? '' : slug}\`} />
        
        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to \${currentSeo.h1}",
              "description": "\${currentSeo.description}",
              "step": [
                {
                  "@type": "HowToStep",
                  "text": "Select the \${currentType} data type."
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
          \`}
        </script>
        <script type="application/ld+json">
          {\`
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
                "name": "\${currentSeo.h1}",
                "item": "https://www.createmy-qr.com\${location.pathname}"
              }]
            }
          \`}
        </script>
      </Helmet>
      
      {showEmbedModal && <React.Suspense fallback={null}><EmbedWidgetModal onClose={() => setShowEmbedModal(false)} /></React.Suspense>}

      {/* Super GEO Soft Banner (No Crawler Blindness / Penalty Bypass) */}
      {softBannerLang && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-zinc-900/95 dark:bg-zinc-100/95 text-white dark:text-zinc-900 p-4 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 z-50 animate-fade-in-up flex flex-col gap-3 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium">
              🌐 {t('softBanner.text', { lang: softBannerLang.label })}
            </span>
            <button onClick={handleDismissBanner} className="text-zinc-400 hover:text-white dark:hover:text-zinc-900">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeLanguage(softBannerLang.code)}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md text-center"
            >
              {t('softBanner.switch', { lang: softBannerLang.label })}
            </button>
            <button
              onClick={handleDismissBanner}
              className="py-2 px-3 bg-zinc-800 dark:bg-zinc-200 hover:bg-zinc-700 dark:hover:bg-zinc-300 text-zinc-300 dark:text-zinc-700 font-medium text-xs rounded-xl transition-all"
            >
              {t('softBanner.dismiss')}
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logoqr.webp" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">CreateMy-QR</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                aria-label="Change Language"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{i18n.language?.split('-')[0] || 'EN'}</span>
              </button>
              
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 max-h-80 overflow-y-auto custom-scrollbar bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-2 z-50">
                    {LANGS.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={\`w-full text-left px-4 py-2 text-sm \${i18n.language?.startsWith(lang.code) ? 'text-blue-600 font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'}\`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6 border border-blue-200 dark:border-blue-800/50">
              {t('badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-4 leading-[1.1]">
              {currentSeo.h1}
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8">
              {t('tagline')}
            </p>
            {/* GEO Fact Density Semantic Block (>40% Information Gain) */}
            <div className="text-sm text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto bg-zinc-100/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 text-left">
              <strong className="text-zinc-700 dark:text-zinc-300">{t('geo.title')}</strong> {t('geo.fact')}
            </div>
          </div>
        </section>

        {/* Generator Application Workspace */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* HIDDEN SEMANTIC CORE FOR SEO BOTS (GRAY HAT PSEO) */}
        <div className="sr-only" aria-hidden="true">
          <h2>{t('seoCore.h2')}</h2>
          <p>{t('seoCore.body')}</p>
        </div>

        {/* LEFT COLUMN: Input & Customization Panel */}
            <div className="lg:col-span-7 lg:col-start-1 flex flex-col animate-fade-in-right">
              {/* Tabs */}
              <div className="flex space-x-2 bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-2xl mb-6">
                <button
                  onClick={() => setActiveTab('data')}
                  className={\`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all \${activeTab === 'data' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-200'}\`}
                >
                  {t('tabs.step1')}
                </button>
                <button
                  onClick={() => hasGenerated && setActiveTab('design')}
                  className={\`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all \${activeTab === 'design' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-200'} \${!hasGenerated ? 'cursor-not-allowed opacity-90' : ''}\`}
                >
                  {t('tabs.step2')}
                </button>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {activeTab === 'data' ? (
                    <InputForm 
                      qrType={qrType} 
                      setQrType={handleTypeChangeRoute} 
                      qrData={qrData} 
                      setQrData={setQrData}
                      hasGenerated={hasGenerated}
                      setHasGenerated={setHasGenerated}
                      setActiveTab={setActiveTab}
                    />
                  ) : (
                    <div className="p-2 animate-fade-in-up-fast">
                      <React.Suspense fallback={<div className="p-8 text-center text-zinc-600">Loading customization tools...</div>}><CustomizationPanel visuals={visuals} setVisuals={setVisuals} /></React.Suspense>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Preview Sticky */}
            <div className="lg:col-span-5 flex justify-center animate-fade-in-up-delay">
              <div className="sticky top-24 w-full">
                <Preview qrType={qrType} qrData={qrData} visuals={visuals} hasGenerated={hasGenerated} />
              </div>
            </div>

          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50">
              <Lock className="w-8 h-8 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">{t('features.privacyTitle')}</h3>
              <p className="text-zinc-600 dark:text-zinc-300">{t('features.privacyDesc')}</p>
            </div>
            
            <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50">
              <Zap className="w-8 h-8 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">{t('features.signupTitle')}</h3>
              <p className="text-zinc-600 dark:text-zinc-300">{t('features.signupDesc')}</p>
            </div>

            <div className="md:col-span-3 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <Palette className="w-8 h-8 text-blue-600 mb-6" />
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{t('features.customTitle')}</h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">{t('features.customDesc')}</p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                 <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-400 opacity-80 blur-2xl absolute -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
                 <QrCode className="w-24 h-24 text-zinc-300 dark:text-zinc-700" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 dark:text-zinc-600 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <button onClick={() => setShowEmbedModal(true)} className="flex items-center gap-2 hover:text-blue-600">
              <Code2 className="w-4 h-4" /> {t('footer.embed')}
            </button>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">{t('footer.terms')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
`;
fs.writeFileSync('src/App.jsx', appContent, 'utf8');
console.log('Updated App.jsx with 30 languages, Super GEO banner, and complete translation coverage!');
