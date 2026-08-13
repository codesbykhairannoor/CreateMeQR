import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PdfRestaurantMenu({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-32 mt-16">
      <div className="flex flex-col lg:flex-row gap-12 items-center bg-[#FDFBF7] dark:bg-[#1A1814] rounded-3xl p-8 lg:p-16 border border-[#E8E1D5] dark:border-[#2D2A24] shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 dark:bg-amber-900/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/50 dark:bg-orange-900/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="lg:w-1/3 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 font-medium text-sm mb-6 border border-amber-200 dark:border-amber-800/50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {t('pseo.insights_badge', 'PRO GUIDE')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif text-[#2C241B] dark:text-[#E8E1D5] mb-6 leading-tight">
            {t('pseo.insights_title', 'Expert Insights & Best Practices')}
          </h2>
          <p className="text-[#6B5D4D] dark:text-[#A39887] text-lg">
            Essential strategies to ensure your digital menu is always accessible, scannable, and up-to-date.
          </p>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-6 relative z-10">
          {pseoUseCase.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-[#23201B] p-6 lg:p-8 rounded-2xl border border-[#E8E1D5] dark:border-[#3A362D] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <span className="text-2xl font-serif text-amber-500 italic mt-1">0{idx + 1}.</span>
                <div>
                  <h3 className="text-xl font-medium text-[#2C241B] dark:text-[#E8E1D5] mb-3">{faq.q}</h3>
                  <p className="text-[#6B5D4D] dark:text-[#A39887] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
