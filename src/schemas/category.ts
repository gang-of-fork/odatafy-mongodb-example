import mongoose, { Schema } from 'mongoose';
import { CategoryDocument, CategoryModel } from '../types/category';

const CategorySchema = new Schema({
    name: { type: String, required: true },
    sku: { type: Number, default: null }
});

export const Category = mongoose.model<CategoryDocument, CategoryModel>('Category', CategorySchema, 'categories');