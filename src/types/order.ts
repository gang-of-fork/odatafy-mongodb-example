import { Document, Model, Types } from 'mongoose';

export type TOrder = {
    customer: string,
    products: Types.ObjectId[],
    tax: number,
    orderDate: Date
}

export type OrderDocument = Document<TOrder>;

export type OrderModel = Model<OrderDocument>;