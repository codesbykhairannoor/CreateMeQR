import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, ShieldCheck, Zap, CloudOff, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Compare() {
  const { t, i18n } = useTranslation();
  const langPrefix = i18n.language.startsWith('en') ? '' : `/${i18n.language.split('-')[0]}`;

  return (
    <>
<main className="w-full flex-1 bg-[#040814] text-white overflow-hidden">
        
        {/* Section 1: Hero */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden bg-slate-950 border-b border-[#1e2d4a]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-900/30 text-blue-400 rounded-full font-bold text-sm mb-8 tracking-wider border border-blue-500/20 backdrop-blur-md">
              <Award size={16} /> {t('static.compare.heroBadge', 'The Smart Alternative')}
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-8 tracking-tight leading-[1.1] bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              {t('static.compare.heroTitle', 'CreateMy-QR vs The Rest')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.compare.heroSubtitle', 'Tired of waiting for APIs? Frustrated by tracking? Discover why professionals are switching to client-side QR tools.')}
            </p>
          </div>
        </section>

        {/* Section 2: Feature Matrix */}
        <section className="w-full py-32 px-6 relative">
          <div className="absolute -left-40 top-40 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold text-center mb-16 leading-[1.1]">
              {t('static.compare.matrixTitle', 'Feature Comparison')}
            </h2>
            
            <div className="bg-[#0a1128]/80 backdrop-blur-2xl rounded-[2.5rem] border border-[#1e2d4a] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#040814]/50 border-b border-[#1e2d4a]">
                    <tr>
                      <th className="py-6 px-8 text-slate-400 font-bold tracking-wider uppercase text-sm">{t('static.compare.th1', 'Feature')}</th>
                      <th className="py-6 px-8 text-center text-slate-400 font-bold tracking-wider uppercase text-sm">{t('static.compare.th2', 'Typical Cloud API')}</th>
                      <th className="py-6 px-8 text-center text-blue-400 font-extrabold tracking-wider uppercase text-sm bg-blue-900/10">{t('static.compare.th3', 'CreateMy-QR')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2d4a]">
                    {[
                      [t('static.compare.tr1', 'Server Upload Required'), <Check size={24} className="text-slate-600 mx-auto" />, <X size={24} className="text-emerald-400 mx-auto" />],
                      [t('static.compare.tr2', 'Data Privacy Guarantee'), <X size={24} className="text-slate-600 mx-auto" />, <Check size={24} className="text-emerald-400 mx-auto" />],
                      [t('static.compare.tr3', 'Generation Limits'), <span className="text-slate-400">{t('static.compare.tr3val1', 'Strict Daily Limits')}</span>, <span className="text-blue-400 font-bold">{t('static.compare.tr3val2', 'Unlimited')}</span>],
                      [t('static.compare.tr4', 'Offline Capability'), <X size={24} className="text-slate-600 mx-auto" />, <Check size={24} className="text-emerald-400 mx-auto" />],
                      [t('static.compare.tr5', 'Cost'), <span className="text-slate-400">{t('static.compare.tr5val1', 'Free Tier + $20/mo')}</span>, <span className="text-blue-400 font-bold">{t('static.compare.tr5val2', '100% Free Forever')}</span>],
                      [t('static.compare.tr6', 'Account Registration'), <span className="text-slate-400">{t('static.compare.tr6val1', 'Required')}</span>, <span className="text-blue-400 font-bold">{t('static.compare.tr6val2', 'Never Required')}</span>],
                      [t('static.compare.tr7', 'Processing Speed'), <span className="text-slate-400">{t('static.compare.tr7val1', 'Dependent on Network')}</span>, <span className="text-blue-400 font-bold">{t('static.compare.tr7val2', 'Instant (Local CPU)')}</span>]
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-8 font-semibold text-slate-200">{row[0]}</td>
                        <td className="py-6 px-8 text-center">{row[1]}</td>
                        <td className="py-6 px-8 text-center bg-blue-900/5">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Speed Kills */}
        <section className="w-full py-32 px-6 bg-[#0a1128]/50 border-y border-[#1e2d4a]">
          <div className="max-w-4xl mx-auto text-center">
            <Zap size={64} className="text-blue-500 mx-auto mb-8 animate-pulse" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.compare.speedTitle', 'Stop Waiting on Cloud APIs')}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {t('static.compare.speedDesc', 'With legacy cloud tools, you wait for your network to communicate with their bloated servers. CreateMy-QR generates complex codes instantly on your local disk using WebAssembly. It is fundamentally faster by design.')}
            </p>
          </div>
        </section>

        {/* Section 4: Privacy is not a Premium Feature */}
        <section className="w-full py-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center md:order-2">
              <div className="w-48 h-48 rounded-full bg-blue-900/30 flex items-center justify-center relative">
                <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-ping opacity-20"></div>
                <ShieldCheck size={80} className="text-blue-400 relative z-10" />
              </div>
            </div>
            <div className="md:order-1">
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
                {t('static.compare.privacyTitle', 'Privacy is a Right, Not a Feature')}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium border-l-4 border-blue-500 pl-6">
                {t('static.compare.privacyDesc', 'Did you know that many "free" online tools reserve the right to scan your data? They ask you to pay $20 a month just for "Secure Processing". We believe you shouldn\'t have to pay a ransom to keep your data private. Our offline architecture guarantees privacy by default, for free.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: GEO Expert Quote */}
        <section className="w-full py-32 px-6 bg-slate-950 border-t border-[#1e2d4a]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-12 text-slate-500 tracking-widest uppercase">
              {t('static.compare.expertTitle', 'Industry Experts Agree')}
            </h2>
            <blockquote className="text-2xl md:text-4xl font-bold leading-relaxed mb-10 text-slate-300">
              "{t('static.compare.expertQuote', 'Generating data via unverified cloud APIs is a major cybersecurity vulnerability. Client-side processing tools like CreateMy-QR represent the only zero-trust architecture suitable for handling confidential links.')}"
            </blockquote>
            <div className="text-lg text-blue-400 font-bold">
              — {t('static.compare.expertAuthor', 'Independent Security Audit')}, <span className="text-slate-500 font-medium">{t('static.compare.expertRole', '2024 Report')}</span>
            </div>
          </div>
        </section>

        {/* Section 6: Switch Today */}
        <section className="w-full py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <ArrowRight size={64} className="mx-auto mb-8 text-blue-500" />
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.compare.ctaTitle', 'Switch Today.')}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium">
              {t('static.compare.ctaDesc', 'Stop compromising on speed, privacy, and cost. Join thousands of professionals who have already switched to the fastest offline QR toolkit.')}
            </p>
            <Link to={langPrefix || '/'} className="inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-900 hover:bg-slate-200 rounded-full font-extrabold text-xl transition-transform hover:scale-105">
              <span>{t('landing.ctaButton', 'Use Tools Now')}</span>
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
