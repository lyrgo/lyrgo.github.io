---
title: 带修莫队
createTime: 2026/08/27 18:47:36
permalink: /algorithm/misc/mo-algo/modifiable/
---

## 简介
很简单，加一个修改操作。  

## 流程
多一个修改操作可以看作二维平面，横轴是序列，纵轴是时间。  
显然我们可以对横轴分块，对 $l,r$ 的块编号排序，相同块内按照时间排序。  

不妨设块长 $S$。  
$l$ 在块内最多移动 $S$ 格，$m$ 个询问则块内移动 $O(S\cdot m)$ 次，一共 $\frac n S$ 块，相邻两块最多移动 $2S$ 格，加起来就是 $O(S\cdot m+n)$。  
$t$ 在同一对 $l,r$ 编号时单调递增，只有切换不同块时进行大量移动，也就是 $O(T\cdot \frac n S\cdot \frac n S)$（其中 $T$ 是修改次数）。  
$r$ 在块内移动 $O(S\cdot m)$，共有 $\frac n S$ 块，由于 $l$ 有 $\frac n S$ 种取值， 移动最坏 $O(n)$，总复杂度 $O(S\cdot m+\frac {n^3}{S^2})$。  
假设 $n,m,T$ 同阶，视作 $N$，则总复杂度为 $O(N\cdot S+\frac{N^3}{S^2})$，取 $S=N^{2/3}$ 最优，复杂度约为 $O(N^{5/3})$。  
