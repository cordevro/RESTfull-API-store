const express = require('express');

// Importamos productRoutes del archivo product.routes
const productRoutes = require('./product.routes');

const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes');
const customerRoutes = require('./customer.routes');
const categoryRoutes = require('./category.routes');

/**
 * Configura las rutas de la API.
 * @param {Object} app - La instancia de la aplicación express.
 */
function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productRoutes);
    router.use('/users', userRoutes);
    router.use('/orders', orderRoutes);
    router.use('/customers', customerRoutes);
    router.use('/categories', categoryRoutes);
}

module.exports = routerApi;
