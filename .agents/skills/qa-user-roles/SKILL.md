---
name: qa-user-roles
description: Automated local QA testing engine for verifying user roles, permissions, feature gating, and freemium trial limits (Guest, Free User, PRO User) across CreateMy-QR without remote CI dependencies.
---

# QA User Roles & Feature Gating Skill

This skill provides an automated, zero-config local QA testing engine for **CreateMy-QR**. It allows the agent and developer to verify that all feature gates, permission rules, freemium trials, and account management tools behave accurately across different user roles.

---

## 1. User Roles & Permission Matrix

| Feature / Action | 👤 Guest (Unauthenticated) | 🔑 Free User (Authenticated) | 👑 PRO User (Lifetime / Active) |
| :--- | :---: | :---: | :---: |
| **Standard QR Generation (30+ types)** | ✅ Unlimited | ✅ Unlimited | ✅ Unlimited |
| **Download PNG / WebP** | ✅ Free Unlimited | ✅ Free Unlimited | ✅ Free Unlimited |
| **Vector SVG Export** | 🔒 Locked (Prompts Login) | 🎁 2x Free Trials | ⚡ Unlimited |
| **Vector PDF Export** | 🔒 Locked (Prompts Login) | 🎁 2x Free Trials | ⚡ Unlimited |
| **AutoCAD DXF Laser Cut Export** | 🔒 Locked (Prompts Login) | 🎁 2x Free Trials | ⚡ Unlimited |
| **Adobe Illustrator EPS Export** | 🔒 Locked (Prompts Login) | 🎁 2x Free Trials | ⚡ Unlimited |
| **3D Mockup Studio** | 🔒 Locked (Prompts Login) | 🎁 2x Free Trials | ⚡ Unlimited |
| **Print Studio (A4 Sticker Sheets)** | 🔒 Locked (Prompts Login) | 🎁 2x Free Trials | ⚡ Unlimited |
| **PRO Frames (Polaroid, Stand, Ticket)** | 🔒 Export Locked | 🎁 2x Free Trials | ⚡ Unlimited |
| **1D Barcode Generator (PNG)** | ✅ Free Unlimited | ✅ Free Unlimited | ✅ Free Unlimited |
| **Barcode Vector (SVG & PDF)** | 🔒 Locked (Prompts Login) | 🎁 2x Free Trials | ⚡ Unlimited |
| **Bulk Generator (Batch CSV & ZIP)** | 🔒 Locked (Prompts Login) | 🎁 1x Free Batch Trial | ⚡ Unlimited Batches |
| **Navbar Profile Pill** | "Sign In" Button | Inisial + Nama + Dropdown | Inisial + PRO Badge + Dropdown |
| **Unverified Email Pill** | N/A | [Unverified] + [Verify] Btn | [Unverified] if unverified |
| **Account Modals** | N/A | Change Password & Delete Account | Change Password & Delete Account |

---

## 2. Quick Execution: How to Run Local QA Tests

Run the complete local QA test suite using Playwright:

```bash
npm run test:qa
```

Or run directly with Playwright CLI:
```bash
npx playwright test tests/qa-user-roles.spec.js
```

To run with visual browser UI (Headed Mode):
```bash
npx playwright test tests/qa-user-roles.spec.js --headed
```

To inspect step-by-step traces:
```bash
npx playwright show-report
```

---

## 3. How the Local Testing Engine Works

To enable deterministic local testing without touching production Firebase databases or consuming real quotas:
1. `src/context/AuthContext.jsx` includes a zero-overhead DEV hook (`import.meta.env.DEV && window.__MOCK_AUTH_ROLE__`).
2. Playwright injects the target role before page navigation:
   - `window.__MOCK_AUTH_ROLE__ = 'guest'` -> Simulates anonymous visitor.
   - `window.__MOCK_AUTH_ROLE__ = 'free'` -> Simulates logged-in user with 2 free trials remaining.
   - `window.__MOCK_AUTH_ROLE__ = 'free_exhausted'` -> Simulates user whose 2 free trials are spent.
   - `window.__MOCK_AUTH_ROLE__ = 'pro'` -> Simulates VIP lifetime PRO user.
3. In production builds (`npm run build`), `import.meta.env.DEV` is strictly `false`, ensuring tree-shaking completely removes this mock hook from the client bundle.

---

## 4. Verification Checklist for QA

When running QA on user roles, verify:
- [ ] **Guest User:**
  - Navbar shows "Sign In" button.
  - Can generate QR and download standard PNG.
  - Clicking any PRO format (SVG, PDF, DXF, EPS, Mockup, Print) triggers `ProAlertModal` with 1-Click Google Sign-In.
  - Visiting `/bulk-qr-generator` requires login.
- [ ] **Free User:**
  - Navbar shows user initial circle and username.
  - Dropdown displays `Unverified` badge and `Verify` button (if unverified).
  - Dropdown displays `Status: Free Starter` and `Upgrade to PRO` button in brand Royal Blue.
  - `Change Password` opens centered on screen via React Portal.
  - `Delete Account` displays 4-app ecosystem warning and requires entering password + typing `DELETE`.
  - Trial 1 and 2 work and display toast notification.
  - Trial 3 displays upgrade modal.
- [ ] **PRO User:**
  - Navbar displays `PRO` / `Lifetime` badge.
  - Dropdown displays `Status: PRO Lifetime`.
  - No `Upgrade to PRO` button is shown.
  - All downloads (SVG, PDF, DXF, EPS, Mockups) download directly without modals or trial deductions.
