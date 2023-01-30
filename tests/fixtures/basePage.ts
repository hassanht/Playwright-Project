import { Page, test as base } from "@playwright/test";
import { LoginPage } from "../../pageFactory/loginPage";
import { InventoryPage } from "../../pageFactory/inventoryPage";
import { CartPage } from "../../pageFactory/cartPage";
import { SignupPage } from "../../pageFactory/signupPage";
import { EmailPage } from "../../pageFactory/emailPage";

export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    signupPage: SignupPage;
    emailPage: EmailPage;

}>({
    loginPage: async ({ page }, use) => {
        use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        use(new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        use(new CartPage(page));
    },
    signupPage: async ({ page }, use) => {
        use(new SignupPage(page));
    },
    emailPage: async ({ context }, use) => {
        new EmailPage(await context.newPage());
    },
});
