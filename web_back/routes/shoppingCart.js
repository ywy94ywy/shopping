var express = require('express');
var router = express.Router();
var query = require('./mysqlPool')
router.get('/', (req, res, next) => {
    let iduser = req.session.iduser;
    console.log('shoppingcart')
    query('select g.*,sc.* from goods g,shopping_cart sc where g.idgoods=sc.idgoods and sc.iduser=?', iduser, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '',
            result: result
        })
        return;
    })
});
router.post('/addToCart', (req, res, next) => {
    let idgoods = req.body.idgoods
    let iduser = req.session.iduser;
    query('insert into shopping_cart (iduser,idgoods) value (?,?)', [iduser, idgoods], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            status: 0,
            msg: '插入成功',
            result: ''
        })
        return;
    })
});
router.post('/addToCartDetails', (req, res, next) => {
    let idgoods = req.body.idgoods
    let iduser = req.session.iduser;
    var number = req.body.number
    var trading = req.body.trading

    query('insert into shopping_cart (iduser,idgoods,number,trading) value (?,?,?,?)', [iduser, idgoods, number, trading], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            status: 0,
            msg: '插入成功',
            result: ''
        })
        return;
    })
});
router.post('/deleteFromCart', (req, res, next) => {
    let idgoods = req.body.idgoods;
    let iduser = req.session.iduser;
    console.log(iduser, idgoods)
    query('delete from shopping_cart where iduser=? and idgoods=?', [iduser, idgoods], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            status: 0,
            msg: '删除成功',
            result: ''
        })
        return;
    })

});
router.post('/deleteInBatches', (req, res, next) => {
    let iduser = req.session.iduser;
    console.log(iduser)
    query('delete from shopping_cart where iduser=? and checked=1', iduser, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            status: 0,
            msg: '批量删除成功',
            result: ''
        })
        return;
    })

});
router.post('/updateNumber', (req, res, next) => {
    let iduser = req.session.iduser;
    let idgoods = req.body.idgoods;
    let number = req.body.number;
    console.log('updateNumber')
    console.log(iduser, idgoods, number)
    query('update shopping_cart set number=? where iduser=? and idgoods=?', [number, iduser, idgoods], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '更新成功',
            result: result
        })
        return;
    })
});
router.post('/updateTrading', (req, res, next) => {
    let iduser = req.session.iduser;
    let idgoods = req.body.idgoods;
    let trading = req.body.trading;
    console.log('updateTrading')
    console.log(iduser, idgoods, trading)
    query('update shopping_cart set trading=? where iduser=? and idgoods=?', [trading, iduser, idgoods], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '更新成功',
            result: result
        })
        return;
    })
});
router.post('/updateCheck', (req, res, next) => {
    let iduser = req.session.iduser;
    let idgoods = req.body.idgoods;
    let checked = req.body.checked;
    console.log('updateCheck')
    console.log(iduser, idgoods, checked)
    query('update shopping_cart set checked=? where iduser=? and idgoods=?', [checked, iduser, idgoods], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '更新成功',
            result: result
        })
        return;
    })
});
router.post('/allChecked', (req, res, next) => {
    let iduser = req.session.iduser;
    let checked = req.body.checked;
    console.log(iduser, checked)
    console.log('allChecked')
    query('update shopping_cart set checked=? where iduser=?', [checked, iduser], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '更新成功',
            result: result
        })
        return;
    })
});
router.post('/addAddress', (req, res, next) => {
    let iduser = req.session.iduser;
    let address = req.body.address;
    console.log('addAddress')
    query('insert into user_address (iduser,address,defaultAddress) value (?,?,0)', [iduser, address], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '添加成功',
            result: result
        })
        return;
    })
});
router.get('/getAddress', (req, res, next) => {
    let iduser = req.session.iduser;
    console.log('getAddress')
    query('select* from user_address where iduser = ? ', iduser, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '获取成功',
            result: result
        })
        return;
    })
});
router.post('/deleteAddress', (req, res, next) => {
    let idaddress = req.body.idaddress;
    console.log('getAddress')
    query('delete from user_address where idaddress=?', idaddress, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json({
            state: 0,
            msg: '获取成功',
            result: result
        })
        return;
    })
});
router.post('/selectAddress', (req, res, next) => {
    let iduser = req.session.iduser;
    let idaddress = req.body.idaddress;
    console.log('selectAddress')
    query('update user_address set defaultAddress=0 where iduser=?', iduser, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        query('update user_address set defaultAddress=1 where idaddress=?', idaddress, (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
            res.json({
                state: 0,
                msg: '获取成功',
                result: result
            })
            return;
        })
    })
});
router.post('/jiesuan', (req, res, next) => {
    let iduser = req.session.iduser;
    let time = req.body.time;
    console.log('jiesuan')
    for(var i in req.body.goods){
        let idgoods = req.body.goods[i].idgoods;
        let number = req.body.goods[i].number;
        let trading = req.body.goods[i].trading;
        query('insert into user_orders (iduser,idgoods,number,trading,createDate) value (?,?,?,?,?)', [iduser, idgoods, number,trading,time], (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
        })
    }
    res.json({
        state: 0,
        msg: '结算成功',
        result: ''
    })
});
module.exports = router;