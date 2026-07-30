---
title: 莫比乌斯反演
createTime: 2026/07/30 14:39:27
permalink: /algorithm/math/number-theory/mobius/
---

## 前置知识
[狄利克雷卷积](/algorithm/math/number-theory/dirichlet.md){.readmore}

## 莫比乌斯函数
莫比乌斯函数定义为：
$$
\mu(n)=
\begin{cases}
1, & n=1, \\
0, & n\text{ 中含有平方因子}, \\
(-1)^k, & n\text{ 能分解为 }k\text{ 个互异素数相乘}.
\end{cases}
$$

根据定义式，我们可以得到一个极其重要的性质：
$$
\sum_{d\mid n}\mu(d)=[n=1]
$$
::: tip 证明
令 $n = \prod_{i=1}^{k} p_i^{e_i},\; n' = \prod_{i=1}^{k} p_i$，根据二项式定理，有

$$
\sum_{d|n} \mu(d) = \sum_{d|n'} \mu(d) = \sum_{i=0}^k \binom{k}{i} (-1)^i = (1 + (-1))^k = [k = 0] = [n = 1]
$$
:::

## 莫比乌斯反演
设 $f(n), g(n)$ 是两个数论函数，则有 
$$
f(n) = \sum_{d|n} g(d) \iff g(n) = \sum_{d|n} \mu \left( \frac{n}{d} \right) f(d)
$$
由于 Dirichlet 卷积并不要求先后顺序，我们还有另一种写法：
$$
g(n) = \sum_{n|d} f(d) \iff f(n) = \sum_{n|d} \mu(\frac{d}{n})g(d)
$$

::: tip 证明（摘自 OI Wiki）
直接验证，有：

$$
\begin{aligned}
\sum_{d|n} \mu \left( \frac{n}{d} \right) f(d) &= \sum_{d|n} \mu \left( \frac{n}{d} \right) \sum_{k|d} g(k) \\
&= \sum_{k|n} g(k) \sum_{d|n} [k \mid d \mid n] \mu \left( \frac{n}{d} \right) \\
&= \sum_{k|n} g(k) \sum_{d|n} \left[ \frac{n}{d} \mid \frac{n}{k} \right] \mu \left( \frac{n}{d} \right) \\
&= \sum_{k|n} g(k) \left[ \frac{n}{k} = 1 \right] \\
&= g(n)
\end{aligned}
$$

式子变形的关键在于交换求和次序，并注意到 $k \mid d \mid n$ 就等价于 $\frac{n}{d} \mid \frac{n}{k}$。倒数第二个等号相当于对 $\frac{n}{k}$ 的因子 $\frac{n}{d}$ 处的莫比乌斯函数求和，所以就等于 $\left[ \frac{n}{k} = 1 \right]$。这一表达式仅在 $n = k$ 处不是 0，最后就会得到 $g(n)$。
:::

