import { Locator, Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class signInPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #userNameInput: Locator;
    #passwordInput: Locator;
    #loginButton:Locator;


    

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#userNameInput = this.#page.getByPlaceholder('Username');
        this.#passwordInput = this.#page.locator('//input[@placeholder="Password"]');
        this.#loginButton = this.#page.locator("(//button[@type='submit']//span)[2]");
    }

    async navigateToUrl(): Promise<void> {
        await this.#page.goto("https://marketplace.bimtvist.com/login");
    }

    async addUserName(value: string): Promise<void> {
        await this.#playwrightWrapper.fill(this.#userNameInput, value);

    }

    async PasswordInput(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#passwordInput, '12@Pakistan');

    }
   
    async clickloginButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#loginButton);
    }


}




