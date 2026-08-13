import React from 'react';
import { useTranslation } from 'react-i18next';

export default function GoogleReviewLocalBusiness({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[1000px] mx-auto px-6 mb-32 mt-16">
      <div className="flex flex-col items-center mb-12">
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-8 h-8 text-yellow-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white text-center">
          {t('pseo.insights_title', 'Expert Insights')}
        </h2>
        <span className="mt-4 px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm font-medium border border-blue-100">
          {t('pseo.insights_badge', 'PRO GUIDE')}
        </span>
      </div>

      <div className="space-y-6">
        {pseoUseCase.faqs.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
                {String.fromCharCode(65 + idx)} {/* A, B, C */}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{faq.q}</h3>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[1.05rem]">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
