import { Locator, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class AddToCartPage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #proceedToCheckOutButton: Locator;
    #payWithNewCreditCradRadioButton: Locator;
    #cardNumberInputField: Locator;
    #expirationDateInputField: Locator;
    #cvcInputField: Locator;
    #payNowButton: Locator;
    #viewTranscationButton:Locator;
    #itemPriceInCart:Locator




    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#proceedToCheckOutButton = this.#page.getByRole('button', { name: 'proceed to checkout' });
        this.#payWithNewCreditCradRadioButton = this.#page.getByRole('listitem').filter({ hasText: 'Pay with new Credit Card' }).locator('span');
        this.#cardNumberInputField = this.#page.frameLocator('internal:attr=[title="Secure card number input frame"i]').getByPlaceholder('1234 1234 1234 1234');
        this.#expirationDateInputField = this.#page.frameLocator('internal:attr=[title="Secure expiration date input frame"i]').getByPlaceholder('MM / YY');
        this.#cvcInputField = this.#page.frameLocator('internal:attr=[title="Secure CVC input frame"i]').getByPlaceholder('CVC');
        this.#payNowButton = this.#page.getByRole('button', { name: 'Pay now' });
       this.#viewTranscationButton=this.#page.locator ("(//span[text()='View Transactions'])[1]");
       this.#itemPriceInCart = this.#page.locator("//li[@class='clr itemLi']//span[1]");
        

    }

   


    async clickProceedToCheckOutButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#proceedToCheckOutButton);

    }

  

    async clickPayWithNewCreditRadioButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#payWithNewCreditCradRadioButton);

    }


    async enterCardNumberInputField(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#cardNumberInputField, "4242424242424242");

    }

    async enterExpirationDateInputField(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#expirationDateInputField, "1230");

    }

    async enterCvcInputField(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#cvcInputField, "123");

    }

    async clickPayNowButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#payNowButton);

    }


    async getViewTranscationButton(): Promise<string> {
        return await this.#viewTranscationButton.innerHTML();

    }
    async getItemPriceInCartText(): Promise<string> {
        return await this.#itemPriceInCart.innerHTML();

    }
}



