const express = require('express');
const orderServices = require('../services/order.services');
const validatorHandler = require('../middlewares/validator.handler');
const router = express.Router();
const service = new orderServices();
const {getOrderSchema, createOrderSchema, updateOrderSchema} = require('../schemas/orders.schema');

router.get('/', async(req, res) => {
    const orders = await service.find();
    res.json(orders);
})

router.get('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) =>{
        try {
            const {id} = req.params;
            const order = await service.findOne(id);
            res.json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createOrderSchema, 'body'),
    async(req, res) => {
        const body = req.body;
        const newOrder = await service.create(body);
        res.status(201).json(newOrder);
    }
);

router.patch('/:id',
    validatorHandler(updateOrderSchema, 'body'),
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;
            const order = await service.update(id, body);
            res.json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res) => {
        const {id} = req.params;
        const rta = await service.delete(id);
        res.json(rta);
    }
);

module.exports = router;