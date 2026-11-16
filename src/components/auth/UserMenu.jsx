// src/components/auth/UserMenu.jsx
// User Avatar, Pro status indicator, and Authentication Dropdown (CreateMy-QR Blue/Slate Brand)

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { User, LogOut, Sparkles, Crown, ChevronDown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserMenu({ currentLangCode, onOpenHistory }) {
  const { user, isPro, isLifetime, signOut, openAuthModal } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={openAuthModal}
        className="flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-xs md:text-sm transition-all shadow-md shadow-blue-900/20 active:scale-95 cursor-pointer whitespace-nowrap"
      >
        <User className="w-4 h-4" />
        <span>{t('auth.signInBtn', 'Sign In')}</span>
      </button>
    );
  }

  const initials = user.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (user.email?.[0] || 'U').toUpperCase();

  const handleUpgrade = () => {
    setIsOpen(false);
    const prefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
    navigate(`${prefix}/pricing`);
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-1 md:pr-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-[#0c1831] border border-slate-200 dark:border-[#102040] transition-all cursor-pointer"
        aria-label="User Menu"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border border-blue-500"
          />
        ) : (
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {initials}
          </div>
        )}

        {isPro && (
          <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-semibold tracking-wider uppercase shadow-xs">
            <Crown className="w-3 h-3" /> {isLifetime ? 'Lifetime' : 'PRO'}
          </span>
        )}

        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#081226] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#102040] py-2 z-50 animate-fade-in-up">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-[#102040]">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {user.displayName || 'QR Creator'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
            
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Plan</span>
              {isPro ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Crown className="w-3 h-3" /> {isLifetime ? 'PRO Lifetime' : 'PRO Monthly'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Free Tier
                </span>
              )}
            </div>
          </div>

          {/* Upgrade CTA if Free */}
          {!isPro && (
            <div className="p-2 border-b border-slate-100 dark:border-[#102040]">
              <button
                onClick={handleUpgrade}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-900/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upgrade to PRO</span>
              </button>
            </div>
          )}

          {/* Saved QR History Item */}
          <div className="p-1 border-b border-slate-100 dark:border-[#102040]">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenHistory?.();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#102040] rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{t('history.title', 'Saved QR History')}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Local</span>
            </button>
          </div>

          {/* Actions */}
          <div className="p-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('auth.signOut', 'Sign Out')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
