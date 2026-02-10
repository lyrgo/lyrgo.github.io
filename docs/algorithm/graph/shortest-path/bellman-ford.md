---
title: BellmanFord
createTime: 2026/02/10 21:42:26
permalink: /algorithm/graph/shortest-path/bellman–ford/
---

## 简介
Bellman-Ford 算法是一个单源最短路算法，其常规实现复杂度为 $O(nm)$。  

## SPFA
SPFA 就是 Bellman-Ford 算法的队列优化，最优时间复杂度 $O(m)$，最坏 $O(nm)$。  

## 判负环
当图中存在负环时，Bellman-Ford 算法中的松弛操作会一直执行，容易发现，如果一个点被松弛大于等于 $n$ 次，就说明存在负环。  
### Acwing 1165. 单词环 {#acwing-1165}
[题目传送门](https://www.acwing.com/problem/content/description/1167/)   
容易发现这是一道图论题，所以我们先考虑建图。
第一反应可能会将每个单词看作一个点，然后进行连边，但 $n$ 是 $1e5$ 级别的，也就是最多有 $1e10$ 条边，很明显不可行。  
由于两位小写字母最多只有 $26^2=676$ 中搭配可能，我们可以将两位小写字母看作点，将单词看做边进行建图，也就是 $n$ 条边，$572$ 个点。  
题目要求我们最大化 $\frac{\sum w_i}{\sum s_i}$，与分数规划形似，所以考虑固定一个值 $mid$，将原式化为：  
$$
\begin{aligned}
& \frac{\sum w_i}{\sum s_i}>mid \\ 
\Leftrightarrow & \sum w_i - mid \times \sum s_i > 0 \\
\Leftrightarrow & \sum\left\{ w_i - mid \times s_i\right\} > 0
\end{aligned}
$$
由于我们将单词看作边，$s_i$ 其实就是经过的边数，上面的式子相当于重新定义了边权（对于一条边来说，$s_i=1$，也就是他的边权为 $w_i-mid$），求有无正环，用 SPFA 处理即可。  