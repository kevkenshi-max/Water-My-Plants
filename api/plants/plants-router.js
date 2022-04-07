const router = require('express').Router();
const Plants = require('./plants-model.js');

router.get('/', (req, res, next) => {
    console.log(req.decodedToken);
    Plants.find()
      .then(plants => {
        res.status(200).json(plants);
      })
      .catch(next);
  });

  router.get('/:id', (req, res, next) => {
    Plants.findById(req.params.id)
      .then(plant => {
        console.log('plant', plant.id);
        if(plant.id) {
          res.status(200).json(plant);
        } else {
          res.status(404).json({ message: "Plant with that ID could not be found" });
        }
      })
      .catch(next);
  });

  router.post('/', (req, res, next) => {
    console.log(req.decodedToken);
    const added = req.body;
    const id = req.decodedToken.id;
    Plants.add(added, id)
      .then(plant => {
        if(plant) {
          res.status(201).json(plant);
        } else {
          res.status(400).json({ message: "Plant could not be added" });
        }
      })
      .catch(next);
  });
  
  router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    Plants.update(id, changes)
      .then(plant => {
        if(plant) {
          res.status(201).json(plant);
        } else {
          res.status(500).json({ err: "Could not update plant" });
        }
      })
      .catch(next);
  });
  
  router.delete('/:id', (req, res, next) => {
    Plants.removePlant(req.params.id)
      .then(count => {
        if(count > 0) {
          res.status(200).json({ message: "Plant has been successfully removed" });
        } else {
          res.status(404).json({ err: "This plant was not found" });
        }
      })
      .catch(next);
  });

module.exports = router;