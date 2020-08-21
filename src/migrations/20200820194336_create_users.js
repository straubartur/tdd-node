
exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('email').notNull()
    t.string('name').notNull().unique();
    t.string('passwd').notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
