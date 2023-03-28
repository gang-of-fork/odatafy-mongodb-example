import { Router } from 'express';
import { PipelineStage } from 'mongoose';
import { getQueryFromUrl } from 'odatafy-mongodb';

import { Order } from '../schemas/order';

const router = Router();

router.get('/', async (req, res)=>{
    const query = getQueryFromUrl(req.url, {
        expandMapping: {
            'products': 'products'
        },
        regexSearchFields: [ 'customer' ]
    }) as PipelineStage[];

    const result = await Order.aggregate(query);

    res.json({
        'data': result,
        'count': result.length
    });
});

export { router as OrderRouter };