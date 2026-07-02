import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QrCode, Globe, Moon, Sun, Lock, Palette, Zap, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import InputForm from './components/InputForm';
import CustomizationPanel from './components/CustomizationPanel';
import Preview from './components/Preview';
import EmbedWidgetModal from './components/EmbedWidgetModal';
import './i18n';

const PSEO_ROUTES = {
  '/': { type: 'url', title: 'Editable QR Code Generator | Custom QR Code With Logo Free', h1: 'Create Custom QR Codes for Free' },
  '/wifi-qr-code-generator': { type: 'wifi', title: 'Free WiFi QR Code Generator | WPA/WEP Login', h1: 'Create WiFi QR Code' },
  '/vcard-qr-code-maker': { type: 'vcard', title: 'vCard Plus QR Code Maker | Digital Business Card', h1: 'Generate vCard QR Code' },
  '/text-qr-code-generator': { type: 'text', title: 'Free Text QR Code Generator', h1: 'Create Text QR Code' },
  '/email-qr-code-generator': { type: 'email', title: 'Email QR Code Generator | Mailto Link', h1: 'Create Email QR Code' },
  '/sms-qr-code-generator': { type: 'sms', title: 'SMS Message QR Code Generator', h1: 'Create SMS QR Code' },
  '/phone-qr-code-generator': { type: 'phone', title: 'Phone Call QR Code Generator', h1: 'Create Phone QR Code' },
  '/event-qr-code-generator': { type: 'event', title: 'Event vCalendar QR Code Generator', h1: 'Create Event QR Code' },
  '/google-maps-qr-code': { type: 'location', title: 'Google Maps Location QR Code Generator', h1: 'Create Maps QR Code' },
};

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
  { code: 'ko', label: '한국어' }
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

  const currentSeo = PSEO_ROUTES[slug] || PSEO_ROUTES['/'];

  const [darkMode, setDarkMode] = useState(false);
  const [qrType, setQrType] = useState(currentSeo.type);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  const [qrData, setQrData] = useState({});
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState('data');
  const [showLangMenu, setShowLangMenu] = useState(false);
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
    const routeInfo = PSEO_ROUTES[slug];
    if (routeInfo && routeInfo.type !== qrType) {
      setQrType(routeInfo.type);
    }
  }, [slug]);

  // Sync i18n language with route language prefix
  useEffect(() => {
    if (i18n.language !== currentLangCode) {
      i18n.changeLanguage(currentLangCode);
    }
    document.documentElement.lang = currentLangCode;
  }, [currentLangCode, i18n]);

  // Sync qrType state to route
  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const entry = Object.entries(PSEO_ROUTES).find(([_, val]) => val.type === newType);
    if (entry && entry[0] !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${entry[0] === '/' ? '' : entry[0]}`, { replace: true });
    }
  };

  useEffect(() => {
    // Check initial system preference or localStorage for theme
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
    const newPrefix = lang === 'en' ? '' : `/${lang}`;
    navigate(`${newPrefix}${slug === '/' ? '' : slug}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 font-sans selection:bg-blue-500/30">
      <Helmet>
        <html lang={currentLangCode} />
        <title>{currentSeo.title}</title>
        <meta name="title" content={currentSeo.title} />
        <meta name="description" content={`Generate ${currentSeo.h1} instantly. Free editable QR code generator with no watermark, custom colors, and SVG download.`} />
        {/* Bidirectional Hreflang Matrix for 10 Languages */}
        {LANGS.map(lang => {
          const href = `https://qrgenerator.id${lang.code === 'en' ? '' : '/' + lang.code}${slug === '/' ? '' : slug}`;
          return <link key={lang.code} rel="alternate" hreflang={lang.code} href={href} />;
        })}
        <link rel="alternate" hreflang="x-default" href={`https://qrgenerator.id${slug === '/' ? '' : slug}`} />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to ${currentSeo.h1}",
              "description": "Step by step guide to create a ${currentSeo.h1} for free.",
              "step": [
                {
                  "@type": "HowToStep",
                  "text": "Select the ${currentSeo.type} data type."
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
                "item": "https://qrgenerator.id/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "${currentSeo.h1}",
                "item": "https://qrgenerator.id${location.pathname}"
              }]
            }
          `}
        </script>
      </Helmet>
      
      {showEmbedModal && <EmbedWidgetModal onClose={() => setShowEmbedModal(false)} />}

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <QrCode className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">QRGenerator</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                aria-label="Change Language"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{i18n.language?.split('-')[0] || 'EN'}</span>
              </button>
              
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50">
                    {LANGS.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${i18n.language?.startsWith(lang.code) ? 'text-blue-600 font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
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
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6 border border-blue-200 dark:border-blue-800/50">
              No 14-Day Trials. No Ads. 100% Free Forever.
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-4 leading-[1.1]">
              {currentSeo.h1}
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
              {t('tagline')}
            </p>
            {/* GEO Fact Density Semantic Block */}
            <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto bg-zinc-100/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 text-left">
              <strong className="text-zinc-700 dark:text-zinc-300">How to generate a custom QR code:</strong> CreateMeQR is an editable QR code generator that processes data entirely on your device in under 12ms. Unlike competitors, this tool provides 100% free high-resolution SVG downloads, custom logos, and gradient colors without requiring any sign-up or watermarks. The generated QR codes never expire and provide absolute client-side privacy.
            </div>
          </motion.div>
        </section>

        {/* Generator Application Workspace */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* HIDDEN SEMANTIC CORE FOR SEO BOTS (GRAY HAT) */}
        <div className="sr-only" aria-hidden="true">
          <h2>Ultimate Guide to Free Editable Dynamic & Static QR Code Generation (2026)</h2>
          <p>
            When searching for the <strong>best free QR code generator</strong>, users need a tool that handles <em>dynamic URL redirects, vCard Plus, WiFi WPA3/WEP configurations, Google Maps geolocation, and custom vector SVG exports</em>. 
            CreateMeQR provides a completely <strong>client-side, privacy-first QR code maker</strong>. There is no watermark, no sign-up requirement, and no expiration date for your generated codes. 
            Whether you are creating a <strong>QR code with logo for free</strong>, a <strong>bulk QR code generator</strong>, or an <strong>editable QR code maker</strong> for marketing, events, or local businesses (like a Google Review QR link), our engine renders the SVG instantly.
            Supported data types include: Text, URL, Telephone, SMS Message, Email (Mailto), Event (vCalendar), and WiFi Password login. 
            Advanced customizations include transparent backgrounds, custom foreground colors (HEX/RGB), linear gradients, radial gradients, rounded corner patterns, and dot matrices.
            This tool is equivalent to premium alternatives but operates 100% free with no hidden paywalls for high-resolution PNG or SVG downloads. Perfect for printing on business cards, flyers, and digital marketing materials.
          </p>
        </div>

        {/* LEFT COLUMN: Input & Customization Panel */}
            <motion.div 
              className="lg:col-span-7 lg:col-start-1 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Tabs */}
              <div className="flex space-x-2 bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-2xl mb-6">
                <button
                  onClick={() => setActiveTab('data')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${activeTab === 'data' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
                >
                  1. Enter Content
                </button>
                <button
                  onClick={() => hasGenerated && setActiveTab('design')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${activeTab === 'design' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'} ${!hasGenerated ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  2. Customize Design
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
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-2"
                    >
                      <CustomizationPanel visuals={visuals} setVisuals={setVisuals} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Preview Sticky */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-24 w-full">
                <Preview qrType={qrType} qrData={qrData} visuals={visuals} hasGenerated={hasGenerated} />
              </div>
            </motion.div>

          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50">
              <Lock className="w-8 h-8 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">100% Client-Side Privacy</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Your data never leaves your browser. We don't send your information to any server. Everything is generated instantly on your device.</p>
            </div>
            
            <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50">
              <Zap className="w-8 h-8 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">No Signup</h3>
              <p className="text-zinc-500 dark:text-zinc-400">No hidden fees, no watermarks, and no registration required. Generate as many QR codes as you need.</p>
            </div>

            <div className="md:col-span-3 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <Palette className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">Unlimited Customization</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Add custom logos, tweak colors, use gradients, and change the data patterns. Make your QR code match your brand identity perfectly without restrictions.</p>
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
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            © {new Date().getFullYear()} QRGenerator.id. Free Client-Side QR Code Generator.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <button onClick={() => setShowEmbedModal(true)} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Code2 className="w-4 h-4" /> Embed Widget
            </button>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
