---
layout: post
title: performance
date:   2019-02-17
categories: javascript
---

# 网络部分
1. 减少http请求
   1. 图片使用sprite，使用图片地图（map/area），使用伪协议（data://），合并css和JavaScript文件（但是抽离公共部分），按需加载
   2. 缓存：设置expires、cache-control、Etag、CDN等缓存，解决文件更新问题（文件名改变），使用外部css和JavaScript文件
2. 加快http请求
   1. 使用压缩gzip选项
   2. 使用HTTP/2 或者 HTTP/3（多路复用，UDP）
   3. 预加载、DNS预解析
   4. 压缩JavaScript和css文件，抽离公共部分
   5. 减少重定向
   6. 无阻塞加载脚本
3. 客户端
   1. scirpt标签放在body最后，link放在head（前面），script会阻塞，它可以使用document.write来改写后面的，所以脚本必须顺序执行（可以使用无阻塞并行下载async、或延迟下载defer==保证顺序执行）
   2. JavaScript运行优化（如动画使用requestAnimationFrame），利用引擎优化性能
   3. 预渲染
   4. css解析性能
   5. 渲染性能
   6. onload后加载（拆分代码）


# JS性能优化
在V8引擎下，引入了`TurboFan`编译器，他会在特定的情况下进行优化，将代码编译成执行效率更高的`Machine Code`

在这一过程中，JS会首先被解析为AST（抽象语法树），解析过程略慢。
![v8](../assets/images/v8.png)

Ignition会将AST转化成Bytecode，TurboFan负责编译出优化后的Machine Code，在执行效率上，Machine Code优于 Bytecode
1. 对于函数，避免声明嵌套函数（类也是函数），这样会造成函数的重复解析
```js
function test1() {
  function test2() {}
}
```

编译为 Machine Code的情况：
1. 如果一个函数被多次调用，并且参数一直传入同一个类型，那么V8就会认为该段代码可以编译成Machine Code。因为Machine Code 固定了类型，不需要再执行很多判断逻辑了。如果此时传入的参数类型发生改变，那么Machine Code就会被DeOptimized为Bytecode。DeOptimized次数较少就应该要保证传入的类型一致

另外编译器会对函数进行 Lazy-Compile（预解析），当函数没有执行的时候，会对函数进行一次预解析，直到代码被执行以后才会被解析编译。而对于马上调用的函数来说，预解析其实是多余的。其实给函数套上括号就可以了
```js
(function test() {
  // some code
})
```

# 图片优化
计算图片大小：
对于一个100px * 100px 的图片，图像中有 10000px的点，每一个px有4个通道（rgba），每一个通道1个字节（byte = 8bit），所以该图片大小为 10000 * 4 / 1024

## 图片加载优化
1. 不用图片
2. 移动端适配，裁剪加载
3. 小图使用base64
4. 使用雪碧图
5. 选择正确的图片格式：
   1. webp
   2. 小图使用png
   3. 大图使用jpeg
6. 懒加载




# DNS预解析
`<link rel="dns-prefetch" href="" >`

# 函数节流和防抖

# 预加载
`<link rel="preload" href="">`
预加载可以一定程度上降低首屏的加载时间，因为可以将一些不影响首屏但重要的文件延后加载

# 预渲染
`<link rel="prerender" href="http://example.com"> `

# 懒加载
首先将图片上的src属性设置为loading的图片，然后在图片的data-src上设置真实的src地址。
首先加载前n个图片，然后记录最后加载到的数据索引
监控window的滚动事件，如果索引所在的地方距离可视范围一定距离的时候，执行加载程序。可以使用函数节流和防抖的方式。

另一种方法， IntersectionObserver 方法（优先级低）

第三种方法，对img都订阅事件，当滚动结束的时候才开始加载（从视口开始加载）节流，当出现在视口才开始加载

对于页面：import、ajax

# 懒执行


# CDN
我们可以将静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限
可以考虑使用多个 CDN 域名。并且对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie，平白消耗流量。

# 编写高效的JavaScript
1. 执行上下文()[https://github.com/mqyqingfeng/Blog/issues/5]，执行上下文中变量标识符在作用域链中位置越深，查找和访问它所需要的时间就越长。所以使用局部变量是JavaScript读写最快的标识符
2. 使用with会使作用域链加深，第二个使try-catch语句中的catch语句，其行为类似于with语句，也是在作用域链上增加了一个对象。该对象包含了由catch指定命名的异常对象
3. 高效存储：从字面量中和局部变量中读取值的开销小，但是在对象中读取数据和数组开销大。所以在对象属性或数组属性存储为局部变量是一种好方法。
4. 流控制：大量if/else之类出现的，按频率排序，也可以拆分成几个分支（二分查找），switch简化了多重判断的结构，提上了性能
5. 循环：可以将变量从length变成0，若执行过长的循环可以考虑使用异步

# 简化CSS选择符
css选择符是从右边开始的
1. 避免了通配选择符
2. 不要限定ID选择符，页面中一个ID只能对应一个对象，如：`#id`而不是`li#id`
3. 不要限定类选择符，而是根据实际情况进行拓展
4. 避免使用后代选择符，处理后代选择符开销是最高的。应该使用子选择符
5. 避免使用标签-子选择符：如果像`#id > li > a`，这样基于标签的子选择符，那么应该使用一个类来关联每个标签元素。如果可以尽量使用类名。
6. 不要试图编写长的选择符
7. 依靠继承