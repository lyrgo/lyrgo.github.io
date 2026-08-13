---
title: 二分图最大匹配
createTime: 2026/08/12 15:25:23
permalink: /algorithm/graph/graph-matching/bigraph-match/
---

## 前置知识
[图匹配](./graph-match.md){.readmore}  


## Kuhn 算法
由于增广路的长度一定为奇数，所以它的两个端点一定分居左右，也就是说我们只需要考虑从左侧出发的增广路。  
Kuhn 算法的流程为，对于每个左边的点，按照**从左到右**走**非匹配边**，**从右到左**走**匹配边**的顺序，到达右部未匹配点时，前驱链即为一条增广路。  
如果找到，我们将这一整条增广路上的边取反，然后继续处理下一个点。  

一次 DFS 复杂度为 $O(|E|)$，至多处理左侧 $|X|$ 个点，时间复杂度 $O(|X|\cdot |E|)$，空间复杂度 $O(|X|+|E|)$，实现的时候记得把点数少的作为 $X$。  

## Hopcroft–Karp 算法
Hopcroft–Karp 算法类似于 Dinic，它一次扩展多条增广路。  

算法流程：  
1.  BFS 建图：  
    -   从所有左侧未匹配点同时开始 BFS，记 $d[u]$ 表示所有左侧未匹配点到 $u$ 最少边数，$l$ 表示 BFS 时首次遇到右侧未匹配点的距离。
    -   保留所有 $d[v]=d[u]+1$ 且 $d[v]\leq l$ 的边，它们构成的分层图的任意一个源点到右侧的路径，都是长度为 $l$ 的增广路。  
2.  DFS 查找：  
    -   标记路径上的所有点，使选出的路径互不相交（可以使用当前弧优化）。  
    -   将所有选择的路径的边反转，完成更新。  

使得 HK 算法正确的根本是一个引理：  
::: note 引理
每执行完一次 BFS，选出长为 $l$ 的增广路后，下一次 BFS 的增广路长度一定大于 $l$。  
:::
::: tip 证明
假设取反后存在一条长度 $\leq l$ 的增广路。  
根据我们的假设，这条增广路一定与我们取反后的路径有交集，即其到达了增广路上的某个点，此时，它仍需要继续走若干步才能使长度为 $l$，则我们可以将原路径从这个交点直接走到最后，使得原来的增广路更短，矛盾。  
:::

事实上，每次 BFS/DFS 的扫描时间复杂度为 $O(\sqrt m)$。  
根据引理，前 $\sqrt n$ 轮执行后，最短增广路长度 $>\sqrt n$，由于接下来每条增广路至少需要有 $\sqrt n$ 个属于当前匹配的边，而它们顶点互不相交，所以最多有 $O(\sqrt n)$ 个这样的分量。  
所以 HK 算法的时间复杂度为 $O(\sqrt n\cdot m)$。

``` cpp:collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

const int N = 1010 , M = 5e4+10;

int n , m , k;
int h[N] , e[M] , ne[M] , idx;
int match[N] , q[N] , cur[N] , d[N];

void add(int a , int b) {
	e[idx] = b , ne[idx] = h[a] , h[a] = idx ++;
}

bool bfs() {
	memset(d , -1 , sizeof d);
	int hh = 0 , tt = -1;
	
	for(int i = 1 ; i <= n ; i ++)
		if(!match[i]) d[i] = 0 , q[++ tt] = i;
	d[0] = -1;
	while(hh <= tt) {
		int t = q[hh ++];
		
		if(d[0] != -1 && d[t] >= d[0]) continue;
		
		for(int i = h[t] ; ~i ; i = ne[i]) {
			int v = e[i];
			if(!match[v]) {
				if(d[0] == -1) d[0] = d[t]+1;
			} else if(d[match[v]] == -1) {
				d[match[v]] = d[t]+1;
				q[++ tt] = match[v];
			}
		}
	}
	
	return d[0] != -1;
}

bool dfs(int u) {
	if(!u) return true;
	
	for(int i = cur[u] ; ~i ; i = ne[i]) {
		cur[u] = i;
		int v = e[i];
		
		if(d[match[v]] == d[u]+1 && dfs(match[v])) {
			match[u] = v; match[v] = u;
			return true;
		}
	}
	
	d[u] = -1;
	return false;
}

int HK() {
	memset(match , 0 , sizeof match);
	
	int r = 0;
	while(bfs()) {
		for(int i = 1 ; i <= n ; i ++)
			cur[i] = h[i];
		for(int i = 1 ; i <= n ; i ++)
			if(!match[i]) r += dfs(i);
	}
	return r;
}

int main() {
	scanf("%d%d%d" , &n , &m , &k);
	memset(h , -1 , sizeof h);
	while(k --) {
		int a , b; scanf("%d%d" , &a , &b);
		add(a , n+b);
	}
	
	printf("%d\n" , HK());
	return 0;
}
```

## König 定理
::: note König 定理
固定最大匹配 $M$，把非匹配边定向为 $X\rightarrow Y$,匹配边定向为 $Y\rightarrow X$，从左侧所有非匹配点出发，设可达点集为 $Z$。  
**二分图**的**最大匹配**大小等于**最小点覆盖**大小，并且一组最小点覆盖为：
$$
C=(X\backslash Z)\cup(Y\cap Z)
$$
:::
::: tip 证明
如果边 $(x,y)$ 未被 $C$ 覆盖，则 $x\in X\cap Z$ 且 $y\in Y\backslash Z$，则 $(x,y)$ 的匹配情况：  
-   若 $(x,y)$ 非匹配，可达性会扩展到 $y$，矛盾。  
-   若 $(x,y)$ 匹配，则到达 $x$ 的交错路必定经过 $y$，矛盾。  

综上，$C$ 覆盖全部边。  
每个匹配边恰好有一个端点在 $C$，即 $|C|=|M|$；任意点覆盖至少为 $M$ 每条边选择一个端点，大小不小于 $|M|$。  

未完工。。。
:::