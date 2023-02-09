import { Locator, Page, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class MarketplacePage {
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #marketPlaceLink:Locator;
    #onSaleButton:Locator;
    #priceRangeFilter:Locator;
    #minInputField:Locator;
    #maxInputField:Locator;
    #confirmButton:Locator;
    #itemLink:Locator;
    #addToCartButton:Locator;
    #proceedToCheckOutButton:Locator;
    #payWithNewCreditCradRadioButton:Locator;
    #cardNumberInputField:Locator;
    #expirationDateInputField:Locator;
    #cvcInputField:Locator;
    #payNowButton:Locator;



    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#marketPlaceLink = this.#page.locator("a[href='/marketplace']");
        this.#onSaleButton = this.#page.getByRole('link', { name: 'On Sale' });
        this.#priceRangeFilter = this.#page.getByRole('button', { name: 'Price Range' });
        this.#minInputField = this.#page.locator('#priceRangeDropDown').getByPlaceholder('min.');
        this.#maxInputField=this.#page.locator('#priceRangeDropDown').getByPlaceholder('max.');
        this.#confirmButton=this.#page.locator('#priceRangeDropDown').getByRole('button', { name: 'confirm' });
        this.#itemLink=this.#page.getByRole('link', { name: 'Modern Maharaja Modern Maharaja Starting From $5,000.00 6315 Item(s)' });
        this.#addToCartButton=this.#page.getByRole('button', { name: 'Add to Cart' });
        this.#proceedToCheckOutButton=this.#page.getByRole('button', { name: 'proceed to checkout' });
       this.#payWithNewCreditCradRadioButton=this.#page.getByRole('listitem').filter({ hasText: 'Pay with new Credit Card' }).locator('span');
       this.#cardNumberInputField=this.#page.frameLocator('internal:attr=[title="Secure card number input frame"i]').getByPlaceholder('1234 1234 1234 1234');
       this.#expirationDateInputField=this.#page.frameLocator('internal:attr=[title="Secure expiration date input frame"i]').getByPlaceholder('MM / YY');
       this.#cvcInputField=this.#page.frameLocator('internal:attr=[title="Secure CVC input frame"i]').getByPlaceholder('CVC');
       this.#payNowButton=this.#page.getByRole('button', { name: 'Pay now' });

    }

    async clickMarketplaceLink(): Promise<void> {
        await this.#playwrightWrapper.click(this.#marketPlaceLink);

    }

        async clickonSaleButton(): Promise<void> {
            await this.#playwrightWrapper.click(this.#onSaleButton);

}

async clickPriceRangeFilter(): Promise<void> {
    await this.#playwrightWrapper.click(this.#priceRangeFilter);

}

async enterMinInputField(): Promise<void> {
    await this.#playwrightWrapper.fill(this.#minInputField,"100");

}

async enterMaxInputField(): Promise<void> {
    await this.#playwrightWrapper.fill(this.#minInputField, "1000");

}


async clickConfirmButton(): Promise<void> {
    await this.#playwrightWrapper.click(this.#confirmButton);

}

async clickItemLink(): Promise<void> {
    await this.#playwrightWrapper.click(this.#itemLink);

}
async clickAddToCartButton(): Promise<void> {
    await this.#playwrightWrapper.click(this.#addToCartButton);

}

async clickProceedToCheckOutButton(): Promise<void> {
    await this.#playwrightWrapper.click(this.#proceedToCheckOutButton);

}


async clickPayWithNewCreditRadioButton(): Promise<void> {
    await this.#playwrightWrapper.click(this.#payWithNewCreditCradRadioButton);

}


async enterCardNumberInputField(): Promise<void> {
    await this.#playwrightWrapper.fill(this.#cardNumberInputField,"4242424242424242");

}

async enterExpirationDateInputField(): Promise<void> {
    await this.#playwrightWrapper.fill(this.#expirationDateInputField,"1230");

}

async enterCvcInputField(): Promise<void> {
    await this.#playwrightWrapper.fill(this.#cvcInputField,"123");

}

async clickPayNowButton(): Promise<void> {
    await this.#playwrightWrapper.click(this.#payNowButton);

}


}



