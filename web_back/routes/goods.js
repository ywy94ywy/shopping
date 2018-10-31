var express = require('express');
var router = express.Router();
var query = require('./mysqlPool')
router.get('/allGoods', (req, res, next) => {
    query('select * from goods', null, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });
});
router.get('/transports', (req, res, next) => {
    query('select * from goods where category=?', '代步工具', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });
});
router.get('/electronics', (req, res, next) => {
    query('select * from goods where category=?', '电子产品', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });

});
router.get('/livingGoods', (req, res, next) => {
    query('select * from goods where category=?', '生活用品', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });

});
router.get('/books', (req, res, next) => {
    query('select * from goods where category=?', '书籍教材', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });

});
router.get('/sports', (req, res, next) => {
    query('select * from goods where category=?', '体育健身', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });

});
router.get('/instruments', (req, res, next) => {
    query('select * from goods where category=?', '乐器', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });

});
router.get('/rests', (req, res, next) => {
    query('select * from goods where category=?', '其他', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });

});
router.post('/searchGoods', (req, res, next) => {
    var searchInfo = '%' + req.body.searchInfo + '%'
    query('select * from goods where goodsName like ?', searchInfo, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: 0,
            msg: '',
            result: {
                list: result
            }
        });
    });
});
router.post('/goodsDetails', (req, res, next) => {
    var iduser = req.body.iduser;
    query('select* from user where iduser=?', iduser, (err, result) => {
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
router.post('/message', (req, res, next) => {
    var idgoods=req.body.idgoods;
    query('select um.*,m.* from user_message um,user m where um.iduser=m.iduser and idgoods=?',idgoods, (err, result) => {
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