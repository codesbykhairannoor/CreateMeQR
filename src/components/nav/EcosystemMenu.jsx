// src/components/nav/EcosystemMenu.jsx
// 9-Dots Flyout Menu matching HandleMyFile ecosystem reference (image_2.png)
// Title Case / Capitalize styling, 0% server upload apps, desktop/mobile clients, company links, and PRO offer banner.

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  QrCode,
  FileText,
  Image,
  Video,
  Monitor,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Sparkles,
  FileCheck,
  Sun,
  Moon,
  Crown,
  ArrowRight
} from 'lucide-react';

export default function EcosystemMenu({ currentLangCode, darkMode, setDarkMode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleClaimOffer = () => {
    setIsOpen(false);
    navigate(`${langPrefix}/pricing`);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* 9-Dots Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open 4-in-1 Ecosystem Menu"
        aria-expanded={isOpen}
        title="4 Web Apps Ecosystem"
        className={`w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
          isOpen
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
            : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100/90 dark:bg-[#0c1831] hover:bg-blue-50 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-slate-800'
        }`}
      >
        {/* 9-dots SVG (3x3 grid) */}
        <svg
          className="w-4 h-4 md:w-4.5 md:h-4.5"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2.5" r="1.5" />
          <circle cx="8" cy="2.5" r="1.5" />
          <circle cx="13.5" cy="2.5" r="1.5" />
          <circle cx="2.5" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="13.5" cy="8" r="1.5" />
          <circle cx="2.5" cy="13.5" r="1.5" />
          <circle cx="8" cy="13.5" r="1.5" />
          <circle cx="13.5" cy="13.5" r="1.5" />
        </svg>
      </button>

      {/* 9-Dots Dropdown Flyout Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-[620px] max-w-[calc(100vw-2rem)] bg-white dark:bg-[#081226] rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-[#102040] z-50 overflow-hidden animate-fade-in-up">
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: 4 Ecosystem Web Apps + Desktop Clients (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Ecosystem Web Apps */}
              <div>
                <h4 className="text-xs font-semibold capitalize text-rose-500 dark:text-rose-400 tracking-normal mb-3 flex items-center gap-1.5">
                  <span>{t('eco.appsTitle', 'Ecosystem Web Apps (0% Server Upload)')}</span>
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* 1. CreateMy-QR (Active) */}
                  <div className="p-2.5 rounded-2xl bg-blue-50/70 dark:bg-[#0c1831] border border-blue-200 dark:border-blue-800/60 flex items-start gap-2.5 shadow-xs">
                    <img
                      src="/logoqr.png"
                      alt="CreateMy-QR"
                      className="w-8 h-8 rounded-xl object-contain shadow-xs shrink-0 bg-white dark:bg-slate-900 p-0.5 border border-blue-200/60 dark:border-blue-800/60"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          CreateMy-QR
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold capitalize bg-blue-600 text-white shadow-xs">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        Vector QR & Barcodes
                      </p>
                    </div>
                  </div>

                  {/* 2. HelpMyIMG */}
                  <a
                    href="https://helpmyimg.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0c1831]/60 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-[#1e2d4a] flex items-start gap-2.5 transition-colors group shadow-xs"
                  >
                    <img
                      src="/ecosystem/helpmyimg.png"
                      alt="HelpMyIMG"
                      className="w-8 h-8 rounded-xl object-contain shadow-xs shrink-0 bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-[#1e2d4a]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          HelpMyIMG
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        AI Photo & Local Editor
                      </p>
                    </div>
                  </a>

                  {/* 3. SolveMyMedia */}
                  <a
                    href="https://solvemymedia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0c1831]/60 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-[#1e2d4a] flex items-start gap-2.5 transition-colors group shadow-xs"
                  >
                    <img
                      src="/ecosystem/solvemymedia.png"
                      alt="SolveMyMedia"
                      className="w-8 h-8 rounded-xl object-contain shadow-xs shrink-0 bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-[#1e2d4a]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          SolveMyMedia
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        Lossless Video & Audio
                      </p>
                    </div>
                  </a>

                  {/* 4. HandleMyFile */}
                  <a
                    href="https://handlemyfile.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0c1831]/60 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-[#1e2d4a] flex items-start gap-2.5 transition-colors group shadow-xs"
                  >
                    <img
                      src="/ecosystem/handlemyfile.png"
                      alt="HandleMyFile"
                      className="w-8 h-8 rounded-xl object-contain shadow-xs shrink-0 bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-[#1e2d4a]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          HandleMyFile
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        PDF & Document Studio
                      </p>
                    </div>
                  </a>

                </div>
              </div>

              {/* Desktop & Mobile Clients */}
              <div>
                <h4 className="text-xs font-semibold capitalize text-rose-500 dark:text-rose-400 tracking-normal mb-3">
                  <span>{t('eco.clientsTitle', 'Desktop & Mobile Clients')}</span>
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#0c1831]/60 border border-slate-200/80 dark:border-[#1e2d4a] flex items-center gap-2.5 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          Windows 64-bit
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                          Soon
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        100% Offline .exe
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#0c1831]/60 border border-slate-200/80 dark:border-[#1e2d4a] flex items-center gap-2.5 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          Android App
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                          Soon
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        Zero-Upload APK
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Company & Trust (5 cols) */}
            <div className="md:col-span-5 md:border-l md:border-slate-100 md:dark:border-[#102040] md:pl-6 space-y-2.5">
              <h4 className="text-xs font-semibold capitalize text-rose-500 dark:text-rose-400 tracking-normal mb-3">
                <span>{t('eco.companyTitle', 'Company & Trust')}</span>
              </h4>

              {/* 1. Pricing & Plans */}
              <RouterLink
                to={`${langPrefix}/pricing`}
                onClick={handleLinkClick}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0c1831]/60 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-[#1e2d4a] flex items-start gap-2.5 transition-colors group shadow-xs block"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {t('eco.pricing', 'Pricing & Plans')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Starter, Pro & Founder Pass
                  </div>
                </div>
              </RouterLink>

              {/* 2. Zero-Server Privacy */}
              <RouterLink
                to={`${langPrefix}/security`}
                onClick={handleLinkClick}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0c1831]/60 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-[#1e2d4a] flex items-start gap-2.5 transition-colors group shadow-xs block"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {t('eco.privacy', 'Zero-Server Privacy')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    100% Client-Side WebAssembly
                  </div>
                </div>
              </RouterLink>

              {/* 3. About Us & Mission */}
              <RouterLink
                to={`${langPrefix}/about`}
                onClick={handleLinkClick}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0c1831]/60 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-[#1e2d4a] flex items-start gap-2.5 transition-colors group shadow-xs block"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {t('eco.about', 'About Us & Mission')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Our local privacy mission
                  </div>
                </div>
              </RouterLink>

              {/* 4. Terms & Legal */}
              <RouterLink
                to={`${langPrefix}/terms`}
                onClick={handleLinkClick}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#0c1831]/60 dark:hover:bg-[#102040] border border-slate-200/80 dark:border-[#1e2d4a] flex items-start gap-2.5 transition-colors group shadow-xs block"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {t('eco.terms', 'Terms & Legal')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Service terms & transparency
                  </div>
                </div>
              </RouterLink>

            </div>

          </div>

          {/* Bottom Bar: Mode Toggle + Claim PRO Offer Banner (image_2.png) */}
          <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#060c1c] border-t border-slate-100 dark:border-[#102040] flex items-center justify-between gap-4">
            
            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs cursor-pointer capitalize"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
              <span>{darkMode ? t('theme.light', 'Light Mode') : t('theme.dark', 'Dark Mode')}</span>
            </button>

            {/* Claim PRO Offer Button */}
            <button
              type="button"
              onClick={handleClaimOffer}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold text-xs transition-all shadow-xs cursor-pointer group"
            >
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('eco.claimOffer', 'Claim PRO Offer')}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold">
                -34%
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

          </div>

        </div>
      )}
    </div>
  );
}
