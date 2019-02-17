---
layout: post
title:  cross origin
date:   2019-02-17
categories: javascript
---

# 跨域
如果协议、域名或者端口号有一个不同就是跨域

## 同源策略
主要是用来防止CSRF（跨站请求伪造Cross Site Request Forgery）攻击的

没有同源策略的情况下，A网站可以被其他来源的内容Ajax访问到内容。如果保留着登录态，其他来源的Ajax就可以访问到你的全部信息

请求跨域了，但是请求是成功发送了。只是浏览器将响应拦截了。

1）无法读取不同源的 Cookie、LocalStorage 和 IndexDB 。
2）无法获得不同源的DOM 。
3）不能向不同源的服务器发送ajax请求。

`<script>、<img>、<iframe>、<link>`

## 解决跨域问题

### JSONP
利用script标签，GET请求，callback

### CORS跨域资源共享
需要后端浏览器和后端同时支持，
服务端设置 `Access-Control-Allow-Origin`

- 简单请求
  - 使用以下请求：`POST`、`HEAD`、`GET`
  - `Content-Type`为以下：`text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`
- 复杂请求
  - 不满足上面的请求即为复杂请求

对于复杂请求，首先会触发一个`option`预检请求，通过这个请求来知道服务器是否允许跨域请求

### document.domain
适用于二级域名相同的情况，只要设置两个页面中的`document.domain`相同就可以实现跨域请求

### postMessage
这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
```js
// 发送消息端
window.parent.postMessage('message', 'http://test.com')
// 接收消息端
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```
### window.name & location.hash
### 代理服务器