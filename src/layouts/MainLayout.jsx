import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Globe, Moon, Sun, X, Menu } from 'lucide-react';
import { LANGS } from '../config/site';
import { localizedRoutes, routeToToolMap } from '../config/localizedRoutes';
import MegaNav from '../components/nav/MegaNav';
import MobileNav from '../components/nav/MobileNav';

export default function MainLayout({ children }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Super GEO: Parse language prefix
  const pathParts = location.pathname.split('/').filter(Boolean);
  let currentLangCode = 'en';
  let slug = location.pathname;

  if (pathParts.length > 0 && LANGS.some(l => l.code === pathParts[0])) {
    currentLangCode = pathParts[0];
    slug = '/' + pathParts.slice(1).join('/');
  }
  if (slug === '') slug = '/';

  const [darkMode, setDarkMode] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
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
    const currentTool = routeToToolMap[currentLangCode]?.[slug] || 'url';
    
    // Get the localized slug for the NEW language
    const newSlug = localizedRoutes[lang]?.[currentTool] || '/';
    
    const newPrefix = lang === 'en' ? '' : `/${lang}`;
    navigate(`${newPrefix}${newSlug === '/' ? '' : newSlug}`, { replace: true });
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
        <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logoqr.png" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-xl object-contain shadow-sm" />
            <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">CreateMy-QR</span>
          </div>
          
          <MegaNav currentLangCode={currentLangCode} />

          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => { setShowLangMenu(!showLangMenu); setLangSearch(''); }} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">
                <span style={{ fontSize: 16 }}>{LANGS.find(l => l.code === (i18n.language?.split('-')[0] || 'en'))?.flag || '🌐'}</span>
                <span className="uppercase text-xs tracking-wider">{(i18n.language?.split('-')[0] || 'en')}</span>
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
                          <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-5 py-3 text-sm flex items-center gap-4 transition-colors ${isActive ? 'bg-blue-50 dark:bg-[#081226] text-zinc-900 dark:text-white font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-[#f8fafc] dark:hover:bg-[#040a18]/50 hover:text-black dark:hover:text-white'}`}>
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
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-100 dark:border-[#102040] bg-white dark:bg-[#040a18] py-12 text-center text-zinc-500 dark:text-zinc-600 text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} CreateMy-QR Technologies. All rights reserved.</p>
          <div className="flex gap-6 font-medium text-zinc-900 dark:text-white">
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
