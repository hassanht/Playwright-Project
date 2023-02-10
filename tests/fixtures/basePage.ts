import { test as base } from "@playwright/test";
import { SignupPage } from "../../pageFactory/signupPage";
import { EmailPage } from "../../pageFactory/emailPage";
import { SignInPage } from "../../pageFactory/signInPage";
import { ProfilePage } from "../../pageFactory/profilePage";
import { HeaderPage } from "../../pageFactory/headerPage";
import { MarketplacePage } from "../../pageFactory/marketplacePage";
import { AddToCartPage } from "../../pageFactory/addToCartPage";


export const test = base.extend<{
    signupPage: SignupPage;
    emailPage: EmailPage;
    signInPage: SignInPage;
    profilePage: ProfilePage;
    headerPage :HeaderPage ;
    marketplacePage:MarketplacePage;
    addToCartPage: AddToCartPage;

}>({
    signupPage: async ({ page }, use) => {
        use(new SignupPage(page));
    },
    emailPage: async ({ page }, use) => {
        use(new EmailPage(page));
    },
    signInPage: async ({ page }, use) => {
        use(new SignInPage(page));
    },
    profilePage: async ({ page }, use) => {
        use(new ProfilePage(page));
    },
    headerPage : async ({ page }, use) => {
        use(new HeaderPage(page));
    },

    marketplacePage : async ({ page }, use) => {
        use(new MarketplacePage(page));
    },
    addToCartPage : async ({ page }, use) => {
        use(new AddToCartPage(page));
    },

});
