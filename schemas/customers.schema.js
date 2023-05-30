const Joi = require('joi');

const id = Joi.string().guid();
const userId = Joi.string().guid();
const name = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3).max(20);
const phone = Joi.string().max(10).min(10);
const email = Joi.string().email();
const password = Joi.string().min(8);

const getCustomerSchema = Joi.object({
    id: id.required()
});

const createCustomerSchema = Joi.object({
    userId: userId.required(),
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    email: email.required(),
    password: password.required()
});

const updateCustomerSchema = Joi.object({
    userId: userId.required(),
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    email: email.required(),
    password: password.required()
})

module.exports = {getCustomerSchema, createCustomerSchema, updateCustomerSchema};