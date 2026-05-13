---
title: 卡特兰数
createTime: 2026/05/13 19:55:15
permalink: /algorithm/math/combinatorics/catalan/
---

## 简介
卡特兰数 $C_n$ 的递推定义如下：
$$
C_n=
\begin{cases}
1, & n=0, \\
\sum_{i=0}^{n-1} C_iC_{n-1-i} , & n>0.
\end{cases}
$$

## 封闭形式与展开
注意到若 $n>0$，则 $C_n=\sum_{i=0}^{n-1} C_iC_{n-1-i}$ 这个式子满足离散卷积定义，也就是说，这个函数生成函数内部发生了自身相乘，将自身卷积序列写出：
$$
C(x)^2 = \sum_{n=0}^\infty \left( \sum_{i=0}^n C_i C_{n-i} \right) x^n = \sum_{n=0}^\infty C_{n+1} x^n
$$
将其两边同时乘以 $x$ 并构造一元二次方程，得到 $xC(x)^2-C(x)+1=0$，利用求根公式后发现需要取负号（正号会导致分子趋近于 $2$，分母趋近于 $0$ 从而无穷大），进而有：
$$
C(x) = \frac{1 - \sqrt{1 - 4x}}{2x}
$$
这就是卡特兰数的封闭形式，将其利用广义二项式定理展开后，可以得到：
$$
C_n = \frac{1}{n+1} \binom{2n}{n}
$$
这就是其通项公式。  

## 其他形式
*   利用递推式和通项公式，将 $C_n$ 与 $C_{n-1}$ 对比，可以得到：
    $$
    C_n=C_{n-1}\cdot\frac{4n-2}{n+1}
    $$
*   从路径计数问题，可以得到：
    $$
    C_n=\binom{2n}{n}-\binom{2n}{n+1}
    $$