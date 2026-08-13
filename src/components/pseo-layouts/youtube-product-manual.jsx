import React from 'react';
import { useTranslation } from 'react-i18next';

export default function YoutubeProductManual({ pseoUseCase }) {
  const { t } = useTranslation();
  if (!pseoUseCase?.faqs) return null;

  return (
    <section className="max-w-[1000px] mx-auto px-6 mb-32 mt-16">
      <div className="bg-[#181818] rounded-2xl overflow-hidden border border-[#303030] shadow-2xl">
        {/* Fake Video Player Header Area */}
        <div className="bg-black aspect-[21/9] flex items-center justify-center relative border-b border-[#303030]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          
          <div className="text-center z-10 relative px-4">
            <div className="inline-block bg-[#cc0000] text-white text-xs font-bold px-2 py-1 rounded mb-4 tracking-wider">
              {t('pseo.insights_badge', 'PRO GUIDE')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {t('pseo.insights_title', 'Expert Insights')}
            </h2>
          </div>
          
          {/* YouTube style progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#333333]">
            <div className="h-full bg-[#ff0000] w-1/3"></div>
          </div>
        </div>

        {/* Chapters / Insights below player */}
        <div className="p-6 md:p-10">
          <h3 className="text-[#aaaaaa] font-medium mb-6 uppercase tracking-wider text-sm">
            Video Chapters & FAQs
          </h3>
          <div className="flex flex-col gap-6">
            {pseoUseCase.faqs.map((faq, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="w-24 md:w-32 aspect-video bg-[#282828] rounded-lg shrink-0 flex items-center justify-center border border-[#333333] group-hover:border-[#aaaaaa] transition-colors relative overflow-hidden">
                  <span className="text-[#aaaaaa] text-xs absolute bottom-1 right-1 bg-black/80 px-1 rounded">0{idx + 1}:00</span>
                  <svg className="w-6 h-6 text-[#aaaaaa]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#f1f1f1] mb-2">{faq.q}</h4>
                  <p className="text-[#aaaaaa] text-[0.95rem] leading-relaxed max-w-2xl">
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
