$(function() {
    $('#register_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    callback: {
                        message: '邮箱已存在'
                    },
                }
            },
            nickname: {
                validators: {
                    notEmpty: {
                        message: '请输入昵称'
                    },
                    callback: {
                        message: '昵称已存在'
                    },
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码在6-18个字符内'
                    }
                }
            }
        }
    }).on('submit', function(e) {
        e.preventDefault();
        /*获取当前的表单*/
        var $form = $(e.target);
        var formData = $(this).serialize();
        $.ajax({
            url: '/register',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: function(data) {
                var err_code = data.err_code
                if (err_code === 0) {
                    // window.alert('注册成功！')
                    // 服务端重定向针对异步请求无效
                    window.location.href = '/'
                } else if (err_code === 1) {
                    /*登录不成功*/
                    /*8.恢复可提交的按钮*/
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    /*9.指定某一个表单元素的错误提示*/
                    $form.data('bootstrapValidator').updateStatus('email', 'INVALID', 'callback');


                } else if (err_code === 2) {
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    $form.data('bootstrapValidator').updateStatus('nickname', 'INVALID', 'callback');
                } else if (err_code === 500) {
                    window.alert('服务器忙，请稍后重试！');
                }
            }
        })
    })
});