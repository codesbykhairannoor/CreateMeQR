import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Preload English to prevent initial network waterfall & layout delay
import enTranslation from './locales/en/translation.json';

const SUPPORTED_LANGS = [
  'en', 'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const initialResources = {
  en: {
    translation: enTranslation
  }
};

let initialLng;
if (typeof window !== 'undefined') {
  const ssrI18n = window.__INITIAL_I18N__;
  if (ssrI18n && ssrI18n.lang && ssrI18n.data && SUPPORTED_LANGS.includes(ssrI18n.lang)) {
    initialResources[ssrI18n.lang] = { translation: ssrI18n.data };
    initialLng = ssrI18n.lang;
  } else {
    // Match URL path strictly on first paint so SSR English root does not flash another language
    const firstSeg = window.location.pathname.split('/').filter(Boolean)[0];
    initialLng = SUPPORTED_LANGS.includes(firstSeg) ? firstSeg : 'en';
  }
}

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLng,
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS,
    resources: initialResources,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json?v=1.0.4',
    },
    detection: {
      order: ['path', 'htmlTag'],
      caches: [],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
    // Keep preloaded languages synchronous without redundant HTTP fetches
    partialBundledLanguages: true
  });

export default i18n;
