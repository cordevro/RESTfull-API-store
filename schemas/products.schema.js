const Joi = require('joi');

// Esquema de validación para el campo 'id'
const id = Joi.string().guid();

// Esquema de validación para el campo 'name'
const name = Joi.string().min(3).max(20);

// Esquema de validación para el campo 'price'
const price = Joi.number().integer().min(10);

// Esquema de validación para el campo 'image'
const image = Joi.string().uri();

/**
 * Esquema de validación para obtener un producto por su ID.
 */
const getProductSchema = Joi.object({
    id: id.required()
});

/**
 * Esquema de validación para crear un nuevo producto.
 */
const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
});

/**
 * Esquema de validación para actualizar un producto existente.
 */
const updateProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
});

module.exports = {
    getProductSchema,
    createProductSchema,
    updateProductSchema
};
