---
title: 强连通分量
createTime: 2026/03/10 19:55:10
permalink: /algorithm/graph/connectivity/scc/
---

## 简介
[强连通分量基础概念](../concept.md#连通性定义){.readmore}
了解完概念，我们来考虑一下怎么判断一个点在 SCC 中，容易发现，有以下情况：  
1.  有一个返祖边可以到达它的祖先。
2.  有一个横插边指向的节点在 SCC 中。

综合以上两种情况，我们可以创造出 Tarjan 来处理 SCC 求解。  

## Tarjan 求 SCC
首先需要一个 DFS 序记作 $dfn_i$，令 $low_i$ 表示 $i$ 能够到达的所有节点中，$dfn$ 的最小值。  
很明显，当一个点 $u$ 的 $dfn_u=low_u$ 时，$u$ 是 $u$ 所在 SCC 的最高点。  
我们还需要一个栈，其中装着所有当前遍历过的点（有一些会被出栈），当 $u$ 为 SCC 最高点时，只需要从栈中一直弹出直到弹出了一个 $u$ 为止，这些节点即为一个 SCC。  

求完了 SCC，一般会有一个**缩点**步骤，即将一整个 SCC 看作一个点，然后整张图会变成一个 DAG。  
如果你在 DFS 中，先搜儿子再将自己放进一个序列中，会发现这个序列是原图的拓扑排序的倒序，观察一下 Tarjan 你会发现，我们将每个 SCC 看作一个点，也是先遍历别的 SCC 在将自己放进 SCC 的计数器中，也就是说，这个计数器的倒序就是一个 SCC 的拓扑排序。  

## 例题
### Acwing 1174. 受欢迎的牛{#acwing-1174}
<LinkCard title="Acwing 1174. 受欢迎的牛" href="https://www.acwing.com/problem/content/1176/">

读完题目，暴力做法显然是 $O(n\times (n+m))$ 的，不能通过此题。  
考虑一下这道题的性质，发现如果原图是一张 DAG 的话，一定会有一个（些）出度为 $0$ 的边，这些点之间一定互相存在不喜欢的牛，也就是如果有不止一个出度为 $0$ 的点，答案就是 $0$；否则就是这个点内所有的点数。  
所以我们可以使用 Tarjan 然后看看有几个出度为 $0$ 的点，进行一下判断即可做到 $O(n+m)$ 复杂度。  

</LinkCard>

### Acwing 367. 学校网络{#acwing-367}
<LinkCard title="Acwing 367. 学校网络" href="https://www.acwing.com/problem/content/369/">

第一问很好解决，对于第二问，我们考虑将 DAG 的每个终点（出度为 $0$ 的点）和每个起点（入度为 $0$ 的点）一一配对，容易发现，答案就是终点与起点个数最大值。  

</LinkCard>

### Acwing 1175. 最大半连通子图{#acwing-1175}
<LinkCard title="Acwing 1175. 最大半连通子图" href="https://www.acwing.com/problem/content/1177/">

简单理解一下题意，会发现在同一个 SCC 中的点一定是半联通的，而将原图进行缩点以后最大半连通子图则是新的 DAG 中最长的链。  
方案数如何统计？设 $f_i$ 表示到当前点 $i$ 的经过图大小和，$g_i$ 表示使 $i$ 取到最大值的方案数。  
设 $j$ 为 $i$ 在 DAG 中的一个前驱，若 $f_j+s_i>f_i$，令 $f_i=f_j+s_i$，$g_i=g_j$；若 $f_j+s_i=f_i$，令 $g_i=g_i+g_j$。  

</LinkCard>

### Acwing 368. 银河{#acwing-368}
<LinkCard title="Acwing 368. 银河" href="https://www.acwing.com/problem/content/description/370/">

第一眼，是差分约束模板题，但是数据范围比较大，SPFA 容易被卡，有什么办法呢？  
可以用强连通分量求，具体过程如下：  
1.  做一遍 Tarjan，进行缩点，建出 DAG。
2.  问题转换为在 DAG 上求最长路，按照 SCC 的逆顺序跑一边递推即可。

为什么是对的？由于边权非负，并且是要找有无正环，这个时候只要一个环里面有一个 $>0$ 的边，就无解，然后进行递推即可。  

</LinkCard>