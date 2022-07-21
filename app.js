const express = require('express')
const cors = require('cors')
const joi = require('joi')
const config = require('./config')
const expressJWT = require('express-jwt')

const app = express()

app.use(cors())  // cors中间件
app.use(express.urlencoded({extended:false}))  // 解析application/x-www-form-urlencoded格式表单数据中间件

app.use((req,res,next)=> {
    res.cc = function(err,status = 1){
        res.send({
            status,
            msg:err instanceof Error ? err.message: err
        })
    }
    next()
})

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 导入路由模块
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')


app.use('/api',userRouter)
app.use('/my',userinfoRouter)

app.use((err,req,res,next)=> {
    if(err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})

app.listen('8080',()=> {
    console.log('app server is running at http://127.0.0.1:8080');
})

