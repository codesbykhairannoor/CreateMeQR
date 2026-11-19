import { test, expect } from '@playwright/test';

test.describe('Mobile Layout & Navigation (CreateMeQR Royal Blue Brand)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('guest state: header renders logo, sign in, and hamburger toggle', async ({ page }) => {
    await page.goto('/');

    // 1. Check brand logo & text
    await expect(page.locator('text=CreateMy-QR').first()).toBeVisible();

    // 2. Hamburger button should be visible on mobile
    const hamburgerBtn = page.locator('button[aria-label="Toggle Navigation Menu"]');
    await expect(hamburgerBtn).toBeVisible();

    // 3. Click hamburger to open drawer
    await hamburgerBtn.click();

    // 4. Verify search input inside mobile drawer
    const searchInput = page.locator('input[placeholder*="Search 30+"]');
    await expect(searchInput).toBeVisible();

    // 5. Verify top account card in drawer (Guest sign in button)
    const drawerSignIn = page.locator('button:has-text("Sign In to Your Account")');
    await expect(drawerSignIn).toBeVisible();

    // 6. Verify Popular Tools heading
    await expect(page.locator('text=Popular Tools')).toBeVisible();

    // 7. Verify Dark Mode toggle button
    await expect(page.locator('button:has-text("Dark Mode"), button:has-text("Light Mode")').first()).toBeVisible();

    // 8. Verify Claim Offer / PRO banner
    await expect(page.locator('text=Claim PRO Offer')).toBeVisible();

    // 9. Close drawer
    await hamburgerBtn.click();
    await expect(searchInput).not.toBeVisible();
  });

  test('guest state: sign in button opens AuthModal', async ({ page }) => {
    await page.goto('/');

    const signInBtn = page.locator('button:has-text("Sign In")').first();
    await expect(signInBtn).toBeVisible();
    await signInBtn.click();

    // Verify AuthModal is visible
    await expect(page.locator('#auth-modal-title')).toBeVisible();
    await expect(page.locator('text=Continue with Google')).toBeVisible();
  });

  test('authenticated state: avatar dropdown popover, sign out modal, and change password modal', async ({ page }) => {
    // Inject mock user with password provider before page scripts run
    await page.addInitScript(() => {
      localStorage.setItem('__mock_auth_user__', JSON.stringify({
        uid: 'user-123',
        email: 'rankhairan0@gmail.com',
        displayName: 'Rankhairan',
        plan: 'free',
        providerData: [{ providerId: 'password' }],
      }));
    });

    await page.goto('/');

    // 1. Avatar circle with initial "R" should appear in mobile header (icon only, NO username text in navbar)
    const avatarBtn = page.locator('button[aria-label="User Menu"]');
    await expect(avatarBtn).toBeVisible();
    await expect(avatarBtn).toContainText('R');
    await expect(avatarBtn).not.toContainText('Rankhairan');

    // 2. Click avatar to open dropdown popover (Screenshot_20261119_180945_Chrome.jpg)
    await avatarBtn.click();

    await expect(page.locator('text=Account').first()).toBeVisible();
    await expect(page.locator('text=rankhairan0@gmail.com').first()).toBeVisible();
    await expect(page.locator('text=Status:').first()).toBeVisible();
    await expect(page.locator('text=Free Starter').first()).toBeVisible();
    await expect(page.locator('button:has-text("Upgrade to PRO")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Change Password")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Sign Out")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Delete Account")').first()).toBeVisible();

    // 3. Click Sign Out -> Opens SignOutConfirmModal (Screenshot_20261119_180940_Chrome.jpg)
    await page.locator('button:has-text("Sign Out")').first().click();
    await expect(page.locator('#sign-out-modal-title')).toBeVisible();
    await expect(page.locator('text=Log Out of Your Account?')).toBeVisible();
    await expect(page.locator('button:has-text("Yes, Log Out")')).toBeVisible();

    // Close Sign Out Modal
    await page.locator('button[aria-label="Close modal"]').click();
    await expect(page.locator('#sign-out-modal-title')).not.toBeVisible();

    // 4. Click avatar again -> Click Change Password -> Opens ChangePasswordModal (Screenshot_20261119_181000_Chrome.jpg)
    await avatarBtn.click();
    await page.locator('button:has-text("Change Password")').first().click();

    await expect(page.locator('#change-password-modal-title')).toBeVisible();
    await expect(page.locator('label:has-text("Current Password")')).toBeVisible();
    await expect(page.getByText('New Password', { exact: true })).toBeVisible();
    await expect(page.locator('label:has-text("Confirm New Password")')).toBeVisible();
    await expect(page.locator('button:has-text("Update Password")')).toBeVisible();

    // 5. Test toggle to Email Reset mode (Screenshot_20261119_181005_Chrome.jpg)
    const forgotLink = page.locator('button:has-text("Forgot current password? Send reset link to email")');
    await expect(forgotLink).toBeVisible();
    await forgotLink.click();

    await expect(page.locator('text=Send a secure reset link to your email')).toBeVisible();
    await expect(page.locator('button:has-text("Send Password Reset Link")')).toBeVisible();

    // 6. Test toggle back to Direct mode
    const knowCurrentLink = page.locator('button:has-text("Know your current password? Update directly")');
    await expect(knowCurrentLink).toBeVisible();
    await knowCurrentLink.click();
    await expect(page.locator('label:has-text("Current Password")')).toBeVisible();

    // Close Change Password Modal
    await page.locator('button[aria-label="Close modal"]').click();
    await expect(page.locator('#change-password-modal-title')).not.toBeVisible();

    // 7. Test Mobile Navigation Drawer with Top Account Card (Screenshot_20261119_180950_Chrome.jpg)
    const hamburgerBtn = page.locator('button[aria-label="Toggle Navigation Menu"]');
    await hamburgerBtn.click();

    // Drawer Top Card should show Account, email, and quick action buttons
    await expect(page.locator('text=rankhairan0@gmail.com').first()).toBeVisible();
    const quickChangePwBtn = page.locator('button[title="Change Password"]');
    await expect(quickChangePwBtn).toBeVisible();
    const quickSignOutBtn = page.locator('button:has-text("Sign Out")').first();
    await expect(quickSignOutBtn).toBeVisible();
    const quickDeleteBtn = page.locator('button[title="Delete Account"]');
    await expect(quickDeleteBtn).toBeVisible();

    // Click quick Change Password from drawer -> should open ChangePasswordModal!
    await quickChangePwBtn.click();
    await expect(page.locator('#change-password-modal-title')).toBeVisible();
  });

  test('google authenticated state: navbar icon only, and change password shows Google Security modal', async ({ page }) => {
    // Inject mock user signed in with Google
    await page.addInitScript(() => {
      localStorage.setItem('__mock_auth_user__', JSON.stringify({
        uid: 'google-user-456',
        email: 'erstaunenn@gmail.com',
        displayName: 'Erstaunenn',
        plan: 'pro',
        provider: 'google',
        providerData: [{ providerId: 'google.com' }],
      }));
    });

    await page.goto('/');

    // 1. Verify navbar ONLY shows profile icon with initial "E", NOT the username text
    const avatarBtn = page.locator('button[aria-label="User Menu"]');
    await expect(avatarBtn).toBeVisible();
    await expect(avatarBtn).toContainText('E');
    await expect(avatarBtn).not.toContainText('Erstaunenn');

    // 2. Click avatar to open dropdown popover
    await avatarBtn.click();
    await expect(page.locator('text=erstaunenn@gmail.com').first()).toBeVisible();

    // 3. Click Change Password -> Opens Google Security view (Screenshot_20261119_192712_Chrome.jpg)
    await page.locator('button:has-text("Change Password")').first().click();

    await expect(page.locator('#change-password-modal-title')).toBeVisible();
    await expect(page.locator('text=Your account is signed in with Google')).toBeVisible();
    await expect(page.locator('text=Manage Google Security')).toBeVisible();

    // Verify password input fields and "Forgot current password" are STRICTLY NOT visible for Google users
    await expect(page.locator('label:has-text("Current Password")')).not.toBeVisible();
    await expect(page.locator('button:has-text("Forgot current password")')).not.toBeVisible();
    await expect(page.locator('button:has-text("Update Password")')).not.toBeVisible();

    // 4. Click Close button in Google Security modal
    await page.locator('button:has-text("Close")').click();
    await expect(page.locator('#change-password-modal-title')).not.toBeVisible();
  });
});

