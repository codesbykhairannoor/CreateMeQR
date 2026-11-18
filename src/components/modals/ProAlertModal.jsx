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
  const { user, isProModalOpen, closeProModal, proModalFeature, openAuthModal, freeTrialsRemaining } = useAuth();

  if (!isProModalOpen) return null;

  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  const isGuest = !user;
  const isOutOfTrials = Boolean(user && freeTrialsRemaining <= 0);
  const isBulk = Boolean(proModalFeature && /batch|bulk/i.test(proModalFeature));

  const handlePrimaryAction = () => {
    closeProModal();
    if (isGuest) {
      openAuthModal();
    } else {
      navigate(`${langPrefix}/pricing`);
    }
  };

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

        {/* Primary CTA (Full Width) */}
        <button
          type="button"
          onClick={handlePrimaryAction}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 hover:from-slate-800 hover:to-blue-600 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mb-2.5"
        >
          {isGuest ? (
            <>
              <LogIn className="w-4 h-4" />
              <span>{isBulk ? t('proMicro.guestBatchCta', 'Sign In to Claim 1 Free Batch') : t('proMicro.guestCta', 'Sign In to Claim 2 Free')}</span>
            </>
          ) : (
            <>
              <span>{t('proMicro.userCta', 'Upgrade to PRO — From $9.99')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

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
