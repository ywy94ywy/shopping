var express = require('express');
var router = express.Router();
var query = require('./mysqlPool');
var fs = require('fs');
var multer = require('multer');
var upload = multer({
    dest: 'public/images/goods'
});
router.post('/addGoods', (req, res) => {
    var data = req.body.data;
    var goods = [];
    var iduser = req.session.iduser;
    goods.push(iduser);
    for (var x in data)
        goods.push(data[x]);
    console.log(goods);
    query('insert into goods (iduser,goodsName,price,img,stock,category,createdDateTime,goodsDetails) value (?,?,?,?,?,?,?,?)', goods, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            state: 0,
            msg: 'ok',
            result: ''
        });
        console.log('add-success');
    });
});
router.post('/addSeekings', (req, res) => {
    var data = req.body.data;
    var seekings = [];
    var iduser = req.session.iduser;
    seekings.push(iduser);
    for (var x in data)
        seekings.push(data[x]);
    console.log(seekings);
    query('insert into seekings (iduser,seekingsName,price,trading,category,details,img,createdDateTime) value (?,?,?,?,?,?,?,?)', seekings, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            state: 0,
            msg: 'ok',
            result: ''
        });
        console.log('add-success');
    });
});
router.post('/uploadImg', upload.single('avatar'), (req, res, next) => {
    // Set { new: true } Wto return the updated one, rather than the original one. 
    var src = req.file.originalname;
    var oldPath = req.file.path;
    var newPath = req.file.destination + '/' + src;
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            console.log('rename error: ' + err);
        } else {
            console.log('rename ok');
        }
    });
    console.log(req.file);

});
router.post('/addClick', (req, res, next) => {
    console.log('addClick');
    let idgoods = req.body.idgoods;
    query('update goods set click=click+1 where idgoods=?', idgoods, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        res.json({
            state: 0,
            msg: '',
            result: result
        });
    })
})
module.exports = router;