---
layout: post
title:  WebSocket
date:   2019-02-22
categories: NetWork
tags: NetWork WebSocket
---

WebSocket是一种在单个TCP连接上进行全双工通信的协议，是一个**持久化**的协议

# WebSocket

> HTTP协议有一个缺陷：通信只能由客户端发起

特点：

- 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。全双工通信
- 建立在TCP协议之上，服务器端实现容易
- 与HTTP有良好的兼容性，默认端口也是80和443，握手阶段使用HTTP协议
- 数据格式轻量，开销小
- 可以发送文本，也可以发送二进制数据
- 没有同源策略
- wss添加一个TLS安全层

## 与HTTP关系

HTTP中一个request对应一个response，而且不能主动发送response。web socket 协议是基于HTTP协议的（借用了HTTP协议来完成一部分握手）

## 握手阶段

1. 在HTTP中添加多几个字段
   1. Upgrade: websocket
   2. Connection: Upgrade
   3. Sec-WebSocket-Key 浏览器随机生成的
   4. Sec-WebSocket-Protocol 用户定义的字符串，用于区分同URL下，不同服务需要的协议
   5. Sec-WebSocket-Version 告诉服务器使用websocket的版本
2. 服务器返回字段
   1. Upgrade: websocket
   2. Connection: Upgrade
   3. Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk= 前面的key经过服务器加密后的
   4. Sec-WebSocket-Protocol: chat

## Ajax 轮询

每个几秒发送一个请求，询问服务器是否有新信息
这个需要服务器有很快处理速度和资源

## long poll 长轮询

采用阻塞模型，客户端发起连接后，如果没有消息就一直不返回Response给客户端。直到有消息才返回。返回完之后，客户端再次建立连接

需要服务器具有很高的并发

## socket

由于HTTP是没有状态的，所以每次建立连接都要验证身份等等。。
但是websocket在一次连接中，服务器会一直保留你的信息

# 服务器推送技术

- ajax轮询
- 长轮询（comet）
- Server-sent-events(SSE)
  - 客户端通过EventSource接口发起连接，服务器以text/event-stream内容类型响应

- WebSocket

# socket.io

1. 无限自动重连
2. 心跳机制，允许让服务器和客户端知道哪个已经不需要通信了
3. 二进制支持
4. socket.io加入了meta packet：type，命名空间，ack id，所以一般websocket不能连接socket.io服务器
5. 不仅包含websocket， 封装了轮询等方法
6. 可靠性，支持代理和负载均衡，个人防火墙和防病毒软件
7. 多路复用支持
