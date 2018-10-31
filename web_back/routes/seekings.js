var express = require('express')
var router = express.Router()
var query = require('./mysqlPool')
router.get('/', (req, res, next) => {
    console.log('seekings')
    query('select s.*,u.* from seekings s,user u where s.iduser=u.iduser', null, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '',
            result: {
                list:result
            }
        })
    })
})
module.exports = router;