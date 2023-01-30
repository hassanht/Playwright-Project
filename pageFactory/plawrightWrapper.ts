import { Locator, Page } from "@playwright/test"

export class PlaywrightWrapper {
    #page: Page;

    constructor(page: Page) {
        this.#page = page;
    }

    async goto(url: string) {
        return await this.#page.goto(url);
    }

    async click(element: Locator) {
        await element.click();
    }

    async fill(element: Locator, text: string) {
        await element.fill(text);
    }

    async getText(element: Locator): Promise<string> {
        return await element.innerText();
    }

    async isVisible(element: Locator): Promise<boolean> {
        return await element.isVisible();
    }

    async waitForLocator(element: Locator) {
        return await element.waitFor();
    }

    async getElementCounts(element: Locator[]): Promise<number> {
        return element.length;
    }

    async takeFullPageScreenshot() {
        await this.#page.screenshot({ fullPage: true });
    }

    async waitForPageLoad(): Promise<void> {
        await this.#page.waitForLoadState('networkidle');
    }
}