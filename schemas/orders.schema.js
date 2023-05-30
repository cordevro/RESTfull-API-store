const Joi = require('joi');

const id = Joi.string().guid();
const customerId = Joi.string().guid();
const productId = Joi.string().guid();
const amount = Joi.number().integer().max(10).min(1);

const getOrderSchema = Joi.object({
    id: id.required()
});

const createOrderSchema = Joi.object({
    customerId: customerId.required(),
    productId: productId.required(),
    amount: amount.required()
});

const updateOrderSchema = Joi.object({
    customerId: customerId.required(),
    productId: productId.required(),
    amount: amount.required()
})

module.exports = {getOrderSchema, createOrderSchema, updateOrderSchema};