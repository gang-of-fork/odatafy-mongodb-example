import mongoose, { Schema } from 'mongoose';
import { ProductDocument, ProductModel } from '../types/product';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    price: { type: Number, required: true }
});

export const Product = mongoose.model<ProductDocument, ProductModel>('Product', ProductSchema, 'products');