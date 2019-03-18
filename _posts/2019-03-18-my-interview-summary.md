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
node
小程序
项目
做过哪些优化
要用 HTTP2.0 要怎么做
