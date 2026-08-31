# Programmatic SEO (pSEO) & Translation Rules

## 1. Automated Translations
- **Required Library**: Always use `google-translate-api-x` for any node.js translation scripts.
- **Why**: It is faster and supports batch translations (translating arrays/objects in a single request), which is critical for generating 30-language pSEO content quickly.

## 2. Long Tail Keyword Pages (pSEO) Guidelines
When generating or creating new Long Tail Keyword pages, you must strictly adhere to the following formula:
- **30 Languages (Partial Lang)**: The URL structure must support 30 localized languages (e.g., `/en/slug`, `/id/slug`).
- **Unique Content (Isi Beda-Beda)**: Content, features, and FAQs must be highly relevant to the specific long-tail keyword. No generic placeholder text.
- **Unique Layouts (Layout Beda-Beda)**: The visual structure (Bento grids, split screens, zigzag features) must vary between tools so the pages do not look like templated spam.
- **Unique Meta Tags**: Every page must have a highly optimized Meta Title, Meta Description, and Tab Title specific to the keyword and language.
- **Strict Typography Invariant (Aturan Font Tetap Sama)**: Despite layout variations, the typography MUST NOT deviate from the base design system:
  - Font Family: `var(--font-main)`
  - ClassNames: `font-bold tracking-tighter` for all headings.
  - Hero Titles: `clamp(40px, 5vw, 64px)` or `clamp(40px, 6vw, 64px)` with `lineHeight: 1.1`.
  - Section Titles: `clamp(32px, 5vw, 48px)`.
  - Feature/Card Titles: `24px`.
  - Paragraphs: `16px` to `18px`, `lineHeight: 1.6`, color `var(--hq-text-muted)`.
