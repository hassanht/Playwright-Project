import { expect } from "@playwright/test";
import { test } from "../fixtures/basePage";
import { USER_CREDENTIALS, URLS, USERDATA_FILEPATH } from "../../lib/constants";
import { readCSV, updatePassword } from "../../lib/utility";
import { EmailPage } from "../../pageFactory/emailPage";
import { MarketplacePage } from "../../pageFactory/marketplacePage";
import { AddToCartPage } from "../../pageFactory/addToCartPage";







test.beforeEach(async ({ page, signupPage }) => {
  await page.goto('/')
  await signupPage.clickAcceptCookieButton();
});


test.only('Login with Metamask', async ({ page, context,  headerPage ,wallet }): Promise<void> => {
  await headerPage.clickHeaderLink();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('//span[normalize-space()="Sign In with Metamask"]').click()
  ]);
  await newPage.locator('//button[normalize-space()="Next"]').click();
  await newPage.locator('.button.btn--rounded.btn-primary.page-container__footer-button').click();
  });



test('Signup', async ({ page, context, emailPage, signupPage, signInPage, profilePage, headerPage ,wallet}) => {
  await headerPage.clickHeaderLink();
  await headerPage.clickCreateAnAccount();
  await signupPage.signup(USER_CREDENTIALS.standard['username'], USER_CREDENTIALS.standard['password']);
  await signupPage.waitForPageLoad();
  expect(await page.url()).toContain(URLS.registrationConfirmed);
  expect(await signupPage.isDisplayedConfirmationMessage()).toEqual(true);
  await emailPage.navigateToUrl();
  await emailPage.clickAddInboxButton();
  await emailPage.addUserName(await signupPage.getDynamicName());
  await emailPage.selectDomain();
  await emailPage.clickAddNowButton();
  await emailPage.clickConfirmationEmailRow();
  const pagePromise = context.waitForEvent('page');
  await emailPage.clickConfirmButton();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  expect(await page.getByText('Your account has been confirmed.').isVisible()).toEqual(true);
  await newPage.close();
  await login(signInPage, profilePage, await signupPage.getDynamicName(), USER_CREDENTIALS.standard.password);
  await logout(profilePage);

});



test('Forgot Paassword', async ({ emailPage, context, page, profilePage, signInPage, headerPage }) => {
  await headerPage.clickHeaderLink();
  await signInPage.clickforgotPasswordLink();
  await signInPage.enterforgotPasswordEmail(USER_CREDENTIALS.standard.username);
  await signInPage.clickResentCodeButton();
  await signInPage.enterPasswordInput(USER_CREDENTIALS.standard.password);
  await signInPage.enterconfirmPasswordInput(USER_CREDENTIALS.standard.password);
  const newPage = await context.newPage();
  await newPage.waitForLoadState();
  emailPage = new EmailPage(newPage);
  await emailPage.navigateToUrl();
  await emailPage.clickAddInboxButton();
  await emailPage.addUserName(USER_CREDENTIALS.standard.username);
  await emailPage.selectDomain();
  await emailPage.clickAddNowButton();
  await emailPage.clickForgetPasswordRow();
  await signInPage.enterCodeInput(await emailPage.getForgetCode());
  await emailPage.closePage();
  await signInPage.clickupdateButton();
  expect(await signInPage.isDisplayedPasswordResetMessage()).toEqual(true);
  await login(signInPage, profilePage, USER_CREDENTIALS.standard.username, USER_CREDENTIALS.standard.password);
  await logout(profilePage);


});

test('Reset Password', async ({ page, profilePage, signInPage, }): Promise<void> => {
  let user = await getUserData(USERDATA_FILEPATH, 'tenmeta');
  if (!user.userData) {
    console.error(`User 'tenmeta' not found in file ${USERDATA_FILEPATH}`);
    return;
  }
  await login(signInPage, profilePage, user.userData.username, user.userData.password);
  await profilePage.clickResetPasswordLink();
  await profilePage.enterOldPasswordInput(user.userData.password);
  await profilePage.enterNewPasswordInput(user.userData.newpassword);
  await profilePage.enterConfirmNewPasswordInput(user.userData.newpassword);
  await profilePage.clickUpdatePasswordButton();
  await updatePassword(user.data, USERDATA_FILEPATH, user.userData.username, user.userData.password, user.userData.newpassword);
  await page.waitForURL("**/login");
  expect(await page.url()).toContain(URLS.login);
  let user1 = await getUserData(USERDATA_FILEPATH, 'tenmeta');
  if (!user1.userData) {
    console.error(`User 'tenmeta' not found in file ${USERDATA_FILEPATH}`);
    return;
  }
  await login(signInPage, profilePage, user1.userData.username, user1.userData.password);
  await logout(profilePage);
});

test('Marketplace', async ({ page, profilePage, signInPage, marketplacePage, addToCartPage }): Promise<void> => {
  await signInPage.navigateToUrl();
  await login(signInPage, profilePage, USER_CREDENTIALS.standard['username'], USER_CREDENTIALS.standard['password']);
  await marketplacePage.clickMarketplaceLink();
  await marketplacePage.clickonSaleButton();
  await marketplacePage.clickPriceRangeFilter();
  await marketplacePage.enterMinInputField();
  await marketplacePage.enterMaxInputField();
  await marketplacePage.clickConfirmButton();
  await marketplacePage.clickItemLink();
  await marketplacePage.clickAddToCartButton();
  expect(await marketplacePage.isDisplayedaddToCartSucessMessage()).toEqual(true);
  await marketplacePage.clickCartIcon();
  await addToCartPage.clickProceedToCheckOutButton();
  expect(await addToCartPage.getItemPriceInCartText()).toContain(await marketplacePage.getItemPriceText());
  await addToCartPage.clickPayWithNewCreditRadioButton();
  await addToCartPage.enterCardNumberInputField();
  await addToCartPage.enterExpirationDateInputField();
  await addToCartPage.enterCvcInputField();
  await addToCartPage.clickPayNowButton();
  console.log(await addToCartPage.getViewTranscationButton());
  expect(await addToCartPage.getViewTranscationButton()).toContain("View Transactions");

});


async function login(signInPage, profilePage, username, password) {
  await signInPage.navigateToUrl();
  await signInPage.addUserName(username);
  await signInPage.PasswordInput(password);
  await signInPage.clickloginButton();
  await profilePage.clickProfileIcon();
  await profilePage.clickViewProfileButton();
  expect(await profilePage.getUsernameText()).toContain(username);
}


async function logout(profilePage) {
  await profilePage.clickProfileIcon();
  await profilePage.clickLogoutLink();
}




async function getUserData(filepath: string, username: string): Promise<{ data: any[], userData: { username: string, password: string, newpassword: string } | null }> {
  const data = await readCSV(filepath);
  for (const user of data) {
    if (user.username === username) {
      return {
        data,
        userData: {
          username: user.username,
          password: user.password,
          newpassword: user.newPassword,
        },
      };
    }
  }
  return { data, userData: null };
};



