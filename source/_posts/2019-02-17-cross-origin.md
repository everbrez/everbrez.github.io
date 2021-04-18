---
layout: post
title:  cross origin
date:   2019-02-17
categories: JavaScript
tags: JavaScript cross-origin
---

<!--more-->

# 跨域

如果协议、域名或者端口号有一个不同就是跨域。一般使用“`javascript:;`”以及"`about blank`"打开的页面会继承源。但是`data：`协议的不继承。
在IE中，端口号不在同源策略中。两个高度互信的范围不遵循授权范围。

可以使用`document.domain`修改

## 同源策略

主要是用来防止CSRF（跨站请求伪造Cross Site Request Forgery）攻击的

没有同源策略的情况下，A网站可以被其他来源的内容Ajax访问到内容。如果保留着登录态，其他来源的Ajax就可以访问到你的全部信息

请求跨域了，但是请求是成功发送了。只是浏览器将响应结果拦截了。

1）无法读取不同源的 Cookie、LocalStorage 和 IndexDB 。
2）无法获得不同源的DOM 。
3）不能向不同源的服务器发送ajax请求。
4）websocket 不受影响

`<script>、<img>、<iframe>、<link>`

## 解决跨域问题

根据使用场景差异分为：

1. 同一主域：使用document.domain
2. 不同主域：使用window.name/ Location.hash/ JSONP / CORS/ postmessage / 图片img/ web socket/ 反向代理

### document.domain

适用于二级域名相同的情况，只要设置两个页面中的`document.domain`相同就可以实现跨域请求
例如 mail.qq.com qq.com
store.google.com google.com

### JSONP

利用script标签，GET请求，callback
淘宝和天猫cookie的传递，是利用JSONP来实现的（天猫通过访问淘宝的一个JSONP服务器，然后返回之后将cookie改写）

原理：

1. 前端通过script标签进行跨域
2. 将前端的方法通过参数来传递到服务器（例如callback），然后服务器注入参数之后返回，实现服务器与客户端的通信
3. 只支持GET方法，只能使用全局方法（可以解决）

注意事项：
如果由参数，需要进行encodeURLComponent()

优点：兼容性好，URL限制参数，错误处理机制不好，预料外返回难以处理。script标签的onerror

### CORS跨域资源共享(根本解决方法)

需要后端浏览器和后端同时支持，
服务端设置 `Access-Control-Allow-Origin`

- 简单请求
  - 使用以下请求：`POST`、`HEAD`、`GET`
  - 首部集合：Accept、Accept-Language Content-Language
  - `Content-Type`为以下：`text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`
  - 请求中的XMLHttpRequestUpload对象没有注册任何事件监听器
  - 请求中没有使用ReadableStream对象
- 复杂请求
  - 不满足上面的请求即为复杂请求

对于复杂请求，首先会触发一个`OPTIONS`预检请求，通过这个请求来知道服务器是否允许跨域请求。

服务器会返回一个HTTP字段`Acess-Control-Allow-Origin`，表明该资源可以被设置的外域访问

预检请求通过`OPTIONS`方法发起一个请求到服务器，以获知服务器是否允许该实际请求。（可以避免跨域请求对服务器的用户数据产生未预期的影响），请求同时携带了两个首部字段

```http
Access-Control-Request-Method: POST
Access-Control-Request-Headers: ...(实际请求携带的自定义首部字段)
```

其中xhr中请求要设置`withCredentials=true`才能携带cookie

缺点：非简单请求需要多一次请求，需要服务端设置相应，兼容性问题

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

targetWindow.postMessage(data, targetOrigin) // targetOrigin类似（https://google.com）
```

targetWindow:

- window.open
- window.opener
- HTMLFrameElement.contentWindow
- window.parent
- widnow.frames

缺点，兼容性不好，ie9只对iframe使用，不能对其他tab使用
（优酷）

### location.hash

打开一个隐藏的iframe，src到跨域地址，iframe通过改变hash来通讯
优点：双向通讯
缺点：通过url，不够安全，大小限制，需要通过onhashchange事件，兼容性问题

### window.name

原理：一个window生命周期内，window name属性共享，注意XSS注入

过程：

1. a页面打开b页面iframe
2. b加载完之后将数据写进去window.name，然后跳转到和a同域的代理页面（同域才能操作）
3. 读取iframe.contentWindow.name得到跨域data

优点：传输的数据量大：2M，支持性好，支持GET和POST

缺点： 需要请求一次Proxy页面，Content Security Policy（CSP)，内容安全策略（HTTP设置），X-Frame-Options设置

### 代理服务器

服务端没有同源限制

### Websocket

ws不实行同源政策

### 图片Ping

只能单向，通常用来上报一些数据