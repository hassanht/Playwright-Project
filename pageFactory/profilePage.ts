import { Locator, Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";


export class ProfilePage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #profileIcon: Locator;
    #viewProfileButton: Locator;
    #usernameText: Locator;
    #logoutLink: Locator;
    #resetPassword: Locator;
    #resetOldPassword: Locator;
    #resetNewPassword: Locator;
    #resetConfirmNewPassword: Locator;
    #resetUpdatePasswordButton: Locator;
    #resetPawwordSucessMessage: Locator;
    #getMetaMaskAccount:Locator;





    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#profileIcon = this.#page.locator(".icon.avatar");
        this.#viewProfileButton = this.#page.locator("//a[normalize-space()='View Profile']");
        this.#usernameText = this.#page.locator('(//div[@class="field-txt truncate"])[1]');
        this.#logoutLink = this.#page.getByRole('link', { name: 'Logout' });
        this.#resetPassword = this.#page.getByRole('link', { name: 'Reset Password' });
        this.#resetOldPassword = this.#page.getByPlaceholder('Old Password');
        this.#resetNewPassword = this.#page.locator('#new_password');
        this.#resetConfirmNewPassword = this.#page.getByPlaceholder('Confirm New Password');
        this.#resetUpdatePasswordButton = this.#page.locator('//span[normalize-space()="Update Password"]');
        this.#resetPawwordSucessMessage = this.#page.getByText("password changed sucessfully.")
        this.#getMetaMaskAccount = this.#page.locator(".mb-0.truncate")
    }

    async clickProfileIcon(): Promise<void> {
        await this.#playwrightWrapper.click(this.#profileIcon);

    }
    async clickViewProfileButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#viewProfileButton);
    }
    async getUsernameText(): Promise<string> {
        return this.#usernameText.innerHTML();
    }


    async clickResetPasswordLink(): Promise<void> {
        await this.#playwrightWrapper.click(this.#resetPassword)
    }

    async enterOldPasswordInput(password): Promise<void> {
        await this.#playwrightWrapper.waitForLocator(this.#resetOldPassword);
        await this.#playwrightWrapper.fill(this.#resetOldPassword, password);
    }

    async enterNewPasswordInput(password): Promise<void> {
        await this.#playwrightWrapper.fill(this.#resetNewPassword, password)
    }
    async enterConfirmNewPasswordInput(password): Promise<void> {
        await this.#playwrightWrapper.fill(this.#resetConfirmNewPassword, password)
    }

    async clickUpdatePasswordButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#resetUpdatePasswordButton)
    }



    async clickLogoutLink(): Promise<void> {
        await this.#playwrightWrapper.click(this.#logoutLink)
    }


    async clickMetamaskAccount(): Promise<string> {
        await this.#playwrightWrapper.click(this.#getMetaMaskAccount);
        const text = await this.#getMetaMaskAccount.innerText();
        const lastThreeDigits = text.slice(-3);
        return lastThreeDigits;
        
    }



}




