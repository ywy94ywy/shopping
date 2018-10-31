var express = require('express');
var router = express.Router();
var query = require('./mysqlPool')
router.post('/login', (req, res, next) => {
    let name = req.body.name;
    let password = req.body.password
    query('select * from user where userName=? and password=?', [name, password], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: 1,
                msg: 'err'
            });
            return;
        }
        if (result != '') {
            console.log(name, result[0].nickName)
            //将用户名存入cookie
            // res.cookie("userName", name, {
            //     path: '/',
            //     maxAge: 1000 * 60 * 60 * 24 * 7
            // });
            // res.cookie("nickName", result[0].nickName, {
            //     path: '/',
            //     maxAge: 1000 * 60 * 60 * 24 * 7
            // });
            //将用户ID存入session
            req.session.iduser = result[0].iduser
            console.log(result[0].iduser)
            res.json({
                status: 0,
                msg: '登录成功',
                result: {
                    user: result
                }
            });
        } else {
            res.json({
                status: 0,
                msg: '用户名或密码错误！',
                result: {
                    user: result
                }
            });
        }
    });
});
router.post('/register', (req, res, next) => {
    let user = req.body
    query('select * from user where userName=?', user.name, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result != '') {
            res.json({
                status: 0,
                msg: '用户名已存在',
            });
        } else {
            var arr = [];
            for (var x in user)
                arr.push(user[x]);
            query('insert into user (userName,password,telephone) value (?,?,?)', arr, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({
                        status: 0,
                        msg: '插入失败',
                        result: ''
                    })
                    return;
                }
                res.json({
                    status: 0,
                    msg: '插入成功',
                    result: ''
                })
            })

        }

    });

});
router.post('/logout', (req, res, next) => {
    // res.clearCookie('userName')
    // res.clearCookie('nickName')
    delete req.session.iduser;
    res.json({
        status: 0,
        msg: '',
        result: ''
    })

});
router.get('/userInfo', (req, res, next) => {
    let iduser = req.session.iduser;
    query('select * from user where iduser=?', iduser, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '用户信息',
            result: result
        })
    })
});
router.post('/updateUserInfo', (req, res, next) => {
    let iduser = req.session.iduser;
    let arr = [];
    arr.push(req.body.user.nickName);
    arr.push(req.body.user.sign);
    arr.push(req.body.user.telephone);
    arr.push(req.body.user.qq);
    arr.push(req.body.user.wechat);
    arr.push(req.body.user.iduser);
    console.log(arr)
    query('update user set nickName=?,sign=?,telephone=?,qq=?,wechat=? where iduser=?', arr, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '用户信息',
            result: result
        })
    })
});
router.get('/getReleasedGoods', (req, res, next) => {
    let iduser = req.session.iduser;
    query('select * from goods where iduser=?', iduser, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '发布的商品',
            result: result
        })
    })
});
router.post('/updateReleasedGoods', (req, res, next) => {
    console.log(req.body);
    let arr = [];
    arr.push(req.body.goods.goodsName);
    arr.push(req.body.goods.price);
    arr.push(req.body.goods.stock);
    arr.push(req.body.goods.category);
    arr.push(req.body.goods.idgoods);
    console.log(arr)
    query('update goods set goodsName=?,price=?,stock=?,category=? where idgoods=?', arr, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('update-success')
        res.json({
            state: 0,
            msg: '更新商品',
            result: result
        })
    })
});
router.post('/deleteGoods', (req, res, next) => {
    let idgoods = req.body.idgoods;
    query('delete from shopping_cart where idgoods=?', idgoods, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        query('delete from goods where idgoods=?', idgoods, (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                state: 0,
                msg: '删除商品',
                result: result
            })
        })
    });

});
router.get('/getRealeasedSeekings', (req, res, next) => {
    let iduser = req.session.iduser
    query('select* from seekings where iduser=?', iduser, (err, result) => {
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
});

router.post('/updateSeekings', (req, res, next) => {
    console.log(req.body);
    let arr = [];
    arr.push(req.body.seeking.seekingsName);
    arr.push(req.body.seeking.price);
    arr.push(req.body.seeking.category);
    arr.push(req.body.seeking.details);
    arr.push(req.body.seeking.idseekings);
    console.log(arr)
    query('update seekings set seekingsName=?,price=?,category=?,details=? where idseekings=?', arr, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('update-success')
        res.json({
            state: 0,
            msg: '更新求购',
            result: result
        })
    })
});
router.post('/deleteSeekings', (req, res, next) => {
    let idseekings = req.body.idseekings;
    query('delete from seekings where idseekings=?', idseekings, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '删除求购',
            result: result
        })
    });
});
router.post('/submitMsg', (req, res, next) => {
    var iduser = req.body.iduser;
    var message = req.body.message;
    var idgoods = req.body.idgoods;
    var a = new Date().toJSON().replace(/T/, ' ')
    var b = /(\S*\s*\S*)\./i
    var createDate = a.match(b)[1]
    console.log(createDate);
    query('insert into user_message (iduser,message,createDate,idgoods) value (?,?,?,?)', [iduser, message, createDate, idgoods], (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '',
            result: ''
        })
    })
});
router.get('/getOrders', (req, res, next) => {
    var iduser = req.session.iduser
    console.log(iduser)
    query('select uo.*,g.*,u.* from user_orders uo,goods g,user u where uo.idgoods = g.idgoods and u.iduser=g.iduser and uo.iduser=? ', [iduser], (err, result) => {
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
});
module.exports = router;