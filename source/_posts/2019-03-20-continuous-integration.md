---
layout: post
title: Continuous Integration
date:   2019-03-20
categories: test
tags: test CI
---

CI 是一种软件开发实践，它是指频繁地将代码集成到仓库，然后通过自动构建验证每一个集成
<!--more-->

好处有：

1. 可以快速发现错误。每完成一点就更新，集成到主干，可以快速发现错误
2. 防止分支大幅偏离主干。如果不是经常继承，主干又在不断更新，会导致以后集成的难度变大，甚至难以集成。

目的：让产品快速迭代，同时还能够保持高质量。
核心措施：代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。

工作原理
![CI](/assets/images/ci.png)

1. 开发者向代码仓库提交代码，commit
2. 代码仓库会触发CIbuild，向CI server发出信号
3. CI server根据设定的任务来运行测试
4. 部署，artifacts

[circleci-deploy-to-GitHub-Pages](https://circleci.com/blog/deploying-documentation-to-github-pages-with-continuous-integration/)