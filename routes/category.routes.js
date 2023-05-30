const express = require('express');
const categoryServices = require('../services/category.services');
const validatorHandler = require('../middlewares/validator.handler');
const router = express.Router();
const service = new categoryServices();
const {getCategoriesSchema, createCategoriesSchema, updateCategoriesSchema} = require('../schemas/categories.schema');

router.get('/', async(req, res) => {
    const categories = await service.find();
    res.json(categories);
})

router.get('/:id',
    validatorHandler(getCategoriesSchema, 'params'),
    async (req, res, next) =>{
        try {
            const {id} = req.params;
            const category = await service.findOne(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createCategoriesSchema, 'body'),
    async(req, res) => {
        const body = req.body;
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
    }
);

router.patch('/:id',
    validatorHandler(updateCategoriesSchema, 'body'),
    validatorHandler(getCategoriesSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;
            const category = await service.update(id, body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getCategoriesSchema, 'params'),
    (req, res) => {
        const {id} = req.params;
        const rta = service.delete(id);
        res.json(rta);
    }
);

module.exports = router;