import React from 'react';
import { useTranslation } from 'react-i18next';

export default function VcardRealEstate({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[1000px] mx-auto px-6 mb-32 mt-16">
      <div className="bg-slate-900 rounded-[32px] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
        {/* Subtle gold glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="border-b border-white/10 pb-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <span className="text-yellow-500 font-bold tracking-[0.2em] text-sm mb-4 block uppercase">
              {t('pseo.insights_badge', 'PRO GUIDE')}
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">
              {t('pseo.insights_title', 'Expert Insights')}
            </h2>
          </div>
          <div className="w-16 h-1 bg-yellow-500"></div>
        </div>

        <div className="relative z-10">
          {/* Vertical timeline line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10 hidden md:block"></div>
          
          <div className="space-y-12">
            {pseoUseCase.faqs.map((faq, idx) => (
              <div key={idx} className="flex gap-8 relative group">
                <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 group-hover:border-yellow-500 flex items-center justify-center shrink-0 z-10 transition-colors duration-300 hidden md:flex text-slate-400 group-hover:text-yellow-500">
                  <span className="italic text-xl font-bold">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-100 mb-4 tracking-wide group-hover:text-white transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-[1.05rem] max-w-2xl">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
