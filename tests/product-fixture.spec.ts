import { expect } from "@playwright/test";
import { test } from "./src/fixture/product.fixture.ts";
import { ProductDatailPage } from "./src/pages/product.page.ts";

test.describe("Verify detail product page", async () => {
    //Arrange
    const testData = {
        product: {
            productName: "FullStack Automation QA với Playwright Typescript",
            originPrice: "Original price was: 2.499.000 $.",
            currentPrice: "Current price is: 1.749.000 $.",
            desc: "Khoá học automation test từ chưa biết gì, với Playwright TypeScript",
            stockStatus: true
        },
        review: {
            reviewText: "Review 09083",
            email: "vuitest09083@gmail.com",
            name: "VuiTran09083",
            rating: 'star-5',
            status: "Your review is awaiting approval"
        }
    };
    //Pre-condition
    test.beforeEach("Go to product detail page", async ({ page }) => {
        await test.step("Go to product detail page", async () => {
            await page.goto("https://e-commerce-dev.betterbytesvn.com/product/fullstack-automation-qa-voi-playwright-typescript/");
        })
    });

    //PRODUCT_001 - Verify product page hiển thị đúng với thông tin sản phẩm
    test("@PRODUCT_001 - Verify product page hiển thị đúng với thông tin sản phẩm", async ({ productDetail }) => {
        //Verify origin price
        await expect(productDetail.originPrice).toHaveText(testData.product.originPrice);
        //Verify current price
        await expect(productDetail.currentPrice).toHaveText(testData.product.currentPrice);
        //Verify desc
        await expect(productDetail.desc).toHaveText(testData.product.desc);
        //Verify title product
        await expect(productDetail.titleProduct).toBeVisible();
        //Verofu button add product enable and able to click
        await expect(productDetail.addProductBtn).toBeVisible();
        await productDetail.clickAddProduct();

        //Assert: image load success
        const naturalWidth = await productDetail.image.evaluate(
            (img: HTMLImageElement) => img.naturalWidth
        );
        expect(naturalWidth).toBeGreaterThan(0);

        //Click to review tab and verify not have review
        await productDetail.clickTabReview();
        await expect(productDetail.textNotHaveReview).toBeVisible();
    })

    //Verify tính năng product review hoạt động đúng: khi submit, review sẽ hiển thị ở trình duyệt người dùng
    test("Verify tính năng product review hoạt động đúng: khi submit, review sẽ hiển thị ở trình duyệt người dùng", async ({ productDetail, browser }) => {

        //Verify tab review: Not have review, show your rating-your review-name-email-checkbox
        await productDetail.clickTabReview();
        await expect(productDetail.textNotHaveReview).toBeVisible();
        await expect(productDetail.yourRatingtext).toBeVisible();
        await expect(productDetail.yourComment).toBeVisible();
        await expect(productDetail.name).toBeVisible();
        await expect(productDetail.email).toBeVisible();
        await expect(productDetail.saveNameCkb).toBeVisible();

        //Write review
        await productDetail.writeReview(testData.review.reviewText, testData.review.name, testData.review.email, testData.review.rating);

        //Verify review status=Waiting approve
        expect(productDetail.getReviewStatus(testData.review.reviewText)).toHaveText(testData.review.status);

        //Refresh browser
        await productDetail.page.waitForTimeout(2_000);
        await productDetail.page.reload();
        await expect(productDetail.getReviewStatus(testData.review.reviewText)).toHaveText(testData.review.status);


        //Open new browser and not show review
        const context = await browser.newContext();
        const page2 = await context.newPage();
        await page2.goto("https://e-commerce-dev.betterbytesvn.com/product/fullstack-automation-qa-voi-playwright-typescript/");
        const newProductDetailPage = new ProductDatailPage(page2);
        await newProductDetailPage.clickTabReview();
        await expect(newProductDetailPage.textNotHaveReview).toBeVisible();
        await page2.waitForTimeout(10_000);
    })
})