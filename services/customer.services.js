const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class customerServices {
    constructor() {
        this.customers = [],
        this.generate()
    }

    generate() {
        const limit = 10;
        for (let index = 0; index < limit; index++) {
            this.customers.push({
                id: faker.string.uuid(),
                userId: faker.string.uuid(),
                name: faker.person.firstName(),
                lastName: faker.person.lastName(),
                phone: faker.phone.number(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
        }
    }

    find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.customers);
            }, 3000)
        })
    }

    async findOne(id) {
        const customer = this.customers.find(item => item.id === id);
        if(!customer) {
            throw boom.notFound('customer not found');
        }
        return customer;
    }

    create(data) {
        const newCustomer = {
            id: faker.string.uuid(),
            ...data
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    update(id, changes) {
        const index = this.customers.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('customer not found');
        }

        const customer = this.customers[index];
        this.customers[index] = {
            ...customer,
            ...changes
        }

        return this.customers[index];
    }

    delete(id) {
        const index = this.customers.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('customer not found');
        }
        this.customers.splice(index, 1);
        return { id };
    }

}

module.exports = customerServices;