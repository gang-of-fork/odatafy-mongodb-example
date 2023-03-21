import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { setupDatabase } from './db/setup';

import { OrderRouter } from './routes/order';
import { ProductRouter } from './routes/product';
import { CategoryRouter } from './routes/category';

dotenv.config();

const app = express();

app.use(morgan('dev'));

mongoose.connect(process.env.DB_URL as string, async ()=>{
    console.log('Database connection successfull')
    
    if(process.env.ENVIRONMENT != "TEST") {
        await setupDatabase();
    }
});

app.use('/orders', OrderRouter);
app.use('/products', ProductRouter);
app.use('/categories', CategoryRouter);

app.listen(parseInt(process.env.PORT as string), ()=>{
    console.log(`App started on Port ${process.env.PORT}`)
});