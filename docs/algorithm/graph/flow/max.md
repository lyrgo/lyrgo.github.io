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

## 