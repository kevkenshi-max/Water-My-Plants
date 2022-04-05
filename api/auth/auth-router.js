const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../secrets/secrets.js');
const Users = require('../users/users-model.js');











module.exports = router;