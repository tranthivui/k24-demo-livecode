import {test as base } from "@playwright/test";
import { ProductDatailPage } from "../pages/product.page";

type ProductFixture={//khai bao mot fixture la ProductFixture
    productDetail:ProductDatailPage;//Trong ProductFixture se co mot bien la productDetail kieu du lieu la ProductDetailpage
}

export const test=base.extend<ProductFixture>({//tao mot test moi co su dung fixture la ProductFixture
    productDetail: async({page},use) =>{
        const productDetail=new ProductDatailPage(page);
        await use(productDetail);
    }
});