const db = require('../../data/dbConfig')

function find() {
    return db('users').select('id', 'username', 'phonenumber', 'password')
}

function findBy(filter) {
    return db('users').where(filter);
  }
  
  function findById(id) {
    return db('users')
      .where({ id })
      .first()
      .select('id', 'username', 'phonenumber');
  }
  
  async function add(user) {
    const [id] = await db('users').insert(user, 'id');
  
    return findById(id);
  }
  
  function update(id, changes) {
    return db('users')
      .where({ id })
      .update(changes)
      .then(count => {
        return count > 0 ? this.findById(id) : null;
      });
  }
  
  function removeUser (id) {
      return db('users')
      .where({ id })
      .delete();
  }
  
  function getUsersPlants(id) {
      return db('plants')
        .select('id', 'nickname', 'species', 'h20_frequency', 'image', 'user_id')
        .where('user_id', id);
  }
  





module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    removeUser,
    getUsersPlants
}