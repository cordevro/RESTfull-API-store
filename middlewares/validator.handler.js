const boom = require('@hapi/boom');

/**
 * Middleware para validar datos utilizando un esquema dado.
 * @param {Joi.Schema} schema - El esquema de validación.
 * @param {string} property - La propiedad del objeto de solicitud que contiene los datos a validar.
 * @returns {Function} Una función middleware para validar los datos.
 */
function validatorHandler(schema, property) {
    /**
     * Función middleware para validar los datos.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @param {Function} next - La función next para pasar al siguiente middleware.
     */
    return (req, res, next) => {
        const data = req[property];

        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            next(boom.badRequest(error));
        }
        next();
    };
}

module.exports = validatorHandler;
