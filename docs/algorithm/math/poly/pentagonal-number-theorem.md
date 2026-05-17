---
title: 五边形数定理
createTime: 2026/05/14 19:16:07
permalink: /algorithm/math/poly/pentagonal-number-theorem/
---

## 前置知识
[普通生成函数](./ogf.md){.readmore}  

## 引入
考虑一个问题，如果有体积为 $1,2,\cdots,n$ 的物品，数量无限，求装满容量 $n$ 的方案数。  
显然考虑生成函数：
$$
P(x) = \left( \frac{1}{1-x} \right) \left( \frac{1}{1-x^2} \right) \left( \frac{1}{1-x^3} \right) \cdots = \prod_{i=1}^\infty \frac{1}{1-x^i}
$$
这样子无法处理，将分母乘到左边：
$$
P(x)\cdot\prod_{i=0}^\infty(1-x^i)=1
$$
做到这一步，我们需要考虑 $\prod_{i=0}^\infty(1-x^i)$ 能展开出什么，也就跟五边形数定理有关了。  

## 五边形数
考虑一个边长为 $n$ 的五边形，内嵌边长为 $n-1,n-2,\cdots$ 的五边形，容易看出，有 $p_n=p_{n-1}+3n-2$，进而有：$p_n=\frac{3n^2-n}2$，这就是五边形数的通项公式。  

## 广义五边形数
我们已经考虑过 $n\in\mathbb {N^*}$ 的情况了，如果将其扩展到整数域，会不会有什么美妙的性质呢？  
显然是有的，将 $n$ 按照 $0,1,-1,2,-2,\cdots$ 的顺序带入，便能得到广义五边形数的数列。  

## 五边形数定理
欧拉发现：
$$
\prod_{i=1}^\infty (1 - x^i) = \sum_{k=-\infty}^{\infty} (-1)^k x^{\frac{3k^2 - k}{2}} = 1 - x - x^2 + x^5 + x^7 - x^{12} - x^{15} + \cdots
$$
证明笔者也不会，不过有个 [visit_world](https://blog.csdn.net/visit_world/article/details/52734860) 大佬的链接。  

## 应用
回归到刚才的问题，我们实际要求的是 $x^n$ 项的系数，考虑将五边形数定理带入，将 $P(x)$ 乘到右边，得到：
$$
P_n = P_{n-1} + P_{n-2} - P_{n-5} - P_{n-7} + \cdots
$$
由于五边形数是 $O(n^2)$ 的级别，所以只需要查表 $O(\sqrt n)$ 个转移即可。  