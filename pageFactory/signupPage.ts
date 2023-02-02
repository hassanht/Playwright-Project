import { Locator, Page, expect, Selectors } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class SignupPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #dynamicName: string;
    #acceptCookieButton: Locator;
    #firstNameInput: Locator;
    #lastNameInput: Locator;
    #userNameInput: Locator;
    #emailAddressInput: Locator;
    #termsConditionCheckbox: Locator;
    #signMeUpButton: Locator;
    #passwordInput: Locator;
    #confirmPasswordInput: Locator;
    #countryDropdown: Locator;
    #creatAccountButton: Locator;
    #avatarImage: Locator;
    #chooseAvatar: Locator;
    #avatarAccountButton: Locator;
    #confirmationMessage:Locator;

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#dynamicName = "";
        this.#acceptCookieButton = this.#page.getByText('Accept');
        this.#firstNameInput = this.#page.locator('[name="first_name"]');
        this.#lastNameInput = this.#page.locator('[name="last_name"]');
        this.#userNameInput = this.#page.locator('input[name="username"]');
        this.#emailAddressInput = this.#page.locator('[name="email"]');
        this.#termsConditionCheckbox = this.#page.locator('(//label[@class="custom-checkbox-holder"]//span)[2]');
        this.#signMeUpButton = this.#page.locator('//div[@class="forgot clr"]//button[1]');
        this.#passwordInput = this.#page.locator('[name="password"]');
        this.#confirmPasswordInput = this.#page.locator('[name="confirm_password"]');
        this.#countryDropdown = this.#page.locator('select.form-control');
        this.#creatAccountButton = this.#page.locator('//span[text()="create account"]');
        this.#avatarImage = this.#page.locator('div.cascade-slider_item.now');
        this.#chooseAvatar = this.#page.locator('#cascade-slider span');
        this.#avatarAccountButton = this.#page.locator('button.btn.custom-btn');
        this.#confirmationMessage=this.#page.getByText('An email has been sent to your Email address to verify your account')
    }

    async signup(username: string, password: string): Promise<void> {
        await this.enterfirstNameInput(username);
        await this.enterlastNameInput(password);
        await this.enterUserNameInput();
        await this.enteremailAddressInput();
        await this.clicktermsConditionCheckbox();
        await this.clicksignMeUpButton();
        await this.entercreatePasswordInput();
        await this.enterconfirmPasswordInput();
        await this.selectCountryDropdown();
        await this.clickcreateAccountButton();
        await this.selectAvatar();
        await this.clickAvatarAccountButton();
        
    }
   

    async clickAcceptCookieButton():Promise<void> {
        console.log(this.#acceptCookieButton)
        await this.#playwrightWrapper.click(this.#acceptCookieButton);
       
    }

    async enterfirstNameInput(username: string): Promise<void> {
        await this.#playwrightWrapper.fill(this.#firstNameInput, 'dummy');
    }

    async enterlastNameInput(password: string): Promise<void> {
        await this.#playwrightWrapper.fill(this.#lastNameInput, 'Test');


    }

    async enterUserNameInput(): Promise<void> {
        await this.generateName();
        await this.#playwrightWrapper.fill(this.#userNameInput, this.#dynamicName);
    }

    async enteremailAddressInput(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#emailAddressInput, this.#dynamicName + '@getnada.com');
    }

    async clicktermsConditionCheckbox(): Promise<void> {
        await this.#playwrightWrapper.click(this.#termsConditionCheckbox);
    }
    async clicksignMeUpButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#signMeUpButton);
    }

    async entercreatePasswordInput(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#passwordInput, '12@Pakistan');

    }

    async enterconfirmPasswordInput(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#confirmPasswordInput, '12@Pakistan');

    }
    async selectCountryDropdown(): Promise<void> {
        await this.#countryDropdown.selectOption("14");

    }
    async clickcreateAccountButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#creatAccountButton);
    }

    async selectAvatar(): Promise<void> {
        await this.#playwrightWrapper.waitForLocator(this.#avatarImage)
        await this.#playwrightWrapper.click(this.#chooseAvatar.nth(1));
    }

    async clickAvatarAccountButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#avatarAccountButton);
        await this.#page.waitForNavigation({waitUntil:"networkidle"});
    }

    async isDisplayedConfirmationMessage(): Promise<boolean> {
        return this.#confirmationMessage.isVisible();

    } 

    async getDynamicName(): Promise<string> {
        return this.#dynamicName;
    }

    async generateName(): Promise<void> {
        const currentTime = Date.now() * 1000000;
        this.#dynamicName = "user" + currentTime.toString().slice(10);

        console.log(this.#dynamicName);
    }

    async waitForPageLoad(): Promise<void> {
        await this.#playwrightWrapper.waitForPageLoad();
    }

    // async isLoginFormDisplayed(): Promise<boolean> {
    //     return await this.#playwrightWrapper.isVisible(this.#loginForm)
    // }

    // async isErrorMsgDisplayed(): Promise<boolean> {
    //     return await this.#playwrightWrapper.isVisible(this.#errorMsg)
    // }

    // async getErrorMsgText(): Promise<string> {
    //     return await this.#playwrightWrapper.getText(this.#errorMsg);
    // }
}
