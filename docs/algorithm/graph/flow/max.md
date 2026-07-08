---
title: 最大流
createTime: 2026/07/05 10:32:14
permalink: /algorithm/graph/flow/max/
---

## Edmonds-Karp 算法
EK 算法的根本是一直迭代寻找增广路径，直到找不到为止。  
具体算法流程：  
1.  寻找增广路（BFS）。  
2.  更新残留网络（BFS 记录路径）。  

时间复杂度 $O(nm^2)$，虽然看着很高，但跑的很快，能到 $n+m=10^4$ 左右。  

模板：
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

const int N = 1e3+10 , M = 2e4+10 , INF = 0x3f3f3f3f;

int n , m , S , T;
int h[N] , e[M] , ne[M] , w[M] , idx; 
int q[N] , d[N] , pre[N];
bool st[N];

void add(int a , int b , int c) {
	w[idx] = c , e[idx] = b , ne[idx] = h[a] , h[a] = idx ++;
	w[idx] = 0 , e[idx] = a , ne[idx] = h[b] , h[b] = idx ++;
}

bool bfs() {
	memset(st , false , sizeof st);
	int hh = 0 , tt = 0;
	q[0] = S; st[S] = true; d[S] = INF;
	while(hh <= tt) {
		int t = q[hh ++];
		for(int i = h[t] ; ~i ; i = ne[i]) {
			int j = e[i];
			if(st[j] || w[i] <= 0) continue;
			st[j] = true;
			d[j] = min(d[t] , w[i]);
			pre[j] = i;
			if(j == T) return true;
			q[++ tt] = j;
		}
	}
	return false;
}

int EK() {
	int r = 0;
	while(bfs()) {
		r += d[T];
		for(int i = T ; i != S ; i = e[pre[i]^1]) {
			w[pre[i]] -= d[T]; w[pre[i]^1] += d[T];
		}
	}
	return r;
}

int main() {
	scanf("%d%d%d%d" , &n , &m , &S , &T);
	memset(h , -1 , sizeof h);
	for(int i = 1 ; i <= m ; i ++) {
		int u , v , c; scanf("%d%d%d" , &u , &v , &c);
		add(u , v , c);
	}
	
	printf("%d\n" , EK());
	return 0;
}
```

## Dinic 算法
Dinic 算法与 EK 算法的本质是相同的，都是寻找增广路，但 EK 算法每次只找一条，导致效率较低，Dinic 解决了这个问题。  
具体流程：  
1.	跑 BFS，确认当前是否存在增广路。  
2.	跑 DFS，将当前所有找到的增广路加入答案。  

以此往复，直到没有增广路即可，其中有几个比较重要的优化：  
*	**分层图优化**：将原图构建成分层图，避免因为环导致的复杂度错误。  
*	**当前弧优化**：将每个点现在用到的边标记，下次再找这个点直接用下一个边。  
*	在 DFS 时，如果已经达到前面能够支持的流量就不再找别的增广路，直接返回。  

``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

const int N = 1e4+10 , M = 2e5+10;
const int INF = 0x3f3f3f3f;

int n , m , S , T;
int h[N] , e[M] , ne[M] , w[M] , idx;
int q[N] , d[N] , cur[N]; 

void add(int a , int b , int c) {
	w[idx] = c , e[idx] = b , ne[idx] = h[a] , h[a] = idx ++;
	w[idx] = 0 , e[idx] = a , ne[idx] = h[b] , h[b] = idx ++;
}

int find(int u , int limit) {
	if(u == T) return limit;
	int flow = 0;
	for(int i = cur[u] ; ~i && flow < limit ; i = ne[i]) {
		cur[u] = i;
		int ver = e[i];
		if(d[ver] == d[u] + 1 && w[i]) {
			int t = find(ver , min(w[i] , limit-flow));
			if(!t) d[ver] = -1;
			flow += t; w[i] -= t; w[i^1] += t;
		}
	}
	return flow;
}

bool bfs() {
	memset(d , -1 , sizeof d);
	int hh = 0 , tt = 0;
	q[tt] = S; d[S] = 0; cur[S] = h[S];
	while(hh <= tt) {
		int t = q[hh ++];
		for(int i = cur[t] ; ~i ; i = ne[i]) {
			int ver = e[i];
			if(d[ver] == -1 && w[i]) {
				d[ver] = d[t] + 1;
				cur[ver] = h[ver];
				if(ver == T) return true;
				q[++ tt] = ver;
			}
		}
	}
	return false;
}

int dinic() {
	int r = 0 , flow;
	while(bfs()) while(flow = find(S , INF)) r += flow;
	return r;
}

int main() {
	memset(h , -1 , sizeof h);
	scanf("%d%d%d%d" , &n , &m , &S , &T);
	while(m --) {
		int a , b , c;
		scanf("%d%d%d" , &a , &b , &c);
		add(a , b , c);
	}
	
	printf("%d\n" , dinic());
	return 0;
}
```

## 做题方法
对于给出题目中的每一种可行方案，我们需要一一对应地构造出可行流，并且证明它的容量限制和流量守恒。  

