import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SeoArticle({ currentLangCode }) {
  const { t } = useTranslation();
  const keywordString = t('seoKeywords', { returnObjects: true });
  const keywordsStringRaw = typeof keywordString === 'string' ? keywordString : 'qr code generator';
  const keywordsList = keywordsStringRaw.split(',').map(k => k.trim());
  
  const tagTitles = {
    en: "Popular Searches",
    id: "Pencarian Populer",
    fr: "Recherches Populaires",
    es: "Búsquedas Populares",
    de: "Beliebte Suchanfragen",
    it: "Ricerche Popolari",
    pt: "Pesquisas Populares",
    ja: "人気の検索",
    ko: "인기 검색어",
    zh: "热门搜索"
  };
  const sectionTitle = tagTitles[currentLangCode] || tagTitles['en'];

  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-12 px-6 border-t border-zinc-200 dark:border-zinc-800">
      <Helmet>
        <meta name="keywords" content={keywordsStringRaw} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-6">
          {sectionTitle}
        </h3>
        <div className="flex flex-wrap gap-2">
          {keywordsList.map((kw, idx) => (
            <span 
              key={idx}
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
