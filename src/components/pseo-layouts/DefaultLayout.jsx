import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DefaultLayout({ pseoUseCase }) {
  const { t } = useTranslation();

  if (!pseoUseCase || !pseoUseCase.faqs || pseoUseCase.faqs.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-32 mt-12">
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-blue-100 dark:border-blue-800/50">
          {t('pseo.insights_badge', 'Pro Guide')}
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-[900] tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
          {t('pseo.insights_title', 'Expert Insights & Best Practices')}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pseoUseCase.faqs.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-[#081226] border border-zinc-200 dark:border-[#102040] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl mb-6 shadow-sm border border-blue-100 dark:border-blue-800/30">
              {idx + 1}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">{faq.q}</h3>
            <p className="text-[1.05rem] text-zinc-600 dark:text-zinc-400 leading-relaxed mt-auto">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
