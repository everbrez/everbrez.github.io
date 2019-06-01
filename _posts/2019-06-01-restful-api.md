---
layout: post
title: restful api
date:   2019-06-01
categories: backend
tags: backend
---

REST 是 `REpresentational State Tranfer` 的缩写。

# Reference
1. [restful-api-design-13-best-practices-to-make-your-users-happy](https://blog.florimond.dev/restful-api-design-13-best-practices-to-make-your-users-happy)
2. [api-design](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

# 关于HTTP的基础概念

- HTTP具有动词（方法），常用的有：GET、POST、PUT、DELETE、PATCH
- REST是面向资源的（resource oriented），一个资源使用URL来表示，如：`/articles/`
- 操作指令是由动词 + URL 来表示，如：`POST: /articles/` 可以用来表示创建新的文章
- 动词（HTTP METHOD）可以用来表示`CRUD (Create，Read，Update，Delete)`操作，如：

| method | crud |
| :--: | :--: |
| GET | read |
| POST | create |
| PUT/PATCH | update |
| DELETE | delete |

- 响应状态由响应code来表示，`1xx`表示信息，`2xx`表示成功，`3xx`表示重定向，`4xx`表示客户端错误，`5xx`表示服务端错误。

