
exports.seed = function(knex) {
    return knex('users').truncate()
      .then(function () {
          return knex('users').insert([
              {username: 'foo', password: 'bar', phonenumber: '2139998888'},
              {username: 'jane', password: '1234', phonenumber: '2138889999'}
          ])
      })
};
