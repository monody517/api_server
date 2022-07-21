const express = require('express')

const router = express.Router()

const artcate_handler = require('../router_handler/artcateHandle')

const expressJoi = require('@escook/express-joi')

const {add_cate_schema,delete_cate_schema} = require('../schema/artcate')

router.get('/cates',artcate_handler.getArticleCates) // 查询文章分类
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates) // 新建文章分类
router.get('/deletecate/:id',expressJoi(delete_cate_schema), artcate_handler.deleteCateById) // 删除文章分类

module.exports = router