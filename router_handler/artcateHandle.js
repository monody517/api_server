const db = require('../db/index')

exports.getArticleCates = (req,res)=>{
    const sqlStr = 'select * from ev_article_cate where is_delete=0 order by id asc'

    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(err)
        
        res.send({
            status: 0,
            msg: '获取文章分类结果成功！',
            data: results
        })
    })
}