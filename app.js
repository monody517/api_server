const express = require('express')
const cors = require('cors')
const joi = require('joi')

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

const userRouter = require('./router/user')

app.use('/api',userRouter)

app.use((err,req,res,next)=> {
    if(err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
})

app.listen('8080',()=> {
    console.log('app server is running at http://127.0.0.1:8080');
})

