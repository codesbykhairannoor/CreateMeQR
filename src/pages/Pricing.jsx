// src/pages/Pricing.jsx
// Pricing with 4 Connected Tiers: Free ($0), Monthly ($9.99), Annual ($79), Founder Lifetime ($129)
// All tiers connected across 4 Web Apps with strict USD currency worldwide.

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Check, 
  ShieldCheck, 
  Zap, 
  ServerOff, 
  ArrowRight, 
  Sparkles, 
  Crown, 
  Calendar, 
  Layers, 
  Globe, 
  HelpCircle, 
  ChevronDown, 
  Monitor, 
  Smartphone, 
  QrCode, 
  Barcode, 
  ScanLine, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const { user, isPro, isLifetime, openAuthModal } = useAuth();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCheckout = (planType = 'lifetime') => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (isLifetime) {
      return;
    }

    if (isPro && (planType === 'monthly' || planType === 'annual')) {
      return;
    }

    const lifetimeUrl =
      import.meta.env.VITE_LEMONSQUEEZY_LIFETIME_BUY_URL ||
      'https://thismyown.lemonsqueezy.com/checkout/buy/bd84d992-e4ed-4d88-a5ff-f1ab944f5815';

    const monthlyUrl =
      import.meta.env.VITE_LEMONSQUEEZY_MONTHLY_BUY_URL ||
      lifetimeUrl;

    const annualUrl =
      import.meta.env.VITE_LEMONSQUEEZY_ANNUAL_BUY_URL ||
      monthlyUrl;

    const checkoutBase = planType === 'monthly' ? monthlyUrl : planType === 'annual' ? annualUrl : lifetimeUrl;

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

  const ecosystemApps = [
    {
      icon: QrCode,
      name: t('static.pricing.app1Name', 'QR Code Studio'),
      desc: t('static.pricing.app1Desc', 'Static & vector QR generator with 37+ formats & custom design'),
      badge: 'App 1'
    },
    {
      icon: Barcode,
      name: t('static.pricing.app2Name', 'Barcode Engine'),
      desc: t('static.pricing.app2Desc', 'EAN-13, UPC, Code 128, ITF, and industrial barcode suite'),
      badge: 'App 2'
    },
    {
      icon: ScanLine,
      name: t('static.pricing.app3Name', 'Hardware Scanner'),
      desc: t('static.pricing.app3Desc', 'High-speed camera decoder for QR codes and barcodes'),
      badge: 'App 3'
    },
    {
      icon: FileCheck,
      name: t('static.pricing.app4Name', 'Media & Doc Tools'),
      desc: t('static.pricing.app4Desc', 'High-DPI vector SVG exporter, PDF generator & batch manager'),
      badge: 'App 4'
    }
  ];

  const faqs = [
    {
      q: t('static.pricing.faq1Q', 'Are all pricing packages really in USD?'),
      a: t('static.pricing.faq1A', 'Yes. All our plans are denominated in USD ($) worldwide to ensure simple, transparent pricing regardless of your currency or location.')
    },
    {
      q: t('static.pricing.faq2Q', 'How does the connection to all 4 Web Apps work?'),
      a: t('static.pricing.faq2A', 'Your plan credentials or license key instantly unlock full access across our 4 connected web apps: QR Code Studio, Barcode Engine, Hardware Scanner, and Media & Doc Tools.')
    },
    {
      q: t('static.pricing.faq3Q', 'What is included with the Windows App and Mobile APK in the Founder Pass?'),
      a: t('static.pricing.faq3A', 'Founder members receive a standalone, native Windows executable (.exe) for complete offline operations without browser overhead, plus the Android APK and iOS mobile applications with direct download links.')
    },
    {
      q: t('static.pricing.faq4Q', 'Can I use the generated QR codes commercially without watermarks?'),
      a: t('static.pricing.faq4A', 'Yes! All generated QR codes and barcodes are 100% watermark-free and ISO-compliant, ready for commercial packaging, client flyers, outdoor billboards, and merchandise.')
    }
  ];

  return (
    <main className="w-full flex-1 bg-[#f8fafc] dark:bg-[#040a18] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Section 1: Hero */}
      <section className="relative w-full pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold text-xs uppercase tracking-widest mb-5 border border-blue-200 dark:border-blue-500/30 backdrop-blur-md shadow-xs">
            <Layers size={14} className="text-blue-600 dark:text-blue-400" />
            <span>{t('static.pricing.heroBadge', '4 Web Apps Ecosystem')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white leading-[1.15]">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-200 dark:to-blue-500">
              {t('static.pricing.heroTitle', 'Transparent Pricing & Plans')}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal mb-5">
            {t('static.pricing.heroSubtitle', 'One unified platform. All 4 Web Apps connected seamlessly with zero hidden fees and transparent USD pricing.')}
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700/60">
            <Globe size={13} className="text-blue-500" />
            <span>{t('static.pricing.currencyNote', 'All prices are in USD ($) globally across all regions.')}</span>
          </div>
        </div>
      </section>

      {/* Section 2: 4 Connected Web Apps Showcase */}
      <section className="w-full pb-12 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 md:p-8 rounded-3xl bg-white/90 dark:bg-[#081226]/90 backdrop-blur-xl border border-slate-200 dark:border-[#102040] shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {t('static.pricing.ecoTitle', 'Connected 4-in-1 Web Ecosystem')}
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {t('static.pricing.ecoBadge', 'Unified Suite')}
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {t('static.pricing.ecoDesc', 'Every plan connects seamlessly across our entire 4-web productivity network.')}
                  </p>
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 self-start md:self-auto">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Synchronized Cross-App Access</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ecosystemApps.map((app, idx) => {
                const Icon = app.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#040814]/60 border border-slate-200/60 dark:border-[#102040] flex flex-col justify-between hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                          <Icon size={16} />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {app.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{app.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{app.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 4 Pricing Cards */}
      <section className="w-full pb-24 px-4 sm:px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* 1. Paket Gratis ($0 / Free Forever) */}
            <div className="flex flex-col bg-white dark:bg-[#081226] rounded-3xl p-6 lg:p-7 border border-slate-200 dark:border-[#102040] shadow-md hover:shadow-xl transition-all duration-300 relative group justify-between">
              <div>
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
                  {t('static.pricing.freeBadge', 'Free Forever')}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                  {t('static.pricing.freeTitle', 'Free Plan')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px] mb-6">
                  {t('static.pricing.freeDesc', 'Essential QR & Barcode tools for personal projects and everyday scanning.')}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {t('static.pricing.freeCost', '$0')}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {t('static.pricing.freeCostPeriod', '/ forever')}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 block mt-1">
                    100% Free • No Credit Card Required
                  </span>
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    {t('static.pricing.features', 'Included Features')}
                  </span>
                  <ul className="space-y-3">
                    <li className="flex gap-2.5 items-start text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF1', 'Connected to all 4 Web Apps (Free tier)')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF2', 'Unlimited static QR code generation (ISO/IEC 18004)')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF3', 'Linear Barcode suite (13+ formats: Code 128, EAN, UPC)')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF4', '100% Client-Side privacy (zero server tracking)')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF5', 'Standard PNG & WebP format downloads')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF6', 'Local browser history storage (IndexedDB)')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link 
                to={langPrefix || '/'}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1831] dark:hover:bg-[#102040] text-slate-800 dark:text-slate-200 font-semibold text-xs text-center border border-slate-200 dark:border-[#102040] transition-colors block"
              >
                {t('static.pricing.freeCta', 'Start Free Now')}
              </Link>
            </div>

            {/* 2. Paket Bulanan ($9.99 / month) */}
            <div className="flex flex-col bg-white dark:bg-[#081226] rounded-3xl p-6 lg:p-7 border border-slate-200 dark:border-[#102040] shadow-md hover:shadow-xl transition-all duration-300 relative group justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-200/60 dark:border-blue-800/40">
                  <Calendar size={13} className="text-blue-500" />
                  <span>{t('static.pricing.monthlyBadge', 'Flexible')}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                  {t('static.pricing.monthlyTitle', 'Monthly Plan')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px] mb-6">
                  {t('static.pricing.monthlyDesc', 'Full flexibility for professionals, designers, and active businesses.')}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {t('static.pricing.monthlyCost', '$9.99')}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {t('static.pricing.monthlyCostPeriod', '/ month')}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 block mt-1">
                    Billed monthly • Cancel anytime
                  </span>
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    {t('static.pricing.features', 'Included Features')}
                  </span>
                  <ul className="space-y-3">
                    <li className="flex gap-2.5 items-start text-xs font-semibold text-blue-700 dark:text-blue-300">
                      <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF1', 'Connected full access to all 4 Web Apps')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF2', 'High-resolution Vector SVG & Print-Ready PDF exports')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF3', 'Custom branding, company logo & color gradient palette')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF4', 'Batch QR & Barcode generation suite')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF5', 'Commercial & client project usage license')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF6', 'Priority processing & fast customer support')}</span>
                    </li>
                  </ul>
                </div>
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
                  type="button"
                  onClick={() => handleCheckout('monthly')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs text-center transition-all shadow-sm cursor-pointer"
                >
                  {user ? t('static.pricing.monthlyCta', 'Get Monthly Pro ($9.99/mo)') : 'Sign In to Subscribe'}
                </button>
              )}
            </div>

            {/* 3. Paket Tahunan ($79 / year - Hemat 34%, setara $6.58/bln) - POPULAR */}
            <div className="flex flex-col bg-white dark:bg-[#081226] rounded-3xl p-6 lg:p-7 border-2 border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-500/15 lg:-translate-y-2.5 transition-all duration-300 relative group justify-between">
              {/* Popular Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles size={13} className="text-amber-300" />
                <span>{t('static.pricing.annualBadge', 'Most Popular')}</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 pt-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {t('static.pricing.annualSavings', 'Save 34%')}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {t('static.pricing.annualEquiv', 'Equivalent to $6.58 / mo')}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                  {t('static.pricing.annualTitle', 'Annual Plan')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px] mb-6">
                  {t('static.pricing.annualDesc', 'Billed annually ($6.58/mo equivalent). Best value for creators & agencies.')}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm line-through text-slate-400 font-bold">
                      {t('static.pricing.annualStrike', '$119.88')}
                    </span>
                    <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                      {t('static.pricing.annualCost', '$79')}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {t('static.pricing.annualCostPeriod', '/ year')}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mt-1">
                    Save $40.88 every year • 34% Discount
                  </span>
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    {t('static.pricing.features', 'Included Features')}
                  </span>
                  <ul className="space-y-3">
                    <li className="flex gap-2.5 items-start text-xs font-bold text-blue-700 dark:text-blue-300">
                      <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.annualF1', 'Connected full access to all 4 Web Apps')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.annualF2', 'Everything included in Monthly Plan')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.annualF3', 'Save 34% compared to regular monthly billing')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.annualF4', 'Advanced custom dots, corner shapes & eye patterns')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.annualF5', 'Bulk high-DPI vector SVG & 4K raster downloads')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.annualF6', 'Priority 24/7 dedicated customer assistance')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {isLifetime ? (
                <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs text-center flex items-center justify-center gap-1.5">
                  <Check size={16} />
                  <span>Covered by Lifetime Pass</span>
                </div>
              ) : isPro ? (
                <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs text-center flex items-center justify-center gap-1.5">
                  <Check size={16} />
                  <span>Pro Plan Active</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCheckout('annual')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs text-center shadow-lg shadow-blue-500/25 active:scale-98 transition-all cursor-pointer"
                >
                  {user ? t('static.pricing.annualCta', 'Get Annual Pro ($79/yr)') : 'Sign In for Annual Plan'}
                </button>
              )}
            </div>

            {/* 4. Founder Lifetime Pass ($129 — Coret $169) - VIP */}
            <div className="flex flex-col bg-gradient-to-b from-white via-amber-500/5 to-white dark:from-[#081226] dark:via-amber-500/5 dark:to-[#081226] rounded-3xl p-6 lg:p-7 border-2 border-amber-500/60 dark:border-amber-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative group justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 mb-4">
                  <Crown size={13} className="text-amber-500" />
                  <span>{t('static.pricing.lifetimeBadge', 'VIP Founder Special')}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                  {t('static.pricing.lifetimeTitle', 'Founder Lifetime Pass')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px] mb-6">
                  {t('static.pricing.lifetimeDesc', 'Pay once, own forever across all platforms, web apps, and desktop tools.')}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm line-through text-slate-400 font-bold">
                      {t('static.pricing.lifetimeStrike', '$169')}
                    </span>
                    <span className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                      {t('static.pricing.lifetimeCost', '$129')}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {t('static.pricing.lifetimeCostPeriod', '/ one-time')}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block mt-1">
                    {t('static.pricing.lifetimeSavings', 'Save $40 • One-Time Payment')}
                  </span>
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    {t('static.pricing.features', 'Included Features')}
                  </span>
                  <ul className="space-y-3">
                    <li className="flex gap-2.5 items-start text-xs font-bold text-amber-700 dark:text-amber-400">
                      <Crown size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF1', 'Lifetime access to all 4 Web Apps')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs font-bold text-slate-900 dark:text-white">
                      <Monitor size={16} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF2', 'Dedicated Windows Desktop App included (Native offline)')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs font-bold text-slate-900 dark:text-white">
                      <Smartphone size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF3', 'Mobile App (Android APK & iOS) included')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF4', 'All future updates, tools & major features included forever')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF5', 'VIP Founder badge & exclusive community access')}</span>
                    </li>
                    <li className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF6', 'Direct 1-on-1 VIP developer support channel')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {isLifetime ? (
                <div className="w-full py-3.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs text-center flex items-center justify-center gap-1.5">
                  <Check size={16} />
                  <span>Lifetime Pass Active</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCheckout('lifetime')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs text-center shadow-md shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>{user ? t('static.pricing.lifetimeCta', 'Claim Founder Lifetime ($129)') : 'Sign In for Lifetime Access'}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Enterprise Privacy & Client-Side Guarantee */}
      <section className="w-full py-16 px-4 sm:px-6 bg-slate-900 text-white border-y border-[#102040]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center mb-3">
                <Zap size={20} />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">
                {t('static.pricing.ent1', 'Enterprise Compliant')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ISO/IEC 18004 certified QR matrix algorithms and GS1 barcode standards compliant.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-3">
                <ServerOff size={20} />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">
                {t('static.pricing.ent2', 'Zero-Data Retention')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('static.pricing.whyFreeDesc', "Because we don't process your files on our servers, your data never leaves your device.")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">
                {t('static.pricing.ent3', 'GDPR & CCPA Friendly')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No third-party tracking pixels, no advertising middleboxes, and no user profiling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: FAQs */}
      <section className="w-full py-16 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
              <HelpCircle size={14} className="text-blue-500" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('static.pricing.faqTitle', 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#102040]/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6: Bottom Call to Action */}
      <section className="w-full py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight leading-tight">
            {t('static.pricing.bizTitle', 'Free for Personal & Commercial Use')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-xl mx-auto font-normal">
            {t('static.pricing.bizDesc', 'Start generating static QR codes for free, or unlock the full 4-web productivity ecosystem with our Pro or Founder passes.')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to={langPrefix || '/'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              <span>{t('static.pricing.freeCta', 'Start Free Now')}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}