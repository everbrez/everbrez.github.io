---
layout: post
title: Machine Learning
date:   2019-10-15
categories: AI
tags: AI
---

机器学习有多种定义。

# Definition

Arthur Samuel 的定义(old, informal)

> the field of study that gives computers the ability to learn without being explicitly programmed.

Tom Mitchell 的定义

> A computer program is said to learn from experience E with repect to some class of tasks T and performance measure P, if it's performance at tasks in T, as measured by P, improves with experience E.

例如： 下棋
E: 与众多棋手下棋的经验
T: 下棋
P: 下一局赢的概率

通常，机器学习可以分成两大类：

1. 监督学习(supervised learning)
2. 无监督学习(unsupervised learning)

可以通俗地理解上面两个概念：
监督学习是在人或者其他的帮助下学习，无监督学习是让机器自己学习。

# 两种主要的机器学习算法

## 监督学习(supervised learning)

在监督学习中，我们已经有一份知道了“正确答案”的数据集，认为输入与输出存在一个关系。也就是说，在监督学习中，我们首先会告诉机器正确答案（定义中的E）

监督学习可以分成：回归问题和分类问题

例子：预测房价、标记垃圾邮件

## 无监督学习(unsupervised learning)

无监督学习让我们无需知道结果是什么样子，即使我们不知道变量具体的作用，我们可以通过无监督学习来获取数据不同结构（聚类算法）

例子：谷歌新闻分类、鸡尾酒宴会
