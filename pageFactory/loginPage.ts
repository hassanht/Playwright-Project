import { Locator, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class LoginPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #userName: Locator;
    #password: Locator;
    #loginBtn: Locator;
    #loginForm: Locator;
    #errorMsg: Locator;

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#userName = this.#page.locator('[id="user-name"]');
        this.#password = this.#page.locator('[id="password"]');
        this.#loginBtn = this.#page.locator('[id="login-button"]');
        this.#loginForm = this.#page.locator('[id="login_button_container"]');
        this.#errorMsg = this.#page.locator('[data-test="error"]');
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginBtn();
        await this.waitForPageLoad();
    }

    async enterUsername(username: string): Promise<void> {
        await this.#playwrightWrapper.fill(this.#userName, username);
    }
    
    async enterPassword(password: string): Promise<void> {
        await this.#playwrightWrapper.fill(this.#password, password);
    }
    
    async clickLoginBtn(): Promise<void> {
        await this.#playwrightWrapper.click(this.#loginBtn);
    }
    
    async waitForPageLoad(): Promise<void> {
        await this.#playwrightWrapper.waitForPageLoad();
    }

    async isLoginFormDisplayed(): Promise<boolean> {
        return await this.#playwrightWrapper.isVisible(this.#loginForm)
    }

    async isErrorMsgDisplayed(): Promise<boolean> {
        return await this.#playwrightWrapper.isVisible(this.#errorMsg)
    }

    async getErrorMsgText(): Promise<string> {
        return await this.#playwrightWrapper.getText(this.#errorMsg);
    }
}
