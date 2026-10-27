import { test, expect } from '@playwright/test';

test.describe('CreateMeQR E2E Core Flow', () => {
  test('should render the homepage successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Main heading should be visible
    await expect(page.locator('h1').first()).toBeVisible();

    // Search bar should be visible
    await expect(page.locator('.hero-search-input')).toBeVisible();
  });

  test('should render the tool workspace and generate a QR code successfully', async ({ page }) => {
    // Navigate to URL QR Generator workspace
    await page.goto('/url');

    // Check if the main heading is visible
    await expect(page.locator('h1').first()).toBeVisible();

    // Fill the URL input
    const urlInput = page.locator('input[type="url"]').first();
    await expect(urlInput).toBeVisible();
    await urlInput.fill('https://example.com/secure-qr');

    // Click Generate Button
    const generateButton = page.locator('button:has-text("Generate")');
    await expect(generateButton).toBeVisible();
    await generateButton.click();

    // Verify if QR code canvas is rendered in preview
    await expect(page.locator('canvas')).toBeVisible();

    // Verify PNG download button is visible
    await expect(page.locator('button:has-text("PNG")')).toBeVisible();

    // Ensure the tab switched to "Customize"
    await expect(page.locator('text=Customize')).toBeVisible();
  });
});
