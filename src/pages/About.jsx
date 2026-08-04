import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Globe, Zap, Heart, Users, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans overflow-hidden">
      <Helmet>
        <title>{t('info.about.hero.title', 'About Us')} - CreateMyQR</title>
      </Helmet>

      {/* Hero Section with Premium Design */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.05]">
            {t('info.about.hero.title', 'About Us')}.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('info.about.hero.subtitle', 'Empowering global connections through seamless QR technology.')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 pb-24 relative z-20 -mt-10">
        <div className="bg-white/70 dark:bg-[#0a1128]/70 backdrop-blur-2xl border border-white/50 dark:border-[#1e2d4a] rounded-[3rem] p-10 md:p-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Heart className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tighter">
            {t('info.about.mission.title', 'Our Mission')}
          </h2>
          <p className="text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {t('info.about.mission.desc', 'To provide a premium, privacy-first QR code generator that doesn\'t track your data or lock your codes behind paywalls.')}
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <h2 className="text-5xl font-bold text-zinc-900 dark:text-white text-center mb-20 tracking-tighter">
          {t('info.about.values.title', 'Core Values')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#0a1128] p-12 rounded-[2.5rem] border border-slate-200/60 dark:border-[#1e2d4a] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tighter">
              {t('info.about.values.v1', 'Privacy First')}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
              {t('info.about.values.d1', 'Client-side generation means your data never touches our servers.')}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0a1128] p-12 rounded-[2.5rem] border border-slate-200/60 dark:border-[#1e2d4a] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Zap className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tighter">
              {t('info.about.values.v2', 'Free Forever')}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
              {t('info.about.values.d2', 'Core features will always remain free with no hidden limits.')}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0a1128] p-12 rounded-[2.5rem] border border-slate-200/60 dark:border-[#1e2d4a] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Globe className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tighter">
              {t('info.about.values.v3', 'Global Reach')}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
              {t('info.about.values.d3', 'Localized in 30 languages to serve a truly international audience.')}
            </p>
          </div>
        </div>
      </section>

      {/* Global Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-950 dark:bg-black rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-60"></div>
          <div className="absolute -left-[20%] -top-[20%] w-[50%] h-[50%] bg-blue-600/20 blur-[100px] rounded-full"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-8 md:pt-0">
              <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">34<span className="text-blue-500">+</span></div>
              <div className="text-slate-400 font-bold text-lg uppercase tracking-widest">{t('info.about.stats.s1', 'QR Tools')}</div>
            </div>
            <div className="pt-16 md:pt-0">
              <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">30</div>
              <div className="text-slate-400 font-bold text-lg uppercase tracking-widest">{t('info.about.stats.s2', 'Languages')}</div>
            </div>
            <div className="pt-16 md:pt-0">
              <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">100<span className="text-emerald-500">%</span></div>
              <div className="text-slate-400 font-bold text-lg uppercase tracking-widest">{t('info.about.stats.s3', 'Private')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-5xl font-bold text-zinc-900 dark:text-white mb-16 tracking-tighter">
          {t('info.about.story.title', 'Our Story')}
        </h2>
        <div className="prose prose-xl md:prose-2xl dark:prose-invert mx-auto text-slate-600 dark:text-slate-300">
          <p className="leading-relaxed font-medium">
            {t('info.about.hero.desc', 'We built this platform to simplify how the world shares information. Fast, reliable, and completely private.')}
          </p>
          <p className="leading-relaxed mt-8 font-medium">
            {t('info.about.story.p2', 'What started as a simple tool has evolved into a comprehensive suite of 34 different QR generators. We noticed that most generators charge monthly fees just to keep codes active or force their logos onto your designs. We decided to change that.')}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-[3rem] p-16 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tighter relative z-10">
            {t('info.about.cta.title', 'Ready to create your first QR code?')}
          </h2>
          <Link to="/" className="relative z-10 inline-flex items-center gap-3 bg-white text-blue-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-xl">
            {t('info.about.cta.btn', 'Get Started for Free')} <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

    </div>
  );
}
