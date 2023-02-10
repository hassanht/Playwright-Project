import { Locator, Page, BrowserContext } from "@playwright/test";
import { URLS } from "../lib/constants";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class SignInPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #userNameInput: Locator;
    #passwordInput: Locator;
    #loginButton:Locator;
    #editProfileIcon:Locator;

    #forgotPasswordLink:Locator;
    #forgotPasswordEmail:Locator;
    #sendResetCodeButton:Locator; 
    #createPasswordInput:Locator;
    #confirmPasswordInput:Locator;
    #enterCodeInput:Locator;
    #updateButton:Locator;
    #passwordResetMessage: Locator;

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#userNameInput = this.#page.getByPlaceholder('Username');
        this.#passwordInput = this.#page.locator('//input[@placeholder="Password"]');
        this.#loginButton = this.#page.locator("(//button[@type='submit']//span)[2]");
        this.#editProfileIcon = this.#page.locator("//span[@class='edit-text']//*[name()='svg']");

        this.#forgotPasswordLink = this.#page.locator("a[href='#forgot-password']");
        this.#forgotPasswordEmail = this.#page.locator("//div[@class='inputFieldHolder clr']//input[@id='email']");
        this.#sendResetCodeButton = this.#page.locator("button[class='custom-btn dark-bg br-100 md '] span[class='txt']");
        this.#createPasswordInput = this.#page.locator("input[placeholder='Create Password']");
        this.#confirmPasswordInput = this.#page.locator("input[placeholder='Confirm Password']");
        this.#enterCodeInput = this.#page.locator("div[class='input_row'] input[placeholder='Enter Code']");
        this.#updateButton = this.#page.locator("button[class='custom-btn dark-bg md br-100']");
        this.#passwordResetMessage = this.#page.getByText('Password reset successfully.');
  
    }

    async navigateToUrl(): Promise<void> {
        await this.#page.goto(URLS.login);
    }

    async addUserName(value: string): Promise<void> {
        await this.#playwrightWrapper.fill(this.#userNameInput, value);

    }

    async PasswordInput(password): Promise<void> {
        await this.#playwrightWrapper.fill(this.#passwordInput, password);

    }
   
    async clickloginButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#loginButton);
    }




    async clickforgotPasswordLink(): Promise<void> {
        await this.#playwrightWrapper.click(this.#forgotPasswordLink);
    }

    async enterforgotPasswordEmail(username): Promise<void> {
        await this.#playwrightWrapper.fill(this.#forgotPasswordEmail,username+"@getnada.com");
    }

    async clickResentCodeButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#sendResetCodeButton);
    }

    async enterPasswordInput(password): Promise<void> {
        await this.#playwrightWrapper.fill(this.#createPasswordInput,password);
    }

    async enterconfirmPasswordInput(password): Promise<void> {
        await this.#playwrightWrapper.fill(this.#confirmPasswordInput,password);
    }

    async enterCodeInput(code): Promise<void> {
        await this.#playwrightWrapper.fill(this.#enterCodeInput,code);
    }


    async clickupdateButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#updateButton);
    }

    async isDisplayedPasswordResetMessage(): Promise<boolean> {
        return this.#passwordResetMessage.isVisible();

    }

    // async clickEditProfileIcon(): Promise<void> {
    //     await this.#playwrightWrapper.click(this.#editProfileIcon);
    // } 

}




