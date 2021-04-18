---
layout: post
title: webpack optimize
date:   2019-02-17
categories: JavaScript
tags: webpack
---

<!--more-->

# Webpck 性能优化

## 减少Webpack打包时间

1. 优化`loader`
    对于`Babel`，`Babel`会将代码从字符串转化成`AST`，然后从AST再转化成新的代码。所以项目越大，转换代码越多，效率就越低。
    - 优化文件搜索范围（可以不用编译`node_modules`）中的代码，因为里面的代码都是编译过的。
    - 可以设置缓存，将`Babel`编译过的代码缓存起来，下次只需要编译更改过的代码即可。
2. 使用`HappyPack`
  由于Node是单线程运行的，所以`webpack`在打包的过程中也是单线程的，特别是在执行`loader`的时候，长时间编译的任务很多，这样就会导致等待的情况。
  `HappyPack`可以将`loader`从同步执行转换成并行的。充分利用系统资源加快打包效率
3. `DllPlugin`
`DllPlugin`可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数。主要当类库更新版本才有需要重新打包
4. 代码压缩
在`webpack4`中，只要将`mode`设置为`production`就可以默认开启代码压缩功能（还可以配置删除`console`类代码）
5. `resolve.extensions`，尽可能减少后缀列表长度，将出现频率高的后缀排在前面
6. `resolve.alias`：设置别名的方式映射一个路径，让Webpack更快找到路径
7. `module.noParse`：如果你确定一个文件下没有其他依赖，可以让`webpack`不扫描该文件。

### 减少Webpack打包体积

1. 按需加载，为每一个路由页面单独打包成一个文件
2. `Scope Hoisting`，代码合并到一个函数。
webpack4可以设置`optimization.concatenateModules`
3. `TreeShaking` 可以删除项目中未被引用的代码
Webpack4自动启动这个优化功能