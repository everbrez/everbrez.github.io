---
layout: post
title: web security
date:   2019-02-17
categories: javascript
---

# XSS攻击
XSS（cross site scripting），跨站脚本攻击
XSS攻击分为两种类型：
1. 持久型
2. 非持久型

## 持久型

持久型就是攻击的代码被服务端写进了数据库，这种攻击危害性很大

## 非持久型

非持久型一般通过修改URL参数的方式加入攻击代码，诱导用访问链接从而进行攻击

## 转义
- 对引号、尖括号、斜杠等进行转义
- 采用白名单过滤

## CSP
CSP本质上就是建立白名单，明确告诉浏览器哪些外部资源可以加载和执行
通过以下两种方式来开启CSP
1. 设置HTTP Header中的 `Content-Security-Policy`
2. 设置标签`<meta http-equiv="Content-Security-Policy">`


# CSRF
Cross-site Request Forgery 跨站请求伪造

防御：
1. Get请求不对数据进行修改
2. 不让第三方网站访问到用户cookie
3. 阻止第三方网站请求接口
4. 请求时附带验证信息，验证码或者Token

Cookie设置 `sameSite`属性，cookie不随着跨域请求发送

验证Referer：验证Referer判断是否为第三方网站发起的请求

Token：服务器随机生成一个Token，每次请求的时候将Token带上，服务器验证是否有效

# 点击劫持
点击劫持是一种视觉欺骗手段，攻击者将需要攻击的网站通过iframe嵌套的方式嵌入自己的网页中，并将iframe设置为透明，在页面中透出一个按钮诱导用户点击

防御：
1. 设置X-FRAME-OPTION，为了防御`iframe`嵌套的点击劫持攻击

有三个值可选：
- DENY，表示页面不允许通过`iframe`方式展示
- SAMEORIGIN 表示页面可以在相同域名下通过`iframe`的方式展示
- ALLOW-FROM，表示页面可以在指定来源的`iframe`中展示

2. 通过js代码检查自己王爷是否为`top`

# 中间人攻击

中间人攻击时攻击方同时与服务端和客户端建立起连接，并让对方认为连接是安全的。但实际上整个通信过程都被攻击者控制了，攻击者不仅能够狗获得双方的通信信息，还能修改通信信息

防御：
1. HTTPS可以防御中间人攻击