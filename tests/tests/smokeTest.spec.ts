import { expect} from "@playwright/test";
import { test } from "../fixtures/basePage";
import { USER_CREDENTIALS, URLS,USERDATA_FILEPATH } from "../../lib/constants";
import { readCSV, updatePassword } from "../../lib/utility";
import { EmailPage } from "../../pageFactory/emailPage";







test.beforeEach(async ({ page, signupPage }) => {
  await page.goto('/')
  await signupPage.clickAcceptCookieButton();
});

test('Signup', async ({ page, context, emailPage, signupPage, signInPage, profilePage ,headerPage}) => {
  await headerPage.clickHeaderLink();
  await headerPage.clickCreateAnAccount();
  await signupPage.signup(USER_CREDENTIALS.standard['username'], USER_CREDENTIALS.standard['password']);
  await signupPage.waitForPageLoad();
  expect(await page.url()).toContain(URLS.registrationConfirmed);
  expect(await signupPage.isDisplayedConfirmationMessage()).toBeTruthy;
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
  expect(await page.getByText('Your account has been confirmed.').isVisible()).toBeTruthy;
  await newPage.close();
  await login(signInPage, profilePage, await signupPage.getDynamicName(), USER_CREDENTIALS.standard.password);
  await logout(profilePage);

});



test('Forgot Paassword', async ({ emailPage, context, page, profilePage, signInPage ,headerPage}) => {
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
  expect(await signInPage.isDisplayedPasswordResetMessage()).toBeTruthy;
  await login(signInPage, profilePage, USER_CREDENTIALS.standard.username, USER_CREDENTIALS.standard.password);
  await logout(profilePage);


});

test('Reset Password', async ({ page, profilePage, signInPage, }): Promise<void> => {
console.log(USERDATA_FILEPATH);
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
  await updatePassword(user.data, USERDATA_FILEPATH, user.userData.username, user.userData.password, user.userData.newpassword);
  await profilePage.clickUpdatePasswordButton();
  expect(await profilePage.isDisplayedResetPasswordSucessMessage()).toBeTruthy;
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



