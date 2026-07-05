import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QrCode, Globe, Moon, Sun, Lock, Palette, Zap, Code2, X } from 'lucide-react';
import InputForm from './components/InputForm';
import LandingContent from './components/LandingContent';
const CustomizationPanel = React.lazy(() => import('./components/CustomizationPanel'));
import Preview from './components/Preview';
const EmbedWidgetModal = React.lazy(() => import('./components/EmbedWidgetModal'));
import './i18n';
import seoKeywords from './seoKeywords';

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
  { code: 'en', label: 'English',        flag: '🇺🇸' },
  { code: 'id', label: 'Indonesia',       flag: '🇮🇩' },
  { code: 'es', label: 'Español',         flag: '🇪🇸' },
  { code: 'fr', label: 'Français',        flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',         flag: '🇩🇪' },
  { code: 'pt', label: 'Português',       flag: '🇧🇷' },
  { code: 'zh', label: '中文',            flag: '🇨🇳' },
  { code: 'ja', label: '日本語',          flag: '🇯🇵' },
  { code: 'hi', label: 'हिन्दी',          flag: '🇮🇳' },
  { code: 'ko', label: '한국어',          flag: '🇰🇷' },
  { code: 'ar', label: 'العربية',         flag: '🇸🇦' },
  { code: 'ru', label: 'Русский',         flag: '🇷🇺' },
  { code: 'it', label: 'Italiano',        flag: '🇮🇹' },
  { code: 'tr', label: 'Türkçe',          flag: '🇹🇷' },
  { code: 'nl', label: 'Nederlands',      flag: '🇳🇱' },
  { code: 'pl', label: 'Polski',          flag: '🇵🇱' },
  { code: 'sv', label: 'Svenska',         flag: '🇸🇪' },
  { code: 'vi', label: 'Tiếng Việt',      flag: '🇻🇳' },
  { code: 'th', label: 'ไทย',            flag: '🇹🇭' },
  { code: 'el', label: 'Ελληνικά',        flag: '🇬🇷' },
  { code: 'cs', label: 'Čeština',         flag: '🇨🇿' },
  { code: 'da', label: 'Dansk',           flag: '🇩🇰' },
  { code: 'fi', label: 'Suomi',           flag: '🇫🇮' },
  { code: 'no', label: 'Norsk',           flag: '🇳🇴' },
  { code: 'hu', label: 'Magyar',          flag: '🇭🇺' },
  { code: 'ro', label: 'Română',          flag: '🇷🇴' },
  { code: 'uk', label: 'Українська',      flag: '🇺🇦' },
  { code: 'ms', label: 'Bahasa Melayu',   flag: '🇲🇾' },
  { code: 'tl', label: 'Filipino',        flag: '🇵🇭' },
  { code: 'bn', label: 'বাংলা',           flag: '🇧🇩' },
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
  const typeName = t(`types.${currentType}`);
  
  // Super Partial Lang: Fully localized SEO texts!
  const currentSeo = currentType === 'url' 
    ? {
        title: t('appTitle'),
        h1: t('appTitle'),
        description: t('tagline'),
      }
    : {
        title: `${typeName} QR - ${t('appTitle')}`,
        h1: `${typeName} QR`,
        description: `${typeName} QR - ${t('tagline')}`,
      };

  const [darkMode, setDarkMode] = useState(false);
  const [qrType, setQrType] = useState(currentType);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  const [qrData, setQrData] = useState({});
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState('data');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [langSearch, setLangSearch] = useState('');
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
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${entry[0] === '/' ? '' : entry[0]}`, { replace: true });
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
    const newPrefix = lang === 'en' ? '' : `/${lang}`;
    navigate(`${newPrefix}${slug === '/' ? '' : slug}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
      <Helmet>
        <html lang={currentLangCode} dir={currentLangCode === 'ar' ? 'rtl' : 'ltr'} />
        <title>{currentSeo.title}</title>
        <meta name="title" content={currentSeo.title} />
        <meta name="description" content="Create custom QR codes with logo for free. Best editable QR code generator with no watermark for WiFi, vCard, Google Reviews and URL. Client-side privacy." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://www.createmy-qr.com${slug === '/' ? '' : slug}`} />
        <meta name="keywords" content={seoKeywords[currentLangCode] || seoKeywords.en} />
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
              "name": "How to ${currentSeo.h1}",
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
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.createmy-qr.com/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "${currentSeo.h1}",
                "item": "https://www.createmy-qr.com${location.pathname}"
              }]
            }
          `}
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

      {/* Premium Glass Navbar */}
      <nav className="fixed top-0 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-zinc-200 dark:border-slate-800 z-50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logoqr.webp" alt="CreateMy-QR Logo - Free Editable QR Code Generator Online" className="w-8 h-8 rounded-xl object-contain shadow-sm" />
            <span className="text-lg font-bold text-black dark:text-white tracking-tight">CreateMy-QR</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => { setShowLangMenu(!showLangMenu); setLangSearch(''); }}
                aria-label="Change Language"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>
                  {LANGS.find(l => l.code === (i18n.language?.split('-')[0] || 'en'))?.flag || '🌐'}
                </span>
                <span className="uppercase text-xs tracking-wider">{(i18n.language?.split('-')[0] || 'en')}</span>
              </button>
              
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#18181b] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.05)] border border-zinc-200 dark:border-zinc-800 z-50 overflow-hidden transform origin-top-right transition-all">
                    {/* Search box */}
                    <div className="p-4 border-b border-zinc-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 bg-zinc-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                        <Globe className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search language..."
                          value={langSearch}
                          onChange={e => setLangSearch(e.target.value)}
                          className="bg-transparent text-sm font-medium text-black dark:text-white outline-none w-full placeholder:text-zinc-500"
                        />
                      </div>
                    </div>
                    {/* Language list */}
                    <div className="overflow-y-auto" style={{ maxHeight: 320 }}>
                      {LANGS.filter(l =>
                        langSearch === '' ||
                        l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
                        l.code.toLowerCase().includes(langSearch.toLowerCase())
                      ).map(lang => {
                        const isActive = i18n.language?.startsWith(lang.code);
                        return (
                          <button
                            key={lang.code}
                            onClick={() => { changeLanguage(lang.code); setLangSearch(''); }}
                            className={`w-full text-left px-5 py-3 text-sm flex items-center gap-4 transition-colors ${
                              isActive
                                ? 'bg-zinc-100 dark:bg-slate-800 text-black dark:text-white font-bold'
                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-black dark:hover:text-white'
                            }`}
                          >
                            <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{lang.flag}</span>
                            <span className="flex-1 truncate tracking-tight">{lang.label}</span>
                            <span className="text-[11px] text-zinc-400 dark:text-zinc-600 font-mono font-bold tracking-widest">{lang.code.toUpperCase()}</span>
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white flex-shrink-0" />}
                          </button>
                        );
                      })}
                      {LANGS.filter(l =>
                        langSearch !== '' &&
                        !l.label.toLowerCase().includes(langSearch.toLowerCase()) &&
                        !l.code.toLowerCase().includes(langSearch.toLowerCase())
                      ).length === LANGS.length && (
                        <div className="px-5 py-8 text-center text-sm font-medium text-zinc-500">No languages found</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-all"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Premium Hero Section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-24">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-100 dark:bg-slate-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs tracking-widest uppercase mb-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white animate-pulse"></span>
              {t('badge')}
            </div>
            <h1 className="text-[clamp(44px,7vw,80px)] font-bold text-black dark:text-white tracking-tighter mb-6 leading-[1.05]">
              {currentSeo.h1}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              {t('tagline')}
            </p>
            {/* GEO Fact Density Semantic Block (>40% Information Gain) */}
            <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto text-center">
              <strong className="text-black dark:text-white mr-2">{t('geo.title')}</strong> {t('geo.fact')}
            </div>
          </div>
        </section>

        {/* Generator Application Workspace */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-[40px] p-4 lg:p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-none">
        
        {/* HIDDEN SEMANTIC CORE FOR SEO BOTS (GRAY HAT PSEO) */}
        <div className="sr-only" aria-hidden="true">
          <h2>{t('seoCore.h2')}</h2>
          <p>{t('seoCore.body')}</p>
        </div>

        {/* LEFT COLUMN: Input & Customization Panel */}
            <div className="lg:col-span-7 lg:col-start-1 flex flex-col animate-fade-in-right">
              {/* Premium iOS Segmented Tabs */}
              <div className="flex space-x-2 bg-zinc-200/50 dark:bg-slate-800/80 p-1.5 rounded-2xl mb-8 border border-zinc-200/50 dark:border-zinc-800/50">
                <button
                  onClick={() => setActiveTab('data')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'data' ? 'bg-blue-600 text-white shadow-md border-transparent' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
                >
                  {t('tabs.step1')}
                </button>
                <button
                  onClick={() => hasGenerated && setActiveTab('design')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'design' ? 'bg-blue-600 text-white shadow-md border-transparent' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'} ${!hasGenerated ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {t('tabs.step2')}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
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
                      <React.Suspense fallback={<div className="p-12 text-center text-zinc-500 font-medium tracking-tight">Loading premium tools...</div>}><CustomizationPanel visuals={visuals} setVisuals={setVisuals} /></React.Suspense>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center sticky top-24">
              <Preview qrType={qrType} qrData={qrData} visuals={visuals} hasGenerated={hasGenerated} />
            </div>
          </div>
        </section>
        <LandingContent />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 text-center text-zinc-500 dark:text-zinc-600 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} CreateMy-QR Technologies. All rights reserved.</p>
          <div className="flex gap-6 font-medium text-black dark:text-white">
            <a href="/about" className="hover:underline">About</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
