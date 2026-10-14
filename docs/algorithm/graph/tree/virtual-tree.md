---
title: 虚树
createTime: 2026/10/14 15:57:31
permalink: /algorithm/graph/virtual-tree/
---

## 简介
虚树是指将询问在树上涉及到的点建出的一棵树，通常在所有询问涉及点数较少时使用。  

## 建图
建图有两种方式：  
1.  利用排序性质：求出原图 DFS 序，然后将关键点按照 DFS 序升序排序，将相邻两个点的 LCA 加入序列，排序去重后，将相邻点后一个连向其 LCA 即可。  
2.  利用排序、DFS 序、单调栈性质：首先按照 DFS 排好序，假设当前栈顶为 $x$、次顶为 $y$，当前需要放入 $z$，那么当 $y\geq lca$ 时，添加边 $y\rightarrow x$，然后弹出 $x$，直到 $y<lca$，此时若 $x=lca$，将 $z$ 入栈；否则添加边 $lca\rightarrow x$，然后把顶从 $x$ 换成 $lca$，再加入 $z$。如果最后有多余的点，直接按照 $y\rightarrow x$ 连边，最后剩下的点就是虚树根节点。  