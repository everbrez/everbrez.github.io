---
layout: post
title: web security
date:   2019-02-17
categories: security
tags: security
---

<!--more-->

# XSS攻击

`XSS（cross site scripting`），跨站脚本攻击 ，是一种代码注入攻击。攻击者通过在目标网站注入恶意脚本，使之可以在用户浏览器上运行。攻击者可以获取用户的敏感信息如`cookie`、`sessionID`等，进而危害数据安全。

本质：恶意代码没有过滤，与网站正常代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。（HTML注入）

在处理输入的时候，以下内容都不可信：

- 来自用户的UGC信息
- 来自第三方的连接
- URL参数
- POST参数
- Referer
- Cookie

XSS攻击分为两种类型：

1. 存储型，恶意代码存在于数据库
2. 反射性，恶意代码存在于URL中
3. DOM型，恶意代码存在于URL或者输入框，前端JavaScript取出执行，属于前端JavaScript的安全漏洞（关闭属性或者关闭标签）

## XSS注入的方法：

1. HTML中内嵌文本，恶意内容以script标签形成注入
2. 内联JavaScript中，拼接的数据突破了原本的限制
3. 标签属性中，恶意内容突破属性值的限制，注入其他属性的标签
4. 在标签的`href`、`src`属性中，包含JavaScript：等可执行代码
5. 在`onload`、`onerror`、`onclick`等事件中，注入不受控制代码
6. 在`style`属性和标签中，包含类似url(`JavaScript:`)的代码，新版浏览器已经可以防范
7. 在`style`属性和标签中，包含类似`expression()`的CSS表达式代码，新版浏览器已经可以防范

## 预防

1. 输入检查，查找敏感信息
   1. 前端过滤：攻击者可以伪造请求
   2. 后端在写在数据库前过滤：不确定内容要输出到哪里。（在前端中，不同位置所需要的编码不同，如html与JavaScript）
   3. 对于明确的过滤类型：如电话，邮箱等提前过滤
2. 预防存储行和反射性XSS攻击，输出检查
   1. 对HTML对充分的转义，利用成熟的转义库，利用模板引擎
   2. 避免内联事件
   3. 改成纯前端渲染，把代码和数据分隔开（JavaScript来调用Ajax来渲染的数据）
   4. 在HTML中输出，在CSS中输出，在JavaScript中输出，在URL等属性中输出，在内联属性中输出。
      1. 其中URL中有可能是其他协议的（伪协议）
   5. 处理富文本：使用白名单
3. 预防DOM型XSS攻击，使用`.innerHTML`、`.outerHTML`、`document.write()`的时候小心，不要把不可信的数据作为HTML插到页面上，a标签的`href`属性，JavaScript中的eval、setTimeout、setIntercal都能够将字符串当成代码运行。
4. CSP
5. Cookie: HTTP only
6. 验证码
7. 不信任的输入限定长度（增强攻击难度）
8. www-x-frame2

## XSS构造技巧

- 利用location.hash，然后构造onload事件，绕过length限制
- 利用base标签劫持链接
- window.name利用
- flash，

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

作用：

1. 禁止加载外域代码，防止复杂的攻击逻辑
2. 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域
3. 禁止内联脚本执行
4. 禁止未授权脚本执行（未授权）
5. 合理使用上报可以即使发现XSS

```js
jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert()//>\x3e
```

# CSRF

Cross-site Request Forgery 跨站请求伪造
Cookie分为两种：
Third-party Cookie：只有过了expire时间后失效
Session Cookie：临时Cookie，连接断开就失效了

本质：重要操作的所有参数都是可以被攻击者猜测到的。

防御：

1. Get请求不对数据进行修改
2. 不让第三方网站访问到用户cookie
3. 阻止第三方网站请求接口
4. 请求时附带验证信息，验证码或者Token，这个是最有效的方式 
5. Referer Check（但是浏览器会限制referer的发送。比如https跳到http）
   1. H5中a和area标签可以设置一个新的link types：noreferrer，即不再发送referrer（用户隐私）
6. 将参数加密，或者使用一些随机数，让攻击者无法猜测到。

Cookie设置 `sameSite`属性，cookie不随着跨域请求发送

验证Referer：验证Referer判断是否为第三方网站发起的请求

Token：服务器随机生成一个Token，每次请求的时候将Token带上，服务器验证是否有效
多页面共存情况，保密性

# 点击劫持

点击劫持是一种视觉欺骗手段，攻击者将需要攻击的网站通过iframe嵌套的方式嵌入自己的网页中，并将iframe设置为透明，在页面中透出一个按钮诱导用户点击

由于手机上的浏览器隐藏了地址栏，所以手机上的点击劫持更容易实现

防御：

1. 设置X-FRAME-OPTION，为了防御`iframe`嵌套的点击劫持攻击

有三个值可选：

- DENY，表示页面不允许通过`iframe`方式展示
- SAMEORIGIN 表示页面可以在相同域名下通过`iframe`的方式展示
- ALLOW-FROM，表示页面可以在指定来源的`iframe`中展示

2. 通过js代码检查自己网页是否为`top`

H5中为`iframe`添加了sandbox功能，能够通过参数来支持更精确的控制：

- allow-same-origin 允许同源访问
- allow-top-navigation 允许访问顶层窗口
- allow-forms 允许提交表单
- allow-scripts 允许执行脚本

# 中间人攻击

中间人攻击时攻击方同时与服务端和客户端建立起连接，并让对方认为连接是安全的。但实际上整个通信过程都被攻击者控制了，攻击者不仅能够狗获得双方的通信信息，还能修改通信信息

防御：

1. HTTPS可以防御中间人攻击

# DDoS 分布式拒绝服务

Distribute Denied of Server
在短时间内发起大量请求，耗尽服务器的资源，无法相应正常的访问，造成网站实质下线。

- TCP全连接攻击：通过大量僵尸主机不断与服务器建立大量TCP服务，耗尽服务器资源。
  - 优点：能够绕过防火墙，缺点：需要找到大量的僵尸主机，如果僵尸主机的IP暴露容易被驱逐
  - 防御：限制SYN流量，定期扫描，骨干节点配置防火墙，用足够的机器承受住黑客的攻击，过滤不必要的服务和端口（在路由器上过滤假IP）
- SYN Flood 攻击
  - 发送大量伪造原IP地址的攻击报文，而真实IP不作回应
  - 服务端在重试和等待SYN Timeout的过程中维持着一个非常大的半连接队列而消耗大量的CPU和内存
  - 解决：使用硬件防火墙（由防火墙代理该连接，验证有效后才向内部服务器发起SYN请求，最后才建立连接。防火墙要对序列的序列号进行修改），硬件防火墙是指将防火墙程序做到芯片里面，由硬件执行里面的功能，能够减少CPU的负担，使路由更稳定。
  - 使用SYN Cache技术。收到SYN的时候不急着去分配系统资源，先回应ACK报文，并在专用的HASH表中保存这种半连接报文，直到收到正确的ACK后再分配资源。

# Land攻击
这种攻击方式采用了特别构造的TCP SYN数据包（通常用于开启一个新的连接），使目标机器开启一个源地址与目标地址均为自身IP地址的空连接，持续地自我应答，消耗系统资源直至崩溃。