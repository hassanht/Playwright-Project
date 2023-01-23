import { test as base } from "@playwright/test";
import { LoginPage } from "../../pageFactory/loginPage";
import { InventoryPage } from "../../pageFactory/inventoryPage";
import { CartPage } from "../../pageFactory/cartPage";

export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
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
});
