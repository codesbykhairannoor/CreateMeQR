import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function EmailNewsletterSignup({ pseoUseCase }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(0);

  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[900px] mx-auto px-6 mb-32 mt-16">
      <div className="bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-2xl p-4 shadow-inner">
        {/* Inbox Window Frame */}
        <div className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          
          {/* Header */}
          <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="font-medium text-sm text-zinc-500 ml-4">
                {t('pseo.insights_title', 'Expert Insights')}
              </span>
            </div>
            <span className="text-xs bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded font-bold">
              {t('pseo.insights_badge', 'PRO GUIDE')}
            </span>
          </div>

          {/* Email Rows */}
          <div className="flex flex-col">
            {pseoUseCase.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border-b border-zinc-100 dark:border-zinc-800 last:border-0 cursor-pointer transition-colors ${expanded === idx ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                onClick={() => setExpanded(idx === expanded ? -1 : idx)}
              >
                <div className="p-4 flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${expanded === idx ? 'bg-transparent' : 'bg-blue-500'}`}></div>
                  <div className="flex-1 truncate">
                    <span className={`font-semibold text-zinc-900 dark:text-zinc-100 ${expanded === idx ? '' : 'truncate'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 font-bold">
                    10:0{idx + 1} AM
                  </div>
                </div>
                
                {/* Email Body */}
                <div className={`overflow-hidden transition-all duration-300 ${expanded === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-2 pl-10 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed border-l-2 border-blue-500/20 ml-5 mb-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
