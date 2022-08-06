import { Document, Model } from 'mongoose';

export type TCategory = {
    name: string,
    sku: number | null
}

export type CategoryDocument = Document<TCategory>;

export type CategoryModel = Model<CategoryDocument>;