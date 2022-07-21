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

exports.addArticleCates = (req,res) => {
    const sqlStr1= 'select * from ev_article_cate where name=? or alias=?'

    db.query(sqlStr1,[req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.cc(err)

          // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        const sqlStr2 = 'insert into ev_article_cate set ?'

        db.query(sqlStr2,req.body,(err,results)=>{
            if(err) return res.cc(err)

            if(results.affectedRows!==1) return res.cc('新增文章分类失败！')

            res.cc(0,'新增文章分类成功！')
        })
    })
}