## 常见转换
### 无源汇上下界可行流
给出一张无向图，每条边都有流量下界和流量上界，求一种满足流量守恒的方案。  
我们先添加源点 $S$ 和汇点 $T$，由于每个边都有下界，实际原图可行流 $f$ 每条边的流量应满足 $c_l(u,v)\leq f(u,v)\leq c_u(u,v)$，其中 $c_l$ 表示下界，$c_r$ 表示上界。  
由于我们只能处理下界为 $0$ 的边，所以考虑同时减去下界，得到 $0\leq f(u,v)-c_l(u,v)\leq c_u(u,v)-c_l(u,v)$，从而我们得到 $f'(u,v)=f(u,v)-c_l(u,v),\; c'(u,v)=c_u(u,v)-c_l(u,v)$。  
但是，这样处理以后不能保证流量守恒，我们对于一个点 $x$ 进行分析：从 $x$ 流出的容量下界为 $c_{out}=\sum_{v\in V}c_l(x,v)$，流入的容量下界为 $c_{in}=\sum_{u\in V}c_l(u,x)$，此时 $c_{out}$ 和 $c_{in}$ 等价于 $x$ 少进入、流出的量，也就是说，若 $c_{in}>c_{out}$，此时流量不守恒，$x$ 仍需要 $c_{in}-c_{out}$，我们需要补齐这部分流量（若 $c_{out}>c_{in}$ 同理）。  
怎么补齐呢？我们可以从源点 $S$ 单独拉一根流量为 $c_{in}-c_{out}$ 的管子，相当于补齐了这部分流量差距，也就满足了流量守恒。（如果 $c_{out}>c_{in}$，那么向 $T$ 扯管子）  
有了这些，可以证明原网络的可行流与新网络的最大流一一对应。  

代码片段：  
``` cpp :collapsed-lines
void add(int a , int b , int c , int d) {
	w[idx] = d-c , l[idx] = c , e[idx] = b , ne[idx] = h[a] , h[a] = idx ++;
	w[idx] = 0 , e[idx] = a , ne[idx] = h[b] , h[b] = idx ++;
}

int main() {
	memset(h , -1 , sizeof h);
	scanf("%d%d" , &n , &m);
	S = 0; T = n+1;
	for(int i = 1 ; i <= m ; i ++) {
		int a , b , c , d;
		scanf("%d%d%d%d" , &a , &b , &c , &d);
		add(a , b , c , d);
		A[b] += c; A[a] -= c;
	}
	
	int tot = 0;
	for(int i = 1 ; i <= n ; i ++) {
		if(A[i] > 0) {
			add(S , i , 0 , A[i]);
			tot += A[i];
		} else if(A[i] < 0) {
			add(i , T , 0 , -A[i]);
		}
	}
	
	if(dinic() != tot) puts("NO");
	else {
		puts("YES");
		for(int i = 0 ; i < m*2 ; i += 2) {
			printf("%d\n" , w[i^1]+l[i]);
		}
	}
	return 0;
}
```

### 有源汇上下界最大流
给定一个流网络 $G$，其中每条边都有流量下界与上界，且有源点 $s$ 和汇点 $t$，求 $G$ 从 $s$ 到 $t$ 的最大可行流。  
和上一道题类似，但是增加了有源汇点、求最大流两个限制，我们一个个看。  

考虑怎么将有源汇的图变成无源汇的图，由于除了源点和汇点以外，其余所有点流量守恒，且源点的流出量和汇点的流入量相等，我们可以从 $t$ 向 $s$ 连一条容量为 $+\infty$ 的边，此时 $s$ 和 $t$ 也就满足了容量限制。  

再来看求最大流，一个比较直觉的做法是，我们按照无源汇上下界可行流的建图方式，建立出 $G'$ 和源汇点 $S,T$，然后对 $G'$ 跑最大流，求出从 $S$ 到 $T$ 的一个满流 $f'$，最后对 $f'$ 对应的残留网络 $G_{f'}$ 跑最大流，求出从 $s$ 到 $t$ 的最大流，然后还原回去。  
这个做法~~乍一看~~是正确的，可是如何证明呢？  

::: tip 证明
我们设原图 $G$ 有一个可行流 $f_0$，按照我们的构造方式，可以得到其对应的新图的满流 $f_0'$，并且由于 $f_0'$ 是从 $S$ 到 $T$ 的满流，它一定有一部分流过 $s\rightarrow t$，我们记这部分流量为 $f_{0,s\rightarrow t}'$，现在我们证明对于任意从 $s$ 到 $t$ 的可行流 $f_{s\rightarrow t}'$，其与 $G$ 的可行流一一对应。  

先证从 $f_{s\rightarrow t}'$ 可以对应到 $G$ 的一个可行流 $f_0$：  
我们观察 $|f_{s\rightarrow t}'+f_0'|$，容易发现 $f_{s\rightarrow t}'$ 不会向 $S$ 和 $T$ 走，因为 $S,T$ 的所有边都已满，并且如果走会导致流量不守恒，所以 $f_{s\rightarrow t}'$ 与 $S,T$ 无关，也就是说，$f_{s\rightarrow t}'$ 中只有 $s,t$ 流量不守恒，我们让其从 $t\rightarrow s$ 流回来，再叠加一个流量守恒的 $f_0'$，一定会得到 $G'$ 的一个满流，也就对应着原图的一个可行流。  

再证明从 $G$ 的一个可行流 $f$ 对应到一个 $f_{s\rightarrow t}'$：  
首先我们将 $f$ 对应到 $G'$ 的一个满流 $f'$，我们来观察 $|f'-f_0'|$（注意此处的 $f_0'$ 为特定的一个满流），容易发现，由于都是满流，它们与 $S,T$ 有关的边都已满，它们相减剩下的与 $S,T$ 无关，也就是说它是从 $s\rightarrow t$ 的一个可行流。  
:::

有了这个证明，我们得到 $|f_{0,s\rightarrow t}'+f_{s\rightarrow t}'|$ 可以转换为原图的可行流，由于 $|f_{0,s\rightarrow t}'|$ 固定，所以只要 $|f_{s\rightarrow t}'|$ 取最大即可得到最大流。  

### 有源汇上下界最小流
有了有源汇上下界最大流的铺垫，我们很容易发现，只要让 $|f_{s\rightarrow t}'|$ 最小即可，也就是从 $t$ 到 $s$ 的最大流。  