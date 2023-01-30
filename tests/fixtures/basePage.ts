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
        console.log(LoginPage);
        use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        console.log(InventoryPage);
        use(new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        console.log(CartPage);
        use(new CartPage(page));
    },
<<<<<<< HEAD
    signupPage: async ({ page }, use) => {
        use(new SignupPage(page));
    },
    emailPage: async ({ context }, use) => {
        new EmailPage(await context.newPage());
    },
=======

>>>>>>> 12719309e5d221183f8daa29b49747b6f2ec24fe
});
