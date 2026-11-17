// src/components/modals/ProAlertModal.jsx
// Clean, high-end Pro Feature Required Alert Modal across all 30 languages.
// Highlights cross-app access to all 4 Web Apps (CreateMy-QR, HandleMyFile, HelpMyIMG, SolveMyMedia)

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { X, Crown, Check, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProAlertModal() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, isProModalOpen, closeProModal, proModalFeature, openAuthModal } = useAuth();

  if (!isProModalOpen) return null;

  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  const handleUpgrade = () => {
    closeProModal();
    if (!user) {
      openAuthModal();
    } else {
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
      
      <div className="relative w-full max-w-lg bg-white dark:bg-[#081226] border border-amber-500/40 dark:border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden animate-scale-up">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-500/15 dark:bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles size={11} className="text-amber-500" />
              <span>{t('proAlert.badge', 'PRO Feature Required')}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white capitalize">
              {proModalFeature || t('proAlert.title', 'Unlock PRO Capabilities')}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {t('proAlert.desc', 'This high-performance tool requires an active PRO membership or Founder Lifetime Pass. One subscription automatically unlocks all 4 web apps.')}
        </p>

        {/* Value Proposition Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1831] border border-slate-200/80 dark:border-[#1e2d4a] mb-6 space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-500" />
            <span>{t('proAlert.ecosystemNote', 'Connected 4-in-1 Ecosystem Included:')}</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>{t('proAlert.f1Bold', '4 Web Apps in 1:')}</strong> {t('proAlert.f1Text', 'CreateMy-QR, HandleMyFile, HelpMyIMG & SolveMyMedia.')}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>{t('proAlert.f2Bold', 'High-Res Vector SVG & PDF:')}</strong> {t('proAlert.f2Text', 'Zero rasterization limits for commercial packaging & billboards.')}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>{t('proAlert.f3Bold', '100% Client-Side Privacy:')}</strong> {t('proAlert.f3Text', 'Zero server storage, zero third-party tracking, and full ISO standard compliance.')}
              </span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleUpgrade}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm text-center shadow-lg shadow-amber-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer capitalize"
          >
            <span>{user ? t('proAlert.upgradeBtn', 'View PRO & Founder Plans') : t('proAlert.signInBtn', 'Sign In / Upgrade to PRO')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={closeProModal}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm text-center transition-colors cursor-pointer capitalize"
          >
            {t('proAlert.closeBtn', 'Maybe Later')}
          </button>
        </div>

      </div>
    </div>
  );
}
