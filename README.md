# 多人博客

## 1. 目录结构

```shell
.
|—— app.js	             入口文件
|—— controllers
|—— models               存储mongose设计的数据模型
|—— node_modules         第三方包
|—— package.json         包说明文件
|—— package-lock.json    第三方包版本锁定文件
|—— public               公共静态资源
|—— README.md 			项目说明文档
|—— routes               路由目录
|__ views 			    视图目录
```

## 2. 模板页

## 3. 路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登录 | 备注         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首页     |
| /register | GET  |         |                           |              | 渲染注册页面 |
| /register | POST |         | email、nickname、password |              | 处理注册请求 |
| /login    | GET  |         |                           |              | 渲染登录页面 |
| /login    | POST |         | email、password           |              | 处理登录请求 |
| /logout   | GET  |         |                           |              | 处理退出请求 |

