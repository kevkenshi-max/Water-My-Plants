const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/', (req, res, next) => {
    Users.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Users.findById(id)
      .then(user => {
        console.log('user', user.id);
        if(user.id) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "ID not found"});
        }
      })
      .catch(next);
  });

  router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    Users.update(id, changes)
      .then(user => {
        if(user) {
          res.status(201).json(user);
        } else {
          res.status(500).json({ message: "Could not update user" });
        }
      })
      .catch(next);
  });

  router.delete('/:id', (req, res, next) => {
    Users.removeUser(req.params.id)
      .then(count => {
        if(count > 0) {
          res.status(200).json({ message: "User has been successfully removed" });
        } else {
          res.status(404).json({ message: "This user was not found" });
        }
      })
      .catch(next);
  });

  router.get('/:id/plants', (req, res, next) => {
    const { id } = req.params
    Users.getUsersPlants(id)
      .then(plants => {
        res.status(200).json(plants);
      })
      .catch(next);
  });

module.exports = router;