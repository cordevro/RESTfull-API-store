const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class userServices {
    constructor() {
        this.users = [],
        this.generate()
    }

    generate() {
        const limit = 10;
        for (let index = 0; index < limit; index++) {
            this.users.push({
                id: faker.string.uuid(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            })
        }
    }

    find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.users);
            }, 3000)
        })
    }

    async findOne(id) {
        const user = this.users.find(item => item.id === id);
        if(!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }

    create(data) {
        const newUser = {
            id: faker.string.uuid(),
            ...data
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id, changes) {
        const index = this.users.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('user not found');
        }

        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes
        }

        return this.users[index];
    }

    delete(id) {
        const index = this.users.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('user not found');
        }
        this.users.splice(index, 1);
        return { id };
    }

}

module.exports = userServices;