const express = require('express');
const ProductServices = require('../services/product.services');
const validatorHandler = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/products.schema');

// Creamos un enrutador utilizando la función Router de express
const router = express.Router();

// Creamos una instancia de la clase ProductServices
const service = new ProductServices();

/**
 * Ruta que devuelve la lista de productos.
 * @route GET /api/products
 * @returns {Object} La lista de productos en formato JSON.
 */
router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

/**
 * Ruta que devuelve un producto por su ID.
 * @route GET /api/products/:id
 * @param {string} id - El ID del producto.
 * @returns {Object} El objeto del producto en formato JSON.
 * @throws {Boom.notFound} Si el producto no se encuentra.
 * @throws {Boom.conflict} Si el producto está bloqueado.
 */
router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Ruta que crea un nuevo producto.
 * @route POST /api/products
 * @param {Object} body - Los datos del producto a crear.
 * @returns {Object} El objeto del producto creado en formato JSON.
 */
router.post('/', 
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    }
);

/**
 * Ruta que actualiza un producto existente.
 * @route PATCH /api/products/:id
 * @param {string} id - El ID del producto a actualizar.
 * @param {Object} body - Los cambios a aplicar al producto.
 * @returns {Object} El objeto del producto actualizado en formato JSON.
 * @throws {Boom.notFound} Si el producto no se encuentra.
 * @throws {Boom.badRequest} Si los datos de actualización son inválidos.
 */
router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Ruta que elimina un producto.
 * @route DELETE /api/products/:id
 * @param {string} id - El ID del producto a eliminar.
 * @returns {Object} Un objeto con el ID del producto eliminado en formato JSON.
 * @throws {Boom.notFound} Si el producto no se encuentra.
 */
router.delete('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res) => {
        const {id} = req.params;
        const rta = await service.delete(id);
        res.json(rta);
    }
);

module.exports = router;
