import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PaymentPaypalDonation({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[1000px] mx-auto px-6 mb-32 mt-16">
      <div className="bg-[#003087] dark:bg-[#001c54] rounded-3xl p-1 shadow-2xl">
        <div className="bg-white dark:bg-slate-900 rounded-[22px] p-8 lg:p-12 h-full w-full">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12 border-b border-slate-100 dark:border-slate-800 pb-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#0070BA] dark:text-[#009cde] flex items-center justify-center shrink-0">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[#0070BA] dark:text-[#009cde] font-bold text-sm tracking-widest uppercase block mb-1">
                {t('pseo.insights_badge', 'PRO GUIDE')}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t('pseo.insights_title', 'Expert Insights & Best Practices')}
              </h2>
            </div>
          </div>

          {/* Q&A Data Table Style */}
          <div className="grid grid-cols-1 gap-4">
            {pseoUseCase.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row gap-6 hover:border-[#0070BA] transition-colors">
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-4 md:pb-0 md:pr-6 shrink-0">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                    {faq.q}
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[0.95rem]">
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
