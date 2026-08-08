import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FileText, AlertTriangle, Scale, Copyright, RefreshCcw, Info, CheckCircle2 } from 'lucide-react';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040814] font-sans overflow-hidden">
      <Helmet>
        <title>{t('info.terms.hero.title', 'Terms of Service')} - CreateMyQR</title>
        <meta name="description" content={t('info.terms.hero.subtitle', 'Rules of the road for using our platform.')} />
      </Helmet>

      {/* Hero Section with Premium Design */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/10 dark:bg-slate-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter dark:text-white tracking-tighter mb-6 leading-[1.05]">
            {t('info.terms.hero.title', 'Terms of')} <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-[4px]">{t('info.terms.hero.titleHighlight', 'Service')}</span>.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('info.terms.hero.subtitle', 'Rules of the road for using our platform.')}
          </p>
        </div>
      </section>
      
      {/* Notice Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16 relative z-20">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200/50 dark:border-indigo-800/50 p-10 rounded-[3rem] flex flex-col md:flex-row items-center md:items-start gap-8 shadow-2xl backdrop-blur-xl">
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl shrink-0">
            <Info className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-indigo-900 dark:text-indigo-200 text-lg md:text-xl font-medium leading-relaxed text-center md:text-left">
            {t('info.terms.notice', 'By accessing or using CreateMyQR, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.')}
          </p>
        </div>
      </section>

      {/* Grid Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-[#0a1128] p-12 md:p-16 rounded-[3rem] border border-slate-200/60 dark:border-[#1e2d4a] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-5 bg-red-50 dark:bg-red-900/30 rounded-2xl">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white tracking-tighter">
                {t('info.terms.sections.s1', 'Acceptable Use')}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl font-medium">
              {t('info.terms.sections.d1', 'You agree not to use our generator to create QR codes that link to malicious, illegal, or harmful content. We reserve the right to ban offending IP addresses.')}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0a1128] p-12 md:p-16 rounded-[3rem] border border-slate-200/60 dark:border-[#1e2d4a] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                <Scale className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white tracking-tighter">
                {t('info.terms.sections.s2', 'Service Availability')}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl font-medium">
              {t('info.terms.sections.d2', 'We strive for 99.9% uptime but provide the service \'as is\' without guarantees. We are not liable for any disruptions in service.')}
            </p>
          </div>

          {/* IP Section */}
          <div className="bg-white dark:bg-[#0a1128] p-12 md:p-16 rounded-[3rem] border border-slate-200/60 dark:border-[#1e2d4a] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 md:col-span-2 flex flex-col md:flex-row gap-10 items-start">
            <div className="p-6 bg-purple-50 dark:bg-purple-900/30 rounded-3xl shrink-0">
              <Copyright className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter dark:text-white mb-6 tracking-tighter">
                {t('info.terms.sections.s3', 'Intellectual Property')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl font-medium mb-6">
                {t('info.terms.sections.d3', 'You retain all rights to the content you generate. The platform code, design, and branding belong exclusively to us.')}
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 items-center text-slate-700 dark:text-slate-300 font-medium text-lg">
                  <CheckCircle2 className="w-6 h-6 text-purple-500" /> You own the QR Code images.
                </li>
                <li className="flex gap-4 items-center text-slate-700 dark:text-slate-300 font-medium text-lg">
                  <CheckCircle2 className="w-6 h-6 text-purple-500" /> You may use them commercially.
                </li>
              </ul>
            </div>
          </div>
          
          {/* Updates Section */}
          <div className="bg-slate-900 dark:bg-[#0a1128] p-12 md:p-16 rounded-[3rem] border border-slate-800 dark:border-[#1e2d4a] shadow-2xl hover:shadow-3xl transition-all duration-500 md:col-span-2 flex flex-col md:flex-row gap-10 items-start relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5"></div>
            <div className="p-6 bg-orange-500/20 rounded-3xl shrink-0 relative z-10">
              <RefreshCcw className="w-12 h-12 text-orange-400" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter">
                {t('info.terms.updates.title', 'Changes to Terms')}
              </h2>
              <p className="text-slate-300 leading-relaxed text-xl font-medium">
                {t('info.terms.updates.desc', 'We reserve the right to modify or replace these Terms at any time. Material changes will be prominently posted on our website prior to taking effect.')}
              </p>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
