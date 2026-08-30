import { Locator, Page } from "@playwright/test";

export class ProductDatailPage {
    page: Page;
    titleProduct: Locator;
    image: Locator;
    price: Locator;
    originPrice: Locator;
    currentPrice: Locator;
    desc: Locator;
    addProductBtn: Locator;
    tabReview: Locator;
    textNotHaveReview: Locator;
    yourComment: Locator;
    name: Locator;
    email: Locator;
    submitReviewBtn: Locator;
    yourRatingtext: Locator;
    saveNameCkb: Locator;
    reviewstatus: Locator;
    //  yourRating: Locator;


    constructor(page: Page) {
        this.page = page;
        this.titleProduct = this.page.locator("//h1[text()='FullStack Automation QA với Playwright Typescript']");
        this.image = this.page.locator("//div[@class='woocommerce-product-gallery__wrapper']/descendant::img[@class='zoomImg']");
        this.price = this.page.locator("//p[@class='price']/child::span");
        this.originPrice = this.page.locator("//p[@class='price']/child::span").nth(0);
        this.currentPrice = this.page.locator("//p[@class='price']/child::span").nth(1);
        this.desc = this.page.locator("//div[@id='tab-description']/child::p");
        this.addProductBtn = this.page.locator("//button[@name='add-to-cart']");
        this.tabReview = this.page.locator("//a[@href='#tab-reviews']");
        this.textNotHaveReview = this.page.locator("//p[@class='woocommerce-noreviews']");
        this.yourComment = this.page.locator("//textarea[@id='comment']");
        this.name = this.page.locator("//input[@id='author']");
        this.email = this.page.locator("//input[@id='email']");
        this.submitReviewBtn = this.page.locator("//input[@id='submit']");
        this.yourRatingtext = this.page.locator("//label[@id='comment-form-rating-label']");
        this.saveNameCkb = this.page.locator("//input[@id='wp-comment-cookies-consent']");
        this.reviewstatus = this.page.locator("//em[@class='woocommerce-review__awaiting-approval']");
        //   this.yourRating = this.page.locator("//a[@class='star-5']")
    }

    async clickTabReview() {
        await this.tabReview.click();
    }

    async clickAddProduct() {
        await this.addProductBtn.click();
    }

    async writeReview(yourReview: string, name: string, email: string, yourRating: string) {
        await this.setYourReview(yourReview);
        await this.setYourName(name);
        await this.setYourEmail(email);
        await this.checkSaveName();
        await this.setRating(yourRating);
        await this.clickSubmitYourReview();
    }

    async setYourReview(yourReview: string) {
        await this.yourComment.fill(yourReview);
    }

    async setYourEmail(email: string) {
        this.email.fill(email);
    }


    async setYourName(name: string) {
        await this.name.fill(name);
    }

    async setRating(yourRating: string) {
        await this.page.locator(`//a[@class='${yourRating}']`).click();
    }

    async checkSaveName() {
        await this.saveNameCkb.check();
    }

    async clickSubmitYourReview() {
        await this.submitReviewBtn.click();
    }

    async getReviewStatus(youReview: string) {
        this.reviewstatus = this.page.locator(`//p[text()='${youReview}']/preceding::em`);
    }
}