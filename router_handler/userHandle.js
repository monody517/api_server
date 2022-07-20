
const db = require('../db/index')
const bcrypt = require('bcrypt')

exports.regUser = (req,res)=> {
    const userInfo = req.body

    // 表单数据验证合法性
    if(!userInfo.username || !userInfo.password){
        return res.cc('用户名或密码不能为空')
    }

    // 检测用户名是否被占用
    const sqlStr1 = 'select * from ev_users where username=?'
    db.query(sqlStr1,userInfo.username,(err,results)=> {
        if(err){
            return res.cc(err)
        }
        if(results.length>0){
            return res.cc('用户名被占用，请更换其他用户名')
        }

    // 调用bcrypt对密码加密
    userInfo.password = bcrypt.hashSync(userInfo.password,10)

    // 插入新用户
    const sqlStr2 = 'insert into ev_users set ?'
    db.query(sqlStr2,{username: userInfo.username,password: userInfo.password},(err,results)=> {
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows!==1){
            return res.cc('注册用户失败，请稍后再试！')
        }
        // 注册成功
        res.cc(0,'注册成功')
    })
    })
}

exports.login = (req,res)=> {
    res.send('login OK')
}