const db = require('../../data/dbConfig.js');

function find() {
    return db('plants').select('*');
  }
  
  function findById(id) {
    return db('plants')
      .where({ id })
      .first()
      .select('*');
  }

  async function add(plant, id) {
    plant.user_id = id;
    const [plantid] = await db('plants').insert(plant, 'id');
  
    return findById(plantid);
  }

  function update(id, changes) {
    return db('plants')
      .where({ id })
      .update(changes)
      .then(count => {
        return count > 0 ? this.findById(id) : null;
      });
  }

  function removePlant(id) {
    return db('plants')
      .where({ id })
      .delete();
  }

  function findByUser(id) {
    return db('plants')
      .select('id', 'nickname', 'species', 'h2o_frequency', 'image', 'user_id')
      .where('user_id', id);
  }
  
  module.exports = {
    find,
    findById,
    add,
    update,
    removePlant,
    findByUser
  };