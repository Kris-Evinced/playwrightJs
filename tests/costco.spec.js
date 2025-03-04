const {test,expect} =require('@playwright/test')

test("Costco Test",async ({page})=>{

    await page.goto("http://costco.com/")

    const url=await page.url()
    console.log("URL is "+url)

    const title=await page.title()
    console.log("Title is "+title)
    await expect(page).toHaveTitle("Welcome to Costco Wholesale")

    
})