import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Shield, EyeOff, Server, Lock, Fingerprint, Database, CheckSquare, ShieldCheck, Sparkles } from 'lucide-react';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040814] font-sans overflow-hidden">
      <Helmet>
        <title>{t('info.privacy.hero.title', 'Privacy Policy')} - CreateMyQR</title>
        <meta name="description" content={t('info.privacy.hero.subtitle', 'Your data is yours. We keep it that way.')} />
      </Helmet>

      {/* Hero Section with Premium Design */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-[500px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <h1 className="font-black text-zinc-900 dark:text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15
            }}>
            {t('info.privacy.hero.title', 'Privacy')} <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-[4px]">{t('info.privacy.hero.titleHighlight', 'Policy')}</span>.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('info.privacy.hero.subtitle', 'Your data is yours. We keep it that way.')}
          </p>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-950 dark:bg-[#0a1128] p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-slate-800 dark:border-[#1e2d4a]">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Fingerprint className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
            <h3 className="text-white font-bold text-3xl mb-4 tracking-tighter">{t('info.privacy.p1.title', 'Zero Tracking')}</h3>
            <p className="text-slate-400 text-lg font-medium">{t('info.privacy.p1.desc', 'We don\'t use invasive trackers.')}</p>
          </div>
          <div className="bg-emerald-600 dark:bg-emerald-900/60 p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-emerald-500 dark:border-emerald-700/50">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Database className="w-16 h-16 text-white mx-auto mb-8" />
            <h3 className="text-white font-bold text-3xl mb-4 tracking-tighter">{t('info.privacy.p2.title', 'Client-Side Only')}</h3>
            <p className="text-emerald-100 text-lg font-medium">{t('info.privacy.p2.desc', 'QR codes are generated in your browser.')}</p>
          </div>
          <div className="bg-slate-950 dark:bg-[#0a1128] p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-slate-800 dark:border-[#1e2d4a]">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
            <h3 className="text-white font-bold text-3xl mb-4 tracking-tighter">{t('info.privacy.p3.title', 'SSL Encrypted')}</h3>
            <p className="text-slate-400 text-lg font-medium">{t('info.privacy.p3.desc', 'All traffic is securely encrypted.')}</p>
          </div>
        </div>
      </section>

      {/* Data Collection Details */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-10">
          <div className="bg-white dark:bg-[#0a1128] p-10 md:p-16 rounded-[3rem] border border-slate-200/60 dark:border-[#1e2d4a] flex flex-col md:flex-row gap-10 items-start shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-3xl shrink-0">
              <Server className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter dark:text-white mb-6 tracking-tighter">
                {t('info.privacy.sections.s1', 'Data Collection')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl font-medium">
                {t('info.privacy.sections.d1', 'We do not collect or store the data you input into the QR code generator. All generation happens locally on your device.')}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a1128] p-10 md:p-16 rounded-[3rem] border border-slate-200/60 dark:border-[#1e2d4a] flex flex-col md:flex-row gap-10 items-start shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="p-6 bg-orange-50 dark:bg-orange-900/30 rounded-3xl shrink-0">
              <EyeOff className="w-12 h-12 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter dark:text-white mb-6 tracking-tighter">
                {t('info.privacy.sections.s2', 'Cookies & Analytics')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl font-medium">
                {t('info.privacy.sections.d2', 'We use minimal analytics to understand aggregated traffic patterns. No personally identifiable information is tracked.')}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a1128] p-10 md:p-16 rounded-[3rem] border border-slate-200/60 dark:border-[#1e2d4a] flex flex-col md:flex-row gap-10 items-start shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="p-6 bg-rose-50 dark:bg-rose-900/30 rounded-3xl shrink-0">
              <Lock className="w-12 h-12 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter dark:text-white mb-6 tracking-tighter">
                {t('info.privacy.sections.s3', 'Third-Party Services')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl font-medium">
                {t('info.privacy.sections.d3', 'We do not sell, rent, or share your data with any third parties. Period.')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* User Rights & Consent */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-slate-100 dark:bg-[#0a1128] p-12 md:p-20 rounded-[3rem] border border-slate-200 dark:border-[#1e2d4a] relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 opacity-5">
            <Shield className="w-96 h-96" />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter dark:text-white mb-10 tracking-tighter relative z-10">
            {t('info.privacy.rights.title', 'Your Consent & Rights')}
          </h2>
          <ul className="space-y-6 relative z-10">
            <li className="flex gap-6 items-start bg-white/50 dark:bg-black/20 p-6 rounded-2xl">
              <CheckSquare className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
              <p className="text-slate-700 dark:text-slate-300 text-xl font-medium">
                {t('info.privacy.rights.r1', 'By using our website, you hereby consent to our Privacy Policy.')}
              </p>
            </li>
            <li className="flex gap-6 items-start bg-white/50 dark:bg-black/20 p-6 rounded-2xl">
              <CheckSquare className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
              <p className="text-slate-700 dark:text-slate-300 text-xl font-medium">
                {t('info.privacy.rights.r2', 'You have the right to request deletion of any aggregated data tied to your session.')}
              </p>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
