import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Users, Globe2, ShieldCheck, Zap, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;

  return (
    <>
      <Helmet>
        <title>{`${t('appTitle', 'CreateMy-QR')} | ${t('static.about.seoTitle', 'About Us')}`}</title>
      </Helmet>
      <main className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white overflow-hidden">
        
        {/* Section 1: Hero */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] opacity-60 rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white dark:bg-[#0a1128] text-blue-600 dark:text-blue-400 mb-8 shadow-2xl border border-blue-100 dark:border-[#1e2d4a]">
              <Globe2 size={40} />
            </div>
            <h1 className="text-[clamp(3rem,6vw,5rem)] font-extrabold mb-6 tracking-tight leading-[1.1]">
              {t('static.about.heroTitle', 'About Us')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.about.heroSubtitle', 'Democratizing Document & QR Tools')}
            </p>
          </div>
        </section>

        {/* Section 2: Core Philosophy */}
        <section className="w-full py-24 px-6 bg-white/50 dark:bg-[#060c1c]/50 backdrop-blur-xl border-y border-slate-200 dark:border-[#102040]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 rounded-[2rem] bg-white dark:bg-[#0a1128] border border-slate-100 dark:border-[#1e2d4a] shadow-xl hover:-translate-y-2 transition-transform duration-500 text-center group">
                <div className="w-20 h-20 mx-auto mb-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={40} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.about.privacy', 'Absolute Privacy')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.about.privacyDesc', 'Everything is processed locally in your browser. Your files never touch a server.')}
                </p>
              </div>
              
              <div className="p-10 rounded-[2rem] bg-white dark:bg-[#0a1128] border border-slate-100 dark:border-[#1e2d4a] shadow-xl hover:-translate-y-2 transition-transform duration-500 text-center group">
                <div className="w-20 h-20 mx-auto mb-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Zap size={40} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.about.fast', 'Lightning Fast')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.about.fastDesc', 'WebAssembly allows CreateMy-QR to run directly on your device CPU, bypassing upload bottlenecks.')}
                </p>
              </div>

              <div className="p-10 rounded-[2rem] bg-white dark:bg-[#0a1128] border border-slate-100 dark:border-[#1e2d4a] shadow-xl hover:-translate-y-2 transition-transform duration-500 text-center group">
                <div className="w-20 h-20 mx-auto mb-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Users size={40} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.about.global', 'For Everyone')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.about.globalDesc', 'Translated into 30 languages. No subscriptions, no hidden fees. Just world-class tools.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Origin Story */}
        <section className="w-full py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full font-bold text-sm mb-8 tracking-wider">
              01 &mdash; {t('static.about.origin', 'The Origin')}
            </div>
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold mb-10 leading-[1.1]">
              {t('static.about.originTitle', 'The Origin Story')}
            </h2>
            <div className="pl-8 border-l-4 border-blue-600 dark:border-blue-500 py-2">
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic font-medium">
                {t('static.about.missionDesc', 'We believe premium QR utilities should be completely free, private, and accessible to everyone.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Technology Stack */}
        <section className="relative w-full py-32 px-6 bg-slate-950 text-white overflow-hidden">
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-600 blur-[150px] opacity-20 rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex px-4 py-2 bg-white/10 text-white rounded-full font-bold text-sm mb-8 tracking-wider backdrop-blur-md">
              02 &mdash; {t('static.about.architecture', 'Architecture')}
            </div>
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold mb-10 leading-[1.1]">
              {t('static.about.architectureTitle', 'Technology Stack')}
            </h2>
            <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
                {t('static.about.fastDesc', 'WebAssembly allows CreateMy-QR to run directly on your device CPU, bypassing upload bottlenecks.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Join the Movement */}
        <section className="w-full py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart size={64} className="mx-auto mb-8 text-blue-600 dark:text-blue-400 animate-pulse" />
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.about.join', 'Join the Movement')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12 font-medium">
              {t('static.about.joinDesc', 'Experience the fastest, safest, and most advanced QR suite on the web.')}
            </p>
            <Link to={langPrefix || '/'} className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-full font-extrabold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all hover:scale-105">
              <span>{t('landing.ctaButton', 'Use Tools Now')}</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
