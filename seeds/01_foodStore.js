const foodStores = require('../foodStores');

exports.seed = function(knex, Promise) {
    return knex('foodStores').del()
        .then(function () {
            return knex('foodStores').insert(foodStores);
        });
};