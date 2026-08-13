import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AppstoreGameDownload({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-32 mt-16">
      <div className="bg-[#0f172a] rounded-[2rem] p-[2px] relative overflow-hidden shadow-2xl">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 animate-pulse"></div>
        
        <div className="bg-[#0f172a] rounded-[2rem] p-8 lg:p-12 h-full w-full relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-tighter">
                {t('pseo.insights_title', 'Expert Insights')}
              </h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-cyan-400 text-sm tracking-widest font-bold">
              [{t('pseo.insights_badge', 'PRO GUIDE')}]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pseoUseCase.faqs.map((faq, idx) => (
              <div key={idx} className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-cyan-500/30 transition-colors"></div>
                <div className="text-cyan-400 text-xs mb-4 uppercase tracking-widest opacity-80 font-bold">
                  // FAQ_0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                  {faq.q}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
