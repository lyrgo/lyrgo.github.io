---
title: 狄利克雷卷积
createTime: 2026/07/30 14:16:41
permalink: /algorithm/math/number-theory/dirichlet/
---

## Dirichlet 卷积
对于两个数论函数 $f(n),g(n)$，其 Dirichlet 卷积记作 $f*g$，定义为数论函数：
$$
(f*g)(n)=\sum_{d\mid n} f(d)g\left(\frac nd\right)
$$

利用 Dirichlet 卷积，我们可以得到许多数论函数的性质：
-   单位函数 $\varepsilon$ 是莫比乌斯函数 $\mu$ 和常数函数 $1$ 的 Dirichlet 卷积：
    $$
    \varepsilon = \mu * 1 \iff \varepsilon(n) = \sum_{d|n} \mu(d)
    $$
-   除数个数函数 $\tau$ 是常数函数 $1$ 和它自身的 Dirichlet 卷积：
    $$
    \tau = 1 * 1 \iff \tau(n) = \sum_{d|n} 1
    $$
-   除数和函数 $\sigma$ 是恒等函数 $\text{id}$ 和常数函数 $1$ 的 Dirichlet 卷积：
    $$
    \sigma = \text{id} * 1 \iff \sigma(n) = \sum_{d|n} d
    $$
-   欧拉函数 $\varphi$ 是恒等函数 $\text{id}$ 和莫比乌斯函数 $\mu$ 的 Dirichlet 卷积：
    $$
    \varphi = \text{id} * \mu \iff \varphi(n) = \sum_{d|n} d \cdot \mu\left(\frac{n}{d}\right)
    $$
