import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/basePage";
import { USER_CREDENTIALS, URLS } from "../../lib/constants";
import { signInPage } from "../../pageFactory/signInPage";



test.beforeEach(async ({ page,signupPage } ) => {
  await page.goto('/')
  await signupPage.clickAcceptCookieButton();
});

test('Signup', async ({ page,context,emailPage ,signupPage,signInPage}) => {
  await page.locator('#header').getByRole('link', { name: 'Virtua' }).click();
  await page.getByRole('link', { name: 'Create an Account' }).click();
  await signupPage.signup(USER_CREDENTIALS.standard['username'], USER_CREDENTIALS.standard['password']);
  await signupPage.waitForPageLoad();
  expect(await page.url()).toContain('https://marketplace.bimtvist.com/registrationconfirmed');
  expect(await signupPage.isDisplayedConfirmationMessage()).toBeTruthy;
  await emailPage.navigateToUrl();
  await emailPage.clickAddInboxButton();
  await emailPage.addUserName(await signupPage.getDynamicName());
  // await emailPage.addUserName("test");
  await emailPage.selectDomain();
  await emailPage.clickAddNowButton();
  await emailPage.clickConfirmationEmailRow();
  const pagePromise = context.waitForEvent('page');
  await emailPage.clickConfirmButton();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  expect(await page.getByText('Your account has been confirmed.').isVisible()).toBeTruthy;
  await  newPage.close();
  await signInPage.navigateToUrl();
  await signInPage.addUserName(await signupPage.getDynamicName());
  await signInPage.PasswordInput();
  await signInPage.clickloginButton();
  await page.locator('#dropdown01').click();
  await page.getByRole('link', { name: 'View Profile' }).click();
  expect(await page.locator('//label[text()="User Name"]/following-sibling::div').innerHTML()).toContain(signupPage.getDynamicName());
  await page.locator('#dropdown01').click();
  await page.getByRole('link', { name: 'Logout' }).click();






  
  // await page2.getByText('Your account has been confirmed.').click();
  // await page2.getByPlaceholder('Username').click();
  // await page2.getByPlaceholder('Username').fill('demoonce');
  // await page2.getByRole('textbox', { name: 'Password' }).click();
  // await page2.getByRole('textbox', { name: 'Password' }).fill('12@');
  // await page2.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  // await page2.getByRole('textbox', { name: 'Password' }).fill('12@Pakistan');
  // await page2.getByRole('button', { name: 'Sign In' }).first().click();
  // await page2.locator('#dropdown01').click();
  // await page2.getByRole('link', { name: 'View Profile' }).click();
  // await page2.locator('#userDetail').getByText('demoonce@getnada.com').click();
});

