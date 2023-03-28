import { Router } from 'express';
import { PipelineStage } from 'mongoose';
import { getQueryFromUrl } from 'odatafy-mongodb';

import { Category } from '../schemas/category';

const router = Router();

router.get('/', async (req, res)=>{
    const query = getQueryFromUrl(req.url, { regexSearchFields: [ 'name' ] }) as PipelineStage[];

    const result = await Category.aggregate(query);

    res.json({
        'data': result,
        'count': result.length
    });
});

export { router as CategoryRouter };