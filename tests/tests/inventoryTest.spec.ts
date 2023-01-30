// import { expect } from "@playwright/test";
// import { USER_CREDENTIALS } from "../../lib/constants";
// import { test } from "../fixtures/basePage";

// test.beforeEach(async ({ page, loginPage }, testInfo) => {
//     await page.goto("/");
//     await loginPage.login(USER_CREDENTIALS.standard.username, USER_CREDENTIALS.standard.password);
// });


// test("Verify checkout process for multiple items", async ({ page, browserName, inventoryPage, cartPage }) => {
//     let buttonCount = 0;
//     let total = 0;
//     await test.step("Add all items into cart and calculate total price", async () => {
//         buttonCount = await inventoryPage.clickAllAddToCartButtons();
//         total = await inventoryPage.calculateTotalPrice();
//     });
//     await test.step("Verify add to cart count is correct", async () => {
//         expect(Number(await inventoryPage.getAddToCartIconCount())).toEqual(buttonCount);
//     });
//     await test.step("Click on cart icon", async () => {
//         await inventoryPage.clickCartIcon();
//     });
//     await test.step("Click on checkout button", async () => {
//         await cartPage.clickCheckOutButton();
//     });
//     await test.step("Submit checkout information", async () => {
//         await cartPage.submitInformation();
//     });

//     await test.step("Verify total price", async () => {
//         expect(await cartPage.getItemTextValue()).toEqual(total);
//     });
//     await test.step("Click on finish button", async () => {
//         await cartPage.clickFinishButton();
//         await cartPage.waitForPageLoad();
//     });
//     await test.step("Verify visibility of order confirmation text", async () => {
        
//         expect(await page.screenshot({fullPage:true})).toMatchSnapshot();
//         expect(await cartPage.getThankYouOrderText()).toContain('THANK YOU FOR YOUR ORDER');
//     });
// });
