import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { TCategory } from './../types/category';
import { TOrder } from './../types/order';
import { TProduct } from './../types/product';

import { Category } from './../schemas/category';
import { Order } from './../schemas/order';
import { Product } from './../schemas/product';

export async function setupDatabase() {
    await clearDatabase();

    const categories = await Promise.all(
        getCategoryData(15).map(async (cat)=> {
            return await Category.create(cat);
        })
    );

    console.log('Setup Categories');

    const products = await Promise.all(
        getProductData(60, categories.map(cat => cat._id.toString())).map(async (prod)=> {
            return await Product.create(prod);
        })
    );

    console.log('Setup Products');

    await Promise.all(
        getOrderData(300, products.map(prod => prod._id.toString())).map(async (order)=>{
            return await Order.create(order);
        })
    );

    console.log('Setup Orders');
}

export async function clearDatabase() {
    await Category.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
}

export function getCategoryData(n: number) {
    let categoryData: TCategory[] = [];

    for(let i=0; i<n; i++) {
        categoryData.push({
            name: faker.commerce.product(),
            sku: faker.helpers.arrayElement([ parseInt(faker.random.numeric(8)), null ]),
            tags: [1, 2, 3]
        });
    }

    return categoryData;
}

export function getProductData(n: number, categories: string[]) {
    let productData: TProduct[] = [];

    for(let i=0; i<n; i++) {
        productData.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.finance.amount(0, 1000, 2)),
            category: new mongoose.Types.ObjectId(faker.helpers.arrayElement(categories))
        });
    }

    return productData;
}

export function getOrderData(n: number, products: string[]) {
    let orderData: TOrder[] = [];

    for(let i=0; i<n; i++) {
        const selectedProducts = faker.helpers.arrayElements(products).map(prod => new mongoose.Types.ObjectId(prod));

        orderData.push({
            customer: faker.name.findName(),
            tax: parseFloat(faker.finance.amount(0, 1000, 4)),
            orderDate: new Date(faker.date.recent()),
            products: selectedProducts
        });
    }

    return orderData;
}