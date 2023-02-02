import { test as base } from "@playwright/test";
import { SignupPage } from "../../pageFactory/signupPage";
import { EmailPage } from "../../pageFactory/emailPage";
import { signInPage } from "../../pageFactory/signInPage";

export const test = base.extend<{
    signupPage: SignupPage;
    emailPage: EmailPage;
    signInPage: signInPage;

}>({
    signupPage: async ({ page }, use) => {
        use(new SignupPage(page));
    },
    emailPage: async ({ page }, use) => {
        use(new EmailPage(page));
    },
    signInPage: async ({ page }, use) => {
        use(new signInPage(page));
    },
});
