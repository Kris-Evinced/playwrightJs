import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { EvincedSDK } from "@evinced/js-playwright-sdk";

test.describe("Evinced evAnalyze", () => {
    test("Single test selector type", async ({ page }) => {
      const evReport = "./test-results/evAnalyze.html";
      const evincedService = new EvincedSDK(page);
      await page.goto("https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child#try_it/");
      const issues = await evincedService.evAnalyze({
              enableScreenshots: true,
            });
      await evincedService.evSaveFile(issues, "html", evReport);
      console.log("generated report")
      await expect(existsSync(evReport)).toBeTruthy();
    });
  });