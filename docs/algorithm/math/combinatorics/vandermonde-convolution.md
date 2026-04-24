---
title: 范德蒙德卷积
createTime: 2026/04/24 20:02:59
permalink: /algorithm/conbinatorics/vandermonde-convolution/
---

## 范德蒙德卷积公式
$$
\sum^n_{i=0} \binom{n}{i}\times\binom{m}{k-i}=\binom{n+m}{k}
$$
::: details 证明
**二项式定理**证明：
$$
\begin{aligned}
\sum_{k=0}^{n+m}\binom{n+m}{k}\times x^k & = (x+1)^{n+m} \\
& = (x+1)^n+(x+1)^m \\
& = \left(\sum_{r=0}^n\binom{n}{r}\times x^r\right)\times\left(\sum_{s=0}^m\binom{m}{s}\times x^s\right) \\
& = \sum_{k=0}^{n+m}\sum_{r=0}^k\binom{n}{r}\times\binom{m}{k-r}\times x^k \\
\end{aligned}
$$
其中最后一步可以理解为：$x^k$ 的系数只能由 $x^r\times x^s$ 而来（这里 $r+s=k$），所以 $x^k$ 的系数即为 $\binom{n}{r}\times\binom{m}{k-r}$。  
最后两边同时脱去一层求和及 $x^k$ 即可。  

**组合意义**证明：  
考虑从 $n+m$ 个物品中取 $k$ 个，即为 $\binom{n+m}{k}$。  
同时，考虑将这些物品分为两组，前 $n$ 个一组，后 $m$ 个一组，从第一组中取 $i$ 个，第二组中取 $k-i$ 个，然后对 $i$ 求和，即为 $\sum\limits_{k=0}^{n+m}\binom{n+m}{k}\times x^k$。  
:::