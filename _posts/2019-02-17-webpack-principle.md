---
layout: post
title: webpack principle
date:   2019-02-17
categories: javascript
---

1. 使用Babel转换代码，分析文件中的dependencies，转换代码code，返回对象。（parseCode）
2. 利用parseCode处理入口文件，然后根据dependencies中的依赖，寻找出所有依赖之后返回一个依赖数组（处理依赖的时候处理依赖的路径）
3. 打包功能：将文件利用CommonJS的语法进行打包