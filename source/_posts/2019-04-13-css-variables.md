---
layout: post
title:  CSS variables
date:   2019-04-13
categories: JavaScript
tags: CSS
---

一文带你了解CSS变量

<!--more-->

# CSS变量能够为我们做什么？

CSS变量一个最常用的场景就是使用在网站的主题上。

思考下面一个场景：假设我们有一个站点，里面的主题色是`tomato`，但是某一天我们收到了一个需求：用户可以切换网站两种不同的主题颜色。那么如果你是网站的开发者，你会怎么做？

一种简单的方法就是在css文件中预先写好这两套颜色的主题，然后根据用户的操作来决定那一套主题生效。

但是这里有一个问题：假设可以让用户随意切换主题颜色呢？显然将所有颜色都预设在css文件中是不现实的，这时候可能就需要使用到JavaScript了。但是颜色的代码分布在css中的不同地方，使用JavaScript操作起来显得非常地麻烦。

这时候就轮到CSS变量的登场了。

# 说到CSS变量，怎么能够不提到它呢？

说到CSS变量，我们就来提一下被称为“CSS有史以来的第一个变量”：`currentColor`。相信不少同学都有使用过`currentColor`的经验，那么为什么这个值就被称为“CSS有史以来的第一个变量”呢？为什么像`inherit`这种值就不被称为变量呢？它可是比`currentColor`更早出现呢...

> 以下为个人见解，如有错误，请联系作者更改

## currentColor

先来介绍一下`currentColor`：`currentColor`的值是取自`color`的值。什么意思呢？看下面的栗子：

```css
.example {
  color: tomato;
  background-color: orange;
  border: 1px solid currentColor;
}
```

.example的标签显示出`tomato`颜色，这表明了currentColor取自当前的color值。

当当前的`color`没有设置的时候，currentColor会取什么颜色呢？事实上，currentColor会向上遍历，直到`:root`根类元素的color值。可以理解为`currentColor`为当前标签继承获得的`color`值。

可以看到，`currentColor`的取值依赖于`color`，当`color`改变的时候，`currentColor`随之改变。而且`currentColor`查找`color`与`JavaScript`中变量搜索作用域链比较类似，`currentColor`因为与变量相似的特性被认为是一个变量。

## inherit

那么inherit呢？使用了`inherit`表明要继承父类的样式属性，也会使子元素继承那些不会自动继承的属性。
... 未完待续

# CSS变量

讲了这么多，终于要进入正题了。下面看看CSS变量怎么使用

在JavaScript等语言中，变量往往需要一个声明步骤，CSS变量也不例外。

## 声明

CSS中，如果属性值前加两条中划线，代表这是一个自定义属性：`--<example-property>: <value>`，看一个栗子：

```css
.example {
  --main-color: tomato;
  --second-color: lightskyblue;
}
```

上面的代码定义了两种不同颜色的自定义属性，也就是这里说的CSS变量。

既然定义了变量，那么该如何使用？看下面的栗子：

```css
.example p {
  color: var(--main-color, black);
  /* black 为 fallback 颜色，即当 --main-color 不生效（如找不到相应的声明）的时候，会使用 black 作为代替 */
  background-color: var(--second-color);
}
```

上面的代码使用了`var()`语法来读取变量。

## JavaScript操作

继续回归到上面的场景，如果需要让用户自定义网站的主题颜色，那么应该怎么做呢？

事实上，CSS变量可以使用JavaScript操作，所以改变一个CSS变量的值，就可以改变所有引用这个变量位置的值。大大减少了工作量。

下面看一个栗子：

```js
// 获取相应的 DOM 元素
const exampleElement = document.querySelector('.example')
const colorPicker = document.querySelector('.color-picker')

// 添加事件处理
colorPicker.addEventListener('change', function(event){
  // 获取用户选择的颜色
  const selectedColor = event.target.value
  // 改变变量的值
  exampleElement.style.setProperty('--main-color', selectedColor)
}, false)
```

# 结语

本文介绍的CSS变量其实只是冰山一角，还有一些深入的知识比如作用域、与其他函数如`calc()`联用等等内容，有机会再详细介绍~
