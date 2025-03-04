import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { EvincedSDK } from "@evinced/js-playwright-sdk";

test.describe("Evinced evAnalyze", () => {
  test("Single test run using evAnalyze", async ({ page }) => {
    const evReport = "./test-results/evAnalyze.html";
    const evincedService = new EvincedSDK(page);
    await page.goto("https://demo.evinced.com/");
    const issues = await evincedService.evAnalyze({
            enableScreenshots: true,
          });
    await evincedService.evSaveFile(issues, "html", evReport);
    console.log("generated report")
    await expect(existsSync(evReport)).toBeTruthy();
  });
});

test.describe("First test", () => {
    test("testing Title", async ({ page }) => { 
      const evReport = "./test-results/evAnalyze.html";
      const evincedService = new EvincedSDK(page);
      evincedService.testRunInfo.customLabel({
        'Environment': 'Sandbox'
    })

      await page.goto("https://demo.evinced.com/")
      const issues = await evincedService.evAnalyze({
            enableScreenshots: true
   
      });
      const url=await page.url()
      console.log("URL is "+url)

      const title=await page.title()
      console.log("Title is "+title)
      await expect(page).toHaveTitle("Home | Evinced, Demo site")
      await evincedService.evStop({ uploadToPlatform: true });
    
  });
})
