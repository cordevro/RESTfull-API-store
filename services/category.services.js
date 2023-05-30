const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class categoryServices {
    constructor() {
        this.categories = [],
        this.generate()
    }

    generate() {
        const limit = 10;
        for (let index = 0; index < limit; index++) {
            this.categories.push({
                id: faker.string.uuid(),
                name: faker.commerce.productAdjective(),
                image: faker.image.url()
            })
        }
    }

    find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.categories);
            }, 3000)
        })
    }

    async findOne(id) {
        const category = this.categories.find(item => item.id === id);
        if(!category) {
            throw boom.notFound('category not found');
        }
        return category;
    }

    create(data) {
        const newCategory = {
            id: faker.string.uuid(),
            ...data
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    update(id, changes) {
        const index = this.categories.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('category not found');
        }

        const category = this.categories[index];
        this.categories[index] = {
            ...category,
            ...changes
        }

        return this.categories[index];
    }

    delete(id) {
        const index = this.categories.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('category not found');
        }
        this.categories.splice(index, 1);
        return { id };
    }

}

module.exports = categoryServices;