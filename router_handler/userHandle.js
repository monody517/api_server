
const db = require('../db/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

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
    const userInfo = req.body

    const sqlStr = 'select * from ev_users where username=?'

    db.query(sqlStr,userInfo.username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('用户不存在')

        const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
        if(!compareResult){
            return res.cc('密码错误')
        }

        const user = {...results[0],password:'',user_pic: ''}
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn: '10h'
        })
        res.send({
            status:0,
            msg: '登陆成功',
            token: 'Bearer ' + tokenStr
        })

    })
}