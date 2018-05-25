
exports.up = function(knex, Promise) {
    return knex.schema.createTable('foodStores', (table) => {
        table.increments();
        table.text('name');
        table.text('location');
        table.integer('amount');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('foodStores')
};
