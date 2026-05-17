---
title: 指数生成函数
createTime: 2026/05/17 09:09:40
permalink: /algorithm/math/poly/egf/
---

## 引入
在普通生成函数的组合问题中，我们只是简单的将重量相加，没有考虑顺序的问题，如果想从 $A$ 中选若干个不同的物品，$B$ 中选若干个不同的物品将其排成一列该怎么办呢？  

## 定义
对于一个离散的序列 $a$，我们定义它的指数生成函数为：
$$
A(x) = \sum_{n=0}^\infty a_n \frac{x^n}{n!} = a_0 + a_1 \frac{x}{1!} + a_2 \frac{x^2}{2!} + \dots
$$

## 乘法运算
如果将 EGF $A$ 和 $B$ 相乘，会怎么样呢：
$$
A(x)B(x) = \left( \sum_{i=0}^\infty a_i \frac{x^i}{i!} \right) \left( \sum_{j=0}^\infty b_j \frac{x^j}{j!} \right)
$$
考虑 $i+j=n$：
$$
\sum_{i=0}^n \frac{a_i}{i!} \frac{b_{n-i}}{(n-i)!} x^n = \sum_{i=0}^n \left( \frac{n!}{i!(n-i)!} a_i b_{n-i} \right) \frac{x^n}{n!} = \sum_{i=0}^n \binom{n}{i} a_i b_{n-i} \frac{x^n}{n!}
$$
也就是说，两个 EGF 相乘会自动附带二项式系数 $\binom n i$ 也就顺带解决了有序合并的穿插问题。

## EGF 与排列组合
-   无限制：  
    $\sum_{n=0}^\infty 1 \cdot \frac{x^n}{n!} = e^x$

-   至少取 1 个（非空）：  
    $\sum_{n=1}^\infty 1 \cdot \frac{x^n}{n!} = e^x - 1$

-   只能取偶数个：  
    利用 $(-x)^n$ 的正负号交替性质消去奇数项。  
    $\frac{e^x + e^{-x}}{2} = 1 + \frac{x^2}{2!} + \frac{x^4}{4!} + \cdots$

-   只能取奇数个：  
    $\frac{e^x - e^{-x}}{2} = \frac{x}{1!} + \frac{x^3}{3!} + \dots$

## EGF 与第二类斯特林数
将 $n$ 个不同的球放入 $k$ 个相同的盒子且没有空盒的方案数成为第二类斯特林数，记作 $\left\{n \atop k\right\}$ 或 $S(n,k)$。  

考虑球相同的一个非空盒子的 EGF 显然是 $e^x-1$，有 $k$ 个盒子则对应的 EGF 应为 $(e^x-1)^k$，又因为盒子不同，所以总生成函数为：
$$
S(x)=\frac{(e^x-1)^k}{k!}
$$

有了生成函数，我们考虑提取 $\frac{x^n}{n!}$ 的系数。  
先用二项式定理展开：
$$
(e^x - 1)^k = \sum_{i=0}^k \binom{k}{i} (e^x)^i (-1)^{k-i}= \sum_{i=0}^k \binom{k}{i} (-1)^{k-i} e^{ix}
$$
将 $e^{ix}$ 用麦克劳林展开：
$$
e^{ix} = \sum_{n=0}^\infty \frac{(ix)^n}{n!} = \sum_{n=0}^\infty i^n \frac{x^n}{n!}
$$
带回原式，得到：
$$
\frac{(e^x - 1)^k}{k!} = \frac{1}{k!} \sum_{i=0}^k \binom{k}{i} (-1)^{k-i} \sum_{n=0}^\infty i^n \frac{x^n}{n!}
$$
交换其中的求和顺序，得到：
$$
\left\{n\atop k\right\} = \frac{1}{k!} \sum_{i=0}^{k} (-1)^{k-i} \binom{k}{i} i^n
$$
这个式子可以 $O(k\log n)$ 处理。  