import { Locator, Page } from "@playwright/test"
import { PlaywrightWrapper } from "./plawrightWrapper";

export class CartPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #checkOutBtn: Locator;
    #firstName: Locator;
    #lastName: Locator;
    #zipCode: Locator;
    #continueBtn: Locator;
    #itemTotalTxt: Locator;
    #finishBtn: Locator;
    #thankYouTxt: Locator;

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#checkOutBtn = this.#page.locator('//button[contains(@class,"btn btn_action")]');
        this.#firstName = this.#page.locator('#first-name');
        this.#lastName = this.#page.locator('#last-name');
        this.#zipCode = this.#page.locator('#postal-code');
        this.#continueBtn = this.#page.locator('#continue');
        this.#itemTotalTxt = this.#page.locator('.summary_subtotal_label');
        this.#finishBtn = this.#page.locator('button.btn.btn_action');
        this.#thankYouTxt = this.#page.locator('h2.complete-header');
    }

    async clickCheckOutButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#checkOutBtn);
    }

    async submitInformation(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#firstName, 'hassan');
        await this.#playwrightWrapper.fill(this.#lastName, 'tahir');
        await this.#playwrightWrapper.fill(this.#zipCode, '54000');
        await this.#playwrightWrapper.click(this.#continueBtn);
    }

    async getItemTextValue(): Promise<number> {
        const text = await this.#playwrightWrapper.getText(this.#itemTotalTxt);
        return Number(text.replace('Item total: $', ''));
    }

    async clickFinishButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#finishBtn);
    }

    async getThankYouOrderText(): Promise<string> {
        return await this.#playwrightWrapper.getText(this.#thankYouTxt);
    }

    async waitForPageLoad():Promise<void> {
        await this.#playwrightWrapper.waitForPageLoad();
    }

    async takeScreenShot():Promise<void> {
        await this.#playwrightWrapper.takeFullPageScreenshot();
    }
}
