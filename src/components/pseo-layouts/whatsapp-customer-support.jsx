import React from 'react';
import { useTranslation } from 'react-i18next';

export default function WhatsappCustomerSupport({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[800px] mx-auto px-4 sm:px-6 mb-32 mt-16">
      <div className="bg-[#E5DDD5] dark:bg-[#0b141a] rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
        
        {/* Chat Header */}
        <div className="bg-[#008069] dark:bg-[#202c33] p-4 flex items-center gap-4 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-wide leading-tight">
              {t('pseo.insights_title', 'Expert Insights')}
            </h2>
            <span className="text-sm text-green-100 opacity-90">
              {t('pseo.insights_badge', 'PRO GUIDE')}
            </span>
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', backgroundBlendMode: 'overlay', opacity: 0.95 }}>
          {pseoUseCase.faqs.map((faq, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {/* Question Bubble (Right aligned like user asking) */}
              <div className="self-end max-w-[85%] bg-[#d9fdd3] dark:bg-[#005c4b] text-slate-800 dark:text-[#e9edef] p-4 rounded-2xl rounded-tr-sm shadow-sm relative text-[0.95rem]">
                <span className="font-medium">{faq.q}</span>
                {/* Tail */}
                <div className="absolute top-0 -right-2 w-0 h-0 border-t-[10px] border-t-[#d9fdd3] dark:border-t-[#005c4b] border-r-[10px] border-r-transparent"></div>
              </div>
              
              {/* Answer Bubble (Left aligned like expert replying) */}
              <div className="self-start max-w-[85%] bg-white dark:bg-[#202c33] text-slate-700 dark:text-[#d1d7db] p-4 rounded-2xl rounded-tl-sm shadow-sm relative text-[0.95rem]">
                {/* Tail */}
                <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white dark:border-t-[#202c33] border-l-[10px] border-l-transparent"></div>
                <div className="leading-relaxed">
                  {faq.a}
                </div>
                <div className="text-[0.65rem] text-slate-400 text-right mt-2">
                  ✓✓
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
