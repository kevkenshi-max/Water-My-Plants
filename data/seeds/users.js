
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'foo', password: 'bar', phonenumber: '2134567890'},
        {username: 'jane', password: 'yo', phonenumber: '2139998888'},
      ]);
    });
};
