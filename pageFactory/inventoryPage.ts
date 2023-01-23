import { ElementHandle, Locator, Page } from "@playwright/test"
import { PlaywrightWrapper } from "./plawrightWrapper";
export class InventoryPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #menuBtn: Locator;
    #logoutLink: Locator;
    #addToCartBtns: Locator;
    #addToCartIconCount: Locator;
    #itemPrices: Locator;

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#menuBtn = this.#page.locator('[id="react-burger-menu-btn"]');
        this.#logoutLink = this.#page.locator('[id="logout_sidebar_link"]');
        this.#addToCartBtns = this.#page.locator('div.inventory_item_description div.pricebar button');
        this.#addToCartIconCount = this.#page.locator('span.shopping_cart_badge');
        this.#itemPrices = this.#page.locator('//div[@class="pricebar"]//div');
    }

    async clickMenuBtn(): Promise<void> {
        await this.#playwrightWrapper.click(this.#menuBtn);
    }

    async clickLogoutLink(): Promise<void> {
        await this.#playwrightWrapper.click(this.#logoutLink);
    }

    async isLogoutLinkDsiplayed(): Promise<boolean> {
        return await this.#logoutLink.isVisible();
    }

    async clickAllAddToCartButtons(): Promise<number> {
        const buttons = await this.#addToCartBtns.all();
        for (const button of buttons) {
            await this.#playwrightWrapper.click(button);
        }
        return this.#playwrightWrapper.getElementCounts(buttons);
    }

    async getAddToCartIconCount(): Promise<string> {
        return await this.#playwrightWrapper.getText(this.#addToCartIconCount);
    }

    async clickCartIcon(): Promise<void> {
        await this.#playwrightWrapper.click(this.#addToCartIconCount);
    }

    async calculateTotalPrice(): Promise<number> {
        const prices = await this.#itemPrices.all();
        let total = 0;

        for (const price of prices) {
            const p = (await price.innerText()).replace('$', '');
            total += parseFloat(p);
        }
        return total;
    }
}
