const express = require('express');
const customerServices = require('../services/customer.services');
const validatorHandler = require('../middlewares/validator.handler');
const router = express.Router();
const service = new customerServices();
const {getCustomerSchema, createCustomerSchema, updateCustomerSchema} = require('../schemas/customers.schema');

router.get('/', async(req, res) => {
    const customers = await service.find();
    res.json(customers);
})

router.get('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) =>{
        try {
            const {id} = req.params;
            const customer = await service.findOne(id);
            res.json(customer);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createCustomerSchema, 'body'),
    async(req, res) => {
        const body = req.body;
        const newCustomer = await service.create(body);
        res.status(201).json(newCustomer);
    }
);

router.patch('/:id',
    validatorHandler(updateCustomerSchema, 'body'),
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;
            const customer = await service.update(id, body);
            res.json(customer);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    (req, res) => {
        const {id} = req.params;
        const rta =  service.delete(id);
        res.json(rta);
    }
);

module.exports = router;