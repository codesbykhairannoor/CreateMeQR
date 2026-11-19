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
  X,
  Key,
  Trash2,
  User,
} from 'lucide-react';
import { localizedRoutes } from '../../config/localizedRoutes';
import { QR_MENU_COLUMNS } from './MegaNav';
import { LANGS } from '../../config/site';
import { useAuth } from '../../context/AuthContext';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import DeleteAccountModal from '../modals/DeleteAccountModal';
import SignOutConfirmModal from '../modals/SignOutConfirmModal';

export default function MobileNav({
  currentLangCode,
  onClose,
  darkMode,
  setDarkMode,
  onChangeLanguage
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, isPro, signOut, openAuthModal } = useAuth();

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

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

  const initials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.[0] || 'U').toUpperCase();

  return (
    <div className="flex flex-col min-h-full bg-slate-50/95 dark:bg-[#040a18]/95 backdrop-blur-2xl text-slate-900 dark:text-white">

      {/* 0. Top Account Card (matching Screenshot_20261119_180950_Chrome.jpg) */}
      <div className="p-4 border-b border-slate-200/80 dark:border-[#102040]">
        {user ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#0c1831] border border-slate-200/80 dark:border-[#1e2d4a] shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-9 h-9 rounded-full object-cover border border-blue-500 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {initials}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {t('auth.account', 'Account')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[130px] sm:max-w-[180px]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Quick Actions Row: Key, Sign Out, Trash */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(true)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-[#102040] border border-slate-200 dark:border-[#1e2d4a] transition-all cursor-pointer"
                title={t('account.changePassword', t('auth.changePassword', 'Change Password'))}
                aria-label={t('account.changePassword', t('auth.changePassword', 'Change Password'))}
              >
                <Key className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsSignOutConfirmOpen(true)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#102040] border border-slate-200 dark:border-[#1e2d4a] transition-all cursor-pointer whitespace-nowrap"
              >
                {t('auth.signOut', 'Sign Out')}
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteAccountOpen(true)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/40 transition-all cursor-pointer"
                title={t('account.deleteAccount', t('auth.deleteAccount', 'Delete Account'))}
                aria-label={t('account.deleteAccount', t('auth.deleteAccount', 'Delete Account'))}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-900/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>{t('auth.signInToAccount', 'Sign In to Your Account')}</span>
          </button>
        )}
      </div>

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

        {/* Discord Community Option (Mobile Drawer) */}
        <a
          href="https://discord.gg/NcWY6bcVdN"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl bg-[#5865F2]/10 hover:bg-[#5865F2]/15 dark:bg-[#5865F2]/15 dark:hover:bg-[#5865F2]/25 border border-[#5865F2]/30 hover:border-[#5865F2]/60 text-slate-800 dark:text-slate-100 font-semibold text-xs flex items-center justify-between transition-all shadow-xs cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#5865F2] text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </div>
            <span>Discord Community</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#5865F2]/20 text-[#5865F2] text-[9.5px] font-bold">
              Official
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#5865F2] group-hover:translate-x-1 transition-all" />
        </a>

        {/* 4. Claim PRO Offer Banner at the Very Bottom (Hidden if already Pro) */}
        {!isPro && (
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
        )}

      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      {/* Sign Out Confirmation Modal */}
      <SignOutConfirmModal
        isOpen={isSignOutConfirmOpen}
        onClose={() => setIsSignOutConfirmOpen(false)}
        onConfirm={async () => {
          setIsSignOutConfirmOpen(false);
          onClose();
          await signOut();
        }}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
      />
    </div>
  );
}
