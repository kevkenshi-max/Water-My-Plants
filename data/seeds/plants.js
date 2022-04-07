
exports.seed = function(knex) {
  return knex('plants').truncate()
    .then(function () {
        return knex('plants').insert([
            {
                nickname: 'sakura',
                species: 'cherry blossoms',
                h20_frequency: '3 times a day',
                user_id: 1
            },
            {
                nickname: 'panda',
                species: 'bamboo',
                h20_frequency: 'once a day',
                user_id: 2
            }
        ])
    })
};
