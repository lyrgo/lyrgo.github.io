---
title: 裴蜀定理
createTime: 2026/04/26 11:20:00
permalink: /algorithm/math/number-theory/bezouts/
---

## 裴蜀定理
对于不全为 $0$ 的整数 $a,b$，方程 $ax+by=c$ 有整数解的充要条件是 $\gcd(a,b)\mid c$。  
推论：
*   $ax+by=\gcd(a,b)$ 一定有整数解。  
*   $a$ 与 $b$ 互质等价于 $ax+by=1$ 有整数解。

::: details 证明
**最小数原理**证明：  
令集合 $S=\{ax+by\mid x,y\in \mathbb Z,ax+by>0\}$。  
显然 $S$ 非空（取 $x=\pm 1$ 一定有一个成立），设其中最小元素 $d=ax_0+by_0$。  
接下来证明 $d$ 为 $a,b$ 公约数，令 $a=dq+r\ (q\in \mathbb Z,0\leq r<d)$，则有 $r=a-dq=a-(ax_0+by_0)q=(1-qx_0)a+(-qy_0)b$，所以 $r$ 也是 $a,b$ 的线性组合，若 $r>0$，则 $r\in S$ 与 $r<d$ 矛盾，因此 $r=0$，即 $d\mid a$，同理可证 $d\mid b$。  
然后证明 $d$ 为最大公因数，令 $g=\gcd(a,b)$，则 $d\leq g$，又因为 $g|a$ 且 $g|b$，则 $g$ 整除任意 $a,b$ 的线性组合，即 $g\mid d$，因此 $g\leq d$。  
综上， $g=d$，证毕。  
:::

## Frobenius 硬币问题
给定两个互质的正整数 $a$ 和 $b$，对于方程 $ax+by=c\ (x,y\geq 0 )$：
1.  最大的不能表示的数是 $ab-a-b$。  
2.  不能表示的数一共有 $\frac{(a-1)(b-1)} 2$ 个？

<!-- ::: details $1$ 证明 -->
问题可以转换为，求最大的 $n$ 使得 $ax+by=n$ 中 $(x,y)$ 无非负整数解。  
将其放到同余系中，即 $n\equiv by\pmod a$。  
此时由于 $\gcd(a,b)=1$，当 $y\in [0,a)$ 时，所有的 $by$ 刚好为 $a$ 的完全剩余系。（可以证明两两互不同余，从而得出完全剩余系的结论）  
也就是说，$\forall r\in [0,a)$，$\exist y\in [0,a)$ 使得 $by\equiv r\pmod a$。  

<!-- ::: -->

<!-- ::: details $2$ 证明 -->

<!-- ::: -->