import { test, expect } from "@playwright/test";
import { HomePage } from "./src/pages/home.page";

test.describe("Home - test display", async () => {
    test.beforeEach(async({page})=>{
                await test.step("Goto site: https://e-commerce-dev.betterbytesvn.com/", async () => {
            await page.goto("https://e-commerce-dev.betterbytesvn.com/");
        })
    })

    //@HOME_001 - Verify Home page loads successfully
    test("@HOME_001 - Verify Home page loads successfully", async ({ page }) => {
       /*
        await test.step("Go to: https://e-commerce-dev.betterbytesvn.com/", async () => {
            await page.goto("https://e-commerce-dev.betterbytesvn.com/");
        });
        */
        //Arrange
        const testData = {
            url: "https://e-commerce-dev.betterbytesvn.com",
            title: 'E-commerce site testing',
            placeHolder: 'Search products..."',
            myAccount: 'My account',
            menu: ["Trang chủ", "Danh sách khoá học", "Blog"]
        };

        //Act
        const homePage = new HomePage(page);

        //Assert
        // - Title: E - commerce site testing
        await expect(homePage.title).toHaveText(testData.title);
        //- Search bar: hiển thị với placeholder: "Search products..."
        await expect(homePage.searchBar).toBeVisible();
        //TODO: - Hover vào icon user, hiển thị text "My account"
        await expect(homePage.tooltip).toBeVisible();
        //- Menu: "Trang chủ", "Danh sách khoá học", "Blog"
        for (let i = 0; i < 3; i++) {
            await expect(homePage.menu.nth(i)).toHaveText(testData.menu[i]);
        }
    })

    //@HOME_002 - Verify search function work correctly
     test("@HOME_002 - Verify search function work correctly", async ({ page }) => {
        //Arrange
        const testData = {
            keyWord: 'ISTQB'
        };

        //Act
        const homePage = new HomePage(page);
        await homePage.searchProduct(testData.keyWord);

        let rowNumberOfResult = await homePage.numberOfResult.innerText();
        rowNumberOfResult = rowNumberOfResult.replace("Showing all ", "");
        rowNumberOfResult = rowNumberOfResult.replace(" results", "");
        const originNumberOfResult = parseInt(rowNumberOfResult);

        //Assert
        //- Kết quả hiển thị tất cả đều chứa từ ISTQB
        for (let i = 0; i < originNumberOfResult; i++) {
            let productName = await homePage.resultItems.nth(i).locator(homePage.productName).innerText();
            await expect(productName).toContain(testData.keyWord);
        }
        //Hiển thị text showing X results
        await expect(homePage.numberOfResult).toBeVisible();
        //Tong ket qua=X
        await expect(homePage.resultItems).toHaveCount(originNumberOfResult);
    })
})
