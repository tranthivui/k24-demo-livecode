import {test as base } from "@playwright/test";
import { ProductDatailPage } from "../pages/product.page";

export const test=base.extend<{productDetail:ProductDatailPage}>({
    productDetail: async({page},use) =>{
        const productDetail=new ProductDatailPage(page);
        await use(productDetail);
    }
});