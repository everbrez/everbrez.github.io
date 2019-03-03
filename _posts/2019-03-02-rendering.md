---
layout: post
title: rendering
date:   2019-03-2
categories: bowser 
---

# 浏览器渲染过程
[1](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#The_browser_high_level_structure)
[2](https://aerotwist.com/blog/the-anatomy-of-a-frame/)
[3](https://juejin.im/post/5a6547d0f265da3e283a1df7#heading-6)
[4](https://juejin.im/entry/59f010fdf265da4315231caa)
[5](https://github.com/hushicai/hushicai.github.io/issues/5)
[6](https://juejin.im/entry/59f010fdf265da4315231caa)
[7](https://zhuanlan.zhihu.com/p/44737615)
[8](https://lancelou.com/post/chrome-devtool-performance-tab-basic)
[9](https://segmentfault.com/a/1190000013627093#articleHeader0)
[10](https://developers.google.com/web/fundamentals/performance/rendering/?tdsourcetag=s_pcqq_aiomsg)


## processes
渲染涉及到两个进程：
1. renderer 进程
   1. compositor 线程（第一个被通知vsync event的线程），同时接收input event。如果可能，这个线程会尽量不去请求主线程，而是直接调整layer的位置以及直接commit frames给GPU
   2. 主线程：执行JavaScript、styles、layout和paint
   3. compositor Tile Worker
2. GPU进程



## overview
[!](../assets/images/render-1.png)

## 解析
解析过程可以分成两个过程：词法分析和语法分析
词法分析是将输入内容分割成大量内容标记（token）的过程。标记是构成内容的单位（类比于人类语言中的单词）
语法分析是应用语法规则的过程

解释器通常将解释工作分给以下两个组件来处理：词法分析器，解释器。词法分析器负责将内容分解成一个个标志，而解释器负责根据语言的语法规则分析文档的结构，从而构建解析树。

### 翻译
通常构建解析树还不是最终目标，翻译是将解析树翻译成机器代码文档。

编译流程：source code --> parsing --> parse tree --> translation --> machine code

## HTML的解析
标记化是词法分析的过程，将输入内容解析成多个标记，HTML标记包括起始标记、结束标记、属性名称和属性值

起始状态是数据状态，遇到字符<的时候将状态更改为“标记打开状态”，然后接收到一个字符会创建“标记名称状态”，遇到>会将状态改回“数据状态”，如果再遇到<会将状态更改为“标记打开状态”，接收一个"/"，会变成”标记名称状态“（end tag token）
容错机制（table提升）

### 构建树算法
再创建解释器的同时，也会创建document对象。在树构建阶段，以document为根节点的DOM树也会不断进行修改，向其中添加各种元素。

解析结束之后浏览器将文档标注为交互状态，并且开始执行`deferred`状态模式的脚本，也就是哪些应在文档解析完成后的脚本。

## CSS解析
CSSOM

### 预解析
一般在执行脚本时，其他线程会解析文档中其余部分，找出并加载需要通过网络加载的其他资源。这种方式可以使资源在并行连接上加载，从而提升总体速度。（预解析不会修改DOM树，而是将这项工作交给解释器处理）

### 样式表
理论上来说，样式表不会更改DOM树，但是在脚本在文档解析阶段会请求样式信息。如果当时还没有加载和解析样式，脚本就会获得错误的回复。firefox中在样式表加载和解析过程中，会禁止所有脚本。而对于webkit而言，仅当脚本尝试访问的样式属性可能受尚未加载样式表的影响时，它才会禁止脚本


## render tree
render tree 与 DOM tree 元素相对应，但是并非一一对应。一般非可视的DOM元素不会插入render tree中，例如display为none的元素
render layer tree，合成层
### renderObject 
renderObject是所有呈现器的基类，代表了一个矩形的区域。

### 样式计算
构建render tree 的时候，需要计算每一个呈现对象的可视化属性。



## layout
布局是一个递归的过程，它从根render object开始，然后递归遍历部分或所有框架层次结构，为没有给需要计算的呈现器计算集合信息

### Dirty 位系统
为避免对所有细小更改都进行整体布局，浏览器采用了一种dirty位系统。如果每个render object发生了改变，或者将自身或其自带标注为dirty，则需要进行布局

### 全局布局和增量布局
全局布局是指触发了整个render tree范围的布局，原因可能是：
1. 影响所有render object的全局样式发生改变，例如字体大小发生改变。
2. 屏幕大小调整

增量布局是指指挥dirty render object进行布局
一般而言，全部布局是同步触发的，而增减布局是异步的。

换行：如果render object 在布局过程中需要换行，那么会立即停止布局，并告知父代需要换行，父代会创建额外的render object来布局

## paint
系统会遍历render tree ，会其调用paint方法，将render object的内容呈现在屏幕上。

全局绘制和增量绘制

