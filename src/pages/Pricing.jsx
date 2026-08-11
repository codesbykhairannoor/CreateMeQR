import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Check, X, ShieldCheck, Zap, ServerOff, Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;

  return (
    <>
      <Helmet>
        <title>{`${t('appTitle', 'CreateMy-QR')} | ${t('static.pricing.seoTitle', '100% Free Pricing')}`}</title>
      </Helmet>
      
      <main className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white overflow-hidden">
        
        {/* Section 1: Hero */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-bold text-sm mb-8 tracking-wider border border-purple-200 dark:border-purple-500/20 backdrop-blur-md">
              <Zap size={16} /> {t('static.pricing.heroBadge', 'Radically Free')}
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-8 tracking-tight leading-[1.1]">
              {t('static.pricing.heroTitle', 'Pricing')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.pricing.heroSubtitle', 'The best things in life are free. Zero Subscriptions. Zero Limits.')}
            </p>
          </div>
        </section>

        {/* Section 2: Pricing Table */}
        <section className="w-full py-24 px-6 relative z-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Competitor */}
              <div className="bg-white dark:bg-[#0a1128] rounded-[2.5rem] p-10 lg:p-12 border border-slate-200 dark:border-[#1e2d4a] shadow-xl opacity-90 hover:opacity-100 transition-opacity">
                <h3 className="text-2xl font-extrabold text-slate-500 mb-6">{t('static.pricing.compTitle', 'Traditional Cloud Tools')}</h3>
                <div className="text-5xl font-extrabold mb-10 text-slate-800 dark:text-slate-200">
                  {t('static.pricing.compCost', '$20')}
                  <span className="text-xl text-slate-500 font-medium">{t('static.pricing.compPeriod', '/mo')}</span>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-center text-slate-500 font-medium">
                    <X size={24} className="text-rose-500 shrink-0" /> {t('static.pricing.comp1', 'Data uploaded to their servers')}
                  </li>
                  <li className="flex gap-4 items-center text-slate-500 font-medium">
                    <X size={24} className="text-rose-500 shrink-0" /> {t('static.pricing.comp2', 'File size limits on free tier')}
                  </li>
                  <li className="flex gap-4 items-center text-slate-500 font-medium">
                    <X size={24} className="text-rose-500 shrink-0" /> {t('static.pricing.comp3', 'Requires email registration')}
                  </li>
                  <li className="flex gap-4 items-center text-slate-500 font-medium">
                    <X size={24} className="text-rose-500 shrink-0" /> {t('static.pricing.comp4', 'Slow network processing')}
                  </li>
                </ul>
              </div>
              
              {/* CreateMy-QR */}
              <div className="relative bg-white dark:bg-[#0a1128] rounded-[2.5rem] p-10 lg:p-12 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 hover:-translate-y-2 transition-transform duration-500 group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-1.5 rounded-full font-bold text-sm tracking-widest shadow-lg">
                  {t('static.pricing.recommended', 'RECOMMENDED')}
                </div>
                <h3 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mb-6">CreateMy-QR</h3>
                <div className="text-6xl font-extrabold mb-10 text-slate-900 dark:text-white flex items-baseline gap-2">
                  {t('static.pricing.cost', '$0')}
                  <span className="text-xl text-slate-500 font-medium">{t('static.pricing.costPeriod', '/ forever')}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                  {t('static.pricing.features', 'Included Features')}
                </h4>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-center text-slate-700 dark:text-slate-200 font-bold">
                    <Check size={24} className="text-purple-500 shrink-0" /> {t('static.pricing.f1', 'Unlimited QR Generations')}
                  </li>
                  <li className="flex gap-4 items-center text-slate-700 dark:text-slate-200 font-bold">
                    <Check size={24} className="text-purple-500 shrink-0" /> {t('static.pricing.f2', 'Zero Tracking & Zero Ads')}
                  </li>
                  <li className="flex gap-4 items-center text-slate-700 dark:text-slate-200 font-bold">
                    <Check size={24} className="text-purple-500 shrink-0" /> {t('static.pricing.f3', 'Client-Side Processing')}
                  </li>
                  <li className="flex gap-4 items-center text-slate-700 dark:text-slate-200 font-bold">
                    <Check size={24} className="text-purple-500 shrink-0" /> {t('static.pricing.f4', 'Local History Database')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Why Free */}
        <section className="w-full py-32 px-6 bg-slate-950 text-white mt-12 border-y border-[#1e2d4a]">
          <div className="max-w-4xl mx-auto text-center">
            <ServerOff size={64} className="mx-auto mb-10 text-purple-400" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.pricing.whyFree', 'How is it free?')}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {t('static.pricing.whyFreeDesc', 'Because we don\'t process your files on our servers, we don\'t have massive server bills. Your device does the heavy lifting via WebAssembly.')}
            </p>
          </div>
        </section>

        {/* Section 4: Enterprise Ready */}
        <section className="w-full py-32 px-6 bg-white dark:bg-[#040814]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="p-10 bg-slate-50 dark:bg-[#0a1128] rounded-[2rem] border border-slate-200 dark:border-[#1e2d4a] w-full shadow-2xl">
                <div className="flex gap-6 items-center mb-8">
                  <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
                  <span className="font-extrabold text-xl">{t('static.pricing.ent1', 'Enterprise Compliant')}</span>
                </div>
                <div className="flex gap-6 items-center mb-8">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  <span className="font-extrabold text-xl">{t('static.pricing.ent2', 'Zero-Data Retention')}</span>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                  <span className="font-extrabold text-xl">{t('static.pricing.ent3', 'GDPR & CCPA Friendly')}</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
                {t('static.pricing.bizTitle', 'Free for Business Use')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.pricing.bizDesc', 'Yes, you can use CreateMy-QR for your company. In fact, our local processing architecture makes us the only platform safe enough for strict corporate environments, legal teams, and healthcare professionals.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Support Us */}
        <section className="w-full py-32 px-6 bg-gradient-to-br from-purple-900 to-indigo-950 text-white text-center border-t border-purple-800">
          <div className="max-w-3xl mx-auto">
            <Coffee size={64} className="mx-auto mb-8 text-purple-300 animate-pulse" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.pricing.supportTitle', 'Support the Project')}
            </h2>
            <p className="text-xl text-purple-200 leading-relaxed mb-12 font-medium">
              {t('static.pricing.supportDesc', 'We don\'t charge a subscription, but keeping the domain and development alive takes time. If CreateMy-QR saved your day, consider sharing it with your team. Word of mouth is our only marketing strategy.')}
            </p>
            <Link to={langPrefix || '/'} className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-900 rounded-full font-extrabold text-lg shadow-2xl hover:bg-slate-100 transition-transform hover:scale-105">
              <span>{t('landing.ctaButton', 'Use Tools Now')}</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
