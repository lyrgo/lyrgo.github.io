---
title: 容斥原理
createTime: 2026/05/10 11:28:37
permalink: /algorithm/math/combinatorics/inclusion-exclusion-principle/
---

## Max-min 容斥
$$
\max S=\sum_{T\subseteq S}(-1)^{|T|+1}\min T
$$
::: details 证明
考虑使用排列和组合恒等式证明。  
将 $S$ 中的元素记为 $b_1\leq b_2\leq \cdots\leq b_n$，则 $\max S=b_n$，所以我们需要考察右侧每个 $b_i$ 的总系数是多少。  
对于每个满足 $\min T=b_j$ 的集合 $T$，显然它只能由 $b_j\sim b_n$ 构成，设从 $b_{j+1}\sim b_n$ 中选出 $t$ 个元素，则 $|T|=t+1$ 即 $(-1)^{|T|+1}=(-1)^t$。  
于是 $b_j$ 总系数为：
$$
\sum_{t=0}^{m} \binom{m}{t}(-1)^t=(1-1)^m
$$
其中 $m=n-j$，即从 $b_j\sim b_n$ 中选。  
*   当 $j<n$ 时，$m=n-j>0$，和为 $0$。  
*   当 $j=n$ 时，$m=0$，此时指数 $m$ 不满足二项式定理，即 $1\times (-1)^0=1$。  

因此，总和刚好为 $b_n=\max S$，证毕。  
:::