import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Sun, Moon, History, User, LogOut, Crown, Sparkles } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { localizedRoutes } from '../../config/localizedRoutes';
import { QR_MENU_COLUMNS } from './MegaNav';
import { useAuth } from '../../context/AuthContext';

export default function MobileNav({ currentLangCode, onClose, darkMode, setDarkMode, onOpenHistory }) {
  const { t } = useTranslation();
  const { user, isPro, signOut, openAuthModal } = useAuth();
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="xl:hidden flex flex-col p-4 bg-zinc-50 dark:bg-[#030914] border-b border-zinc-200 dark:border-zinc-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
      
      {/* 0. User Profile / Sign In Status Bar */}
      {user ? (
        <div className="p-3 mb-3 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full object-cover border border-blue-500" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">{user.displayName || user.email}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {isPro ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-semibold uppercase tracking-wider">
                    <Crown size={10} /> PRO
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-zinc-400">Free Tier</span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            onClose();
            openAuthModal();
          }}
          className="w-full mb-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-900/20 cursor-pointer"
        >
          <User size={16} />
          <span>{t('auth.signInBtn', 'Sign In / Create Account')}</span>
        </button>
      )}

      {/* 1. Sleek Segmented Theme Switcher */}
      <div className="grid grid-cols-2 p-1 mb-3 bg-zinc-200/70 dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <button
          type="button"
          onClick={() => setDarkMode(false)}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${
            !darkMode
              ? 'bg-white text-zinc-900 shadow-xs'
              : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
        >
          <Sun size={14} className={!darkMode ? 'text-amber-500' : ''} />
          <span>{t('theme.light', 'Light Mode')}</span>
        </button>
        <button
          type="button"
          onClick={() => setDarkMode(true)}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${
            darkMode
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
        >
          <Moon size={14} />
          <span>{t('theme.dark', 'Dark Mode')}</span>
        </button>
      </div>

      {/* 2. Quick Action Grid (Scanners, Barcode & Pricing) */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <RouterLink 
          to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`} 
          onClick={onClose} 
          className="flex items-center justify-center gap-1.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-2.5 px-2 rounded-xl font-semibold text-slate-800 dark:text-slate-200 text-[13px] transition-colors hover:border-blue-400 shadow-xs text-center leading-tight"
        >
          {t('nav.scanqr', 'Scan QR Code')}
        </RouterLink>
        <RouterLink 
          to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanbarcode'] || '/scan-barcode'}`} 
          onClick={onClose} 
          className="flex items-center justify-center gap-1.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-2.5 px-2 rounded-xl font-semibold text-slate-800 dark:text-slate-200 text-[13px] transition-colors hover:border-emerald-400 shadow-xs text-center leading-tight"
        >
          {t('nav.scanbarcode', 'Scan Barcode')}
        </RouterLink>

        <RouterLink 
          to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator'}`} 
          onClick={onClose} 
          className="flex items-center justify-center gap-1.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-2.5 px-2 rounded-xl font-semibold text-slate-800 dark:text-slate-200 text-[13px] transition-colors hover:border-blue-400 shadow-xs text-center leading-tight"
        >
          {t('nav.barcode', 'Barcode Maker')}
        </RouterLink>

        <RouterLink 
          to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['pricing'] || '/pricing'}`} 
          onClick={onClose} 
          className="flex items-center justify-center gap-1.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-2.5 px-2 rounded-xl font-semibold text-blue-600 dark:text-blue-400 text-[13px] transition-colors hover:border-blue-400 shadow-xs text-center leading-tight"
        >
          <Sparkles size={13} className="text-blue-500" />
          <span>{t('nav.pricing', 'Pricing & PRO')}</span>
        </RouterLink>
      </div>

      {/* 2.5 Bulk Batch Generator Button */}
      <RouterLink 
        to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['bulk'] || '/bulk-qr-generator'}`} 
        onClick={onClose} 
        className="w-full mb-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/30 py-2.5 px-3 rounded-xl font-semibold text-blue-700 dark:text-blue-300 text-sm transition-all shadow-xs"
      >
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        {t('nav.bulk', 'Bulk Batch')} (CSV / Excel)
      </RouterLink>

      {/* 3. Accordion: All Tools */}
      <button
        onClick={() => setOpenSection(openSection === 'all' ? null : 'all')}
        className="w-full bg-gradient-to-r from-slate-900 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white border-none py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-between cursor-pointer mb-2 shadow-md tracking-wide transition-all active:scale-[0.99]"
      >
        <span>{t('nav.generator', 'All QR & Barcode Tools (37)')}</span>
        {openSection === 'all' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === 'all' && (
        <div className="flex flex-col gap-5 pt-3 pb-6 px-1 animate-fade-in-up-fast">
          {QR_MENU_COLUMNS.flat().map((cat, i) => (
            <div key={`qr-${i}`}>
              <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider mb-2.5 pb-2 border-b border-dashed border-zinc-200 dark:border-zinc-800 uppercase">
                {t(cat.title)}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cat.items.map(item => {
                  const Icon = item.icon;
                  const path = item.id === 'url' ? '/' : `/${item.id}`;
                  const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || path;
                  const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedPath}`;
                  
                  return (
                    <RouterLink 
                      key={item.id} 
                      to={finalUrl} 
                      onClick={onClose} 
                      className="flex items-center gap-2.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-zinc-700 dark:text-zinc-300 shadow-xs group"
                    >
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold uppercase truncate">{item.label}</span>
                    </RouterLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
