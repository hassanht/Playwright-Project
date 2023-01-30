// import { expect, Page } from "@playwright/test";
// import { test } from "../fixtures/basePage";
// import { USER_CREDENTIALS, URLS } from "../../lib/constants";





// test.beforeEach(async ({ page }, testInfo) => {
//   await page.goto('/')
// });


// test('Verify login with valid username and password', async ({ page, loginPage, inventoryPage }, testInfo) => {

//   await test.step('Login to website', async () => {
//     await loginPage.login(USER_CREDENTIALS.standard['username'], USER_CREDENTIALS.standard['password']);
//   });
//   await test.step('Wait for invenotry url', async () => {
//     const testCaseName = testInfo.title;
//     await page.waitForURL(URLS.inventory);
//     expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
//   });
//   await test.step('Click on menu button', async () => {
//     inventoryPage.clickMenuBtn();
//   });
//   await test.step('Verify visibility of logout link', async () => {
//     expect(await inventoryPage.isLogoutLinkDsiplayed);
//   });
//   await test.step('Click on logout link', async () => {
//     await inventoryPage.clickLogoutLink();
//   });
//   await test.step('Wait for login url', async () => {
//     await page.waitForURL(URLS.home);
//   });
//   await test.step('Verify visibility of login form', async () => {
//     expect(await loginPage.isLoginFormDisplayed());
//     expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
//   });
// });

// test('Verify login with looked out user', async ({ page, loginPage, inventoryPage }) => {
//   await test.step('Login to website', async () => {
//     await loginPage.login(USER_CREDENTIALS.locked_out['username'], USER_CREDENTIALS.locked_out['password'])
//   });
//   await test.step('Verify visibility of error message and text', async () => {
//     expect(await loginPage.isErrorMsgDisplayed());
//     expect(await loginPage.getErrorMsgText()).toContain('Epic sadface: Sorry, this user has been locked out.');
//     expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
//   });

// });


