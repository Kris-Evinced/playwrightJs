import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.homedepot.com/');
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByTestId('typeahead-search-field-input').click();
  await page.getByTestId('typeahead-search-field-input').fill('saw');
  await page.getByTestId('typeahead-search-field-input').press('Enter');
  await page.getByRole('option', { name: 'saw horse' }).click();
  await page.getByRole('link', { name: 'Navigate to UP TO 30% OFF' }).click();
  await page.getByRole('link', { name: '15 Amp Corded 12 in. Double Bevel Sliding Compound Miter Saw with XPS technology, Blade Wrench and Material Clamp', exact: true }).click();
  await page.getByRole('button', { name: 'Product Details' }).click();
  await page.getByRole('heading', { name: 'Product Information' }).click();
  await page.getByRole('group', { name: '3 / 23', exact: true }).getByLabel('Link').click();
  await page.locator('.mediaGallery-block').click();
  await page.locator('.mediaGallery-block > div:nth-child(2)').click();
});