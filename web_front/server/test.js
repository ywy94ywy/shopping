var http = require('http');
var url = require('url');
var router = require('./router');
var util=require('util')
http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-type': 'text/html'
  });

  if (request.url !== "/favicon.ico") {
    var pathname = url.parse(request.url).pathname;
    pathname = pathname.replace(/\//, "");
    router[pathname](request,response);
    console.log(pathname);
    response.end('success');
  }

}).listen(8080);
console.log('server running at 127.0.0.1')



http.get('http://www.imooc.com/index/getstarlist',(res)=>{
  let rawData='';
  res.on('data',(chunk)=>{
    rawData+=chunk;
  });
  res.on('end',()=>{
    let parseDate=JSON.parse(rawData);
    console.log(util.inspect(parseDate))
  })
})


var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  port: '3306'
});
connection.connect(function (err) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('connection-connect:' + 'success');
});
connection.query('select * from user where iduser=?',2, function (err, res) {
  if (err) {
    console.log(err);
    return
  }
  for(var i in res)
  console.log('id:'+res[i].iduser+
  '\nname:'+res[i].uname+
  '\npassword:'+res[i].pwd);

})

connection.end(err => {
  if (err) {
    console.log('err', err.message);
    return;
  }
  console.log('connection-end:' + 'success');
});
