var express = require('express');
var path = require('path');
var routeSession = require('./routes/session');
var routeTopic = require('./routes/topic');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// 配置静态文件
app.use('/public/', express.static(path.join(__dirname, './public')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')));

// 配置模板引擎
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));

// 配置请求体插件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 配置session
app.use(session({
    secret: 'blog key',
    resave: false,
    saveUninitialized: false
}));

// 挂载路由
app.use(routeSession);
app.use(routeTopic);


// 监听端口
app.listen(3000, function() {
    console.log('3000 is running');
})