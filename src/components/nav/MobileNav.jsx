import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, QrCode, ScanLine, Scan, Building2, ChevronUp, Moon, Sun, Clock, Link, Wifi } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { localizedRoutes } from '../../config/localizedRoutes';
import { QR_MENU_COLUMNS } from './MegaNav';

export default function MobileNav({ currentLangCode, onClose, onOpenHistory, darkMode, setDarkMode }) {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="lg:hidden flex flex-col p-3 bg-zinc-50 dark:bg-[#030914] border-b border-zinc-200 dark:border-zinc-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
      
      {/* Quick 3 buttons (Static Pages) */}
      <div className="grid grid-cols-3 gap-2 mb-3.5">
        <RouterLink to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`} onClick={onClose} className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-2.5 px-2 rounded-lg font-extrabold text-slate-800 dark:text-slate-200 text-[10.5px] uppercase transition-colors hover:border-blue-400 shadow-sm text-center tracking-tight leading-tight">
          {t('nav.scanqr', 'Scan QR Code')}
        </RouterLink>
        <RouterLink to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanbarcode'] || '/scan-barcode'}`} onClick={onClose} className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-2.5 px-2 rounded-lg font-extrabold text-slate-800 dark:text-slate-200 text-[10.5px] uppercase transition-colors hover:border-emerald-400 shadow-sm text-center tracking-tight leading-tight">
          {t('nav.scanbarcode', 'Scan Barcode')}
        </RouterLink>
        <RouterLink to={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator'}`} onClick={onClose} className="flex items-center justify-center bg-white dark:bg-[#0c1831] border border-zinc-200 dark:border-zinc-800 py-2.5 px-2 rounded-lg font-extrabold text-slate-800 dark:text-slate-200 text-[10.5px] uppercase transition-colors hover:border-purple-400 shadow-sm text-center tracking-tight leading-tight">
          {t('nav.barcode', 'Barcode Maker')}
        </RouterLink>
      </div>

      {/* Accordion: All Tools */}
      <button
        onClick={() => setOpenSection(openSection === 'all' ? null : 'all')}
        className="w-full bg-gradient-to-r from-slate-900 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white border-none py-2.5 px-3.5 rounded-lg font-extrabold text-[11px] flex items-center justify-between cursor-pointer mb-2 shadow-md uppercase tracking-wide transition-all"
      >
        <span>{t('nav.generator', 'ALL QR & BARCODE TOOLS')}</span>
        {openSection === 'all' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {openSection === 'all' && (
        <div className="flex flex-col gap-5 pt-2 pb-6 px-1 animate-fade-in-up-fast">
          
          {/* QR Tools */}
          {QR_MENU_COLUMNS.flat().map((cat, i) => (
            <div key={`qr-${i}`}>
              <div className="text-[10px] md:text-[11px] font-extrabold text-blue-600 dark:text-blue-400 tracking-wider mb-2.5 pb-2 border-b border-dashed border-zinc-300 dark:border-zinc-700 uppercase">
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
                      <span className="text-[10px] font-bold uppercase truncate">{item.label}</span>
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
