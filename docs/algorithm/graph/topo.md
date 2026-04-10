---
title: 拓扑排序
createTime: 2026/04/10 19:19:52
permalink: /algorithm/graph/topo/
---

## 简介
没什么好说的，拓扑排序是求 DAG 中的一个点列，使得只有从前向后的连边。  
基本步骤就是先求度数，BFS 一遍原图即可，如果要求字典序，只需要把队列换成优先队列即可，证明略。  

## 例题
### Acwing 1191. 家谱树{#acwing-1191}
<LinkCard title="Acwing 1191. 家谱树" href="https://www.acwing.com/problem/content/1193/">

模板题。  

</LinkCard>

### Acwing 1192. 奖金{#acwing-1192}
<LinkCard title="Acwing 1192. 奖金" href="https://www.acwing.com/problem/content/1194/">

一眼望去，是一个差分约束问题，可以用差分约束或者强连通分量求。  
但是，相比于那些题，这道题严格规定了每条边边权为 $1$，这也就支持我们使用更简单的方法。  
在强连通分量中，如果环中有一条边权为正则无解，这里是有环则无解。  
显然，求最小值，我们要跑最长路。  

</LinkCard>

### Acwing 164. 可达性统计{#acwing-164}
<LinkCard title="Acwing 164. 可达性统计" href="https://www.acwing.com/problem/content/166/">

显然，这是一道类似 DP 的图论题，设 $f_i$ 表示从 $i$ 可以到达的所有点。  
令 $E_i$ 为 $i$ 的所有儿子，则显然有 $f_i=\left\{i\right\}\cup\left(\bigcup_{j\in E_i}f_j\right)$。  
按照逆拓扑序进行转移即可。  

</LinkCard>

### Acwing 456. 车站分级{#acwing-456}
<LinkCard title="456. 车站分级" href="https://www.acwing.com/problem/content/458/">

首先需要注意到：如果一个火车停靠序列为 $a$，则不在序列 $a$ 中的其他车站级别一定严格小于这个序列中的任意一个火车站。  
也就是说，每个火车相当于 $n^2$ 条边，我们要求的其实与第二道例题类似，也就是最大值的最小值。  
但是，如果直接建图，会导致 TLE+MLE，考虑优化。  
由于只需要不在区间内的点小于区间内的点，可以建立 $m$ 个虚拟点，每次只需要让不在区间内的连长度为 $0$ 的边，在区间内的连长度为 $1$ 的边即可。  

</LinkCard>