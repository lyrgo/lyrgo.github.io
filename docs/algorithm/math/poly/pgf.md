---
title: 概率生成函数
createTime: 2026/05/17 10:23:30
permalink: /algorithm/math/poly/pgf/
---

## 定义
对于一个取非负整数的随机变量 $X$,定义其概率生成函数为：
$$
F(x) = \sum_{n=0}^\infty P(X = n)x^n
$$

## 性质
1.  由于所有情况概率总和为 $1$，即 $F(1)=1$。  
2.  求导等于期望。  
    考虑 $F$ 的一阶导数：
    $$
    F'(x) = \sum_{n=1}^\infty nP(X = n)x^{n-1}
    $$
    再次带入 $x=1$：
    $$
    F'(1) = \sum_{n=1}^\infty nP(X = n) = E(X)
    $$