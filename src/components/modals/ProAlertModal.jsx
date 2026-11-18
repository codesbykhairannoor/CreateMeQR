// src/components/modals/ProAlertModal.jsx
// Ultra-clean Canva/Figma style Micro-Modal (Silicon Valley Standard)
// Zero walls of text, 1 icon, 1 headline, 1-line benefit, 1 primary action.

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { X, Crown, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProAlertModal() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    user,
    isProModalOpen,
    closeProModal,
    proModalFeature,
    openAuthModal,
    freeTrialsRemaining,
    signInWithGoogle
  } = useAuth();

  if (!isProModalOpen) return null;

  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  const isGuest = !user;
  const isOutOfTrials = Boolean(user && freeTrialsRemaining <= 0);
  const isBulk = Boolean(proModalFeature && /batch|bulk/i.test(proModalFeature));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={closeProModal}
        aria-hidden="true"
      />

      {/* Canva / Figma Style Compact Micro-Modal Card (~380px) */}
      <div className="relative w-full max-w-[380px] bg-white dark:bg-[#081226] border border-slate-200 dark:border-blue-900/40 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] p-6 z-10 overflow-hidden animate-scale-up text-center">

        {/* Subtle Ambient Royal Blue Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-blue-600/10 dark:bg-blue-500/15 blur-2xl pointer-events-none rounded-full" />

        {/* Minimal Close Button */}
        <button
          onClick={closeProModal}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Clean Center Icon */}
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 mb-3.5">
          {isGuest ? (
            <Sparkles className="w-6 h-6 text-blue-200" />
          ) : (
            <Crown className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Small Micro-Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/50 text-[10.5px] font-bold uppercase tracking-wider mb-2">
          <span>
            {isGuest
              ? (isBulk ? t('proMicro.guestBatchBadge', '✨ 1 Free Batch') : t('proMicro.guestBadge', '✨ 2 Free Exports'))
              : t('proMicro.userBadge', '👑 PRO Feature')}
          </span>
        </div>

        {/* Punchy Headline (1 line) */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
          {isGuest
            ? (isBulk ? t('proMicro.guestBatchTitle', 'Try 1 Free Batch Compilation') : (proModalFeature ? `Try ${proModalFeature} Free` : t('proMicro.guestTitle', 'Claim 2 Free PRO Exports')))
            : (isBulk ? t('proMicro.userBatchTitle', 'Unlock Unlimited Batch Compilations') : t('proMicro.userTitle', 'Unlock Unlimited Exports'))}
        </h3>

        {/* Clean 1-Line Benefit Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 px-1">
          {isGuest
            ? (isBulk ? t('proMicro.guestBatchDesc', 'Sign in with Google or Email to unlock 1 free batch compilation with CSV import and ZIP export.') : t('proMicro.guestDesc', 'Sign in with Google or Email to unlock 2 free vector SVG and print-ready PDF downloads.'))
            : (isBulk ? t('proMicro.userBatchDesc', "You've used your 1 free batch trial. Upgrade to PRO for unlimited CSV batches and ZIP downloads.") : t('proMicro.userDesc', "You've used your 2 free exports. Upgrade to PRO for unlimited vector SVG and PDF downloads."))}
        </p>

        {/* Action Buttons */}
        {isGuest ? (
          <div className="space-y-2 mb-2">
            {/* 1-Click Google Sign In (Primary) */}
            <button
              type="button"
              onClick={async () => {
                try {
                  closeProModal();
                  await signInWithGoogle();
                } catch (err) {
                  console.error('Google sign-in error:', err);
                }
              }}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 font-semibold text-xs sm:text-sm shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{t('proMicro.googleCta', 'Continue with Google (1-Click)')}</span>
            </button>

            {/* Email Alternative (Secondary) */}
            <button
              type="button"
              onClick={() => {
                closeProModal();
                openAuthModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('proMicro.emailCta', 'Or continue with Email / Password')}</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              closeProModal();
              navigate(`${langPrefix}/pricing`);
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 hover:from-slate-800 hover:to-blue-600 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mb-2.5"
          >
            <span>{t('proMicro.userCta', 'Upgrade to PRO — From $9.99')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Minimal Secondary Text Link */}
        <button
          type="button"
          onClick={closeProModal}
          className="w-full text-center py-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium transition-colors cursor-pointer"
        >
          {t('proMicro.later', 'Maybe later')}
        </button>

      </div>
    </div>
  );
}
