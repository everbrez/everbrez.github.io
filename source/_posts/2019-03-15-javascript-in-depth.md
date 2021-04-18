---
layout: post
title: javascript in depth 
date:   2019-03-15
categories: JavaScript 
tags: JavaScript
---

# 作用域

## 编译过程

1. 词法分析（tokenizing，lexing）：将字符串分解成有意义的代码块，即词法单元
2. 语法分析（Parsing）：将词法单元流转换成一个由元素逐级嵌套组成的程序语法结构的树（抽象语法树AST）
3. 代码生成，将AST转换成可执行代码的过程

JavaScript中，代码执行需要以下组件的参与：

- 引擎：负责JavaScript的编译和执行
- 编译器：负责语法分析和代码生成
- 作用域：收集并维护所有声明的标识符组成的一系列查询

### 编译器

LHS与RHS：
LHS不考虑其当前的值，目的是更改它的值
RHS则是取得当前的值

在变量还没有声明的情况下，这两种查询行为是不一样的。
LHS如果在作用域中找不到，引擎会抛出`ReferenceError`（即在作用域中判别失败）
RHS如果在作用域中找不到，则会在全局变量中创建该名称的变量，然后返还给引擎（非严格模式下），如果值是`null`或者`undefined`等原始值，那么引擎赋值操作会抛出`TypeError`（即在作用域中判别成功，但是对结果的操作是不合法的）

## 词法作用域

## 函数作用域和块作用域

防止冲突：

- 全局命名空间（声明一个独特的变量对象，作为命名空间 ）
- 模块管理

## 变量提升

```js
foo() // TypeError
bar() // call success

var foo = function bar() {
  // somecode
}
```

# this

优先度：

new > bind

bind > call/apply