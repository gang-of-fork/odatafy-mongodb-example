import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { init as initializeOdatafy, getServiceMetaData } from 'odatafy-mongoose';

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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/orders', OrderRouter);
app.use('/products', ProductRouter);
app.use('/categories', CategoryRouter);

app.get('/', (_req, res) => {
    res.json(
        {
            "@odata.context": "https://example.odatafy.gang-of-fork.de/$metadata",
            "value": [
                {
                    "name": "Product",
                    "kind": "EntitySet",
                    "url": "products"
                },
                {
                    "name": "Order",
                    "kind": "EntitySet",
                    "url": "orders"
                },
                {
                    "name": "Category",
                    "kind": "EntitySet",
                    "url": "categories"
                }
            ]
        }
    )
});

initializeOdatafy(mongoose);

app.get('/([\$])metadata', (_req, res) => {
    res.json(getServiceMetaData());
})

app.listen(parseInt(process.env.PORT as string), ()=>{
    console.log(`App started on Port ${process.env.PORT}`)
});