import { Router } from 'express';
import { PipelineStage } from 'mongoose';
import { getQueryFromUrl } from 'odatafy-mongodb';

import { Product } from '../schemas/product';

const router = Router();

router.get('/', async (req, res)=>{
    try {
        const query = getQueryFromUrl(req.url, {
            expandMapping: {
                'category': 'categories'
            },
            regexSearchFields: [ 'name', 'description' ]
        }) as PipelineStage[];
    
        const result = await Product.aggregate(query);
    
        res.json({
            'data': result,
            'count': result.length
        });
    } catch(e) {
        res.status(500).json({ message: (<Error>e).message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await Product.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )

        res.json(result)
    } catch(e) {
        res.status(400).json({ message: (<Error>e).message });
    }
});

export { router as ProductRouter };