const Joi = require('joi');

const id = Joi.string().guid();
const email = Joi.string().email();
const password = Joi.string().min(8).max(30);

const getUserSchema = Joi.object({
    id: id.required()
});

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

const updateUserSchema = Joi.object({
    email: email.required(),
    password: password.required() 
})

module.exports = {getUserSchema, createUserSchema, updateUserSchema};