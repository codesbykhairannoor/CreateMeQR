// src/pages/Pricing.jsx
// Pricing with Monthly Subscription & Founder Lifetime Pass for CreateMy-QR (Refined Typography)

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ShieldCheck, Zap, ServerOff, Coffee, ArrowRight, Sparkles, Crown, Calendar, Infinity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const { user, isPro, isLifetime, openAuthModal } = useAuth();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;
  const isIndo = i18n.language?.startsWith('id');

  const handleCheckout = (planType = 'lifetime') => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (isLifetime) {
      return;
    }

    if (isPro && planType === 'monthly') {
      return;
    }

    const lifetimeUrl =
      import.meta.env.VITE_LEMONSQUEEZY_LIFETIME_BUY_URL ||
      'https://thismyown.lemonsqueezy.com/checkout/buy/bd84d992-e4ed-4d88-a5ff-f1ab944f5815';

    const monthlyUrl =
      import.meta.env.VITE_LEMONSQUEEZY_MONTHLY_BUY_URL ||
      lifetimeUrl;

    const checkoutBase = planType === 'monthly' ? monthlyUrl : lifetimeUrl;

    try {
      const checkoutUrl = new URL(checkoutBase);
      if (user.email) {
        checkoutUrl.searchParams.set('checkout[email]', user.email);
      }
      if (user.displayName) {
        checkoutUrl.searchParams.set('checkout[name]', user.displayName);
      }
      checkoutUrl.searchParams.set('checkout[custom][user_id]', user.uid);
      checkoutUrl.searchParams.set('checkout[custom][plan_type]', planType);
      window.location.href = checkoutUrl.toString();
    } catch {
      window.location.href = checkoutBase;
    }
  };

  return (
    <main className="w-full flex-1 bg-[#f8fafc] dark:bg-[#040a18] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Section 1: Hero */}
      <section className="relative w-full pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/10 dark:bg-blue-700/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium text-xs mb-5 tracking-wide border border-blue-200 dark:border-blue-500/20">
            <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
            <span>{t('static.pricing.heroBadge', 'Radically Transparent & Privacy-First')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white leading-[1.15]">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-200 dark:to-blue-500">
              {t('static.pricing.heroTitle', 'Simple Pricing, Forever Freedom')}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
            {t('static.pricing.heroSubtitle', 'Free client-side tools forever, or upgrade to Pro with flexible monthly billing or one-time lifetime access.')}
          </p>
        </div>
      </section>

      {/* Section 2: 3-Tier Pricing Grid */}
      <section className="w-full py-8 pb-24 px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Tier 1: Free Forever */}
            <div className="bg-white dark:bg-[#081226] rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-[#102040] shadow-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium mb-4">
                  {t('pricing.freeBadge', 'Free Forever')}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                  CreateMy-QR Free
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mb-6 leading-relaxed">
                  Full browser-side vector QR & barcode maker with zero ads or tracking.
                </p>
                
                <div className="text-4xl font-bold mb-6 text-slate-900 dark:text-white flex items-baseline gap-1.5">
                  {t('static.pricing.cost', '$0')}
                  <span className="text-xs text-slate-400 font-normal">/ forever</span>
                </div>

                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  {t('static.pricing.features', 'Included Features')}
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t('static.pricing.f1', 'Unlimited QR Generations')}</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t('static.pricing.f2', 'Zero Tracking & Zero Ads')}</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t('static.pricing.f3', 'Client-Side Processing (0 Uploads)')}</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>All 37 standard QR & Barcode formats</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Camera scanner & local history</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>30 Global localized languages</span>
                  </li>
                </ul>
              </div>

              <Link
                to={langPrefix || '/'}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1831] dark:hover:bg-[#102040] text-slate-800 dark:text-slate-200 font-semibold text-xs text-center border border-slate-200 dark:border-[#102040] transition-colors block"
              >
                {t('pricing.startFree', 'Start Creating Free')}
              </Link>
            </div>

            {/* Tier 2: Pro Monthly Subscription */}
            <div className="bg-white dark:bg-[#081226] rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-[#102040] shadow-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-medium mb-4 border border-blue-200/60 dark:border-blue-800/40">
                  <Calendar size={13} className="text-blue-500" />
                  <span>{t('pricing.monthlyBadge', 'Flexible Monthly')}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                  PRO Monthly
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mb-6 leading-relaxed">
                  Ideal for short-term campaigns, events, and monthly project batches.
                </p>
                
                <div className="text-4xl font-bold mb-6 text-slate-900 dark:text-white flex items-baseline gap-1.5">
                  {isIndo ? 'Rp 59.000' : '$9'}
                  <span className="text-xs text-slate-400 font-normal">/ month (cancel anytime)</span>
                </div>

                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  {t('pricing.monthlyIncludes', 'Everything in Free, plus:')}
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Bulk CSV & Spreadsheet batch generator</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Print-ready A4 & US Letter sticker PDF studio</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>High-DPI Vector SVG & 4K Canvas exports</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Instant ZIP download of 1,000+ codes</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Cancel or pause subscription anytime</span>
                  </li>
                </ul>
              </div>

              {isLifetime ? (
                <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs text-center flex items-center justify-center gap-1.5">
                  <Check size={16} />
                  <span>Covered by Lifetime Pass</span>
                </div>
              ) : isPro ? (
                <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs text-center flex items-center justify-center gap-1.5">
                  <Check size={16} />
                  <span>Monthly Subscription Active</span>
                </div>
              ) : (
                <button
                  onClick={() => handleCheckout('monthly')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs text-center transition-all shadow-sm cursor-pointer"
                >
                  {user ? t('pricing.startMonthly', 'Subscribe Monthly ($9/mo)') : t('pricing.signInMonthly', 'Sign In to Subscribe')}
                </button>
              )}
            </div>

            {/* Tier 3: Founder Lifetime Pass (Best Value Highlighted) */}
            <div className="relative bg-white dark:bg-[#081226] rounded-3xl p-6 lg:p-8 border-2 border-blue-600 dark:border-blue-500 shadow-2xl shadow-blue-500/15 flex flex-col justify-between group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white px-4 py-1 rounded-full font-semibold text-[11px] tracking-wide shadow-md whitespace-nowrap">
                {t('static.pricing.recommended', 'FOUNDER LIFETIME PASS')}
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-medium mb-4 border border-blue-200 dark:border-blue-800/50">
                  <Crown size={13} className="text-amber-500" />
                  <span>Pay Once • Never Pay Again</span>
                </div>
                
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1.5">
                  Lifetime Suite Pass
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mb-6 leading-relaxed">
                  Zero monthly bills forever. Complete suite access with all future updates.
                </p>
                
                <div className="text-4xl font-bold mb-6 text-slate-900 dark:text-white flex items-baseline gap-1.5">
                  {isIndo ? 'Rp 249.000' : '$39'}
                  <span className="text-xs text-slate-400 font-normal">one-time / lifetime</span>
                </div>

                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                  {t('pricing.proIncludes', 'Everything in Pro Monthly, plus:')}
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2.5 items-start text-xs text-slate-700 dark:text-slate-200 font-medium">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Lifetime updates — never pay a recurring fee</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-700 dark:text-slate-200 font-medium">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>All-Access Privacy Suite (HelpMyIMG, HandleMyFile)</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-700 dark:text-slate-200 font-medium">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>PRO Golden Crown badge on your profile</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-slate-700 dark:text-slate-200 font-medium">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>VIP Fast Feature Requests & Priority Support</span>
                  </li>
                </ul>
              </div>

              {isLifetime ? (
                <div className="w-full py-3.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs text-center flex items-center justify-center gap-1.5">
                  <Check size={16} />
                  <span>Lifetime Pass Active</span>
                </div>
              ) : (
                <button
                  onClick={() => handleCheckout('lifetime')}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-xs text-center shadow-lg shadow-blue-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>
                    {isPro
                      ? 'Upgrade to Lifetime Pass ($39)'
                      : user
                      ? 'Get Lifetime Access ($39)'
                      : 'Sign In for Lifetime Access'}
                  </span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Why Free */}
      <section className="w-full py-20 px-6 bg-slate-900 text-white border-y border-[#102040]">
        <div className="max-w-3xl mx-auto text-center">
          <ServerOff size={44} className="mx-auto mb-6 text-blue-400" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
            {t('static.pricing.whyFree', 'How is it free?')}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {t('static.pricing.whyFreeDesc', 'Because we don\'t process your files on our servers, we don\'t have massive server bills. Your device does the heavy lifting via WebAssembly.')}
          </p>
        </div>
      </section>

      {/* Section 4: Enterprise Ready */}
      <section className="w-full py-20 px-6 bg-white dark:bg-[#040a18]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="p-6 md:p-8 bg-slate-50 dark:bg-[#081226] rounded-2xl border border-slate-200 dark:border-[#102040] w-full shadow-lg">
              <div className="flex gap-4 items-center mb-6">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.7)] shrink-0"></div>
                <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">{t('static.pricing.ent1', 'Enterprise Compliant')}</span>
              </div>
              <div className="flex gap-4 items-center mb-6">
                <div className="w-3.5 h-3.5 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.7)] shrink-0"></div>
                <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">{t('static.pricing.ent2', 'Zero-Data Retention')}</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)] shrink-0"></div>
                <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">{t('static.pricing.ent3', 'GDPR & CCPA Friendly')}</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
              {t('static.pricing.bizTitle', 'Free for Business Use')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {t('static.pricing.bizDesc', 'Yes, you can use CreateMy-QR for your company. In fact, our local processing architecture makes us the only platform safe enough for strict corporate environments, legal teams, and healthcare professionals.')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Support Us */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-slate-950 via-[#081226] to-[#0c1831] text-white text-center border-t border-[#102040]">
        <div className="max-w-2xl mx-auto">
          <Coffee size={44} className="mx-auto mb-5 text-blue-400" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
            {t('static.pricing.supportTitle', 'Support the Project')}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 font-normal">
            {t('static.pricing.supportDesc', 'We don\'t charge a subscription for standard tools, but keeping the domain and development alive takes time. If CreateMy-QR saved your day, consider sharing it with your team.')}
          </p>
          <Link to={langPrefix || '/'} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-semibold text-sm shadow-xl hover:bg-slate-100 transition-transform hover:scale-105">
            <span>{t('landing.ctaButton', 'Use Tools Now')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}