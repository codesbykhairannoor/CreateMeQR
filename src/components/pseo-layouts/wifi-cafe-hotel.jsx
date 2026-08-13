import React from 'react';
import { useTranslation } from 'react-i18next';

export default function WifiCafeHotel({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-32 mt-16 relative">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-50 dark:from-teal-900/20 via-transparent to-transparent -z-10 rounded-[3rem]"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 mb-6 shadow-sm">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t('pseo.insights_title', 'Expert Insights')}
        </h2>
        <span className="text-teal-600 dark:text-teal-400 font-semibold tracking-widest uppercase text-sm">
          {t('pseo.insights_badge', 'PRO GUIDE')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pseoUseCase.faqs.map((faq, idx) => (
          <div key={idx} className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-md border border-white/50 dark:border-slate-700/50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold mb-6">
              {idx + 1}
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">{faq.q}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[0.95rem]">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
