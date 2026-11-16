// src/pages/Pricing.jsx
// Pricing & Pro Founder Lifetime Pass for CreateMy-QR & Privacy Suite

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, ShieldCheck, Zap, ServerOff, Coffee, ArrowRight, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const { user, isPro, openAuthModal } = useAuth();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;
  const isIndo = i18n.language?.startsWith('id');

  const handleProCheckout = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (isPro) {
      return;
    }

    // Direct checkout with LemonSqueezy passing user_id in custom data
    const checkoutBase =
      import.meta.env.VITE_LEMONSQUEEZY_LIFETIME_BUY_URL ||
      'https://thismyown.lemonsqueezy.com/checkout/buy/bd84d992-e4ed-4d88-a5ff-f1ab944f5815';

    try {
      const checkoutUrl = new URL(checkoutBase);
      if (user.email) {
        checkoutUrl.searchParams.set('checkout[email]', user.email);
      }
      if (user.displayName) {
        checkoutUrl.searchParams.set('checkout[name]', user.displayName);
      }
      checkoutUrl.searchParams.set('checkout[custom][user_id]', user.uid);
      window.location.href = checkoutUrl.toString();
    } catch {
      window.location.href = checkoutBase;
    }
  };

  return (
    <>
      <main className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white overflow-hidden">
        {/* Section 1: Hero */}
        <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-bold text-sm mb-6 tracking-wider border border-purple-200 dark:border-purple-500/20 backdrop-blur-md">
              <Sparkles size={16} /> {t('static.pricing.heroBadge', 'Radically Transparent & Privacy-First')}
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-6 tracking-tight leading-[1.1]">
              {t('static.pricing.heroTitle', 'Simple Pricing, Forever Freedom')}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
              {t('static.pricing.heroSubtitle', 'Free client-side tools forever, or upgrade once to the Lifetime Privacy Suite. Zero recurring monthly lock-ins.')}
            </p>
          </div>
        </section>

        {/* Section 2: Pricing Table */}
        <section className="w-full py-12 pb-24 px-6 relative z-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Free Forever Tier */}
              <div className="bg-white dark:bg-[#0a1128] rounded-[2.5rem] p-8 lg:p-12 border border-slate-200 dark:border-[#1e2d4a] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">
                    {t('pricing.freeBadge', 'Free Forever')}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">CreateMy-QR Free</h3>
                  <p className="text-sm text-slate-500 mb-6">Full browser-side vector QR & barcode maker with zero ads.</p>
                  
                  <div className="text-5xl font-extrabold mb-8 text-slate-900 dark:text-white flex items-baseline gap-2">
                    {t('static.pricing.cost', '$0')}
                    <span className="text-lg text-slate-500 font-medium">{t('static.pricing.costPeriod', '/ forever')}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
                    {t('static.pricing.features', 'Included Features')}
                  </h4>
                  <ul className="space-y-4 mb-8">
                    <li className="flex gap-3 items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={18} className="text-emerald-500 shrink-0" /> {t('static.pricing.f1', 'Unlimited QR Generations')}
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={18} className="text-emerald-500 shrink-0" /> {t('static.pricing.f2', 'Zero Tracking & Zero Ads')}
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={18} className="text-emerald-500 shrink-0" /> {t('static.pricing.f3', 'Client-Side Processing (0 Server Uploads)')}
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={18} className="text-emerald-500 shrink-0" /> All 37 QR & Barcode standard templates
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={18} className="text-emerald-500 shrink-0" /> Local History Database & Camera Scanners
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={18} className="text-emerald-500 shrink-0" /> Support for 30 global languages
                    </li>
                  </ul>
                </div>

                <Link
                  to={langPrefix || '/'}
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm text-center transition-all block"
                >
                  {t('pricing.startFree', 'Start Creating Free')}
                </Link>
              </div>
              
              {/* Founder PRO Lifetime Pass */}
              <div className="relative bg-white dark:bg-[#0a1128] rounded-[2.5rem] p-8 lg:p-12 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 flex flex-col justify-between group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-1.5 rounded-full font-bold text-xs tracking-widest shadow-lg uppercase">
                  {t('static.pricing.recommended', 'FOUNDER LIFETIME PASS')}
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
                    <Crown size={14} className="text-amber-500" />
                    <span>Pay Once, Access Forever</span>
                  </div>
                  <h3 className="text-2xl font-black text-purple-600 dark:text-purple-400 mb-2">PRO Privacy Suite</h3>
                  <p className="text-sm text-slate-500 mb-6">Complete high-volume tools & lifetime suite access.</p>
                  
                  <div className="text-5xl font-extrabold mb-8 text-slate-900 dark:text-white flex items-baseline gap-2">
                    {isIndo ? 'Rp 249.000' : '$39'}
                    <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider">one-time / lifetime</span>
                  </div>

                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">
                    {t('pricing.proIncludes', 'Everything in Free, plus:')}
                  </h4>
                  <ul className="space-y-4 mb-8">
                    <li className="flex gap-3 items-center text-sm text-slate-800 dark:text-slate-100 font-bold">
                      <Check size={18} className="text-purple-500 shrink-0" /> Bulk CSV & Spreadsheet QR Generator (ZIP Export)
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-800 dark:text-slate-100 font-bold">
                      <Check size={18} className="text-purple-500 shrink-0" /> Print-Ready A4 & Letter Sticker Sheet PDF Studio
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-800 dark:text-slate-100 font-bold">
                      <Check size={18} className="text-purple-500 shrink-0" /> High-DPI Vector SVG & 4K Ultra Canvas Export
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-800 dark:text-slate-100 font-bold">
                      <Check size={18} className="text-purple-500 shrink-0" /> All-Access Privacy Suite (HelpMyIMG, HandleMyFile)
                    </li>
                    <li className="flex gap-3 items-center text-sm text-slate-800 dark:text-slate-100 font-bold">
                      <Check size={18} className="text-purple-500 shrink-0" /> PRO Founder Badge & Priority Fast Verification
                    </li>
                  </ul>
                </div>

                {isPro ? (
                  <div className="w-full py-4 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-center flex items-center justify-center gap-2">
                    <Check size={20} />
                    <span>Your Lifetime Pass is Active!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleProCheckout}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-purple-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={16} />
                    <span>{user ? 'Get Lifetime Access Now' : 'Sign In to Unlock Pro'}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Why Free */}
        <section className="w-full py-28 px-6 bg-slate-950 text-white border-y border-[#1e2d4a]">
          <div className="max-w-4xl mx-auto text-center">
            <ServerOff size={56} className="mx-auto mb-8 text-purple-400" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-6 leading-[1.1]">
              {t('static.pricing.whyFree', 'How is it free?')}
            </h2>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
              {t('static.pricing.whyFreeDesc', 'Because we don\'t process your files on our servers, we don\'t have massive server bills. Your device does the heavy lifting via WebAssembly.')}
            </p>
          </div>
        </section>

        {/* Section 4: Enterprise Ready */}
        <section className="w-full py-28 px-6 bg-white dark:bg-[#040814]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="p-8 md:p-10 bg-slate-50 dark:bg-[#0a1128] rounded-[2rem] border border-slate-200 dark:border-[#1e2d4a] w-full shadow-2xl">
                <div className="flex gap-6 items-center mb-8">
                  <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
                  <span className="font-extrabold text-lg md:text-xl">{t('static.pricing.ent1', 'Enterprise Compliant')}</span>
                </div>
                <div className="flex gap-6 items-center mb-8">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  <span className="font-extrabold text-lg md:text-xl">{t('static.pricing.ent2', 'Zero-Data Retention')}</span>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                  <span className="font-extrabold text-lg md:text-xl">{t('static.pricing.ent3', 'GDPR & CCPA Friendly')}</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-6 leading-[1.1]">
                {t('static.pricing.bizTitle', 'Free for Business Use')}
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.pricing.bizDesc', 'Yes, you can use CreateMy-QR for your company. In fact, our local processing architecture makes us the only platform safe enough for strict corporate environments, legal teams, and healthcare professionals.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Support Us */}
        <section className="w-full py-28 px-6 bg-gradient-to-br from-purple-900 to-indigo-950 text-white text-center border-t border-purple-800">
          <div className="max-w-3xl mx-auto">
            <Coffee size={56} className="mx-auto mb-6 text-purple-300 animate-pulse" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-6 leading-[1.1]">
              {t('static.pricing.supportTitle', 'Support the Project')}
            </h2>
            <p className="text-lg text-purple-200 leading-relaxed mb-10 font-medium">
              {t('static.pricing.supportDesc', 'We don\'t charge a subscription, but keeping the domain and development alive takes time. If CreateMy-QR saved your day, consider sharing it with your team. Word of mouth is our only marketing strategy.')}
            </p>
            <Link to={langPrefix || '/'} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 rounded-full font-extrabold text-base shadow-2xl hover:bg-slate-100 transition-transform hover:scale-105">
              <span>{t('landing.ctaButton', 'Use Tools Now')}</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
