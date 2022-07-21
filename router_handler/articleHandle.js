const db = require('../db/index')

exports.addArticle = (req,res)=> {
    console.log(req.body);
    console.log('----------');
    console.log(req.file);

    res.send('ok')
}