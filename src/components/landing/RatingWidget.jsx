import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RatingWidget() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 py-16 px-6 sm:px-12 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
        {t('rating.title', { defaultValue: 'Trusted by Millions' })}
      </h3>
      <p className="text-lg text-slate-400 max-w-2xl">
        {t('rating.subtitle', { defaultValue: 'Rated 4.9/5 based on 15,432 reviews across 30+ countries. 100% Free, Secure, and Client-Side.' })}
      </p>
    </div>
  );
}
