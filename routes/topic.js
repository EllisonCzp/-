var express = require('express');
// 创建路由对象
var router = express.Router();

// 渲染首页
router.get('/', function(req, res) {
    res.render('index.html', {
        user: req.session.user
    });
});

module.exports = router;