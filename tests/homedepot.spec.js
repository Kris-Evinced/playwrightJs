import { test, expect } from '@playwright/test';
import { existsSync } from "node:fs";
import { EvincedSDK } from "@evinced/js-playwright-sdk";

test.describe("Evinced evAnalyze", () => {
    test("Single test - Home Depot", async ({ page }) => {
      const evReport = "./test-results/evAnalyze.html";
      const evincedService = new EvincedSDK(page);
      evincedService.testRunInfo.addLabel({
          'Environment': 'Sandbox'
        });
      await evincedService.evStart();  
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

      const issues = await evincedService.evStop({
            enableScreenshots: true
      });
    //   const issues = await evincedService.evAnalyze({
    await evincedService.evSaveFile(issues, "html", evReport);
    expect(existsSync(evReport)).toBeTruthy();
  });
});

// Brittle test - How do I control the waits/timeouts