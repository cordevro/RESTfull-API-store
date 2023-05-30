const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

/**
 * Clase que representa los servicios relacionados con los productos.
 */
class ProductServices {

    /**
     * Constructor de la clase ProductServices.
     * Inicializa una lista de productos y genera datos de muestra.
     */
    constructor() {
        this.products = [];
        this.generate();
    }

    /**
     * Genera datos de muestra para la lista de productos.
     */
    generate() {
        const limit = 100;
        for(let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
                isBlock: faker.datatype.boolean()
            });
        }
    }

    /**
     * Obtiene la lista de productos.
     * @returns {Promise<Array>} Una promesa que se resuelve con la lista de productos.
     */
    find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products);
            }, 3000);
        });
    }

    /**
     * Obtiene un producto por su ID.
     * @param {string} id - El ID del producto a buscar.
     * @returns {Promise<Object>} Una promesa que se resuelve con el objeto del producto encontrado.
     * @throws {Boom.notFound} Si el producto no se encuentra.
     * @throws {Boom.conflict} Si el producto está bloqueado.
     */
    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('product not found');
        }  
        if (product.isBlock) {
            throw boom.conflict('product is block');
        }
        return product;
    }

    /**
     * Crea un nuevo producto.
     * @param {Object} data - Los datos del producto a crear.
     * @returns {Object} El objeto del producto creado.
     */
    create(data) {
        const newProduct = {
            id: faker.string.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }

    /**
     * Actualiza un producto existente.
     * @param {string} id - El ID del producto a actualizar.
     * @param {Object} changes - Los cambios a aplicar al producto.
     * @returns {Object} El objeto del producto actualizado.
     * @throws {Boom.notFound} Si el producto no se encuentra.
     */
    update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('product not found');
        }

        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    /**
     * Elimina un producto.
     * @param {string} id - El ID del producto a eliminar.
     * @returns {Object} Un objeto con el ID del producto eliminado.
     * @throws {Boom.notFound} Si el producto no se encuentra.
     */
    delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('product not found');
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductServices;
