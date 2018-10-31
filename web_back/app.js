var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var app = express();
var indexRouter = require('./routes/index');
var addThings = require('./routes/addThings');
var shoppingCart = require('./routes/shoppingCart');
var user = require('./routes/user');
var admin = require('./routes/admin');
var goods = require('./routes/goods');
var seekings = require('./routes/seekings');
var uploadImg = require('./routes/uploadImg');
var svgCaptcha = require('svg-captcha');



//跨域
var cors = require('cors');
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.host);
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, X-Powered-By, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
app.use(cors({
  origin: ['http://localhost:8080','http://47.106.185.141'],
  credentials: true
}))
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 60 * 24 * 7
  }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(req.originalUrl)
  if (req.session.iduser) {
    next();
  } else {
    if (req.originalUrl == "/shoppingCart/addToCart") {
      console.log('add')
      res.json({
        status: 0,
        msg: '当前未登录！',
        result: ''
      })
    } else {
      next();
    }

  }
})
app.use('/', indexRouter);
app.use('/addThings', addThings);
app.use('/user', user);
app.use('/goods', goods);
app.use('/seekings', seekings);
app.use('/shoppingCart', shoppingCart);
app.use('/uploadImg', uploadImg);
app.use('/admin',admin);

//暴露goods图片
app.get('/public/images/goods/*', function (req, res) {
  //支持中文URL
  req.url = decodeURI(req.url);
  //给API分配图片
  res.sendFile(__dirname + "/" + req.url);
})
//验证码
app.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
  res.status(200).send(captcha.data);
});
app.post('/captcha', function (req, res) {
let b=req.body.captcha.toLowerCase()
let s=req.session.captcha.toLowerCase()
  if (b == s)
    res.json({
      status: 0,
      msg: '验证成功',
      result: ''
    })
  else {
    res.json({
      status: 0,
      msg: '验证失败',
      result: ''
    })
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

// //自动更新
// var debug = require('debug')('my-application'); // debug模块  
// app.set('port', process.env.PORT || 3000); // 设定监听端口  

// //启动监听  
// var server = app.listen(app.get('port'), function () {
//   debug('Express server listening on port ' + server.address().port);
// });