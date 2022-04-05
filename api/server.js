const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('./auth/auth-router.js')
const usersRouter = require('./users/users-router.js')
const plantsRouter = require('./plants/plants-router.js')
const restricted = require('./auth/auth-middleware.js')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);
server.use('/api/plants', restricted, plantsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server