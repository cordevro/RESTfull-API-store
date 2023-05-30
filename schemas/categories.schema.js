const Joi = require('joi');

const id = Joi.string().guid();
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();


const getCategoriesSchema = Joi.object({
    id: id.required()
});

const createCategoriesSchema = Joi.object({
    name: name.required(),
    image: image.required()
});

const updateCategoriesSchema = Joi.object({
    name: name.required(),
    image: image.required()
})

module.exports = {getCategoriesSchema, createCategoriesSchema, updateCategoriesSchema};