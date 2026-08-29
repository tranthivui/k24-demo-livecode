import { Locator, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    searchBar: Locator;
    searchButton: Locator;
    numberOfResult: Locator;
    resultItems: Locator;
    productName: string;
    title: Locator;
    menu: Locator;
    tooltip: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = this.page.locator("//input[@placeholder='Search products...']");
        this.searchButton = this.page.locator("//button[@type='submit']");
        this.numberOfResult = this.page.locator("//p[@class='woocommerce-result-count']");
        this.resultItems = this.page.locator("//ul[contains(@class,'products')]/li");
        this.productName = "//h2";
        this.title = this.page.locator("//h1[@class='site-title']");
        this.menu = this.page.locator("//ul[@id='menu-primary-menu']/li");
        this.tooltip=this.page.locator("//a[@data-tooltip='My Account']")
    };

    async searchProduct(searchKeyWord: string){
        await this.fillSearchKeyword(searchKeyWord); 
        await this.clickSearhBtn();
    };

    async fillSearchKeyword(keySearch: string){
        await this.searchBar.fill(keySearch);
    }


    async clickSearhBtn(){
        await this.searchButton.click();
    }

}