import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Sun, Moon, History } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { localizedRoutes } from '../../config/localizedRoutes';
import { QR_MENU_COLUMNS } from './MegaNav';

export default function MobileNav({ currentLangCode, onClose, darkMode, setDarkMode, onOpenHistory }) {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);

  return (
    <div className="xl:hidden flex flex-col p-4 bg-zinc-50 dark:bg-[#030914] border-b border-zinc-200 dark:border-zinc-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
      
      {/* 1. Dark Mode & Appearance Card in Drawer */}
      <div className="flex items-center justify-between p-3.5 mb-3 bg-white dark:bg-[#0c1831] border border-zinc-200/90 dark:border-zinc-800 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-[#081226] text-blue-600 dark:text-blue-400">
            {darkMode ? <Moon size={18} /> : <Sun size={18} className="text-amber-500" />}
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              {darkMode ? t('theme.dark', 'Dark Mode') : t('theme.light', 'Light Mode')}
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {darkMode ? t('theme.darkDesc', 'Dark OLED theme') : t('theme.lightDesc', 'Light daylight theme')}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          type="button"
          className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${darkMode ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}
          aria-label="Toggle dark mode"
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </button>
      </div>

      {/* 2. Quick Action Buttons (Scan QR, Scan Barcode, Barcode Maker) */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <RouterLink 
          to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`} 
          onClick={onClose} 
          className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-3 px-2 rounded-xl font-extrabold text-slate-800 dark:text-slate-200 text-[11px] uppercase transition-colors hover:border-blue-400 shadow-xs text-center tracking-tight leading-tight"
        >
          {t('nav.scanqr', 'Scan QR Code')}
        </RouterLink>
        <RouterLink 
          to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanbarcode'] || '/scan-barcode'}`} 
          onClick={onClose} 
          className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-3 px-2 rounded-xl font-extrabold text-slate-800 dark:text-slate-200 text-[11px] uppercase transition-colors hover:border-emerald-400 shadow-xs text-center tracking-tight leading-tight"
        >
          {t('nav.scanbarcode', 'Scan Barcode')}
        </RouterLink>
        <RouterLink 
          to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator'}`} 
          onClick={onClose} 
          className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-3 px-2 rounded-xl font-extrabold text-slate-800 dark:text-slate-200 text-[11px] uppercase transition-colors hover:border-purple-400 shadow-xs text-center tracking-tight leading-tight"
        >
          {t('nav.barcode', 'Barcode Maker')}
        </RouterLink>
      </div>

      {/* 3. Accordion: All Tools */}
      <button
        onClick={() => setOpenSection(openSection === 'all' ? null : 'all')}
        className="w-full bg-gradient-to-r from-slate-900 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white border-none py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-between cursor-pointer mb-2 shadow-md uppercase tracking-wide transition-all active:scale-[0.99]"
      >
        <span>{t('nav.generator', 'ALL QR & BARCODE TOOLS (37)')}</span>
        {openSection === 'all' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === 'all' && (
        <div className="flex flex-col gap-5 pt-3 pb-6 px-1 animate-fade-in-up-fast">
          {QR_MENU_COLUMNS.flat().map((cat, i) => (
            <div key={`qr-${i}`}>
              <div className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 tracking-wider mb-2.5 pb-2 border-b border-dashed border-zinc-300 dark:border-zinc-700 uppercase">
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
