var express = require('express');
var User = require('../models/user');
var md5 = require('blueimp-md5');
// 创建路由对象
var router = express.Router();

// 渲染登录页
router.get('/login', function(req, res) {
    res.render('login.html');
});

// 处理登录请求
router.post('/login', function(req, res) {
    User.findOne({
        email: req.body.email,
        password: md5(md5(req.body.password))
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务器错误',
                err_code: 500
            });
        }


        if (!user) {
            return res.status(200).json({
                success: true,
                message: '邮箱或密码错误',
                err_code: 1
            });
        }

        req.session.user = user;
        console.log(req.session.user);

        res.json({
            success: true,
            message: 'ok',
            err_code: 0
        });

    });
});

// 渲染注册页
router.get('/register', function(req, res) {
    res.render('register.html');
});

// 处理注册请求
router.post('/register', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务端错误',
                err_code: 500
            });
        }
        if (data) {
            return res.status(200).json({
                success: false,
                message: '邮箱已存在',
                err_code: 1,
            });
        }
        User.findOne({
            nickname: req.body.nickname
        }, function(err, data) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: '服务端错误',
                    err_code: 500
                });
            }
            if (data) {
                return res.status(200).json({
                    success: false,
                    message: '昵称已存在',
                    err_code: 2,
                });
            }
            req.body.password = md5(md5(req.body.password));
            new User(req.body).save(function(err, user) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: '服务端错误',
                        err_code: 500
                    });
                }
                req.session.user = user;
                res.status(200).json({
                    success: true,
                    message: 'OK',
                    err_code: 0
                });
            });
        });
    });
});

// 处理退出请求
router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/login');
});

module.exports = router;