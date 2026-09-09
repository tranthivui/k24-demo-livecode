import { Page, test, expect } from "@playwright/test";
import { ProductDatailPage } from "./src/pages/product.page";

test.describe("Verify detail product page", async () => {
    //Pre-condition
    test.beforeEach("Go to product detail page", async ({ page }) => {
        await test.step("Go to product detail page", async () => {
            await page.goto("https://e-commerce-dev.betterbytesvn.com/product/fullstack-automation-qa-voi-playwright-typescript/");
        })
    });

    //PRODUCT_001 - Verify product page hiển thị đúng với thông tin sản phẩm
    test("@PRODUCT_001 - Verify product page hiển thị đúng với thông tin sản phẩm", async ({ page }) => {
        const testData = {
            productName: "FullStack Automation QA với Playwright Typescript",
            originPrice: "2.499.000",
            currentPrice: "1.749.000",
            desc: "Khoá học automation test từ chưa biết gì, với Playwright TypeScript",
            stockStatus: true

        };
        const productDetail = new ProductDatailPage(page);

        let originP = await productDetail.originPrice.innerText();
        let currentP = await productDetail.currentPrice.innerText();
        // console.log(currentP);
        originP = originP.replace("Original price was: ", "");
        originP = originP.replace("$.", "").trim();
        currentP = currentP.replace("Current price is: ", "");
        currentP = currentP.replace("$.", "").trim();
        let descP = await productDetail.desc.innerText();
        //Verify origin price
        await expect(originP).toBe(testData.originPrice);
        //Verify current price
        await expect(currentP).toBe(testData.currentPrice);
        //Verify desc
        await expect(descP).toBe(testData.desc);
        //Verify title product
        await expect(productDetail.titleProduct).toBeVisible();
        //Verofu button add product enable and able to click
        await expect(productDetail.addProductBtn).toBeVisible();
        await productDetail.clickAddProduct();

        //Assert: image load success
        const naturalWidth = await productDetail.image.evaluate(
            (img: HTMLImageElement) => img.naturalWidth
        );
        await expect(naturalWidth).toBeGreaterThan(0);

        //Click to review tab and verify not have review
        await productDetail.clickTabReview();
        await expect(productDetail.textNotHaveReview).toBeVisible();
    })

    //Verify tính năng product review hoạt động đúng: khi submit, review sẽ hiển thị ở trình duyệt người dùng
    test("Verify tính năng product review hoạt động đúng: khi submit, review sẽ hiển thị ở trình duyệt người dùng", async ({ page, browser }) => {
        const testData = {
            yourReview: "Review 30081",
            yourEmail: "vuitest30081@gmail.com",
            yourName: "VuiTran30081",
            yourRating: 'star-5',
            yourReviewStatus: "Your review is awaiting approval"
        }
        const productDetail = new ProductDatailPage(page);
        //Verify tab review: Not have review, show your rating-your review-name-email-checkbox
        await productDetail.clickTabReview();
        await expect(productDetail.textNotHaveReview).toBeVisible();
        await expect(productDetail.yourRatingtext).toBeVisible();
        await expect(productDetail.yourComment).toBeVisible();
        await expect(productDetail.name).toBeVisible();
        await expect(productDetail.email).toBeVisible();
        await expect(productDetail.saveNameCkb).toBeVisible();

        //Write review
        await productDetail.writeReview(testData.yourReview, testData.yourName, testData.yourEmail, testData.yourRating);
        
        //Verify review status=Waiting approve
        productDetail.getReviewStatus(testData.yourReview);
        const reviewStatusText = await productDetail.reviewstatus.innerText();
        //  console.log(reviewStatusText);
        expect(reviewStatusText).toBe(`${testData.yourReviewStatus}`);

        //Refresh browser
        await page.waitForTimeout(2_000);
        await page.reload();
        expect(reviewStatusText).toBe(`${testData.yourReviewStatus}`);

        
        //Open new browser and not show review
        const context=await browser.newContext();
        const page2=await context.newPage();
        await page2.goto("https://e-commerce-dev.betterbytesvn.com/product/fullstack-automation-qa-voi-playwright-typescript/");
        const newProductDetailPage=new ProductDatailPage(page2);
        await newProductDetailPage.clickTabReview();
        await expect(newProductDetailPage.textNotHaveReview).toBeVisible();
        await page2.waitForTimeout(10_000);
    })
})