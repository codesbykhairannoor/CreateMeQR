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
  Layers, 
  Globe, 
  HelpCircle, 
  ChevronDown, 
  Monitor, 
  Smartphone, 
  QrCode, 
  CheckCircle2,
  FileText,
  Image,
  Video,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const { user, isPro, isLifetime, openAuthModal } = useAuth();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;
  const [billingCycle, setBillingCycle] = useState('annual');
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
      name: 'CreateMy-QR.com',
      desc: t('static.pricing.app1Desc', 'Flagship vector QR & barcode studio (100% private client-side)'),
      badge: 'Active App',
      url: 'https://createmy-qr.com'
    },
    {
      icon: FileText,
      name: 'HandleMyFile.com',
      desc: t('static.pricing.app2Desc', 'PDF & document studio with zero-server client-side WebAssembly'),
      badge: 'Web App 2',
      url: 'https://handlemyfile.com'
    },
    {
      icon: Image,
      name: 'HelpMyIMG.com',
      desc: t('static.pricing.app3Desc', 'AI photo, vector image enhancer & local lossless compressor'),
      badge: 'Web App 3',
      url: 'https://helpmyimg.com'
    },
    {
      icon: Video,
      name: 'SolveMyMedia.com',
      desc: t('static.pricing.app4Desc', 'Lossless video, audio converter & offline media toolkit'),
      badge: 'Web App 4',
      url: 'https://solvemymedia.com'
    }
  ];

  const faqs = [
    {
      q: t('static.pricing.faq1Q', 'Are all pricing packages really in USD?'),
      a: t('static.pricing.faq1A', 'Yes. All our plans are denominated in USD ($) worldwide to ensure simple, transparent pricing regardless of your currency or location.')
    },
    {
      q: t('static.pricing.faq2Q', 'How does the connection to all 4 Web Apps work?'),
      a: t('static.pricing.faq2A', 'Your Pro or Founder subscription credentials automatically detect and unlock full Pro access across all 4 connected web apps: CreateMy-QR.com, HandleMyFile.com, HelpMyIMG.com, and SolveMyMedia.com without separate payments.')
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
    <div className="w-full flex-1 bg-[#f8fafc] dark:bg-[#040a18] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Section 1: Hero */}
      <section className="relative w-full pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold text-xs uppercase tracking-widest mb-6 border border-blue-200 dark:border-blue-500/30 backdrop-blur-md shadow-xs">
            <Layers size={14} className="text-blue-600 dark:text-blue-400" />
            <span>{t('static.pricing.heroBadge', '4 Web Apps Ecosystem')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.08]">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-blue-800 to-blue-600 dark:from-white dark:via-blue-200 dark:to-blue-500">
              {t('static.pricing.heroTitle', 'Transparent Pricing & Plans')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal mb-8">
            {t('static.pricing.heroSubtitle', 'One unified platform. All 4 Web Apps connected seamlessly with zero hidden fees and transparent USD pricing.')}
          </p>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2 rounded-full bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700/60 shadow-xs">
            <Globe size={14} className="text-blue-500" />
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
                    <span className="text-[10px] capitalize font-bold tracking-normal px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {t('static.pricing.ecoBadge', 'Auto License Sync')}
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    {t('static.pricing.ecoDesc', 'Your Pro or Founder subscription is automatically recognized across all 4 platforms with zero extra fees.')}
                  </p>
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 self-start md:self-auto">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Synchronized Cross-Domain Access</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ecosystemApps.map((app, idx) => {
                const Icon = app.icon;
                const isCurrent = app.badge === 'Active App';
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-blue-50/70 dark:bg-[#0c1831] border-blue-200 dark:border-blue-800/80 shadow-xs'
                        : 'bg-slate-50/70 dark:bg-[#040814]/60 border-slate-200/60 dark:border-[#102040] hover:border-blue-400/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-xs ${
                          isCurrent 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-900 dark:bg-slate-800 text-white'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded capitalize ${
                          isCurrent 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}>
                          {app.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{app.name}</h4>
                        {!isCurrent && (
                          <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors">
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{app.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Pricing Plans with Billing Toggle (3 Spacious Columns) */}
      <section className="w-full pb-24 px-4 sm:px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Billing Toggle: Monthly vs Annual (Save 34%) */}
          <div className="flex flex-col items-center justify-center mb-10 sm:mb-12">
            <div className="inline-flex items-center p-1.5 rounded-full bg-slate-200/80 dark:bg-[#0c1831] border border-slate-300/80 dark:border-[#1a2d52] shadow-inner">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('static.pricing.monthlyTitle', 'Monthly Plan')}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t('static.pricing.annualTitle', 'Annual Plan')}</span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                  {t('static.pricing.annualSavings', 'Save 34%')}
                </span>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 text-center">
              {billingCycle === 'annual'
                ? `${t('static.pricing.annualEquiv', 'Equivalent to $6.58 / mo')} • ${t('static.pricing.annualSavings', 'Save 34%')} ($79 / year)`
                : '$9.99 / month • Billed monthly • Cancel anytime'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* 1. Paket Gratis ($0 / Free Forever) */}
            <div className="flex flex-col bg-white dark:bg-[#081226] rounded-3xl p-7 lg:p-8 border border-slate-200 dark:border-[#102040] shadow-md hover:shadow-xl transition-all duration-300 relative group justify-between">
              <div>
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
                  {t('static.pricing.freeBadge', 'Free Forever')}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('static.pricing.freeTitle', 'Free Plan')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px] mb-6">
                  {t('static.pricing.freeDesc', 'Essential QR & Barcode tools for personal projects and everyday scanning.')}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {t('static.pricing.freeCost', '$0')}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-400">
                      {t('static.pricing.freeCostPeriod', '/ forever')}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 block mt-2">
                    100% Free • No Credit Card Required
                  </span>
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    {t('static.pricing.features', 'Included Features')}
                  </span>
                  <ul className="space-y-3.5">
                    <li className="flex gap-3 items-start text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF1', 'Connected to all 4 Web Apps (Free tier)')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF2', 'Unlimited static QR code generation (ISO/IEC 18004)')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF3', 'Linear Barcode suite (13+ formats: Code 128, EAN, UPC)')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF4', '100% Client-Side privacy (zero server tracking)')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF5', 'Standard PNG & WebP format downloads')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.freeF6', 'Local browser history storage (IndexedDB)')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link 
                to={langPrefix || '/'}
                className="w-full py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1831] dark:hover:bg-[#102040] text-slate-800 dark:text-slate-200 font-semibold text-sm text-center border border-slate-200 dark:border-[#102040] transition-colors block"
              >
                {t('static.pricing.freeCta', 'Start Free Now')}
              </Link>
            </div>

            {/* 2. Paket Pro (Toggle: Bulanan $9.99 vs Tahunan $79) - POPULAR */}
            <div className="flex flex-col bg-white dark:bg-[#081226] rounded-3xl p-7 lg:p-8 border-2 border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-500/15 lg:-translate-y-3 transition-all duration-300 relative group justify-between">
              {/* Popular Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles size={13} className="text-amber-300" />
                <span>
                  {billingCycle === 'annual' 
                    ? t('static.pricing.annualBadge', 'Most Popular') 
                    : t('static.pricing.monthlyBadge', 'Flexible Pro')}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 pt-1">
                  {billingCycle === 'annual' ? (
                    <>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {t('static.pricing.annualSavings', 'Save 34%')}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {t('static.pricing.annualEquiv', 'Equivalent to $6.58 / mo')}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {t('static.pricing.monthlyBadge', 'Flexible')}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Cancel Anytime
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {billingCycle === 'annual' 
                    ? t('static.pricing.annualTitle', 'Annual Plan') 
                    : t('static.pricing.monthlyTitle', 'Monthly Plan')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px] mb-6">
                  {billingCycle === 'annual'
                    ? t('static.pricing.annualDesc', 'Billed annually ($6.58/mo equivalent). Best value for creators & agencies.')
                    : t('static.pricing.monthlyDesc', 'Full flexibility for professionals, designers, and active businesses.')}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]">
                  {billingCycle === 'annual' ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm line-through text-slate-400 font-bold">
                          {t('static.pricing.annualStrike', '$119.88')}
                        </span>
                        <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                          {t('static.pricing.annualCost', '$79')}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-400">
                          {t('static.pricing.annualCostPeriod', '/ year')}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-2">
                        Save $40.88 every year • 34% Discount
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                          {t('static.pricing.monthlyCost', '$9.99')}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-400">
                          {t('static.pricing.monthlyCostPeriod', '/ month')}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-400 block mt-2">
                        Billed monthly • Cancel anytime
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    {t('static.pricing.features', 'Included Features')}
                  </span>
                  <ul className="space-y-3.5">
                    <li className="flex gap-3 items-start text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
                      <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.annualF1', 'Connected full access to all 4 Web Apps')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF2', 'Vector SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS exports')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF3', '20+ Industrial Barcodes (DataMatrix, PDF417, Aztec, GS1-128)')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF4', '3D Mockup Studio, CTA Showcase Frames & Dual-Tone Eyes')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.monthlyF5', 'A4 Print Studio (Avery presets + Crop Marks) & Batch CSV ZIP')}</span>
                    </li>
                    {billingCycle === 'annual' ? (
                      <li className="flex gap-3 items-start text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{t('static.pricing.annualF3', 'Save 34% + ISO Grade WASM Audit & Commercial License')}</span>
                      </li>
                    ) : (
                      <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                        <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{t('static.pricing.monthlyF6', 'ISO Grade WASM Scan Audit & Commercial License')}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {isLifetime ? (
                <div className="w-full py-3.5 px-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                  <Check size={18} />
                  <span>Covered by Lifetime Pass</span>
                </div>
              ) : isPro ? (
                <div className="w-full py-3.5 px-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                  <Check size={18} />
                  <span>Pro Plan Active</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCheckout(billingCycle)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm text-center shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {billingCycle === 'annual'
                      ? (user ? t('static.pricing.annualCta', 'Get Annual Pro ($79/yr)') : 'Sign In for Annual Plan')
                      : (user ? t('static.pricing.monthlyCta', 'Get Monthly Pro ($9.99/mo)') : 'Sign In to Subscribe')}
                  </span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>

            {/* 3. Founder Lifetime Pass ($129 — Coret $169) - VIP */}
            <div className="flex flex-col bg-gradient-to-b from-white via-amber-500/[0.03] to-white dark:from-[#081226] dark:via-amber-500/[0.04] dark:to-[#081226] rounded-3xl p-7 lg:p-8 border-2 border-amber-500/60 dark:border-amber-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative group justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 mb-4">
                  <Crown size={13} className="text-amber-500" />
                  <span>{t('static.pricing.lifetimeBadge', 'VIP Founder Special')}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('static.pricing.lifetimeTitle', 'Founder Lifetime Pass')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px] mb-6">
                  {t('static.pricing.lifetimeDesc', 'Pay once, own forever across all platforms, web apps, and desktop tools.')}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#102040]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm line-through text-slate-400 font-bold">
                      {t('static.pricing.lifetimeStrike', '$169')}
                    </span>
                    <span className="text-4xl sm:text-5xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                      {t('static.pricing.lifetimeCost', '$129')}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-400">
                      {t('static.pricing.lifetimeCostPeriod', '/ one-time')}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mt-2">
                    {t('static.pricing.lifetimeSavings', 'Save $40 • One-Time Payment')}
                  </span>
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    {t('static.pricing.features', 'Included Features')}
                  </span>
                  <ul className="space-y-3.5">
                    <li className="flex gap-3 items-start text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400">
                      <Crown size={18} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF1', 'Lifetime access to all 4 Web Apps')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      <Monitor size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF2', 'Dedicated Windows Desktop App included (Native offline)')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      <Smartphone size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF3', 'Mobile App (Android APK & iOS) included')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF4', 'All Pro Engines forever: BWIPP 2D, DXF CAD, 3D Mockups & Frames')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF5', 'All future updates, engines & VIP Founder badge')}</span>
                    </li>
                    <li className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                      <Check size={18} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{t('static.pricing.lifetimeF6', 'Direct 1-on-1 VIP developer support channel')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {isLifetime ? (
                <div className="w-full py-3.5 px-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                  <Check size={18} />
                  <span>Lifetime Pass Active</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCheckout('lifetime')}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm text-center shadow-md shadow-amber-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>{user ? t('static.pricing.lifetimeCta', 'Claim Founder Lifetime ($129)') : 'Sign In for Lifetime Access'}</span>
                  <ArrowRight size={16} />
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

    </div>
  );
}