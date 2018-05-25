const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('foodStore');
    },
    getOne(id) {
        return knex('foodStore').where('id', id).first();
    },
    create(foodStore) {
        return knex('foodStore').insert(foodStore, '*');
    },
    update(id, foodStore) {
        return knex('foodStore').where('id', id).update(foodStore, '*');
    },
    delete(id) {
        return knex('foodStore').where('id', id).del();
    }
};