const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('foodStores');
    },
    getOne(id) {
        return knex('foodStores').where('id', id).first();
    },
    create(foodStores) {
        return knex('foodStores').insert(foodStores, '*');
    },
    update(id, foodStores) {
        return knex('foodStores').where('id', id).update(foodStores, '*');
    },
    delete(id) {
        return knex('foodStores').where('id', id).del();
    }
};