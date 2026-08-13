# AI AGENT INSTRUCTION: Adding a New pSEO Long-Tail Keyword

> **ATTENTION AI AGENT**: This document contains strict standard operating procedures (SOP) for adding new Programmatic SEO (pSEO) long-tail keyword pages to this repository. You MUST follow these instructions exactly to ensure the 30-language architecture, localized routing, and i18n systems do not break.

## STEP 1: Generate JSON Data for All 30 Languages
When the user asks to create a new long-tail keyword page, you must generate a data object and inject it into the pSEO data arrays within ALL 30 `public/locales/[lang]/translation.json` files. 

**Required JSON Fields for Every Language:**
- `id`: (String) Unique identifier (e.g., `"pseo_ticket_concert"`). Must be identical across all 30 files.
- `baseId`: (String) The core tool this derives from (e.g., `"event"`, `"url"`).
- `slug`: (String) The base English URL slug (e.g., `"qr-code-for-concert-tickets"`). **Must be identical across all 30 files.**
- **`translatedSlug`**: (String) **CRITICAL.** The localized URL slug for the specific language (e.g., `"kode-qr-untuk-tiket-konser"` for Indonesian). The Language Switcher and Canonical SEO tags will break if this is missing or incorrect.
- `title`: (String) Meta Title and Browser Tab Title (Max 60 chars).
- `description`: (String) Meta Description (Max 155 chars).
- `h1`: (String) Main Heading (H1) of the page.
- `body`: (String) Opening paragraph/description.
- `features_title`: (String) Title for the features section.
- `features_desc`: (String) Description for the features section.
- `faqs`: (Array of Objects) Exactly 3 localized Q&As. Format: `[{ "q": "Question?", "a": "Answer." }, ...]`

## STEP 2: Create the React Layout Component
Create a new JSX layout component for the keyword in `src/components/pseo-layouts/`.

**Strict AI Coding Rules for pSEO JSX:**
1. **NO HARDCODED TEXT**: Never hardcode supplementary text (e.g., "PRO GUIDE", "Step 1", "Expert Tips"). You must wrap every single piece of text with the translation function: `t('pseo.your_new_key', 'Fallback English')`.
2. **NO TYPOGRAPHY CLASSES**: Do NOT use `font-serif`, `font-mono`, `font-sans`, or other explicit font-family utility classes. The design must inherit the main website's font system. Use only font-weight (`font-bold`, `font-extrabold`) and sizes for hierarchy.

## STEP 3: Inject New `t()` Keys & Invalidate Browser Cache
If you introduced new translation keys in Step 2:
1. **Inject to 30 Languages**: You MUST inject the new keys into ALL 30 `translation.json` files. Do NOT just put it in English. Write a `.cjs` Node.js script to automate the injection across `public/locales/**/translation.json`.
2. **INCREMENT CACHE-BUSTER (CRITICAL)**: After modifying the JSON files, you **MUST** open `src/i18n.js` and increment the `v=` parameter in the `loadPath` (e.g., change `?v=1.0.2` to `?v=1.0.3`). If you fail to do this, the user's browser will serve the cached JSON, the new keys will be missing, and the UI will incorrectly fallback to English.

## STEP 4: Register the Component in App.jsx
Finally, import your new layout component into `src/App.jsx` and add it to the `getPseoLayout(baseId, layoutType)` switch/conditional statement so the React Router knows which component to render for your new `id`.

---

## 🚫 PITFALLS TO AVOID (DO NOT REPEAT PAST MISTAKES)
1. **Duplicate Hreflang Tags**: `App.jsx` is heavily configured to prevent duplicate hreflang matrices between standard tools and pSEO pages. It uses `pseoUseCase` to dynamically pull the `translatedSlug` for canonical and hreflang tags. Do not alter this conditional logic.
2. **Routing Bugs**: `MainLayout.jsx` relies on `getAllPseoData()` to find the `translatedSlug` when a user switches languages on a pSEO page. If your JSON data in Step 1 is malformed, the Language Switcher will redirect the user to a broken URL.
3. **Module Scripts**: When writing temporary Node.js scripts to automate tasks (like translating JSONs), always use the `.cjs` extension. The repository uses `"type": "module"`, so standard `.js` files using `require()` will throw errors.
