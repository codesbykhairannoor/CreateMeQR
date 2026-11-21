# AGENTS.md — CreateMy-QR Repository Guide & SEO/GEO Guardrails

This file is the canonical engineering and SEO/GEO reference for AI agents and developers working on **CreateMy-QR** (`https://createmy-qr.com`). Read this before editing any code, routes, translations, build scripts, or deployment configs.

---

## 1. Project Identity & Stack

- **Canonical Brand Name:** `CreateMy-QR` (naked domain: `https://createmy-qr.com`, NO `www`).
  - **NEVER** use `CreateMe-QR` or `CreateMeQR` in UI copy, SEO metadata, JSON-LD, `llms*.txt`, or `.well-known/ai-plugin.json`. The only valid occurrence of `CreateMeQR` is the GitHub repository URL (`https://github.com/codesbykhairannoor/CreateMeQR`).
- **Tech Stack:** React 19 + Vite 8 + Tailwind CSS v4 + `i18next` + `react-helmet-async` + SSR/SSG (`generate-ssg.cjs`) hosted on Vercel (`vercel.json`).
- **Supported Languages (30):**
  `en`, `id`, `es`, `fr`, `de`, `ja`, `ko`, `zh`, `ar`, `hi`, `pt`, `ru`, `it`, `nl`, `tr`, `vi`, `th`, `ms`, `pl`, `uk`, `sv`, `no`, `da`, `fi`, `cs`, `ro`, `hu`, `el`, `bn`, `tl`.
  - English (`en`) is served at root (`/`); all other 29 languages are served under `/<lang>/`.
- **Canonical Page Count:** `1,410` pages (`47` canonical routes × `30` languages).

---

## 2. Architecture Map (Active Production Files vs Legacy Noise)

### Active Production Pipeline
| Area | Authoritative Files | Role |
| :--- | :--- | :--- |
| **SPA & Routing** | `src/App.jsx`, `src/config/localizedRoutes.js`, `src/entry-server.jsx` | Canonical route resolution, `<Helmet>` meta/hreflang/JSON-LD, SSR entry |
| **i18n & Hydration** | `src/i18n.js`, `public/locales/<lang>/translation.json`, `src/locales/en/translation.json` | Synchronous SSR hydration via `window.__INITIAL_I18N__` + 30 locale bundles |
| **Core UI & Pages** | `src/layouts/MainLayout.jsx`, `src/pages/*`, `src/components/landing/*`, `src/components/nav/MegaNav.jsx`, `src/components/Footer.jsx` | Core QR/Barcode tools, scanner, company pages |
| **SSG Builder** | `generate-ssg.cjs` | Renders 1,410 canonical HTML files + static fallback redirect stubs into `dist/` |
| **Sitemaps & Feed** | `generate-sitemap.cjs`, `generate-feed.cjs`, `public/sitemap*.xml`, `public/feed.xml` | 30 localized sitemaps + `sitemap_index.xml` + `sitemap.xml` + RSS feed |
| **Edge Config** | `vercel.json`, `public/robots.txt` | HTTP `301` redirects (`redirects`), security/cache/`Link` headers, RFC 9309 crawl rules |
| **GEO / AI Discovery** | `public/llms.txt`, `public/llms-full.txt`, `public/llms-<lang>.txt` (30), `public/.well-known/ai-plugin.json` | Machine-readable docs & tool capabilities for AI search/agents |
| **Audit & QA** | `fast-super-test.cjs`, `audit-30-csvs.cjs`, `tests/qa-user-roles.spec.js` | Post-build HTML/SEO verifier and Playwright user-role QA |
| **CI/CD** | `.github/workflows/daily-indexing.yml` (manual IndexNow only), `.github/workflows/security.yml` | Scheduled Google Indexing API cron is **intentionally disabled** |

### Legacy / Historical Files to Ignore
- The repository root and `scripts/` contain historical one-off patch/migration scripts (`patch-*.cjs`, `inject-*.cjs`, `translate-*.cjs`, `upgrade-*.cjs`, `test.html`, `NEWCSV/`, `CreateCSV/`, `*.md` audit notes). Do **not** assume they reflect current production rules.
- `src/config/pseo-locales/*.json` is kept **strictly** so `generate-ssg.cjs` can emit static HTML redirect stubs to canonical core tools. **Never** import `pseo-usecases` or `pseo-layouts` into client-side `src/` code.

---

## 3. Non-Negotiable SEO, GEO & Engineering Guardrails

