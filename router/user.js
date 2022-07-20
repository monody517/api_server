const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/userHandle')

router.post('/reguser',userHandler.regUser)

router.post('/login',userHandler.login)

module.exports = router