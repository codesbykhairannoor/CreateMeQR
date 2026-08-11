import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Globe, Globe2, Languages as LanguagesIcon, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { LANGS as SUPPORTED_LANGUAGES } from '../config/site';
import { Link } from 'react-router-dom';

export default function Languages() {
  const { t, i18n } = useTranslation();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;

  return (
    <>
      <Helmet>
        <title>{`${t('appTitle', 'CreateMy-QR')} | ${t('static.languages.seoTitle', 'Supported Languages')}`}</title>
      </Helmet>
      
      <main className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white overflow-hidden">
        
        {/* Section 1: Hero */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full font-bold text-sm mb-8 tracking-wider border border-emerald-200 dark:border-emerald-500/20 backdrop-blur-md">
              <Globe size={16} /> {t('static.languages.heroBadge', 'Global Platform')}
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-8 tracking-tight leading-[1.1]">
              {t('static.languages.heroTitle', 'Available Worldwide')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.languages.heroSubtitle', 'QR code utilities should be accessible to everyone, regardless of what language you speak. We support 30 localized versions.')}
            </p>
          </div>
        </section>

        {/* Section 2: Massive Language Grid */}
        <section className="w-full py-32 px-6 relative z-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold text-center mb-16 leading-[1.1]">
              {t('static.languages.gridTitle', 'Select Your Region')}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SUPPORTED_LANGUAGES.map(lang => (
                <a 
                  key={lang.code}
                  href={`/${lang.code}`}
                  className="flex items-center gap-3 p-5 bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group"
                >
                  <span className="text-2xl filter drop-shadow-sm">{lang.flag}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {lang.nativeName}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Universal Design */}
        <section className="w-full py-32 px-6 bg-white/50 dark:bg-[#060c1c]/50 backdrop-blur-xl border-y border-slate-200 dark:border-[#102040]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center md:order-2">
              <div className="w-48 h-48 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center relative">
                <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-full animate-ping opacity-20"></div>
                <LanguagesIcon size={80} className="text-emerald-600 dark:text-emerald-400 relative z-10" />
              </div>
            </div>
            <div className="md:order-1">
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
                {t('static.languages.universalTitle', 'Universal Interface')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.languages.universalDesc', 'Every tool, button, error message, and guide on CreateMy-QR has been localized. We maintain a strict translation matrix to ensure your experience feels native and intuitive.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Fast Loading Globally */}
        <section className="w-full py-32 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <Globe2 size={160} strokeWidth={1} className="text-slate-300 dark:text-slate-800" />
            </div>
            <div>
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
                {t('static.languages.fastTitle', 'Zero Latency, Anywhere')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.languages.fastDesc', 'Because CreateMy-QR relies on WebAssembly processing instead of cloud servers, it doesn\'t matter if you are in New York or Jakarta. You will experience the exact same instant document processing speeds without network latency.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Community Driven */}
        <section className="w-full py-32 px-6 bg-slate-900 dark:bg-slate-950 text-white border-t border-slate-800 dark:border-[#1e2d4a]">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle2 size={64} className="mx-auto mb-8 text-emerald-400" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.languages.communityTitle', 'Community Driven')}
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-12 font-medium">
              {t('static.languages.communityDesc', 'Notice a translation that feels slightly off? We rely on our global user base to help refine and perfect our localizations. Reach out to us to suggest improvements for your native language.')}
            </p>
          </div>
        </section>

        {/* Section 6: Try it Now */}
        <section className="w-full py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.languages.ctaTitle', 'Ready to Process?')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12 font-medium">
              {t('static.languages.ctaDesc', 'Choose a tool below to get started securely and for free.')}
            </p>
            <Link to={langPrefix || '/'} className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-full font-extrabold text-xl transition-transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25">
              <span>{t('landing.ctaButton', 'Use Tools Now')}</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
