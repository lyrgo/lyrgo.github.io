---
title: 双连通分量
createTime: 2026/03/26 19:19:09
permalink: /algorithm/graph/connectivity/dcc/
---

## 简介
[双连通分量基础概念](../concept.md#连通性定义){.readmore}

## 边双连通分量
定义 $dfn$ 表示 DFS 序，$low$ 表示以当前点向下走能够到达的最小 $dfn$。  
对应有向图强连通分量的定义，会发现没有横插边这种东西（无向图边是双向的），所以我们可以直接考虑怎么求桥。  
具体的，如果一个节点 $x$ 能到它的一个儿子节点 $y$，想要判断 $x\rightarrow y$ 是否是桥，只需要看 $y$ 能否到达 $x$ 或者 $x$ 的祖先，即它是否在一个包含 $x$ 的环里（$low_y\leq dfn_x$）。  
如何统计所有双连通分量？显然，可以使用一个栈，每次将新节点放进栈中，如果一个点 $x$ 的 $dfn_x=low_x$，说明它无法走到祖先上，即它所有还在栈里的儿子和他自己是一个双连通分量（**此时 $x$ 与其祖先之间的边为一个桥**）。  

## 例题
### Acwing 395. 冗余路径{#acwing-395}
<LinkCard title="Acwing 395. 冗余路径" href="https://www.acwing.com/problem/content/397/">

容易发现，任意两点间存在两条不同边的路径等价于整个图是一个边双连通分量。  
将原图进行缩点，令缩点后所有度数为一的点个数为 $cnt$，答案即为 $\left\lfloor \frac{cnt+1}{2} \right\rfloor$。  
为什么？可以将所有度数为一的点左右两端一一连边，中间如果有单独的一个就随便连一个度数为一的点即可。  

</LinkCard>