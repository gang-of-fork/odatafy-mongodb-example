import { Document, Model, Types } from 'mongoose';

export type TProduct = {
    name: string,
    description: string,
    category: Types.ObjectId,
    price: number
}

export type ProductDocument = Document<TProduct>;

export type ProductModel = Model<ProductDocument>;