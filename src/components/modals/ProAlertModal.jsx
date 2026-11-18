// src/components/modals/ProAlertModal.jsx
// Clean, high-end Silicon Valley Standard PRO & Freemium Modal (CreateMy-QR Royal Blue & Slate Brand)
// Supports Free 2x Trial upon Sign In & Unlimited PRO Access across all 4 Web Apps.

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { X, Crown, Check, ArrowRight, Sparkles, Layers, ShieldCheck, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProAlertModal() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, isProModalOpen, closeProModal, proModalFeature, openAuthModal, freeTrialsRemaining, FREE_TRIALS_MAX } = useAuth();

  if (!isProModalOpen) return null;

  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  const isGuest = !user;
  const isOutOfTrials = Boolean(user && freeTrialsRemaining <= 0);

  const handlePrimaryAction = () => {
    closeProModal();
    if (isGuest) {
      openAuthModal();
    } else {
      navigate(`${langPrefix}/pricing`);
    }
  };

  const handleSecondaryAction = () => {
    closeProModal();
    if (isGuest) {
      navigate(`${langPrefix}/pricing`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={closeProModal} 
        aria-hidden="true" 
      />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-[#081226] border border-slate-200 dark:border-blue-900/40 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] p-6 sm:p-8 z-10 overflow-hidden animate-scale-up">
        
        {/* Subtle Ambient Top Glow in Brand Royal Blue */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-blue-600/10 dark:bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={closeProModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
            {isGuest ? <Sparkles className="w-6 h-6 text-blue-200" /> : <Crown className="w-6 h-6 text-white" />}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-500/30 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles size={11} className="text-blue-600 dark:text-blue-400" />
              <span>
                {isGuest 
                  ? t('proAlert.guestBadge', 'Claim 2 Free Trial Exports') 
                  : isOutOfTrials 
                    ? t('proAlert.outOfTrialsBadge', 'PRO Membership Required')
                    : t('proAlert.badge', 'PRO Feature Required')}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white capitalize">
              {isGuest
                ? (proModalFeature ? `Try ${proModalFeature} Free` : t('proAlert.guestTitle', 'Claim 2 Free PRO Exports'))
                : isOutOfTrials
                  ? t('proAlert.outOfTrialsTitle', "You've Used Your 2 Free Exports")
                  : (proModalFeature || t('proAlert.title', 'Unlock PRO Capabilities'))}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {isGuest
            ? t('proAlert.guestDesc', 'Create a free account or sign in with Google to immediately claim 2 free vector SVG and print-ready sticker PDF exports. 100% free, no credit card required.')
            : isOutOfTrials
              ? t('proAlert.outOfTrialsDesc', "You have used your 2 free trial exports! Upgrade to PRO or Founder Lifetime for unlimited vector SVG, PDF exports, and bulk compilation across all 4 web apps.")
              : t('proAlert.desc', 'This high-performance tool requires an active PRO membership or Founder Lifetime Pass. One subscription automatically unlocks all 4 web apps.')}
        </p>

        {/* Value Proposition Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1831] border border-slate-200/80 dark:border-[#1e2d4a] mb-6 space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t('proAlert.ecosystemNote', 'Connected 4-in-1 Ecosystem Included:')}</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>{t('proAlert.f1Bold', '4 Web Apps in 1:')}</strong> {t('proAlert.f1Text', 'CreateMy-QR, HandleMyFile, HelpMyIMG & SolveMyMedia.')}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>{t('proAlert.f2Bold', 'High-Res Vector SVG & PDF:')}</strong> {t('proAlert.f2Text', 'Zero rasterization limits for commercial packaging, sticker sheets & billboards.')}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>{t('proAlert.f3Bold', '100% Client-Side Privacy:')}</strong> {t('proAlert.f3Text', 'Zero server storage, zero third-party tracking, and permanent non-expiring static codes.')}
              </span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 hover:from-slate-800 hover:to-blue-600 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white font-semibold text-xs sm:text-sm text-center shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer capitalize"
          >
            {isGuest ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>{t('proAlert.signInToClaimBtn', 'Sign In to Claim 2 Free Exports')}</span>
              </>
            ) : (
              <>
                <span>{t('proAlert.upgradeBtn', 'View PRO & Founder Plans')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={isGuest ? handleSecondaryAction : closeProModal}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm text-center transition-colors cursor-pointer capitalize"
          >
            {isGuest ? t('proAlert.viewPlansBtn', 'View Plans') : t('proAlert.closeBtn', 'Maybe Later')}
          </button>
        </div>

      </div>
    </div>
  );
}
