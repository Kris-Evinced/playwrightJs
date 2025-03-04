// baseTestExtension
const { test: base } = require("@playwright/test");
const { EvincedSDK } = require("@evinced/js-playwright-sdk");

const test = base.extend({
    hookSetup: [
        async ({ page }, use, testInfo) => {
            const evincedService = new EvincedSDK(page);
            await beforeEach(page, evincedService);
            await use(); // this will execute the test
            await afterEach(page, evincedService, testInfo);
        },
        { auto: true }, // when true, the hook will be automatically executed and attached to all tests
    ],
});

async function beforeEach(page, evincedService) {
    console.log("Global before each hook");
    await evincedService.evStart();
}

async function afterEach(page, evincedService, testInfo) {
    console.log("Global after each hook");
    const issues = await evincedService.evStop();
    await evincedService.evSaveFile(
        issues,
        "json",
        `report-${testInfo.title}.json`
    );
}
module.exports = { test };
