import { Locator, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "./plawrightWrapper";

export class MarketplacePage {
    #itemPrice:string;
    #page: Page;
    #playwrightWrapper: PlaywrightWrapper;
    #marketPlaceLink: Locator;
    #onSaleButton: Locator;
    #priceRangeFilter: Locator;
    #minInputField: Locator;
    #maxInputField: Locator;
    #cartIcon:Locator;
    #confirmButton: Locator;
    #itemLink: Locator;
    #priceAndAddToCartSection:Locator;
    #addToCartButton: Locator;
    #addToCartSucessMessage: Locator;
    
   

    constructor(page: Page) {
        this.#page = page;
        this.#playwrightWrapper = new PlaywrightWrapper(this.#page);
        this.#marketPlaceLink = this.#page.locator("a[href='/marketplace']");
        this.#onSaleButton = this.#page.getByRole('link', { name: 'On Sale' });
        this.#priceRangeFilter = this.#page.getByRole('button', { name: 'Price Range' });
        this.#minInputField = this.#page.locator('#priceRangeDropDown').getByPlaceholder('min.');
        this.#maxInputField = this.#page.locator('#priceRangeDropDown').getByPlaceholder('max.');
        this.#confirmButton = this.#page.locator('#priceRangeDropDown').getByRole('button', { name: 'confirm' });
        this.#itemLink = this.#page.locator("(//div[contains(@class,'col-6 col-md-4')])[1]");
        this.#priceAndAddToCartSection = this.#page.locator("(//div[contains(@class,'top-price-section d-flex')])[2]");
        this.#addToCartButton = this.#page.getByRole('button', { name: 'Add to Cart' });
        this.#cartIcon = this.#page.locator("//div[@class='dp-holder']");
        this.#addToCartSucessMessage = this.#page.getByText('Item added in cart will last for 10 minutes, better hurry!.');
      

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
        await this.#playwrightWrapper.fill(this.#minInputField, "1");

    }

    async enterMaxInputField(): Promise<void> {
        await this.#playwrightWrapper.fill(this.#maxInputField, "10");

    }


    async clickConfirmButton(): Promise<void> {
        await this.#playwrightWrapper.click(this.#confirmButton);

    }

    async clickItemLink(): Promise<void> {
        await this.#playwrightWrapper.click(this.#itemLink);

    }

    
    async clickAddToCartButton(): Promise<void> {
        this.#itemPrice=await this.#priceAndAddToCartSection.locator("//div//span[contains(@class,'semi-bold dBlock priceValue')]").innerHTML();
        await this.#playwrightWrapper.click(this.#addToCartButton);


    }
    async clickCartIcon(): Promise<void> {
        await this.#playwrightWrapper.click(this.#cartIcon);

    }
    async getItemPriceText(): Promise<string> {
       return await this.#itemPrice.replace(",","");

    }

    async isDisplayedaddToCartSucessMessage(): Promise<boolean> {
        let cartItemCount = await this.#cartIcon.locator("//div//span").innerHTML();
        expect(cartItemCount).toContain("1");
        this.#playwrightWrapper.waitForLocator(this.#addToCartSucessMessage);
        return await this.#addToCartSucessMessage.isVisible();

    }

   
}



