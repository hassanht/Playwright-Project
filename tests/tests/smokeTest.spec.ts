import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/basePage";
import { USER_CREDENTIALS, URLS } from "../../lib/constants";



test.beforeEach(async ({ page,signupPage } ) => {
  await page.goto('/')
  await signupPage.clickAcceptCookieButton();
});

test('Signup', async ({ page,emailPage ,signupPage}) => {
  await page.locator('#header').getByRole('link', { name: 'Virtua' }).click();
  await page.getByRole('link', { name: 'Create an Account' }).click();
  await signupPage.signup(USER_CREDENTIALS.standard['username'], USER_CREDENTIALS.standard['password']);
  await page.goto('https://marketplace.bimtvist.com/registrationconfirmed');
  await emailPage.navigateToUrl();
  await emailPage.clickAddInboxButton();
  await emailPage.addUserName(await signupPage.getDynamicName());




  // await page1.getByPlaceholder('user name').fill('https://marketplace.bimtvist.com/');
  // await page1.getByPlaceholder('user name').click();
  // await page1.getByPlaceholder('user name').press('Meta+z');
  // await page1.getByPlaceholder('user name').fill('demoonce');
  // await page1.getByRole('combobox').selectOption('getnada.com');
  // await page1.getByRole('button', { name: 'Add now!' }).click();
  // await page1.getByRole('cell', { name: 'Welcome to Virtua' }).click();
  // await page1.getByRole('link', { name: 'Welcome to Virtua' }).click();
  // await page1.frameLocator('#the_message_iframe').getByRole('heading', { name: 'Hi demo' }).click();
  // await page1.frameLocator('#the_message_iframe').getByRole('link', { name: 'Click to Confirm' }).click();
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
