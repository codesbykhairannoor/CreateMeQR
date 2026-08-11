import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, QrCode, ScanLine, Scan, Building2, ChevronUp, Moon, Sun, Clock, Link, Wifi } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { localizedRoutes } from '../../config/localizedRoutes';
import { QR_MENU_COLUMNS, BARCODE_CATEGORIES } from './MegaNav';

export default function MobileNav({ currentLangCode, onClose, onOpenHistory, darkMode, setDarkMode }) {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="lg:hidden flex flex-col p-4 bg-zinc-50 dark:bg-[#030914] min-h-screen pb-32">
      
      {/* Quick 3 buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { id: 'url', label: 'URL / Link', icon: Link },
          { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
          { id: 'vcard', label: 'vCard', icon: Building2 },
        ].map(({ id, label, icon: Icon }) => (
          <RouterLink
            key={id}
            to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.[id] || (id === 'url' ? '/' : '/' + id)}`}
            onClick={onClose}
            className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg font-bold text-zinc-800 dark:text-zinc-200 text-[10px] sm:text-[11px] text-center shadow-sm uppercase truncate transition-colors hover:border-blue-400"
          >
            {label}
          </RouterLink>
        ))}
      </div>

      {/* Accordion: All Tools */}
      <button
        onClick={() => setOpenSection(openSection === 'all' ? null : 'all')}
        className="w-full bg-gradient-to-r from-slate-900 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white border-none py-3 px-4 rounded-xl font-extrabold text-[13px] md:text-[15px] flex items-center justify-between cursor-pointer mb-2 shadow-md uppercase tracking-wide transition-all"
      >
        <span>{t('nav.generator', 'ALL QR & BARCODE TOOLS')}</span>
        {openSection === 'all' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {openSection === 'all' && (
        <div className="flex flex-col gap-5 pt-2 pb-6 px-1 animate-fade-in-up-fast">
          
          {/* QR Tools */}
          {QR_MENU_COLUMNS.flat().map((cat, i) => (
            <div key={`qr-${i}`}>
              <div className="text-[11px] md:text-[12px] font-extrabold text-blue-600 dark:text-blue-400 tracking-wider mb-2.5 pb-2 border-b border-dashed border-zinc-300 dark:border-zinc-700 uppercase">
                {t(cat.title)}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cat.items.map(item => {
                  const Icon = item.icon;
                  const path = item.id === 'url' ? '/' : `/${item.id}`;
                  const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || path;
                  const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedPath}`;
                  
                  return (
                    <RouterLink key={item.id} to={finalUrl} onClick={onClose} className="flex items-center gap-2.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-zinc-700 dark:text-zinc-300 shadow-sm group">
                      <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold uppercase truncate">{item.label}</span>
                    </RouterLink>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Barcode Tools */}
          {BARCODE_CATEGORIES.map((cat, i) => (
            <div key={`barcode-${i}`}>
              <div className="text-[11px] md:text-[12px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider mb-2.5 pb-2 border-b border-dashed border-zinc-300 dark:border-zinc-700 uppercase">
                {t(cat.title)}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {cat.items.map(format => {
                  const barcodePath = localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator';
                  const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${barcodePath}?format=${format}`;
                  return (
                    <RouterLink key={format} to={finalUrl} onClick={onClose} className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors text-zinc-700 dark:text-zinc-300 shadow-sm">
                      <span className="text-[10px] font-bold font-mono uppercase truncate">{format}</span>
                    </RouterLink>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Scanners */}
          <div>
            <div className="text-[11px] md:text-[12px] font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider mb-2.5 pb-2 border-b border-dashed border-zinc-300 dark:border-zinc-700 uppercase">
              {t('nav.scanGroup', 'Scanners')}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <RouterLink to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`} onClick={onClose} className="flex items-center gap-2.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-zinc-700 dark:text-zinc-300 shadow-sm group">
                <Scan className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold uppercase truncate">{t('nav.scanqr', 'Scan QR Code')}</span>
              </RouterLink>
              <RouterLink to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanbarcode'] || '/scan-barcode'}`} onClick={onClose} className="flex items-center gap-2.5 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-zinc-700 dark:text-zinc-300 shadow-sm group">
                <ScanLine className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold uppercase truncate">{t('nav.scanbarcode', 'Scan Barcode')}</span>
              </RouterLink>
            </div>
          </div>

        </div>
      )}

      {/* History & Theme Group at Bottom */}
      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
        <button onClick={onOpenHistory} className="w-full flex items-center gap-3 py-3 px-4 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 rounded-xl text-[13px] font-bold text-zinc-800 dark:text-zinc-200 shadow-sm hover:border-blue-400 transition-colors">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          {t('history.title', 'Local History')}
        </button>
        
        <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center gap-3 py-3 px-4 bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 rounded-xl text-[13px] font-bold text-zinc-800 dark:text-zinc-200 shadow-sm hover:border-amber-400 transition-colors">
          {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

    </div>
  );
}
