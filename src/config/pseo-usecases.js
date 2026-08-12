// pseo-usecases.js
// Dynamically loads all 30 languages from pseo-locales

let pseoDataByLang = {};

// When running in Vite (Browser/Client)
if (typeof import.meta !== 'undefined' && import.meta.glob) {
  const modules = import.meta.glob('./pseo-locales/*.json', { eager: true });
  for (const path in modules) {
    const lang = path.replace('./pseo-locales/', '').replace('.json', '');
    pseoDataByLang[lang] = modules[path].default || modules[path];
  }
} else {
  // When running in Node (SSG Build)
  // We do not need this in generate-ssg.cjs anymore since it loads it manually,
  // but just in case, we mock it empty so it doesn't crash.
}

/**
 * Get the pSEO use case by slug.
 * Since slugs are unique across all languages, we search all languages for a matching slug.
 */
export function getPseoUseCase(slug) {
  const cleanSlug = slug.replace(/^\/+/, ''); // remove leading slash
  
  for (const lang in pseoDataByLang) {
    const cases = pseoDataByLang[lang] || [];
    // We check both absolute /slug and clean slug
    const found = cases.find(uc => uc.slug === cleanSlug || uc.slug === slug || '/' + uc.slug === slug);
    if (found) {
      return { ...found, lang }; // inject language context
    }
  }
  return null;
}

/**
 * Returns all use cases for a specific language
 */
export function getUseCasesForLang(lang = 'en') {
  return pseoDataByLang[lang] || [];
}
