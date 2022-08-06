import mongoose, { Schema } from 'mongoose';
import { OrderDocument, OrderModel } from '../types/order';

const OrderSchema = new Schema({
    customer: { type: String, required: true },
    products: [
        { type: Schema.Types.ObjectId, required: true, ref: 'Product' }
    ],
    orderDate: { type: Date, required: true }
});

export const Order = mongoose.model<OrderDocument, OrderModel>('Order', OrderSchema, 'orders');