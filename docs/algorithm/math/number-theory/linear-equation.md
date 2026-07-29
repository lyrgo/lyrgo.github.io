---
title: 线性同余方程
createTime: 2026/07/29 15:10:21
permalink: /algorithm/math/linear-equation/
---

## 定义
对于整数 $a,b,m$ 和未知数 $x$，形如 $ax\equiv b\pmod m$ 的方程称为线性同余方程。  

## 求解
### 不定方程
显然，我们可以将其写作 $a\cdot x+m\cdot y=b$，令 $g=\gcd(a,m)$。  
-   若 $g\neq 1$，原方程无解。  
-   否则求出一组可行解 $x_0,y_0$，则其通解为 $x=x_0+\frac m g\times t$，也就是说，在 $[0,m)$ 范围内，共有 $g$ 个不同的解。  