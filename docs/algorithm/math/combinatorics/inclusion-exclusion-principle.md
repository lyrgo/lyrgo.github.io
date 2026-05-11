---
title: 容斥原理
createTime: 2026/05/10 11:28:37
permalink: /algorithm/math/combinatorics/inclusion-exclusion-principle/
---

## Max-min 容斥
### 最大值形式
$$
\max S=\sum_{\substack{T\subseteq S \\ T\neq \varnothing}}(-1)^{|T|+1}\min T
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

### K 大值形式
额外的，Max-min 容斥还有第 $k$ 大形式，即：
$$
\text{kthmax}(S)=\sum_{\substack{T\subseteq S \\ {|T|\geq k}}}(-1)^{|T|-k}\binom{|T|-1}{k-1}\min T
$$
::: details 证明
设原集合 $S$ 中元素为 $b_1\leq b_2\leq\cdots\leq b_n$，第 $k$ 大即为 $b_{n-k+1}$，取元素 $b_j$，考虑 $\min T=b_j$ 的系数。  
包含 $b_j$ 且要求从后 $m=n-j$ 个元素中取出 $T$，设后方取 $t$ 个元素，则 $|T|=t+1$，要求 $|T|\geq k$，则其总系数和为：
$$
\sum_{t=k-1}^m\binom{m}{t}(-1)^{t+1-k}\binom{t}{k-1}
$$
令 $r=k-1$，上式化为：
$$
(-1)^{1-k}\sum_{t=r}^m(-1)^t\binom m t\binom t r
$$
利用组合恒等式，上式右侧 $\sum_{t=r}^m(-1)^t\binom m t\binom t r=(-1)^r\binom m r 0^{m-r}$。  
*   若 $m>r$，系数为 $0$。
*   若 $m=r$，系数为 $(-1)^{1-k}\cdot(-1)^{k-1}=1$。  

综上，总和刚好为 $b_{n-k+1}=\text{kthmax}(S)$。  
:::

### 期望形式
由于期望的线性性，如果 $S$ 中全为随机变量 $X_i$，可以得到：
$$
\text{E}(\max_i X_i)=\sum_{\varnothing\neq T\subseteq\{1,\cdots, n\}}(-1)^{|T|+1}\text{E}(\min_{i\in T}X_i)
$$
同理，也可以得到 K 大值的期望形式。  