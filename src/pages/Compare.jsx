import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, XCircle, Trophy, Star, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Compare() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans overflow-hidden">
      <Helmet>
        <title>{t('info.compare.hero.title', 'Why Choose Us?')} - CreateMyQR</title>
      </Helmet>

      {/* Hero Section with Premium Design */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="font-black text-zinc-900 dark:text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15
            }}>
            {t('info.compare.hero.title', 'Why Choose Us?')}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('info.compare.hero.subtitle', 'See how we stack up against the competition.')}
          </p>
        </div>
      </section>

      {/* Feature Highlight Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            <Trophy className="w-48 h-48 text-white/5 absolute -bottom-10 -right-10 group-hover:scale-110 transition-transform duration-700" />
            <h3 className="text-3xl font-bold mb-4 tracking-tighter relative z-10">{t('info.compare.c1.title', '#1 Privacy')}</h3>
            <p className="text-blue-100 text-lg font-medium leading-relaxed relative z-10">{t('info.compare.c1.desc', '100% Client-side processing. Your data never leaves your device.')}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            <Zap className="w-48 h-48 text-white/5 absolute -bottom-10 -right-10 group-hover:scale-110 transition-transform duration-700" />
            <h3 className="text-3xl font-bold mb-4 tracking-tighter relative z-10">{t('info.compare.c2.title', 'Zero Cost')}</h3>
            <p className="text-emerald-100 text-lg font-medium leading-relaxed relative z-10">{t('info.compare.c2.desc', 'No hidden subscriptions. All core features are completely free.')}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            <Star className="w-48 h-48 text-white/5 absolute -bottom-10 -right-10 group-hover:scale-110 transition-transform duration-700" />
            <h3 className="text-3xl font-bold mb-4 tracking-tighter relative z-10">{t('info.compare.c3.title', '34 Tools')}</h3>
            <p className="text-purple-100 text-lg font-medium leading-relaxed relative z-10">{t('info.compare.c3.desc', 'The most comprehensive suite of QR generators on the internet.')}</p>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-white dark:bg-[#0a1128] border border-slate-200/60 dark:border-[#1e2d4a] rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
          
          <div className="grid grid-cols-3 bg-slate-50 dark:bg-[#060b19] p-8 md:p-12 border-b border-slate-200 dark:border-[#1e2d4a] items-center">
            <div className="col-span-1 font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-sm md:text-base">
              {t('info.compare.metrics.title', 'Feature')}
            </div>
            <div className="col-span-1 text-center font-black text-2xl md:text-4xl text-blue-600 dark:text-blue-400 flex flex-col md:flex-row items-center justify-center gap-3 tracking-tight">
              <Trophy className="w-8 h-8 md:w-10 md:h-10" /> CreateMyQR
            </div>
            <div className="col-span-1 text-center font-black text-2xl md:text-4xl text-slate-400 dark:text-slate-600 tracking-tight">
              Others
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-[#1e2d4a]/50">
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num} className="grid grid-cols-3 p-8 md:p-12 hover:bg-slate-50/50 dark:hover:bg-[#060b19]/50 transition-colors items-center group">
                <div className="col-span-1 font-bold text-slate-900 dark:text-white text-lg md:text-xl tracking-tight">
                  {t(`info.compare.metrics.m${num}`)}
                </div>
                <div className="col-span-1 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 rounded-full p-2 group-hover:scale-110 transition-transform" />
                  <span className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-300">
                    {t(`info.compare.metrics.us${num}`)}
                  </span>
                </div>
                <div className="col-span-1 text-center flex flex-col items-center gap-4 opacity-70">
                  <XCircle className="w-10 h-10 text-red-400 bg-red-50 dark:bg-red-900/20 rounded-full p-2" />
                  <span className="text-base md:text-lg font-medium text-slate-500 dark:text-slate-500">
                    {t(`info.compare.metrics.them${num}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial/Trust Section */}
      <section className="max-w-4xl mx-auto px-6 py-24">
         <div className="text-center space-y-8 bg-white/50 dark:bg-[#0a1128]/50 p-16 rounded-[4rem] border border-slate-200/50 dark:border-[#1e2d4a]/50 backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter dark:text-white tracking-tighter">
               {t('info.compare.trust.title', 'Trusted Globally')}
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
               {t('info.compare.trust.desc', 'Thousands of users across 30 different languages choose us every day because we respect their wallets and their privacy.')}
            </p>
         </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="bg-slate-950 dark:bg-[#060b19] border border-slate-800 dark:border-[#1e2d4a] rounded-[4rem] p-16 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tighter relative z-10 leading-tight">
            {t('info.compare.cta.title', 'Stop paying for basic QR codes.')}
          </h2>
          <Link to="/" className="relative z-10 inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 hover:scale-105 transition-all shadow-xl hover:shadow-blue-500/25">
            {t('info.compare.cta.btn', 'Generate Now')} <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
      
    </div>
  );
}
