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
- overrideMimeType 可以设置自定义类型，上传时候可以使用
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

事件：（同下）

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

如果拔出网线，则会：
1. 如果上传结束，那么触发xhr.onerror
2. 如果上传未完成，那么触发xhr.onerror以及触发xhr.upload.onerror

## 兼容性问题
1. IE11不支持responseType为json
2. 某些低版本firefox和chrome不支持.timeout

## XMLHttpRequest Level 2
1. uploading progress events
2. uploading/doloading binary data.

> Blob Binary Large Object, 二进制大对象。Blob对象是二进制数据，类似于文件对象的二进制对象。File继承自Blob
> `Blob(blobParts [, option])` 第一个数组类型，如果数组内是对象，则会调用`toString()`方法
> blob url 可以通过`URL.createBlobURL()`创建。（前端代码生成，供浏览器下载）
> DATA URL 一般不是所有浏览器都支持通过XMLHttpRequest获取资源的，但是blob URL可以通过这个获取资源。bolb url一般比data url 要短

> form data

# 跨域

# 页面间通讯
1. 通过window.open打开，获得window对象，然后通过操作或者通过postMessage来进行通讯，缺点是只能与自己打开的页面进行通讯，应用面窄。但是在跨域中依旧可以进行通讯
2. localStorage
设置共享区域的storage，storage会触发storage事件
`window.onStorage`
写入操作的页面下不会触发事件
重复设置相同值不会触发

> 由于sessionStorage只存在一个tab，没出现一个新的tab，都会产生一个新的sessionStorage


# promise的实现
- then返回一个promise

# 数组
- 浅拷贝 Array.from()，解构（迭代器）
- 深拷贝
  - 注意环、对象数组
  - 特殊类型的值
  - 方案：递归、JSON（JSON遇到环会报错，无法解析函数，对象忽略undefined，symbol，数组将NaN、null、undefined、infinity，symbol变成null）
- 判断是否数组方法：
  - Array.isArray()
  - Object.prototype.toString.call()
  - instanceOf 这个方法不准确

# parseInt 
第二个参数代表进制

# 数组转字符串
- join('')
- 直接调用 + ，自动转换
- 迭代
- reduce

# 字符串转数组
- split()
- 迭代

# 字符串转整数
1. Number/ + / 等操作符
2. parseInt
3. parseFloat

# 事件机制
## 事件流
事件流描述的是从页面中接收事件的顺序。
IE的事件流是事件冒泡流，网景的是事件捕获流

DOM2规定的时间流包括三个阶段：事件捕获阶段、处于目标阶段以及事件冒泡阶段。
> 规范要求，捕获阶段不会涉及事件目标

## Event对象上的3-5个属性或者方法
1. event.target
2. event.stopPropagation
3. event.preventDefault
4. event.currentTarget
5. 各种按键以及相对位置

## 阻止冒泡
- event.stopPropagation()
- window.event.cancelBubble = true //ie

## 取消默认行为
- event.preventDefault()
- window.event.returnValue = false // ie

## 兼容写法
> ie9兼容addEventListener写法
1. addEventListener('', fn, false) attachEvent('on..', fn)
2. removeEventListener('', fn, false) detachEvent('on..', fn)

## React的事件处理机制
1. 几乎所有的事件代理(delegate)到`document`，达到性能优化的目的
2. 对于每种类型的事件，拥有统一分发的函数`dispatchEvent`
3. 事件对象event是合成对象（SyntheticEvent），不是原生事件

### 原理
1. 事件注册：
  React在组件加载和更新时候，`ReactDOMComponent`会对事件属性进行处理，对相关事件进行注册和存储。document中注册的事件不处理具体事件，而是对事件进行分发。`ReactBrowserEventEmitter.listenTo`作为事件注册的入口，担负着事件注册和事件触发。注册事件的回调函数由`EventPluginHub`来统一管理(采用`listenerBank`来进行处理)，根据事件的类型（type）和组件标识（_rootNodeID）为key唯一标识事件并进行存储。
2. 事件执行：
  事件执行的时候，document上绑定事件`ReactEventListener.dispatchEvent`会对事件进行分发，先获取原生对象的`target`,然后找到组件实例。循环将所有父组件获取，保存在数组中。
  `ReactEventEmitter`利用`EventPluginHub`中注入的`plugins`将原生事件转化为合成事件，然后批量执行存储的回调函数。
  回调函数执行的时候分为两步，第一步将所有合成事件放到`事件队列`里面，第二部是逐个执行。浏览器原生会为每一个事件的每个listener创建一个事件对象，但是这会造成高额内存分配，所以React在启动的时候就为每种对象分配内存池，用到某一个事件对象的时候可以从内存池中复用，节省内存。(对应享元模式)
3. 无法使用`event.stopPropagation()`停止事件传播，需要使用React定义的`event.preventDefault`

```
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactDOMEventListener, which is injected and can therefore support
 *    pluggable event sources. This is the only work that occurs in the main
 *    thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */
```

