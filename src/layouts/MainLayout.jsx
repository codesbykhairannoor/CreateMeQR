import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Globe, Moon, Sun, X, Menu, Clock, Heart } from 'lucide-react';
import { LANGS } from '../config/site';
import { localizedRoutes, routeToToolMap } from '../config/localizedRoutes';
import MegaNav from '../components/nav/MegaNav';
import MobileNav from '../components/nav/MobileNav';
import HistoryDrawer from '../components/HistoryDrawer';

export default function MainLayout({ children }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Super GEO: Parse language prefix
  const decodedPath = decodeURIComponent(location.pathname);
  const pathParts = decodedPath.split('/').filter(Boolean);
  let currentLangCode = 'en';
  let slug = decodedPath;

  if (pathParts.length > 0 && LANGS.some(l => l.code === pathParts[0])) {
    currentLangCode = pathParts[0];
    slug = '/' + pathParts.slice(1).join('/');
  }
  if (slug === '') slug = '/';

  const [darkMode, setDarkMode] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [softBannerLang, setSoftBannerLang] = useState(null);
  const [dismissBanner, setDismissBanner] = useState(false);

  useEffect(() => {
    if (i18n.language !== currentLangCode) {
      i18n.changeLanguage(currentLangCode);
    }
    document.documentElement.lang = currentLangCode;
    document.documentElement.dir = currentLangCode === 'ar' ? 'rtl' : 'ltr';
  }, [currentLangCode, i18n]);

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
    if (softBannerLang) localStorage.setItem('dismiss_geo_banner_' + softBannerLang.code, 'true');
    setDismissBanner(true);
    setSoftBannerLang(null);
  };

  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
    setSoftBannerLang(null);
    
    // Look up the current tool based on current lang and slug
    const currentTool = routeToToolMap[currentLangCode]?.[slug];
    
    let newSlug;
    if (currentTool) {
      // It's a localized tool route
      newSlug = localizedRoutes[lang]?.[currentTool] || '/';
    } else {
      // It's a non-tool route (like /about, /privacy)
      newSlug = slug;
    }
    
    const newPrefix = lang === 'en' ? '' : `/${lang}`;
    navigate(`${newPrefix}${newSlug === '/' ? '' : newSlug}`, { replace: true, state: { preventScroll: true } });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#040a18] font-sans selection:bg-blue-600/30 flex flex-col">
      <Helmet>
        <html lang={currentLangCode} dir={currentLangCode === 'ar' ? 'rtl' : 'ltr'} />
      </Helmet>

      {/* Super GEO Soft Banner */}
      {softBannerLang && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-[#040a18]/95 dark:bg-[#081226]/95 text-white p-4 rounded-2xl shadow-2xl border border-zinc-800 dark:border-blue-100 z-50 animate-fade-in-up flex flex-col gap-3 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium">🌐 {t('softBanner.text', { lang: softBannerLang.label })}</span>
            <button onClick={handleDismissBanner} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => changeLanguage(softBannerLang.code)} className="flex-1 py-2 px-3 bg-gradient-to-br from-slate-900 to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-xs rounded-xl transition-all shadow-md">
              {t('softBanner.switch', { lang: softBannerLang.label })}
            </button>
            <button onClick={handleDismissBanner} className="py-2 px-3 bg-blue-900 hover:bg-zinc-700 text-zinc-300 font-medium text-xs rounded-xl transition-all">
              {t('softBanner.dismiss')}
            </button>
          </div>
        </div>
      )}

      {/* Premium Glass Navbar */}
      <nav className="fixed top-0 w-full bg-white/70 dark:bg-[#040a18]/70 backdrop-blur-2xl z-50 transition-colors duration-500">
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 h-12 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5 md:gap-2 cursor-pointer whitespace-nowrap flex-shrink-0" onClick={() => navigate(currentLangCode === 'en' ? '/' : `/${currentLangCode}`)}>
            <img src="/logoqr.png" alt="CreateMy-QR Logo" className="w-6 h-6 md:w-8 md:h-8 rounded-xl object-contain shadow-sm" />
            <span className="text-sm md:text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              CreateMy-<span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600">QR</span>
            </span>
          </div>
          
          <MegaNav currentLangCode={currentLangCode} />

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <button onClick={() => setShowHistory(true)} title={t('history.title', 'Local History')} className="flex p-1.5 md:p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">
              <Clock className="w-5 h-5 md:w-5 md:h-5" />
            </button>
            <div className="w-px h-4 md:h-5 bg-zinc-200 dark:bg-zinc-800 mx-0.5 md:mx-1"></div>
            
            <div className="relative">
              <button onClick={() => { setShowLangMenu(!showLangMenu); setLangSearch(''); }} className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">
                <span style={{ fontSize: 16 }}>{LANGS.find(l => l.code === (i18n.language?.split('-')[0] || 'en'))?.flag || '🌐'}</span>
                <span className="uppercase text-[10px] md:text-xs tracking-wider">{(i18n.language?.split('-')[0] || 'en')}</span>
              </button>
              
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#18181b] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-blue-100 dark:border-[#102040] z-50 overflow-hidden">
                    <div className="p-4 border-b border-zinc-100 dark:border-[#102040]">
                      <div className="flex items-center gap-3 bg-blue-50 dark:bg-[#081226] rounded-2xl px-4 py-3">
                        <Globe className="w-4 h-4 text-zinc-400" />
                        <input autoFocus type="text" placeholder="Search language..." value={langSearch} onChange={e => setLangSearch(e.target.value)} className="bg-transparent text-sm text-zinc-900 dark:text-white outline-none w-full placeholder:text-zinc-500" />
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: 320 }}>
                      {LANGS.filter(l => langSearch === '' || l.label.toLowerCase().includes(langSearch.toLowerCase()) || l.code.toLowerCase().includes(langSearch.toLowerCase())).map(lang => {
                        const isActive = i18n.language?.startsWith(lang.code);
                        return (
                          <button key={lang.code} onMouseEnter={() => i18n.loadLanguages(lang.code)} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-5 py-3 text-sm flex items-center gap-4 transition-colors ${isActive ? 'bg-blue-50 dark:bg-[#081226] text-zinc-900 dark:text-white font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-[#f8fafc] dark:hover:bg-[#040a18]/50 hover:text-black dark:hover:text-white'}`}>
                            <span style={{ fontSize: 20 }}>{lang.flag}</span>
                            <span className="flex-1 truncate">{lang.label}</span>
                            <span className="text-[11px] font-mono font-bold tracking-widest">{lang.code.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="block p-1.5 md:p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">
              {darkMode ? <Sun className="w-5 h-5 md:w-5 md:h-5" /> : <Moon className="w-5 h-5 md:w-5 md:h-5" />}
            </button>
            <button onClick={() => setShowMobileNav(!showMobileNav)} className="xl:hidden p-1.5 md:p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">
              {showMobileNav ? <X className="w-5 h-5 md:w-5 md:h-5" /> : <Menu className="w-5 h-5 md:w-5 md:h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {showMobileNav && (
        <div className="xl:hidden absolute inset-x-0 top-16 z-40 bg-white dark:bg-[#040a18] border-b border-zinc-200 dark:border-zinc-800 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
          <MobileNav 
            currentLangCode={currentLangCode} 
            onClose={() => setShowMobileNav(false)} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            onOpenHistory={() => {
              setShowMobileNav(false);
              setShowHistory(true);
            }} 
          />
        </div>
      )}

      {/* History Drawer Overlay */}
      <HistoryDrawer 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        currentLangCode={currentLangCode} 
      />

      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Premium Minimalist Footer */}
      <footer className="border-t border-zinc-200 dark:border-[#102040] bg-[#f8fafc] dark:bg-[#040a18] pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logoqr.png" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-xl object-contain shadow-sm" />
                <span className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  CreateMy-<span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-blue-500">QR</span>
                </span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                {t('footer.desc', "The world's fastest, 100% free, privacy-first QR Code generator. Powered by client-side WebAssembly.")}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-4">{t('footer.product', 'Product')}</h4>
              <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.pricing || '/pricing'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.pricing', 'Pricing')}</RouterLink></li>
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.security || '/security'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.security', 'Security')}</RouterLink></li>
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.compare || '/compare'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.compare', 'Compare Tools')}</RouterLink></li>
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.usecases || '/use-cases'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.useCases', 'Use Cases')}</RouterLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-4">{t('footer.company', 'Company')}</h4>
              <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.about || '/about'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.aboutUs', 'About Us')}</RouterLink></li>
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.languages || '/languages'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.languages', 'Supported Languages')}</RouterLink></li>
                <li><a href="mailto:support@createmy-qr.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.contact', 'Contact Support')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-4">{t('footer.legal', 'Legal')}</h4>
              <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.privacy || '/privacy'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.privacy', 'Privacy Policy')}</RouterLink></li>
                <li><RouterLink to={`${currentLangCode === 'en' ? '' : `/${currentLangCode}`}${localizedRoutes[currentLangCode]?.terms || '/terms'}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer.terms', 'Terms of Service')}</RouterLink></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-200 dark:border-[#102040] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <p>© {new Date().getFullYear()} {t('footer.copyright', 'CreateMy-QR Technologies. All rights reserved. ISO/IEC 18004:2015 Compliant.')}</p>
            <p>{t('footer.madewith', 'Made with')} <Heart className="inline w-3 h-3 text-red-500 mx-1" /> {t('footer.forprivateweb', 'for a private web.')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
