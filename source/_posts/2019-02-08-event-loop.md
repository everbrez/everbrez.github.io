---
layout: post
title:  事件循环
date:   2019-02-08 
categories: JavaScript
tags: JavaScript Event-Loop 
---

[Node-loop](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

```js
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

await 可以使用任何 “thenable”，即任何带有 then 方法的对象，即使它不是真正的 Promise

进程是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）

线程是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）

[js_singlethread_eventloop](http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html)

[浏览器渲染页面过程与页面优化](https://segmentfault.com/a/1190000010298038#articleHeader12)

[https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
