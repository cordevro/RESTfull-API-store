const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class orderServices {
    constructor() {
        this.orders = [],
        this.generate()
    }

    generate() {
        const limit = 10;
        for (let index = 0; index < limit; index++) {
            this.orders.push({
                id: faker.string.uuid(),
                customerId: faker.string.uuid(),
                productId: faker.string.uuid(),
                amount: faker.number.int({min:1, max: 10})
            })
        }
    }

    find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.orders);
            }, 3000)
        })
    }

    async findOne(id) {
        const order = this.orders.find(item => item.id === id);
        if(!order) {
            throw boom.notFound('order not found');
        }
        return order;
    }

    create(data) {
        const newOrder = {
            id: faker.string.uuid(),
            ...data
        };
        this.orders.push(newOrder);
        return newOrder;
    }

    update(id, changes) {
        const index = this.orders.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('order not found');
        }

        const order = this.orders[index];
        this.orders[index] = {
            ...order,
            ...changes
        }

        return this.orders[index];
    }

    delete(id) {
        const index = this.orders.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('order not found');
        }
        this.orders.splice(index, 1);
        return { id };
    }

}

module.exports = orderServices;