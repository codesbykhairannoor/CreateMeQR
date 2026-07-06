// site.js
// Centralized configuration for routes and supported languages

export const PSEO_ROUTES = {
  '/': 'url',
  '/wifi-qr-code-generator': 'wifi',
  '/vcard-qr-code-maker': 'vcard',
  '/text-qr-code-generator': 'text',
  '/email-qr-code-generator': 'email',
  '/sms-qr-code-generator': 'sms',
  '/phone-qr-code-generator': 'phone',
  '/event-qr-code-generator': 'event',
  '/google-maps-qr-code': 'location',
};

// 30 Languages Supported
export const LANGS = [
  { code: 'en', label: 'English',        flag: '🇺🇸' },
  { code: 'id', label: 'Indonesia',       flag: '🇮🇩' },
  { code: 'es', label: 'Español',         flag: '🇪🇸' },
  { code: 'fr', label: 'Français',        flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',         flag: '🇩🇪' },
  { code: 'pt', label: 'Português',       flag: '🇧🇷' },
  { code: 'zh', label: '中文',            flag: '🇨🇳' },
  { code: 'ja', label: '日本語',          flag: '🇯🇵' },
  { code: 'hi', label: 'हिन्दी',          flag: '🇮🇳' },
  { code: 'ko', label: '한국어',          flag: '🇰🇷' },
  { code: 'ar', label: 'العربية',         flag: '🇸🇦' },
  { code: 'ru', label: 'Русский',         flag: '🇷🇺' },
  { code: 'it', label: 'Italiano',        flag: '🇮🇹' },
  { code: 'tr', label: 'Türkçe',          flag: '🇹🇷' },
  { code: 'nl', label: 'Nederlands',      flag: '🇳🇱' },
  { code: 'pl', label: 'Polski',          flag: '🇵🇱' },
  { code: 'sv', label: 'Svenska',         flag: '🇸🇪' },
  { code: 'vi', label: 'Tiếng Việt',      flag: '🇻🇳' },
  { code: 'th', label: 'ไทย',            flag: '🇹🇭' },
  { code: 'el', label: 'Ελληνικά',        flag: '🇬🇷' },
  { code: 'cs', label: 'Čeština',         flag: '🇨🇿' },
  { code: 'da', label: 'Dansk',           flag: '🇩🇰' },
  { code: 'fi', label: 'Suomi',           flag: '🇫🇮' },
  { code: 'no', label: 'Norsk',           flag: '🇳🇴' },
  { code: 'hu', label: 'Magyar',          flag: '🇭🇺' },
  { code: 'ro', label: 'Română',          flag: '🇷🇴' },
  { code: 'uk', label: 'Українська',      flag: '🇺🇦' },
  { code: 'ms', label: 'Bahasa Melayu',   flag: '🇲🇾' },
  { code: 'tl', label: 'Filipino',        flag: '🇵🇭' },
  { code: 'bn', label: 'বাংলা',           flag: '🇧🇩' },
];
