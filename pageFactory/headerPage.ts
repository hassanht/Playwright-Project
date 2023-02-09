
import { Locator, Page, expect, Selectors } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";
export class HeaderPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #headerLink:Locator;
    #createAnAccount:Locator

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#headerLink = this.#page.locator('#header').getByRole('link', { name: 'Virtua' });
        this.#createAnAccount= this.#page.getByRole('link', { name: 'Create an Account' });
    
    }

    async clickHeaderLink(): Promise<void> {
        await this.#playwrightWrapper.click(this.#headerLink);
    }


    async clickCreateAnAccount(): Promise<void> {
        await this.#playwrightWrapper.click(this.#createAnAccount);
    }




}