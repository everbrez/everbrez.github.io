---
layout: post
title: interview summary
date:   2019-03-18
categories: interview
tags: interview
---

# 腾讯一面

1. typeof [] object

```js
var a = 'global';
var bar = {
  a: 'bar',
  foo() {
    console.log(this.a)
  }
};

bar.foo(); // 'bar'
(bar.foo)(); // 'bar'
var c;
(c = bar.foo)(); // 'global'
(c, bar.foo)(); // 'global'
bar.foo.call(this); // 'global'
bar.foo.call(window); // 'global'
```

1. HTTP状态码
2. 网络缓存和浏览器缓存
3. 数组去重
4. 输出n -> m范围的随机整数
5. 正则：第一个为大写首字母，其他是3-13位字母数字和下划线
6. MVVM
7. 简述客户端优化
8. 原生使用ajax请求
9. 实现两边定宽，中间自适应布局
10. 写出display的值
11. 内存泄漏

# 阿里评测

1. 工作室负责任务，然后问了一下后台
2. 讲到了统计工具，问了一下后端数据怎么拿
3. 问了数据怎么处理
4. 问了在项目中React干了什么
5. 跨域
6. var let const
7. 深复制，浅复制
8. 工具 vscode
9. git push了一个错误，怎么回退, git revert可以撤销commit，同时生成一个记录
10. webpack？
11. 非React时代项目
12. 熟悉什么算法

# 腾讯二面（LMH）

1. node
2. 小程序
3. 项目
4. 做过哪些优化
5. 要用 HTTP2.0 要怎么做

# 网易一面

1. travis CI 与 cicle CI 的区别，gitlab CI？一般可以干什么，可以配置什么
  - [区别](https://hackernoon.com/continuous-integration-circleci-vs-travis-ci-vs-jenkins-41a1c2bd95f5)
  - cicle CI：可以使用ssh本地调试，YAML config比较轻量，无需专用服务器（但允许在私有云运行），缓存需要的安装，需要很少的配置，开箱即用
  - travis CI: （也有 YAML config， cloud base， 支持docker，）可以选择在Linux或者 Mac OSX运行，更多语言，支持构建矩阵（使用不同环境和语言）
2. 了解sass什么？继承与mixin区别
3. 你了解的前端工程化
  - 规范，eslint/stylelint
  - 流程，增强开发进度管理和控制git
  - 模块化
  - 组件化
  - 单元测试
  - 自动化工具
4. 如果要重构一个新闻页面，你会用到什么H5新标签。figure为什么需要，直接img标签不行吗
5. 简述一下HTTP缓存，如果要获得最新的文件，为什么不使用query而是改变文件名? 后端怎么知道链接有没有缓存
6. 了解渲染对优化性能有什么作用？defer与async的区别，使用场景
7. 你了解的自适应网站是什么
8. 任务循环？

# 腾讯一面（ZCX）

1. React router的原理
2. 跨域原理
3. webpack怎么编译？原理
4. 求中位数？-- 堆 -- 改进的快排 -- 排序
5. webpack的public path是干什么的？
6. vue 的 node 模块
7. animation参数

# 网易一面（FZL）

1. node流
2. CSS3的新属性
3. 算法：中位数
4. 算法：100层楼，2颗弹珠

# 腾讯一面（二）

1. animation 与 transition区别？
2. React事件
3. map与reduce方法
4. redux
5. 实现布局：

```bash
---------------------
---------  -----------
|  图   |  |  title  |
|  片   |  |----------
|       |  | content |
---------  -----------
----------------------
```

6. 你对前端的理解
7. position
8. 谈谈项目
9. 项目？你觉得为什么要生成随机类名呢
10. 自己的项目？
11. 之前面过一次，你觉得为什么没过

# 腾讯一面（三）2019-03-23

1. 自我介绍
2. 介绍一下项目经历（就加入工作室之后做了什么项目）
3. 介绍一下继承，讲了Object.create()，组合继承，ES6继承
4. new操作符发生了什么
5. 跨域，JSONP原理
6. ES6
7. 箭头函数
8. 一个对话框，垂直居中，水平居中（其中内容还是可以点击），讲了fixed，margin auto
9. 缓存和HTTP状态码304，HTTP头怎么设置的
10. 输入URL到渲染---> TCP挥手
11. redux的数据流向
12. 事件委托
13. React的事件机制
14. 规划，投了什么，怎么学习，相比科班的优势
15. 还有什么问题？

# 字节跳动一面 2019-03-23

1. 自我介绍
2. 进程和线程
3. HTTPS
4. 写一道算法题：给一个无重复的数组arr，要求找到n个数，其和为m，找到这n个数的组合
5. 重绘和回流
6. cookie、sessionStorage和localStorage
7. 缓存
8. 你觉得在webpack中css可以require进来，那么css打包了之后是什么样子的。在网页上它又是怎么运行的？
9. 有自己优化过吗？客户端优化
10. 一道简单关于this的题目

# 字节跳动二面 2019-03-23

1. 自我介绍
2. 介绍项目，项目中遇到什么难点
3. 思考：一般搜索之后的值会有提示，假如搜索了123，那么输入1的时候就会有123提示出来，如果要按照时间的顺序来排序，应该怎么实现。如果输入13之后123也需要出现在提示中，又应该怎么做？
4. 算法：假设定义一个绝对大值n，其在数组中的出现次数大于数组length的一半。找出这样的数。比如[1,1,1,5,1,1]，1出现了5次，大于数组长度的一般3，所以绝对大值为1
5. 你觉得为什么React中setState是异步的？
6. 在React15和16版本中，你觉得React最大的更新是什么？
7. 怎么实现一个事件订阅发布机制

# 字节跳动三面 2019-03-23

1. 自我介绍
2. React中的HOC与render props的区别
3. 如果要讲一个props从祖先组件传递到嵌套较深的子组件，有什么方法？讲了Context和Redux，问还有吗？没有想到
4. 一道题目：['apple', 'pears', 'apple']问有多少个单词，在不引入新的变量的情况下（后面给了提示：使用reduce）
5. 题目：判断下面代码的运行情况，并说明理由

```js
setTimeout(() => console.log(1))
Promise.resolve().then().then(() => console.log(2))
new Promise((resolve) => {
  resolve()
  console.log(3)
}).then(() => console.log(4))
```

6. React中的render component与controlled component有什么区别（没听清楚是否这两个组件）
7. Etag怎么生成？
8. Etag为什么要跟last-modified一起使用？
9. 题目：实现一个throttle函数
10. 组件化和模块化的区别
11. 单元测试中一般怎么衡量覆盖度？只回答了if/else分支
12. 模拟一个instanceof的过程

# Others

> from network

1. 阅读这篇[文章](https://overreacted.io/making-setinterval-declarative-with-react-hooks/ )
2. 解释下这个 [bug](https://codesandbox.io/s/jj0mk6y683) 的产生原因。
3. 比较这个  [bug](https://codesandbox.io/s/jj0mk6y683) 的代码和 [https://jsbin.com/jipivovasa/1/edit?js,console](https://jsbin.com/jipivovasa/1/edit?js,console)
以及 [https://jsbin.com/macasotini/1/edit?js,console](https://jsbin.com/macasotini/1/edit?js,console)
解释两段代码输出的 `count` 值不一样的原因。