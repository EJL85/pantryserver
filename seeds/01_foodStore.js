const foodStores = require('../foodStores');

exports.seed = function(knex, Promise) {
    return knex('foodStore').del()
        .then(function () {
            return knex('foodStore').insert(foodStores);
        });
};