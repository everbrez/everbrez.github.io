---
layout: post
title: design pattern
date:   2019-02-17
categories: javascript
---

# 设计模式

## 工厂模式

## 单例模式
单例模式的核心是确保只有一个实例，并提供全局访问，减少了内存开支（在频繁需要创建和销毁时）
惰性单例
创建对象的职责和管理单例的职责可以分布在两个不同的方法。

```js
function getSingle(fn) {
  let instance = null
  return function(...args) {
    if (!instance) {
      if (new.target) instance = new fn()
      else instance = fn.apply(this, fn)
    }
    return instance
  }
}
```
上面的方法不能保证instanceof 能够正常工作

## 享元模式

如果系统中因为创建了大量类似的对象而导致内存占用过高，享元模式就很有用。
尽量减少共享对象的数量。
使用享元模式的关键是怎样区分内部状态和外部状态。可以被对象共享的状态通常被划分为内部状态

对象池的实现

## 策略模式
定义一系列的算法，把他们一个个封装起来。（在JavaScript中可以直接作为一个对象的方法）
应用场景：缓动动画、表单校验
方便后期的扩展和更改

## 适配器模式
适配器使原来接口不兼容的两个软件实体可以正常工作
装饰者的作用是给对象增加功能，而适配器是解决两个接口不兼容的问题

## 代理模式
代理模式是为对象提供一个代用品和占位符，以便控制对它的访问
代理可以帮助target过滤一些请求（这种代理叫做保护代理），虚拟代理则是把一些开销很大的对象延迟到真正需要它的时候采取创建。缓存代理，惰性加载

代理和本体接口的一致性：代理和本体可以替换使用，这意味着当不需要代理功能的时候，可以直接访问本体。

单一职责，一个类而言，应该仅有一个引起它变化的原因。

应用：虚拟代理图片预加载

```js
function createImg() {
  const img = new Image
  img.src = 'loading.gif'
  document.body.append(img)
  return {
    setSrc(src) {
      img.src = src
    }
  }
}

const myImage = createImg()

function createProxy(img) {
  return {
    setSrc(src) {
      const image = new Image
      image.src = src
      image.onload = function(){img.setSrc(src)}
    }
  }
}

const myImageProxy = createProxy(myImage)
```

## 发布-订阅模式
发布订阅模式又称观察者模式，定义了对象当中的一对多的关系。
解耦，（网站登陆的例子），全局Event对象（如同中介），（先订阅再发布？）

弱化对象之间的联系，解耦时间和空间，消耗时间和空间

## 命令模式
有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。
将对象封装成命令对象，提供execute方法
- 撤销和重做
- 宏命令（命令模式和组合模式）

## 职责链模式
可以解耦大量的if/else模式，解耦了请求发送者和N个接收者之间的复杂关系（比如订单问题）

需要在链尾添加一个保底的接收者节点来处理这种即将离开链尾的请求。
AOP实现职责链
```js

class Task {
  constructor(fn) {
    this.fn = fn
    this.next = null
  }

  after(next) {
    return this.next = next
  }

  passRequest(...args) {
    const res = this.fn(...args)
    if (res === false && this.next) {
      return this.next.passRequest(...args)
    }
    return res
  }
}

let console1 = new Task(function(a){if(a > 500) return '500+'; return false})
let console300 = new Task(function(a){if(a > 300) return '300+'; return false})
let console2 = new Task(function(a){if (a > 200) return '200+';return false})
let console3 = new Task(function(a){if (a > 100) return '100+';return false})
let normal = new Task(function(a){return 'normal'})

console1.after(console300).after(console2).after(console3).after(normal)
```
优缺点：解耦，只需要将请求传递给第一个节点即可
灵活地拆分重组
但是不能保证一定会被处理，

应用：优先度（比如选用下载工具。。。）

## 中介者模式

利用发布/订阅设计模式
最少知识法则
在中介者模式中，他们只能通过中介者对象来互相影响对方，使对象之间得以解耦

## 装饰者模式
decorator
装饰者模式可以动态地给某个对象添加一些额外的职责，从而不影响这个从这个类中派生的其他对象。
在函数执行前后添加操作

可以处理数据上报、统计函数的执行时间、动态改变函数参数以及插件式的表单验证

作为一个框架，提供一下稳定以及方便移植的功能，使用装饰者模式动态装饰上去

## 状态模式

# 原则
1. SRP原则（单一职责原则）：引起变化的原因，如果有两个动机去写一个方法，那么这个方法就有两个职责。体现在一个对象只做一件事（单例模式、装饰着模式、代理模式）。降低了单个类或者对象的复杂度，利于单元测试，但是增大了对象之间的联系。
2. 最少知识原则：一个实体应该尽量少地与其他实体发生作用（中介者模式、）
3. 开放-封闭原则：当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以增加代码的方式，但是不允许改动程序的源代码。发布订阅方法，策略模式，代理模式，职责链模式