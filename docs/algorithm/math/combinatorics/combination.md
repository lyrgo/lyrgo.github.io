---
title: 排列组合
createTime: 2026/04/24 19:40:17
permalink: /algorithm/combinatorics/combination/
---

## 曲棍球棒定理
$$
\sum^n_{i=x} \binom{i}{x}=\binom{n+1}{x+1}
$$

::: details 证明
由组合数学基本公式：$\binom{i}{x}=\binom{i}{x-1}+\binom{i-1}{x-1}$，可以将其中每一项拆开后按顺序合并即可。
:::

## 二项式反演
二项式反演类似容斥原理的代数形式，一般用于从好求的计数推出不好求的计数。（~~怎么这么废话~~）

### 形式一
$$
g(n) = \sum_{i=0}^n \binom{n}{i} f(i) \iff f(n) = \sum_{i=0}^n\binom{n}{i}  (-1)^{n-i} g(i)
$$
我们假设有若干个条件，那么 $f(i)$ 表示**恰好满足 $i$ 个条件的方案数**、$g(n)$ 表示**满足若干个条件的总方案数**。  
::: note 推导过程
考虑将 $g$ 带入右侧，进行代数变化得到二项式定理，所以：
$$
\sum_{i=0}^n\binom{n}{i}  (-1)^{n-i} \sum_{i=0}^n \binom{n}{i} f(i)
$$
交换求和次序，得到：
$$
\sum_{j=0}^n f(j) \sum_{i=j}^n (-1)^{n-i} \binom{n}{i} \binom{i}{j}
$$
将后面的组合数合并，并将与 $i$ 无关的放到前面，得到：
$$
\sum_{j=0}^n f(j)\binom{n}{j} \sum_{i=j}^n (-1)^{n-i} \binom{n-j}{i-j}
$$
注意到出现了很多 $n-i$、$i-j$ 类似状物，考虑换元，令 $k=i-j$，则当 $i\in [j,n]$ 时，$k\in [0,n-j]$，则：
$$
\sum_{j=0}^n f(j)\binom{n}{j} \sum_{k=0}^{n-j} (-1)^{n-j-k} \binom{n-j}{k}
$$
我们将内层提出一个 $(-1)^{n-j}$，并使用二项式定理：
$$
\begin{aligned}
&\sum_{j=0}^n f(j)\binom{n}{j}(-1)^{n-j}\sum_{k=0}^{n-j} (-1)^k \binom{n-j}{k} \\
&=\sum_{j=0}^n f(j)\binom{n}{j}(-1)^{n-j}(1-1)^{n-j}
\end{aligned}
$$
注意到 $(1-1)^{n-j}$ 当且仅当 $n=j$ 时为 $1$，否则为 $0$，所以整个求和只剩下 $n=j$ 时的值，即：
$$
(*)=f(n)
$$
原式得证。  
:::

### 形式二
$$
g(n) = \sum_{i=n}^N \binom{i}{n} f(i) \iff f(n) = \sum_{i=n}^N (-1)^{i-n} \binom{i}{n} g(i)
$$
推导和上面类似，我就不写文字了。
::: note 推导过程
$$
\begin{aligned}
(*) &= \sum_{i=n}^{N} (-1)^{i-n} \binom{i}{n} \sum_{j=i}^{N} \binom{j}{i} f(j) \\
&= \sum_{j=n}^{N} f(j) \sum_{i=n}^{j} (-1)^{i-n} \binom{i}{n} \binom{j}{i} \\
&= \sum_{j=n}^{N} f(j) \binom{j}{n} \sum_{i=0}^{j-n} \binom{j-n}{i} (-1)^i \\
&= \sum_{j=n}^{N} f(j) \binom{j}{n} (-1)^{j-n} \\
&= f(n)
\end{aligned}
$$
:::