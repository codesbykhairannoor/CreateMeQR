// src/components/nav/MobileNav.jsx
// Mobile Navigation Drawer matching image_3.png reference:
// Search bar, Popular Tools grid, Categorized QR tools in Capitalize,
// Language switcher & Dark mode row at bottom, and Claim PRO Offer banner at the very bottom.

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Crown,
  ArrowRight,
  Globe,
  Link,
  Wifi,
  Contact,
  Barcode,
  QrCode,
  Scan,
  FileText,
  MessageCircle,
  X
} from 'lucide-react';
import { localizedRoutes } from '../../config/localizedRoutes';
import { QR_MENU_COLUMNS } from './MegaNav';
import { LANGS } from '../../config/site';

export default function MobileNav({
  currentLangCode,
  onClose,
  darkMode,
  setDarkMode,
  onChangeLanguage
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  // Flat list of all tools for instant search
  const allTools = useMemo(() => {
    const list = [];
    QR_MENU_COLUMNS.flat().forEach(cat => {
      cat.items.forEach(item => {
        list.push({
          ...item,
          categoryTitle: cat.title,
          categoryFallback: cat.fallback
        });
      });
    });
    return list;
  }, []);

  // Filtered tools based on search
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allTools.filter(
      item =>
        item.label.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.categoryFallback && item.categoryFallback.toLowerCase().includes(q))
    );
  }, [allTools, searchQuery]);

  // Popular Tools definition (8 curated top tools)
  const popularTools = [
    {
      id: 'url',
      label: 'URL / Link',
      icon: Link,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      id: 'wifi',
      label: 'Wi-Fi Network',
      icon: Wifi,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      id: 'vcard',
      label: 'vCard Contact',
      icon: Contact,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    },
    {
      id: 'barcode',
      label: '1D Barcode Maker',
      icon: Barcode,
      path: '/barcode-generator',
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
    },
    {
      id: 'scanqr',
      label: 'Scan QR Code',
      icon: QrCode,
      path: '/scan-qr',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      id: 'scanbarcode',
      label: 'Scan Barcode',
      icon: Scan,
      path: '/scan-barcode',
      color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20'
    },
    {
      id: 'pdf',
      label: 'PDF Document',
      icon: FileText,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Chat',
      icon: MessageCircle,
      color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
    }
  ];

  const handleClaimOffer = () => {
    onClose();
    navigate(`${langPrefix}/pricing`);
  };

  const currentLang = LANGS.find(l => l.code === (i18n.language?.split('-')[0] || currentLangCode)) || LANGS[0];

  return (
    <div className="flex flex-col min-h-full bg-slate-50/95 dark:bg-[#040a18]/95 backdrop-blur-2xl text-slate-900 dark:text-white">

      {/* 1. Search Bar (matching image_3.png) */}
      <div className="p-4 border-b border-slate-200/80 dark:border-[#102040]">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] shadow-xs focus-within:border-blue-500 transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('nav.searchPlaceholder', 'Search 30+ QR tools (e.g. url, wifi, vcard)...')}
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

        {/* If user is searching: Show filtered results */}
        {searchQuery.trim() ? (
          <div>
            <h3 className="text-xs font-semibold capitalize text-slate-500 dark:text-slate-400 mb-3">
              {t('nav.searchResults', 'Search Results')} ({filteredTools.length})
            </h3>
            {filteredTools.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                {t('nav.noResults', 'No tools found matching')} "{searchQuery}"
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {filteredTools.map(item => {
                  const Icon = item.icon;
                  const defaultPath = item.id === 'url' ? '/url-qr-code-generator' : `/${item.id}`;
                  const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || defaultPath;
                  const finalUrl = `${langPrefix}${localizedPath}`;

                  return (
                    <RouterLink
                      key={item.id}
                      to={finalUrl}
                      onClick={onClose}
                      className="p-3 rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] flex items-center gap-2.5 hover:border-blue-500 transition-colors shadow-xs group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white capitalize truncate">
                        {item.label}
                      </span>
                    </RouterLink>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Popular Tools (image_3.png) */}
            <div>
              <h3 className="text-xs font-semibold capitalize text-slate-500 dark:text-slate-400 mb-3 tracking-normal">
                {t('nav.popularTools', 'Popular Tools')}
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {popularTools.map(tool => {
                  const Icon = tool.icon;
                  const defaultPath = tool.path || (tool.id === 'url' ? '/url-qr-code-generator' : `/${tool.id}`);
                  const localizedPath = tool.path
                    ? (localizedRoutes[currentLangCode]?.[tool.id] || tool.path)
                    : (localizedRoutes[currentLangCode]?.[tool.id] || defaultPath);
                  const finalUrl = `${langPrefix}${localizedPath}`;

                  return (
                    <RouterLink
                      key={tool.id}
                      to={finalUrl}
                      onClick={onClose}
                      className="p-3 rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200/90 dark:border-[#1e2d4a] flex items-center gap-2.5 hover:border-blue-500 transition-colors shadow-xs group"
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${tool.color} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white capitalize truncate">
                        {tool.label}
                      </span>
                    </RouterLink>
                  );
                })}
              </div>
            </div>

            {/* All QR Tools Accordion (image_3.png) */}
            <div>
              <h3 className="text-xs font-semibold capitalize text-slate-500 dark:text-slate-400 mb-3 tracking-normal">
                {t('nav.allQrTools', 'All QR & Barcode Tools')}
              </h3>

              <div className="space-y-2">
                {QR_MENU_COLUMNS.flat().map((cat, idx) => {
                  const isOpen = openCategory === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200/90 dark:border-[#1e2d4a] overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenCategory(isOpen ? null : idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-[#102040]/50 transition-colors"
                      >
                        <span className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                          {t(cat.title, cat.fallback)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            {cat.items.length}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-blue-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-3 pt-0 border-t border-slate-100 dark:border-[#102040] grid grid-cols-2 gap-2 mt-2">
                          {cat.items.map(item => {
                            const Icon = item.icon;
                            const defaultPath = item.id === 'url' ? '/url-qr-code-generator' : `/${item.id}`;
                            const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || defaultPath;
                            const finalUrl = `${langPrefix}${localizedPath}`;

                            return (
                              <RouterLink
                                key={item.id}
                                to={finalUrl}
                                onClick={onClose}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-[#102040] transition-colors group"
                              >
                                <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize truncate">
                                  {item.label}
                                </span>
                              </RouterLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>

      {/* 3. Bottom Controls Row: Language Picker & Dark Mode (matching image_3.png) */}
      <div className="p-4 border-t border-slate-200/80 dark:border-[#102040] space-y-3 bg-white/70 dark:bg-[#081226]/70">

        {/* Language Selection Modal Sheet inside drawer */}
        {showLangPicker ? (
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] shadow-lg animate-fade-in-up">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-[#102040]">
              <span className="text-xs font-bold text-slate-900 dark:text-white capitalize flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>{t('static.languages.heroTitle', 'Select Language (30)')}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowLangPicker(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Filter language..."
              value={langSearch}
              onChange={(e) => setLangSearch(e.target.value)}
              className="w-full mb-2 p-2 rounded-xl bg-slate-100 dark:bg-[#081226] text-xs outline-none text-slate-900 dark:text-white"
            />

            <div className="max-h-48 overflow-y-auto space-y-1">
              {LANGS.filter(l =>
                !langSearch ||
                l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
                l.code.toLowerCase().includes(langSearch.toLowerCase())
              ).map(lang => {
                const isActive = currentLangCode === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setShowLangPicker(false);
                      if (onChangeLanguage) onChangeLanguage(lang.code);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${isActive
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#102040]'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    <span className="font-mono text-[10px] uppercase opacity-75">{lang.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {/* Language Selector Button */}
            <button
              type="button"
              onClick={() => setShowLangPicker(true)}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-400 flex items-center justify-between shadow-xs cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-sm">{currentLang.flag}</span>
                <span className="truncate">{currentLang.label}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {/* Dark Mode Button */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-400 flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors capitalize"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('theme.light', 'Light Mode')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t('theme.dark', 'Dark Mode')}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* 4. Claim PRO Offer Banner at the Very Bottom (image_3.png) */}
        <button
          type="button"
          onClick={handleClaimOffer}
          className="w-full py-3 px-4 rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 font-semibold text-xs flex items-center justify-between transition-all shadow-xs cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="capitalize">{t('eco.claimOffer', 'Claim PRO Offer')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-bold">
              -34%
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>

    </div>
  );
}
