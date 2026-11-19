// tests/qa-user-roles.spec.js
// Automated Local QA Test Suite for User Roles: Guest, Free User, and PRO User

import { test, expect } from '@playwright/test';

// Helper to fill and generate a QR code so preview buttons (PNG, SVG, DXF, EPS) are active
async function generateSampleQr(page) {
  const urlInput = page.locator('input[type="url"]').first();
  if (await urlInput.isVisible()) {
    await urlInput.fill('https://createmy-qr.com/test');
    const genBtn = page.locator('button:has-text("Generate"), button:has-text("Buat")').first();
    if (await genBtn.isVisible()) {
      await genBtn.click();
    }
  }
}

test.describe('CreateMy-QR Local QA: User Roles & Feature Gating', () => {

  // =========================================================================
  // 1. GUEST USER TESTS (Anonymous / Not Logged In)
  // =========================================================================
  test.describe('1. Guest User Flow', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        window.__MOCK_AUTH_ROLE__ = 'guest';
      });
    });

    test('Guest should see Sign In button in navbar and have standard PNG download', async ({ page }) => {
      await page.goto('/url-qr-code-generator');

      // 1. Verify Sign In button is present in navbar
      const signInBtn = page.locator('nav button:has-text("Sign In")').first();
      await expect(signInBtn).toBeVisible();

      // 2. Generate QR code
      await generateSampleQr(page);

      // 3. PNG download button should be enabled & visible for guests
      const pngBtn = page.locator('button:has-text("PNG")').first();
      await expect(pngBtn).toBeVisible();
    });

    test('Guest clicking PRO features (SVG) should open ProAlertModal / Auth prompt', async ({ page }) => {
      await page.goto('/url-qr-code-generator');
      await generateSampleQr(page);

      // Click SVG export button
      const svgBtn = page.locator('button:has-text("SVG")').first();
      await expect(svgBtn).toBeVisible();
      await svgBtn.click();

      // Verify Google 1-Click Sign-In or Upgrade modal is displayed
      const proModalBtn = page.locator('button:has-text("Google"), button:has-text("Sign In")').first();
      await expect(proModalBtn).toBeVisible();
    });

    test('Guest visiting Bulk Generator should be prompted to sign in', async ({ page }) => {
      await page.goto('/bulk-qr-generator');
      await expect(page.locator('h1').first()).toBeVisible();

      // Check if sign-in callout or pro prompt is displayed
      const guestPrompt = page.locator('button:has-text("Sign In"), button:has-text("Masuk"), a:has-text("Sign In")').first();
      await expect(guestPrompt).toBeVisible();
    });
  });

  // =========================================================================
  // 2. FREE LOGGED-IN USER TESTS (Freemium with 2x PRO trials)
  // =========================================================================
  test.describe('2. Free User (Logged In) Flow', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        window.__MOCK_AUTH_ROLE__ = 'free';
      });
    });

    test('Free User should see user avatar pill and dropdown menu with Unverified badge', async ({ page }) => {
      await page.goto('/url-qr-code-generator');

      // 1. Verify avatar with initial [F] and Free Tester username is visible
      const userPill = page.locator('button[aria-label="User Menu"]').first();
      await expect(userPill).toBeVisible();
      await expect(userPill).toContainText('Free Tester');

      // 2. Click user menu pill to open dropdown
      await userPill.click();

      // 3. Verify Account title & email
      await expect(page.getByText('Account').first()).toBeVisible();
      await expect(page.getByText('tester.free@createmy-qr.com')).toBeVisible();

      // 4. Verify Unverified badge & Verify button
      await expect(page.getByText('Unverified').first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Verify' }).first()).toBeVisible();

      // 5. Verify Status: Free Starter
      await expect(page.getByText('Free Starter').first()).toBeVisible();

      // 6. Verify Upgrade to PRO button
      await expect(page.getByRole('button', { name: /Upgrade to PRO/i })).toBeVisible();

      // 7. Verify Menu Items: Change Password, History, Sign Out, Delete Account
      await expect(page.getByRole('button', { name: /Change Password/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Saved QR History/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Sign Out/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Delete Account/i })).toBeVisible();
    });

    test('Free User should be able to open Change Password modal centered via Portal', async ({ page }) => {
      await page.goto('/url-qr-code-generator');

      // Open User Menu
      await page.locator('button[aria-label="User Menu"]').first().click();

      // Click Change Password
      await page.getByRole('button', { name: /Change Password/i }).click();

      // Verify Change Password Modal is open
      await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();

      // Verify inputs
      await expect(page.locator('input[type="password"]').first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Update Password' })).toBeVisible();
      await expect(page.getByText('Forgot current password?')).toBeVisible();
    });

    test('Free User should be able to open Delete Account modal with 4-app ecosystem warning', async ({ page }) => {
      await page.goto('/url-qr-code-generator');

      // Open User Menu
      await page.locator('button[aria-label="User Menu"]').first().click();

      // Click Delete Account
      await page.getByRole('button', { name: /Delete Account/i }).click();

      // Verify Delete Account Modal is open
      await expect(page.getByRole('heading', { name: 'Delete Account' })).toBeVisible();

      // Verify Ecosystem Warning mentions all 4 apps
      await expect(page.getByText('CreateMy-QR').first()).toBeVisible();
      await expect(page.getByText('PDFEquips').first()).toBeVisible();
      await expect(page.getByText('TextEquips').first()).toBeVisible();
      await expect(page.getByText('ToolEquips').first()).toBeVisible();

      // Verify typing DELETE confirmation input
      const deleteInput = page.locator('input[placeholder="DELETE"]').first();
      await expect(deleteInput).toBeVisible();
    });
  });

  // =========================================================================
  // 3. FREE USER (TRIALS EXHAUSTED) FLOW
  // =========================================================================
  test.describe('3. Free User (Trials Exhausted)', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        window.__MOCK_AUTH_ROLE__ = 'free_exhausted';
      });
    });

    test('Free User with 0 trials left should see upgrade modal when requesting PRO features', async ({ page }) => {
      await page.goto('/url-qr-code-generator');
      await generateSampleQr(page);

      // Click SVG export
      const svgBtn = page.locator('button:has-text("SVG")').first();
      await expect(svgBtn).toBeVisible();
      await svgBtn.click();

      // Should open Upgrade modal because trials are exhausted (2 of 2 used)
      const upgradeModal = page.locator('.fixed.inset-0').first();
      await expect(upgradeModal).toBeVisible();
      await expect(page.locator('button:has-text("Upgrade to PRO"), button:has-text("PRO")').first()).toBeVisible();
    });
  });

  // =========================================================================
  // 4. PRO USER FLOW (Lifetime / Active Subscription)
  // =========================================================================
  test.describe('4. PRO User Flow', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        window.__MOCK_AUTH_ROLE__ = 'pro';
      });
    });

    test('PRO User should see PRO username, Status: PRO Lifetime, and no Upgrade banner', async ({ page }) => {
      await page.goto('/url-qr-code-generator');

      // 1. Verify user pill in navbar shows Pro VIP username
      const userPill = page.locator('button[aria-label="User Menu"]').first();
      await expect(userPill).toBeVisible();
      await expect(userPill).toContainText('Pro VIP');

      // 2. Open User Menu
      await userPill.click();

      // 3. Verify Status: PRO Lifetime
      await expect(page.getByText(/PRO Lifetime/i)).toBeVisible();

      // 4. Verify that "Upgrade to PRO" button is NOT rendered for Pro Users
      const upgradeBtn = page.getByRole('button', { name: /Upgrade to PRO/i });
      await expect(upgradeBtn).toHaveCount(0);
    });

    test('PRO User should have direct export without lock modals', async ({ page }) => {
      await page.goto('/url-qr-code-generator');
      await generateSampleQr(page);

      // Click SVG export
      const svgBtn = page.locator('button:has-text("SVG")').first();
      await expect(svgBtn).toBeVisible();
      await svgBtn.click();

      // Lock modal should NOT appear for PRO users
      const lockModal = page.locator('h3:has-text("Unlock Unlimited"), h3:has-text("Try AutoCAD")');
      await expect(lockModal).toHaveCount(0);
    });
  });
});
