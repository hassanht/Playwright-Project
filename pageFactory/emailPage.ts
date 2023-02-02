import { Locator, Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class EmailPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #addInboxButton: Locator;
    #userNameField: Locator;
    #selectDomain: Locator;
    #addNowButton: Locator;
    #cofirmationEmailRow:Locator;
    #confirmButton:Locator;
   

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#addInboxButton = this.#page.locator('//button[contains(text(),"Add inboxe")]');
        this.#userNameField = this.#page.getByPlaceholder('user name');
        this.#selectDomain = this.#page.locator("select.block");
        this.#addNowButton = this.#page.locator('button.bg-indigo-500.text-white');
        this.#cofirmationEmailRow = this.#page.locator("//a[contains(text(),'Welcome to Virtua')]");
        this.#confirmButton=this.#page.frameLocator('#the_message_iframe').getByRole('link', { name: 'Click to Confirm' });
    
    }


   


    async navigateToUrl(): Promise<void> {
        await this.#page.goto("https://getnada.com/");
    }

    async clickAddInboxButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#addInboxButton);

    }

    async addUserName(value: string): Promise<void> {
        await this.#playwrightWrapper.fill(this.#userNameField, value);

    }

    async selectDomain(): Promise<void> {
        await this.#selectDomain.selectOption("getnada.com");

    }


    async clickAddNowButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#addNowButton);

    }



    async clickConfirmationEmailRow(): Promise<void> {
        await this.#playwrightWrapper.click(this.#cofirmationEmailRow);

    } 

    async clickConfirmButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#confirmButton);

    } 

}
function combobox(arg0: string, combobox: any, arg2: string, com: any, arg4: string): Location {
    throw new Error("Function not implemented.");
}



