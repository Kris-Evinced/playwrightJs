//global.setup.js

const { setCredentials } = require("@evinced/js-playwright-sdk")

//removing "config" param from globalSetup
async function globalSetup() {
    try {
        await setCredentials({
            serviceId: process.env.EVINCED_SERVICE_ID,
            secret: process.env.EVINCED_API_KEY,
        });
    } catch (error) {
        throw new Error("Evinced SDK authorization failure.");
    }
 
}
module.exports = globalSetup;