1. **Zero pSEO / Thin Content Revival**
   - Do not create programmatic industry/use-case clone pages across languages.
   - All consolidated pSEO URLs must stay `301` redirected in `vercel.json` to their canonical core tool URL (e.g., `/pdf-qr-code-for-restaurant-menu` → `/pdf-qr-code-generator`).
2. **Protect SSR Hydration for Non-English Routes**
   - `generate-ssg.cjs` injects `window.__INITIAL_I18N__` synchronously for non-`en` pages, and `src/i18n.js` reads it with `useSuspense: false`.
   - Never revert to async-only client loading or wrap `<App />` in a blocking `<LoadingScreen />` during SSR/hydration—crawlers will see an empty shell.
3. **Authentic Claims & Clean Structured Data**
   - Never fabricate `aggregateRating`, review counts, star ratings, or fake testimonials in JSON-LD or `translation.json`.
   - Keep technical claims accurate: engine runs client-side in JavaScript/WebAssembly (not Rust/C++).
   - Keep **Free Core** vs **PRO Paid** claims consistent across UI, `public/llms*.txt`, and `public/.well-known/ai-plugin.json` (Free unlimited standard PNG/SVG QR tools; PRO unlocks Batch CSV→ZIP exports, cloud history sync, high-res print formats, and extended Batch Scanner quota).
4. **Clean Semantic HTML & Meta Tags**
   - Exactly **one** `<title>`, **one** `<meta name="description">`, **one** `<h1>`, and matching `<link rel="canonical">` + `og:url` per page.
   - Never inject `<meta name="keywords">` or `SeoArticle` keyword-stuffing blocks.
   - Never use `<h2>` for small UI headers inside drawers, modals, previews, rating widgets, or footer—use `<p>` or `<span>`, and never nest `<main>` tags.
   - Ensure `formatSeoTitle` never double-brands (`| CreateMy-QR | CreateMy-QR`) and `formatMetaDescription` cuts cleanly at word boundaries without appending English text to CJK/non-EN descriptions.
5. **30-Language Completeness**
   - Whenever adding or modifying UI/SEO translation keys, update **all 30** `public/locales/<lang>/translation.json` files (and `src/locales/en/translation.json` when applicable). Never ship untranslated English SEO titles/descriptions in non-English locales.
6. **Vercel Edge & Crawl Hygiene**
   - Header keys in `vercel.json` merge/overwrite case-insensitively on Vercel—never duplicate `Link` headers in a way that strips `Link: <https://createmy-qr.com/llms.txt>; rel="llms-txt"`.
   - `public/robots.txt` must reference only `sitemap_index.xml` and `sitemap.xml` (never stale `feed.xml` or redundant individual language sitemaps).
   - Every URL in `sitemap-*.xml` must return HTTP `200` directly and match `<link rel="canonical">` verbatim (never put `301` URLs inside sitemaps).
7. **Bundle & QA Constraints**
   - Keep heavy libraries (`html5-qrcode`, `jspdf`, `bwip-js`, `html2canvas`, `firebase`) lazy-loaded and split via `vite.config.js` `manualChunks`. Target `< 1 MB` for the main `dist/assets/index-*.js` entry bundle.
   - Preserve QA test selectors used by `tests/qa-user-roles.spec.js`: `nav button:has-text("Sign In")`, `button:has-text("PNG")`, `button:has-text("SVG")`, and `/bulk-qr-generator`.

---

## 4. Mandatory Verification Checklist (Run Before Every Push)

1. **Build & SSG Integrity:**
   ```bash
   npm run build
   ```
   Confirm `1,410` primary pages pass in `fast-super-test.cjs` with `0` broken URLs and `dist/assets/index-*.js` remains `< 1 MB`.
2. **SEO & Lint Gates:**
   ```bash
   npm run test:seo
   npx oxlint --quiet src/ generate-ssg.cjs generate-feed.cjs generate-sitemap.cjs
   ```
   Must exit with `0` errors.
3. **Raw `dist/` + Live Spot Check (Do Not Trust Dev Mode Alone):**
   - Inspect raw generated HTML in `dist/` (e.g., `dist/index.html`, `dist/id/index.html`, `dist/ja/index.html`) for `<title>`, `<meta name="description">`, `<link rel="canonical">`, `window.__INITIAL_I18N__`, and absence of `<LoadingScreen />`.
   - After deploying to Vercel, verify live endpoints (`curl -sI https://createmy-qr.com`, `/id`, sample `301` redirects, `/robots.txt`, `/sitemap_index.xml`, `/llms.txt`).
