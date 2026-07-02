import { test, expect } from '@playwright/test';

test.describe('CreateMeQR E2E Core Flow', () => {
  test('should render the app and generate a QR code successfully', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Check if the main heading is visible
    await expect(page.locator('h1').first()).toBeVisible();

    // Fill the URL input
    const urlInput = page.locator('input[type="url"], input[type="text"]').first();
    await urlInput.fill('https://example.com/secure-qr');

    // Click Generate Button
    const generateButton = page.locator('button:has-text("Generate")');
    await generateButton.click();

    // Verify if QR code canvas/SVG is rendered
    // Usually qrcode.react renders an SVG
    const qrSvg = page.locator('svg').nth(1); 
    // nth(1) because nth(0) might be a logo or icon in the header. We just check if an SVG exists in the preview area
    await expect(qrSvg).toBeVisible();

    // Ensure the tab switched to "Customize"
    // We check if customize options are visible by checking for color inputs or customize text
    await expect(page.locator('text=Customize')).toBeVisible();
  });
});
