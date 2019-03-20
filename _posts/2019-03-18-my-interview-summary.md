---
layout: post
title: interview summary
date:   2019-03-18
categories: interview
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


# 阿里评测

1. 工作室负责任务，然后问了一下后台
2. 讲到了统计工具，问了一下后端数据怎么拿
3. 问了数据怎么处理
4. 问了在项目中React干了什么
5. 跨域
6. var let const
7. 深复制，浅复制
8. 工具 vscode
9. git push了一个错误，怎么回退
10. webpack？
11. 非React时代项目
12. 熟悉什么算法
13. 有什么问题・_・?


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

# others
1. 阅读这篇文章 https://overreacted.io/making-setinterval-declarative-with-react-hooks/ 
2. 解释下这个 bug ( https://codesandbox.io/s/jj0mk6y683 ) 的产生原因。
3. 比较这个 bug 的代码和 https://jsbin.com/jipivovasa/1/edit?js,console 
以及 https://jsbin.com/macasotini/1/edit?js,console
解释两段代码输出的 count 值不一样的原因。