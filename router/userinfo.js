const express = require('express')

const router = express.Router()

const userInfoHandle = require('../router_handler/userinfoHandle')
const updatePwd = require('../router_handler/userinfoHandle')

const expressJoi = require('@escook/express-joi')

const {update_userinfo_schema,update_password_schema} = require('../schema/user') 

router.get('/userinfo',userInfoHandle.getUserInfo) // 获取用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema),userInfoHandle.updateUserInfo) // 更新用户信息
router.post('/updatepwd',expressJoi(update_password_schema),userInfoHandle.updatePwd) // 重置密码

module.exports = router