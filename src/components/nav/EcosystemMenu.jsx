// src/components/nav/EcosystemMenu.jsx
// 9-Dots Flyout Menu matching HandleMyFile ecosystem reference (image_2.png)
// Title Case / Capitalize styling, 0% server upload apps, desktop/mobile clients, company links, and PRO offer banner.

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  const { isPro } = useAuth();
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
        className={`w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center transition-all cursor-pointer ${isOpen
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

          {/* Bottom Bar: Mode Toggle + Discord + Claim PRO Offer Banner */}
          <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#060c1c] border-t border-slate-100 dark:border-[#102040] flex items-center justify-between gap-4">

            <div className="flex items-center gap-2.5">
              {/* Light / Dark Mode Toggle */}
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs cursor-pointer capitalize"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
                <span>{darkMode ? t('theme.light', 'Light Mode') : t('theme.dark', 'Dark Mode')}</span>
              </button>

              {/* Discord Community Button beside Dark Mode */}
              <a
                href="https://discord.gg/NcWY6bcVdN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 dark:bg-[#5865F2]/20 dark:hover:bg-[#5865F2]/30 border border-[#5865F2]/30 hover:border-[#5865F2]/60 text-xs font-semibold text-[#5865F2] transition-colors shadow-xs cursor-pointer"
                title="Discord Community"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span>Discord</span>
              </a>
            </div>

            {/* Claim PRO Offer Button (Hidden if already Pro) */}
            {!isPro && (
              <button
                type="button"
                onClick={handleClaimOffer}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 font-semibold text-xs transition-all shadow-xs cursor-pointer group"
              >
                <Crown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{t('eco.claimOffer', 'Claim PRO Offer')}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  -34%
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
