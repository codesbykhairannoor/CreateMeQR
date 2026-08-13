import React from 'react';
import { useTranslation } from 'react-i18next';

export default function UrlEventTickets({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[900px] mx-auto px-6 mb-32 mt-16">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-2 bg-pink-500"></div>
          <div>
            <span className="text-pink-600 dark:text-pink-400 font-bold tracking-widest text-xs uppercase">
              {t('pseo.insights_badge', 'PRO GUIDE')}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {t('pseo.insights_title', 'Expert Insights')}
            </h2>
          </div>
        </div>

        {pseoUseCase.faqs.map((faq, idx) => (
          <div key={idx} className="relative flex shadow-md group hover:shadow-xl transition-shadow duration-300">
            {/* Left stub of the ticket */}
            <div className="w-16 md:w-24 bg-pink-500 text-white flex flex-col items-center justify-center rounded-l-2xl border-r-2 border-dashed border-pink-700/30 relative">
              <span className="rotate-[-90deg] font-bold tracking-widest uppercase text-sm md:text-base whitespace-nowrap">
                INFO {idx + 1}
              </span>
              <div className="absolute top-0 -mt-2 w-4 h-4 bg-white dark:bg-[#0B1120] rounded-full"></div>
              <div className="absolute bottom-0 -mb-2 w-4 h-4 bg-white dark:bg-[#0B1120] rounded-full"></div>
            </div>
            
            {/* Main ticket body */}
            <div className="flex-1 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-r-2xl relative">
              <div className="absolute top-0 -mt-2 -ml-2 w-4 h-4 bg-white dark:bg-[#0B1120] rounded-full"></div>
              <div className="absolute bottom-0 -mb-2 -ml-2 w-4 h-4 bg-white dark:bg-[#0B1120] rounded-full"></div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                {faq.q}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[0.95rem]">
                {faq.a}
              </p>
              
              {/* Fake barcode at the bottom */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 opacity-20">
                <div className="h-6 w-full flex gap-[2px]">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="h-full bg-slate-900 dark:bg-white" style={{ width: Math.random() * 4 + 1 + 'px' }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
