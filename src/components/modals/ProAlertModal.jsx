// src/components/modals/ProAlertModal.jsx
// Silicon Valley Canva/Figma-Style Feature-Responsive Micro-Modal
// Dynamically adapts icon, badge, headline, and benefit specifically to whichever feature triggered it
// 100% localized across all 30 languages with 1-click Google sign-in.

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Crown,
  ArrowRight,
  Sparkles,
  LogIn,
  Cpu,
  FileCode2,
  FileCode,
  Box,
  Frame,
  Barcode,
  Printer,
  Layers
} from 'lucide-react';
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
    signInWithGoogle
  } = useAuth();

  if (!isProModalOpen) return null;

  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  const isGuest = !user;

  // Detect which specific feature triggered the modal
  const detectFeatureType = (featStr = '') => {
    const s = String(featStr).toLowerCase();
    if (s.includes('dxf') || s.includes('autocad') || s.includes('laser') || s.includes('cnc')) return 'dxf';
    if (s.includes('eps') || s.includes('illustrator') || s.includes('postscript')) return 'eps';
    if (s.includes('mockup') || s.includes('3d')) return 'mockup';
    if (s.includes('frame') || s.includes('bingkai') || s.includes('cta')) return 'frame';
    if (s.includes('barcode') || s.includes('datamatrix') || s.includes('pdf417') || s.includes('aztec') || s.includes('gs1') || s.includes('bwipp') || s.includes('enterprise')) return 'barcode';
    if (s.includes('print') || s.includes('sticker') || s.includes('a4') || s.includes('cetak')) return 'print';
    if (s.includes('batch') || s.includes('bulk') || s.includes('csv')) return 'bulk';
    if (s.includes('svg') || s.includes('vektor') || s.includes('vector')) return 'svg';
    return 'default';
  };

  const featType = detectFeatureType(proModalFeature);
  const isBulk = featType === 'bulk';

  // Responsive Icon
  const renderFeatureIcon = () => {
    switch (featType) {
      case 'dxf':
        return <Cpu className="w-6 h-6 text-blue-200" />;
      case 'eps':
        return <FileCode2 className="w-6 h-6 text-indigo-200" />;
      case 'mockup':
        return <Box className="w-6 h-6 text-violet-200" />;
      case 'frame':
        return <Frame className="w-6 h-6 text-sky-200" />;
      case 'barcode':
        return <Barcode className="w-6 h-6 text-amber-200" />;
      case 'print':
        return <Printer className="w-6 h-6 text-blue-200" />;
      case 'bulk':
        return <Layers className="w-6 h-6 text-emerald-200" />;
      case 'svg':
        return <FileCode className="w-6 h-6 text-blue-200" />;
      default:
        return isGuest ? <Sparkles className="w-6 h-6 text-blue-200" /> : <Crown className="w-6 h-6 text-white" />;
    }
  };

  // Responsive Gradient Accent
  const getFeatureGradient = () => {
    switch (featType) {
      case 'dxf':
        return 'from-blue-600 to-cyan-600 shadow-blue-500/25';
      case 'eps':
        return 'from-indigo-600 to-purple-600 shadow-indigo-500/25';
      case 'mockup':
        return 'from-purple-600 to-indigo-600 shadow-purple-500/25';
      case 'frame':
        return 'from-sky-600 to-blue-600 shadow-sky-500/25';
      case 'barcode':
        return 'from-amber-600 to-orange-600 shadow-amber-500/25';
      case 'print':
        return 'from-blue-600 to-indigo-600 shadow-blue-500/25';
      case 'bulk':
        return 'from-emerald-600 to-teal-600 shadow-emerald-500/25';
      default:
        return 'from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 shadow-blue-600/20';
    }
  };

  // Responsive Feature Badge label
  const featureTag = t(`proMicro.features.${featType}.badge`, '');

  // Responsive Headlines & Descriptions
  const headline = isGuest
    ? (featType !== 'default'
        ? t(`proMicro.features.${featType}.guestTitle`, proModalFeature ? `Try ${proModalFeature} Free` : t('proMicro.guestTitle', 'Claim 2 Free PRO Exports'))
        : (isBulk ? t('proMicro.guestBatchTitle', 'Try 1 Free Batch Compilation') : t('proMicro.guestTitle', 'Claim 2 Free PRO Exports')))
    : (featType !== 'default'
        ? t(`proMicro.features.${featType}.userTitle`, t('proMicro.userTitle', 'Unlock Unlimited Exports'))
        : (isBulk ? t('proMicro.userBatchTitle', 'Unlock Unlimited Batch Compilations') : t('proMicro.userTitle', 'Unlock Unlimited Exports')));

  const description = isGuest
    ? (featType !== 'default'
        ? t(`proMicro.features.${featType}.guestDesc`, t('proMicro.guestDesc', 'Sign in with Google or Email to unlock 2 free vector SVG and print-ready PDF downloads.'))
        : (isBulk ? t('proMicro.guestBatchDesc', 'Sign in with Google or Email to unlock 1 free batch compilation with CSV import and ZIP export.') : t('proMicro.guestDesc', 'Sign in with Google or Email to unlock 2 free vector SVG and print-ready PDF downloads.')))
    : (featType !== 'default'
        ? t(`proMicro.features.${featType}.userDesc`, t('proMicro.userDesc', "You've used your 2 free exports. Upgrade to PRO for unlimited vector SVG and PDF downloads."))
        : (isBulk ? t('proMicro.userBatchDesc', "You've used your 1 free batch trial. Upgrade to PRO for unlimited CSV batches and ZIP downloads.") : t('proMicro.userDesc', "You've used your 2 free exports. Upgrade to PRO for unlimited vector SVG and PDF downloads.")));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={closeProModal}
        aria-hidden="true"
      />

      {/* Feature-Responsive Micro-Modal Card (~390px, fully responsive on mobile) */}
      <div className="relative w-full max-w-[390px] mx-auto bg-white dark:bg-[#081226] border border-slate-200 dark:border-blue-900/40 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] p-5 sm:p-6 z-10 overflow-hidden animate-scale-up text-center">

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-blue-600/15 dark:bg-blue-500/20 blur-2xl pointer-events-none rounded-full" />

        {/* Minimal Close Button */}
        <button
          onClick={closeProModal}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Responsive Center Feature Icon */}
        <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr ${getFeatureGradient()} text-white flex items-center justify-center shadow-lg mb-3`}>
          {renderFeatureIcon()}
        </div>

        {/* Micro-Badges Row */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-2">
          {/* Trial / Tier Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/50 text-[10.5px] font-bold uppercase tracking-wider">
            {isGuest
              ? (isBulk ? t('proMicro.guestBatchBadge', '✨ 1 Free Batch') : t('proMicro.guestBadge', '✨ 2 Free Exports'))
              : t('proMicro.userBadge', '👑 PRO Feature')}
          </span>

          {/* Contextual Feature Tag Badge */}
          {featureTag && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold">
              {featureTag}
            </span>
          )}
        </div>

        {/* Responsive Headline */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug px-1">
          {headline}
        </h3>

        {/* Responsive 1-2 Line Benefit Description */}
        <p className="text-[11.5px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5 sm:mb-6 px-1">
          {description}
        </p>

        {/* Action Buttons */}
        {isGuest ? (
          <div className="space-y-2 mb-2">
            {/* 1-Click Google Sign In (Primary Action) */}
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

            {/* Email Alternative (Secondary Action) */}
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

        {/* Minimal Dismiss Link */}
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

