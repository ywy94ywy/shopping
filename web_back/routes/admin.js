var express = require('express')
var router = express.Router()
var query = require('./mysqlPool')
router.get('/getAllUsers', (req, res, next) => {
    query('select* from user', (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '',
            result: result
        })
    })
})
router.get('/getAllGoods', (req, res, next) => {
    query('select* from goods', (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '',
            result: result
        })
    })
})
router.get('/getAllOrders', (req, res, next) => {
    query('select uo.*,u.userName,g.goodsName from user_orders uo,user u,goods g where uo.iduser=u.iduser and uo.idgoods=g.idgoods', (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '',
            result: result
        })
    })
})
module.exports = router;