---
title: 广义二项式定理
createTime: 2026/05/12 19:37:16
permalink: /algorithm/math/combinatorics/generalized-binomial-theorem/
---

## 简介
广义二项式定理是二项式定理在负整数域的推广，即：
$$
(1-x)^{-n} = \sum_{k=0}^{\infty} \binom{n+k-1}{k} x^k
$$

## 前置知识
[麦克劳林展开](/algorithm/math/poly/ogf/#麦克劳林展开){.readmore}

## 证明
令 $f(x)=(1-x)^{-n}$，将 $x=0$ 带入其 $k$ 阶导数，提取其常数项：
$$
f^{(k)}(0)=n(n+1)\cdots(n+k-1)
$$
将麦克劳林展开公式带入，得到：
$$
a_k = \frac{f^{(k)}(0)}{k!} = \frac{n(n+1)\cdots(n+k-1)}{k!} = \binom{n+k-1}{k}
$$
由此，我们得到了广义二项式定理。  