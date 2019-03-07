---
layout: post
title: BFC
date:   2019-03-05
categories: JavaScript 
---

块格式化上下文（Block Formatting Context）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

下面的方式会创建块格式化上下文：
- 根元素或者包含根元素的元素
- 浮动元素（浮动不是none）
- 绝对定位元素（元素的position为absolute或fixed）
- 行内块元素（元素的display为inline-block）
- 表格单元格（table-cell）、表格标题（table-caption）、row、tbody、thead、tfoot 或 inline-table
- overflow不为visible的元素
- display为flow-root的元素
- display为flex或者grid的直接子元素
- 多列容器

块格式上下文对于浮动定位与清除浮动都很重要。浮动定位和清除浮动只会应用于同一个BFC的元素。外边距折叠也只会发生在属于同一BFC的块级元素之间。