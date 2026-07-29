---
title: 中国剩余定理
createTime: 2026/07/29 15:14:12
permalink: /algorithm/math/crt/
---

## 定义
CRT 用来求解以下形式的一元线性同余方程组：
$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\vdots \\
x \equiv a_k \pmod{m_k}
\end{cases}
$$
CRT 要求所有 $m$ 必须**两两互质**，我们设
$$
P=\prod_{i=1}^k m_i,\; r_i=\frac P {m_i}
$$
显然，$r_i$ 中包含除 $m_i$ 以外的两两互质的质数，即 $\gcd(r_i,m_i)=1$，即 $r_i$ 在模 $m_i$ 意义下有逆元。  
考虑构造 $y_i\equiv a_i\cdot r_i^{-1} \pmod {m_i}$，则 $x_i=y_i\cdot r_i$。  
则 $x_i$ 模 $m_i$ 为 $a_i$，模其他 $m_j$ 都为 $0$，