import { Document, Model } from 'mongoose';

export type TCategory = {
    name: string,
    sku: number | null,
    tags: number[]
}

export type CategoryDocument = Document<TCategory>;

export type CategoryModel = Model<CategoryDocument>;