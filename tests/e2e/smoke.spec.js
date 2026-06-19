import { expect, test } from '@playwright/test';

test('homepage and contact page load', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Hearty Home Services' })).toBeVisible();

  await page.getByRole('link', { name: /Contact Us/i }).first().click();
  await expect(page.getByRole('heading', { name: 'Have an enquiry?' })).toBeVisible();
});

