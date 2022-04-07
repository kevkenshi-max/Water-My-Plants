const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../secrets/secrets.js');
const Users = require('../users/users-model.js');

router.post('/register', (req, res, next) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 10);
    userInfo.password = hash;

    if (!req.body.username ||
        !req.body.username.trim() ||
        !req.body.password ||
        !req.body.phonenumber) {
            res.status(404).json({ 
                message: 'Username, password, and phonenumber required'
            })
    } else {
        Users.add(userInfo)
          .then(user => {
              res.status(201).json({
                  user, message: user.message, stack: user.stack
              })
          })
          .catch(next)
    }
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    Users.findBy({ username })
      .first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = buildToken(user);
            res.status(200).json({ id: user.id, welcome: user.username, token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch(next);
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
          if(err) {
            res.stats(500).json({ err: "Error logging out" });
          } else {
            res.status(200).json({ message: "Successfully logged out" });
          }
        });
      } else {
        res.status(200).json({ message: "You were never here" });
      }
})

function buildToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      phonenumber: user.phonenumber,
    }
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }

module.exports = router;