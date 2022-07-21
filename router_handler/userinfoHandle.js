const db = require('../db/index')
const bcrypt = require('bcrypt')

exports.getUserInfo = (req,res)=> {
    const sqlStr = 'select id,username,nickname,email,user_pic from ev_users where id=?'

    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sqlStr,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!==1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            msg:'获取用户信息成功',
            data: results[0]
        })
    })
}

exports.updateUserInfo = (req,res)=> {
    const sqlStr = 'update ev_users set ? where id=?'

    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
      
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
      })
}

exports.updatePwd = (req,res)=> {
    const sqlStr1 = 'select * from ev_users where id=?'

    db.query(sqlStr1,req.user.id,(err,results)=> {
        if (err) return res.cc(err)
        if(results.length!==1) return results.cc('用户不存在！')

        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult) return res.cc('原密码错误！')

        // 根据 id 更新用户的密码
        const sqlStr2 = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        db.query(sqlStr2,[newPwd,req.user.id],(err,results)=> {
            if (err) return res.cc(err)
            if(results.affectedRows!==1) return results.cc('更新失败！')

            res.cc(0,'更新密码成功')
        })
    })
}

exports.updateAvatar = (req,res) =>{
    const sqlStr = 'update ev_users set user_pic=? where id=?'
    db.query(sqlStr,[req.body.avatar,req.user.id],(err,results)=>{
        if (err) return res.cc(err)
        if(results.affectedRows!==1) return results.cc('更新头像失败！')

        return res.cc(0,'更新头像成功！')
    })

}