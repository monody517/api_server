const express = require('express')

const router = express.Router()

const userInfoHandle = require('../router_handler/userinfoHandle')

router.get('/userinfo',userInfoHandle.getUserInfo)

module.exports = router