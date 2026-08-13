// pseo-usecases.js
// Dynamically loads all locale files using Vite's import.meta.glob (static analysis required)

// Must be called at TOP LEVEL - Vite needs to statically analyze this at compile time
const modules = import.meta.glob('./pseo-locales/*.json', { eager: true });

const pseoDataByLang = {};
for (const filePath in modules) {
  const lang = filePath.replace('./pseo-locales/', '').replace('.json', '');
  pseoDataByLang[lang] = modules[filePath].default || modules[filePath];
}

/**
 * Get the pSEO use case by slug.
 * Searches across all loaded locale files for a matching slug.
 * @param {string} slug - the URL slug (e.g. '/pdf-qr-code-for-restaurant-menu')
 * @returns {object|null} the use case object (with a `lang` field injected) or null
 */
export function getPseoUseCase(slug, preferredLang = 'en') {
  if (!slug) return null;
  const cleanSlug = slug.replace(/^\/+/, ''); // strip leading slash

  // 1. Try the preferred language first (e.g. 'id' when visiting /id/...)
  const preferredCases = pseoDataByLang[preferredLang] || [];
  const preferredFound = preferredCases.find(
    uc => uc.slug === cleanSlug || uc.slug === slug || '/' + uc.slug === slug
       || uc.translatedSlug === cleanSlug || uc.translatedSlug === slug || '/' + (uc.translatedSlug || '') === slug
  );
  if (preferredFound) return { ...preferredFound, lang: preferredLang };

  // 2. Fallback to English
  const enCases = pseoDataByLang['en'] || [];
  const enFound = enCases.find(
    uc => uc.slug === cleanSlug || uc.slug === slug || '/' + uc.slug === slug
       || uc.translatedSlug === cleanSlug || uc.translatedSlug === slug
  );
  if (enFound) return { ...enFound, lang: 'en' };

  // 3. Search all other languages as a last resort
  for (const lang in pseoDataByLang) {
    if (lang === preferredLang || lang === 'en') continue;
    const cases = pseoDataByLang[lang] || [];
    const found = cases.find(
      uc => uc.slug === cleanSlug || uc.slug === slug || '/' + uc.slug === slug
         || uc.translatedSlug === cleanSlug || uc.translatedSlug === slug
    );
    if (found) return { ...found, lang };
  }
  return null;
}

/**
 * Returns all use cases for a specific language.
 * @param {string} lang - e.g. 'en', 'fr', 'id'
 */
export function getUseCasesForLang(lang = 'en') {
  return pseoDataByLang[lang] || [];
}

/**
 * Returns the full map of all languages and their use cases.
 */
export function getAllPseoData() {
  return pseoDataByLang;
}

// Legacy export for any code that still imports pseoUseCases directly
export const pseoUseCases = pseoDataByLang['en'] || [];
