import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, QrCode, ScanLine, Scan, Building2, ChevronUp, Moon, Sun } from 'lucide-react';
import { localizedRoutes } from '../../config/localizedRoutes';
import { QR_CATEGORIES, BARCODE_CATEGORIES } from './MegaNav';

export default function MobileNav({ currentLangCode, onClose, darkMode, setDarkMode }) {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="lg:hidden flex flex-col gap-2 p-4">
      {/* 1. Generate QR */}
      <div className="flex flex-col border-b border-zinc-100 dark:border-zinc-800 pb-2">
        <button onClick={() => toggleSection('qr')} className="flex items-center justify-between py-3 text-[15px] font-bold text-zinc-800 dark:text-zinc-200">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            {t('nav.generator', 'Generate QR')}
          </div>
          {openSection === 'qr' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSection === 'qr' && (
          <div className="flex flex-col gap-4 pl-7 pr-2 pt-2 pb-4 animate-fade-in-up-fast">
            {QR_CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">{t(cat.title)}</h4>
                <div className="grid grid-cols-1 gap-1">
                  {cat.items.map(item => {
                    const Icon = item.icon;
                    const path = item.id === 'url' ? '/' : `/${item.id}`;
                    const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || path;
                    const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedPath}`;
                    
                    return (
                      <a key={item.id} href={finalUrl} onClick={onClose} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-[#102040] transition-colors text-zinc-700 dark:text-zinc-300">
                        <Icon className="w-4 h-4 opacity-70" />
                        <span className="text-[13px] font-bold">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Scan QR */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2">
        <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`} onClick={onClose} className="flex items-center gap-2 py-3 text-[15px] font-bold text-zinc-800 dark:text-zinc-200">
          <Scan className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          {t('nav.scan', 'Scan QR')}
        </a>
      </div>

      {/* 3. Barcode Maker */}
      <div className="flex flex-col border-b border-zinc-100 dark:border-zinc-800 pb-2">
        <button onClick={() => toggleSection('barcode')} className="flex items-center justify-between py-3 text-[15px] font-bold text-zinc-800 dark:text-zinc-200">
          <div className="flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {t('nav.barcode', 'Barcode Maker')}
          </div>
          {openSection === 'barcode' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSection === 'barcode' && (
          <div className="flex flex-col gap-4 pl-7 pr-2 pt-2 pb-4 animate-fade-in-up-fast">
            {BARCODE_CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">{t(cat.title)}</h4>
                <div className="grid grid-cols-2 gap-1">
                  {cat.items.map(format => {
                    const barcodePath = localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator';
                    const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${barcodePath}?format=${format}`;
                    return (
                      <a key={format} href={finalUrl} onClick={onClose} className="flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-zinc-700 dark:text-zinc-300">
                        <span className="text-[13px] font-bold font-mono">{format}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Company */}
      <div className="flex flex-col border-b border-zinc-100 dark:border-zinc-800 pb-2">
        <button onClick={() => toggleSection('company')} className="flex items-center justify-between py-3 text-[15px] font-bold text-zinc-800 dark:text-zinc-200">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            {t('nav.company', 'Company')}
          </div>
          {openSection === 'company' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSection === 'company' && (
          <div className="flex flex-col gap-1 pl-7 pr-2 pt-2 pb-4 animate-fade-in-up-fast">
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/about`} onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors">{t('nav.about', 'About Us')}</a>
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/compare`} onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors">{t('nav.compare', 'Compare')}</a>
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/privacy`} onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors">{t('nav.privacy', 'Privacy Policy')}</a>
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/terms`} onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors">{t('nav.terms', 'Terms of Service')}</a>
          </div>
        )}
      </div>

      {/* 5. Theme Toggle */}
      <div className="pb-2 mt-2">
        <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center gap-3 py-3 text-[15px] font-bold text-zinc-800 dark:text-zinc-200">
          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          </div>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}
