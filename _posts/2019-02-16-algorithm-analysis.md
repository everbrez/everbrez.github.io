---
layout: post
title:  alogrithm analysis
date:   2019-02-16
categories: algorithm
---

定义：
- 如果存在正常数c和n0，使得当 N >= n0 时，T(N) <= f(N)，则记为 T(N) = O(f(N))
- 如果存在正常数c和n0，使得当 N >= n0 时，T(N) >= g(N)，则记为 T(N) = Ω(g(N))
- T(N) = θ(f(N)) 当且仅当 T(N) = O(f(N)) 且 T(N) = Ω(g(N))
- 如果T(N) = O(f(N)) 且 T(N) != θ(f(N))，则记为 T(N) = o(f(N))

当我们说 `T(N) = O(f(N))` 时候，我们保证 T(N) 是以不快于 f(N) 的速度增长，因此 f(N) 是 T(N) 一个上界

法则：
- 如果 T1(N) = O(f(N)) 且 T2(N) = O(g(N))，则：
  - T1(N) + T2(N) = max(f(N) + g(N))
  - T1(N) * T2(N) = O(f(N) * g(N))
- 如果 T(N) 是一个k次多项式，则 T(N) = θ(N^k)
- 对任意常数k，(logN)^k = O(N)

时间分析一般法则
- for 循环：一次for循环的运行时间至多是该for循环内语句（包括测试）的运行时间乘以迭代的次数
- 嵌套的for循环：相乘
- 顺序语句：相加
- If、else语句：求MAX


对数
如果一个算法用常数时间 O(1) 将问题的大小削减为其一部分（通常是二分之一），那么该算法就是 O(logN)