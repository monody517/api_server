const express = require('express')

const router = express.Router()

const artcate_handler = require('../router_handler/artcateHandle')

router.get('/cates',artcate_handler.getArticleCates)

module.exports = router