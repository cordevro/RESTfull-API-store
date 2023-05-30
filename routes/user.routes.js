const express = require('express');
const userServices = require('../services/user.services');
const validatorHandler = require('../middlewares/validator.handler');
const router = express.Router();
const service = new userServices();
const {getUserSchema, createUserSchema, updateUserSchema} = require('../schemas/users.schema');

router.get('/', async(req, res) => {
    const users = await service.find();
    res.json(users);
})

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) =>{
        try {
            const {id} = req.params;
            const user = await service.findOne(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async(req, res) => {
        const body = req.body;
        const newUser = await service.create(body);
        res.status(201).json(newUser);
    }
);

router.patch('/:id',
    validatorHandler(updateUserSchema, 'body'),
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;
            const user = await service.update(id, body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res) => {
        const {id} = req.params;
        const rta = await service.delete(id);
        res.json(rta);
    }
);

module.exports = router;