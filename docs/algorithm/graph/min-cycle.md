---
title: 最小环
createTime: 2026/02/01 10:27:57
permalink: /algorithm/graph/min-cycle/
---

## 简介
给定一个图，求包含至少三条边的环的边长最小值。

## Floyd
### 求最小环
根据最小环的定义，其中最少会有三个点。  
在 Floyd 的 $k$ 循环中，未进行第 $k$ 次更新时 $d_{i,j}$ 的含义为：从 $i$ 到 $j$ 只经过编号小于 $k$ 的点的最短路径长度。  
很显然，这个时候可以把环拆成三部分：$d_{i,j}$，$g_{i,k}$，$g_{k,j}$（$g$ 表示原图的边）。  
也就是说，我们只需要对每个点 $k$ 枚举与之有直接连边的 $i$ 和 $j$，就可以得出最小环。  
时间复杂度 $O(n^3)$。

### 记录路径
这个时候的问题转换为，求 $u\rightarrow v$ 最短路径所经过的点（把环拆成两半）。  
因为 $dis_{u,v}\leq dis_{u,k}+dis_{k,v}$，所以只需要记录当初使 $dis_{u,v}=dis_{u,k}+dis_{k,v}$ 成立的 $k$ 即可，即 $k$ 一定在 $u\rightarrow v$ 上。  
然后就可以把路径变成 $u\rightarrow k$ 和 $k\rightarrow v$，分开处理即可。  

### 模板
``` cpp :collapsed-lines
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

typedef long long LL;

const int N = 110;
const int INF = 0x3f3f3f3f;

int n , m;
int g[N][N];
int d[N][N] , pos[N][N];
int path[N] , cnt;

void getPath(int u , int v) {
	if(!pos[u][v]) return;
	
	getPath(u , pos[u][v]);
	path[++ cnt] = pos[u][v];
	getPath(pos[u][v] , v);
}

int main() {
	memset(g , 0x3f , sizeof g);
	scanf("%d%d" , &n , &m);
	while(m --) {
		int u , v , w;
		scanf("%d%d%d" , &u , &v , &w);
		g[u][v] = g[v][u] = min(g[u][v] , w);
	}
	
	int res = INF;
	memcpy(d , g , sizeof g);
	for(int k = 1 ; k <= n ; k ++) {
		for(int i = 1 ; i < k ; i ++)
			for(int j = i+1 ; j < k ; j ++)
				if((LL) res > (LL) d[i][j]+g[i][k]+g[k][j]) {
					res = d[i][j]+g[i][k]+g[k][j];
					cnt = 0;
					path[++ cnt] = k;
					path[++ cnt] = i;
					getPath(i , j);
					path[++ cnt] = j;
				}
		for(int i = 1 ; i <= n ; i ++)
			for(int j = 1 ; j <= n ; j ++)
				if(d[i][j] > d[i][k] + d[k][j]) {
					d[i][j] = d[i][k] + d[k][j];
					pos[i][j] = k;
				}
	}
	
	if(res == INF) puts("No solution.");
	else {
		for(int i = 1 ; i <= cnt ; i ++)
			printf("%d " , path[i]);
		puts("");
	}
	return 0;
}
```