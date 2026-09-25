---
title: 2-SAT
createTime: 2026/08/24 16:13:36
permalink: /algorithm/graph/2-sat/
---

给出 $n$ 个布尔变量 $x_i$，以及 $m$ 个条件。  
每个条件形如 $(i,a,j,b)$，表示 $x_i$ 为 $a$ 或 $x_j$ 为 $b$ **至少有一个**成立。  
需要判断是否有解，若有，给出一组合法构造。  

为了方便，以下规定 $x_i$ 表示第 $i$ 个变量为真，$\neg x_i$ 表示第 $i$ 个变量为假。  
不难发现，条件其实跟推导差不多，也就是说，对于条件 $(1,1,2,1)$，可以得到 $\neg x_1\rightarrow x_2,\neg x_2\rightarrow x_1$。  
运用这种限制的思想进行建图，得到一张有向图。  
对于任何无解的情况，一定是因为 $x_i\rightarrow \cdots \rightarrow \neg x_i$ 且 $\neg x_i\rightarrow \cdots \rightarrow x_i$，也就是说，可以对原图的所有强连通分量进行判断，如果 $x_i$ 和 $\neg x_i$ 在同一个分量中，则无解。  
一种合法构造是，对于每个 $x_i,\neg x_i$，看它们所在联通块在拓扑排序中哪个更靠后取哪个。  

::: tip 构造合法证明
构造一定满足个 $x_i$ 只有一种取值，而在原图中，其实建图是对称的，也就是说如果 $x_i$ 和 $x_j$ 在同一个块里，则 $\neg x_i$ 和 $\neg x_j$ 在同一个块里。  
接下来，我们以 $x_1$ 或 $x_2$ 为例，若取 $\neg x_1$，怎么说明一定会取 $x_2$？由于 $\neg x_1\rightarrow x_2$，且 $\neg x_2\rightarrow x_1$，也就是说 $x_2$ 在 $\neg x_1$ 后面，$\neg x_2$ 在 $x_1$ 前面，又因为 $x_1$ 在 $\neg x_1$ 前面，即 $x_2$ 在 $\neg x_2$ 后面。  
:::