import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, Lock, Database, EyeOff, Cpu } from 'lucide-react';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{`${t('appTitle', 'CreateMy-QR')} | ${t('static.privacy.seoTitle', 'Privacy Policy')}`}</title>
      </Helmet>
      
      <main className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white overflow-hidden">
        
        {/* Section 1: Hero Vault */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/20 dark:bg-emerald-600/20 blur-[150px] opacity-60 rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-[#0a1128] border-2 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <ShieldAlert size={48} />
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-6 tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              {t('static.privacy.heroTitle', 'Privacy Policy')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.privacy.heroSubtitle', 'Your data is yours. We keep it that way.')}
            </p>
          </div>
        </section>

        {/* Section 2: Data Handling Matrix */}
        <section className="w-full py-24 px-6 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full font-bold text-sm mb-8 tracking-wider">
              01 &mdash; {t('static.privacy.policyTitle', 'The Zero-Upload Commitment')}
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-10 leading-[1.1]">
              {t('static.privacy.zeroTracking', 'Zero Tracking')}
            </h2>
            <div className="bg-white dark:bg-[#0a1128] p-10 md:p-14 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-xl border-l-8 border-l-emerald-500">
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.privacy.policyDesc', 'Unlike other platforms, CreateMy-QR operates entirely on the client-side. When you generate a QR code, the process happens locally on your machine.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Zero Data Collection */}
        <section className="w-full py-32 px-6 bg-white/50 dark:bg-[#060c1c]/50 backdrop-blur-xl border-y border-slate-200 dark:border-[#102040]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 rounded-[2rem] bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] border-t-4 border-t-emerald-500 shadow-xl hover:-translate-y-2 transition-transform duration-500 group">
                <Lock size={40} className="text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-extrabold mb-4">{t('static.privacy.zeroTracking', 'Zero Tracking')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.privacy.zeroTrackingDesc', 'We don\'t use invasive trackers or log your generated contents.')}
                </p>
              </div>
              <div className="p-10 rounded-[2rem] bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] border-t-4 border-t-emerald-500 shadow-xl hover:-translate-y-2 transition-transform duration-500 group">
                <Database size={40} className="text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-extrabold mb-4">{t('static.privacy.clientSide', 'Client-Side Only')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.privacy.clientSideDesc', 'All QR codes are generated directly inside your browser memory.')}
                </p>
              </div>
              <div className="p-10 rounded-[2rem] bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] border-t-4 border-t-emerald-500 shadow-xl hover:-translate-y-2 transition-transform duration-500 group">
                <EyeOff size={40} className="text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-extrabold mb-4">{t('static.privacy.ssl', 'SSL Encrypted')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.privacy.sslDesc', 'Even though nothing is uploaded, our site is served over strict HTTPS.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How Client-Side Works */}
        <section className="w-full py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full font-bold text-sm mb-8 tracking-wider">
              02 &mdash; {t('static.about.architecture', 'Architecture')}
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-10 leading-[1.1]">
              {t('static.privacy.clientSide', 'Client-Side Only')}
            </h2>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-12 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
              <Cpu size={80} className="mx-auto mb-8 opacity-90" />
              <p className="text-xl md:text-2xl leading-relaxed font-medium max-w-2xl mx-auto">
                {t('static.privacy.clientSideDesc', 'All QR codes are generated directly inside your browser memory.')}
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
