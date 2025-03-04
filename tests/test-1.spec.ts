import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.evinced.com/');
  await page.getByText('Select').first().click();
  await page.getByText('Tiny House').click();
});