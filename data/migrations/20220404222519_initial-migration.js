
exports.up = function(knex) {
    return knex.schema
      .createTable('users', table => {
        table.increments();
        table.string('username', 25)
          .notNullable()
          .unique();
        table.string('password', 128)
          .notNullable();
        table.string('phonenumber', 20)
          .notNullable();
      })
      .createTable('plants', table => {
        table.increments();
        table.string('nickname', 128)
          .notNullable();
        table.string('species', 128);
        table.string('h20_frequency', 25)
          .notNullable();
        table.string('image', 255);
        table.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('plants')
      .dropTableIfExists('users');
  };
  