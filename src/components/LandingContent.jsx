import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, ShieldCheck, Zap, Award, ChevronDown, ChevronUp, Sparkles, HelpCircle, Layers } from 'lucide-react';
import { landingTranslations } from '../landingTranslations';

export default function LandingContent() {
  const { i18n } = useTranslation();
  const lang = i18n.language && landingTranslations[i18n.language] ? i18n.language : 'en';
  const t = landingTranslations[lang] || landingTranslations.en;

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 space-y-24">
      
      {/* SECTION 1: COMPETITOR DEMOLITION (BANTAI MEREKA) */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold">
            <Sparkles className="w-4 h-4" /> Why We Lead The Market
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {t.heroTitle}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg">
            {t.heroSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-900/80 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Forever Free</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t.comp1Title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{t.comp1Desc}</p>
          </div>

          <div className="bg-white dark:bg-zinc-900/80 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Zero Spam</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t.comp2Title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{t.comp2Desc}</p>
          </div>

          <div className="bg-white dark:bg-zinc-900/80 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">100% Private</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{t.comp3Title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{t.comp3Desc}</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: 3 SIMPLE STEPS GUIDE */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-8 md:p-14 border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
            <Layers className="w-4 h-4 text-blue-400" /> Quick Start Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.stepsTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-blue-500/30">1</div>
            <h3 className="text-lg font-semibold mb-2">{t.step1Title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{t.step1Desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-emerald-500/30">2</div>
            <h3 className="text-lg font-semibold mb-2">{t.step2Title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{t.step2Desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-purple-500/30">3</div>
            <h3 className="text-lg font-semibold mb-2">{t.step3Title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{t.step3Desc}</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: FAQ ACCORDION */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-blue-500" /> Got Questions?
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{t.faqTitle}</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: t.faq1Q, a: t.faq1A },
            { q: t.faq2Q, a: t.faq2A },
            { q: t.faq3Q, a: t.faq3A },
            { q: t.faq4Q, a: t.faq4A }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all shadow-sm">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-base md:text-lg">{item.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-blue-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 pt-2 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: SECURITY CERTIFICATIONS */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Award className="w-5 h-5" /> {t.standardsTitle}
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t.standardsDesc}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-bold text-xs text-zinc-800 dark:text-zinc-200 shadow-sm">
            Global Barcode Rules
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-bold text-xs text-zinc-800 dark:text-zinc-200 shadow-sm">
            Federal Safety Gold
          </div>
        </div>
      </div>

    </div>
  );
}
