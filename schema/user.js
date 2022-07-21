const joi = require('joi')

// 定义用户名和密码验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义验证注册和登录表单数据规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}