const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())  // cors中间件
app.use(express.urlencoded({extended:false}))  // 解析application/x-www-form-urlencoded格式表单数据中间件

const userRouter = require('./router/user')

app.use('/api',userRouter)

app.listen('8080',()=> {
    console.log('app server is running at http://127.0.0.1:8080');
})