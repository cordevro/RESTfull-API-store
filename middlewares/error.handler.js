/**
 * Middleware que registra los errores en la consola y los pasa al siguiente middleware de manejo de errores.
 * @param {Error} err - El error ocurrido.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función de siguiente middleware.
 */
function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

/**
 * Middleware de manejo de errores que responde con un estado de error y un objeto JSON que contiene el mensaje de error y la pila de errores.
 * @param {Error} err - El error ocurrido.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función de siguiente middleware.
 */
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

/**
 * Middleware de manejo de errores específico para el paquete Boom.
 * Si el error es de tipo Boom, responde con el estado y el payload especificados por el error.
 * Si no es un error de Boom, pasa al siguiente middleware de manejo de errores.
 * @param {Error} err - El error ocurrido.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función de siguiente middleware.
 */
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
