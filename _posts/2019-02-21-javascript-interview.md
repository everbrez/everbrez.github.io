---
layout: post
title: JS 面试题
date:   2019-02-17
categories: javascript
---

# 字符串方法

## 字符方法
1. 字符方法
- charAt
- charCodeAt
- codePointAt

2. 拼接方法
- concat
- slice 如果start大于end，则返回空字符串
- substr
- substring 若start大于end，那么二者会交换，任何大于length都会被视为length

> 上面三者都接受两个参数，其中`slice`和`substring`两个接受起始位置和终止位置，但是`substr`接受一个起始位置和返回的字符串长度
> 如果输入负数，`slice`会加上数组长度，`substring`则会将所有负数转化为0，`substr`第一个负的参数加上字符串长度，第二个转化为0
> 如果输入NaN,视为0

1. 索引方法
- indexOf
- lastIndexOf
// es6
- startsWith
- endsWith
- includes
- repeat

1. trim方法
- trim 删除所有前置和后置空格

5. 大小写方法
- toUpperCase
- toLowerCase
- toLocaleLowerCase
- toLocaleUpperCase

6. 匹配方法
- match 返回一个符合正则表达式的数组，而exec方法则会返回一个符合正则表达式的数组外，还有捕获组以及index和input的属性
- replace 第一个参数为字符串或者正则，如果没有设定g flag，那么指挥替换第一个
- search 从头往后查找模式，如果存在则返回索引，如果没有就返回-1

7. 比较
localeCompare 如果字符串在字母表中中应该排在字符串参数之前，返回一个负数，如果字符串等于字符串参数，返回0，如果应该排在字符串参数之后，返回1

8. String方法
- String.fromCharCode
- String.fromCodePoint

# 严格模式
- 转换错误
  - 给未声明的变量赋值会报错 （不可以意外地创建全局变量）
  - 分配无效报错（比如writable设置为false的量，undefined和NaN赋值）TypeError，在正常模式下不会报错
  - 尝试delete一个无法delete的变量时候出错TypeError
  - 函数参数的名称的唯一的
  - 严格禁止8进制，如果有前导0会报错
  - 在原始值上设置属性，抛出TypeError
- 简化变量的使用
  - 禁止with，否则不知道在内部定义的变量是全局的还是obj的（编译器可以很好地优化代码）
  - eval变量不影响外部作用于
  - 禁止删除普通名称（不是对象的属性）
- argument
  - argument不跟踪相应的命名参数的值
  - argumen.callee不再支持
- this
  - this将不会自动转化成对象（如apply等需要自己显示传this对象）
  - 指向window的this将会变成undefined、
- 新增保留关键字

# call、apply和bind的区别
- 其中bind返回一个函数，call和apply直接执行
- call接受一个this参数以及...args（多个argument参数）
- apply接受一个this参数以及args数组或者类数组（NodeList以及HTMLCollection，argument之类的）
- bind接受一个this参数以及若干参数，柯里化
- 实现bind要点
注意验证this是否函数
验证是否new调用（使用new.target判断）
将参数封装
（A.apply(Object.create(A.prototype))，此时instanceOf就会误判）

# ajax相关
用法：
- const xhr = new XMLHttpRequest()
- xhr.open(method, url, ?async, username, psw) 启动一个请求以备发送
- xhr.send(data)主体，如果不需要通过主体发送数据，则必须传入null（某些浏览器必须的）
- 请求完成后，属性会填充再xhr对象里面：
  - responseText
  - responseType
  - responseURL
  - responseXML
  - response
  - statusText
  - status
方法：
- setRequestHeader()，必须在open之后，send之前
- send()
- getResponseHeader()
- getAllResponseHeaders() 由`CRLF`分隔的所有响应头，如字符串，或者null（没有收到响应）
- abort() 如果请求已经发送，则终止请求。然后将状态设置为UNSENT
- onprogress() 
- .timeout 设置超时

## 状态
xhr.readyState，返回请求的状态。
xhr.onreadystatechange

readystate：
- 0 UNSENT 对象创建，未open
- 1 OPENED 已经open，未send
- 2 HEADERS_RECEIVED 响应头和相应状态已经返回
- 3 LOADING 响应体下载中
- 4 DONE 请求完成

## XMLHttpRequest.upload 
该方法返回一个XMLHttpRequestUpload对象，可以用来监视上传的进度
事件：
- loadstart 上传开始
- progress 上传进度
- abort 上传终止
- error 错误，上传失败
- load 上传成功
- timeout 上传超时
- loadend 上传结束，无论是load还是timeout还是error，都会触发这个事件

