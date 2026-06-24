---
title: ABC460F Farthest Pair Query
createTime: 2026/06/23 18:12:14
permalink: /blog/atcoder/abc/460/f/
tags:
    - 线段树
---

## 题目大意
给你一颗 $n$ 个结点的树，初始时所有节点都是黑色，每次询问反转一个节点的颜色，然后求出两个黑色节点间的最大距离。  

数据范围：$3\leq N\leq 10^5,\; 1\leq Q\leq 10^5$。  

## 题解
看完题目第一反应可能是树形 DP，但是涉及修改，树形 DP 用不了。  
要求所有黑色节点最大距离，这是经典的求树上直径，考虑树的直径的一个性质：如果点集 $A$ 的直径端点为 $p,q$，点集 $B$ 的直径端点为 $s,t$，那么将这两个点集合并后新的直径端点一定包含于 $\{p,q,s,t\}$。  
有了这个性质，考虑使用线段树进行维护，每次取儿子的直径端点然后将这四个点之间距离取最大作为当前的直径端点，只需要实现一下 LCA 即可，注意，白色点与任意点的距离需要设为较小值，如 $-1$。  

## 代码
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

const int N = 1e5+10 , M = 17;

struct Node {
	int l , r;
	int s[2];
};

int n , m;
int h[N] , e[N*2] , ne[N*2] , idx;
int f[N][M] , dep[N];
bool st[N];
Node tr[N*4];

void add(int a , int b) {
	e[idx] = b , ne[idx] = h[a] , h[a] = idx ++;
}

void dfs(int u) {
	for(int i = 1 ; i < M ; i ++) {
		f[u][i] = f[f[u][i-1]][i-1];
	}
	for(int i = h[u] ; ~i ; i = ne[i]) {
		int j = e[i];
		if(j == f[u][0]) continue;
		f[j][0] = u; dep[j] = dep[u]+1;
		dfs(j);
	}
}

int lca(int a , int b) {
	if(a == b) return a;
	if(dep[a] < dep[b]) swap(a , b);
	for(int i = M-1 ; i >= 0 ; i --) {
		if(dep[f[a][i]] >= dep[b]) a = f[a][i];
	}
	if(a == b) return a;
	for(int i = M-1 ; i >= 0 ; i --) {
		if(f[a][i] != f[b][i]) {
			a = f[a][i];
			b = f[b][i];
		}
	}
	return f[a][0];
}

int dis(int a , int b) {
	if(a == -1 || b == -1) return -1;
	return dep[a]+dep[b]-2*dep[lca(a,b)];
}

void pushup(int u) {
	static int tmp[4];
	tmp[0] = tr[u<<1].s[0];
	tmp[1] = tr[u<<1].s[1];
	tmp[2] = tr[u<<1|1].s[0];
	tmp[3] = tr[u<<1|1].s[1];
	
	tr[u].s[0] = tmp[0]; tr[u].s[1] = tmp[1];
	
	if(tmp[2] == -1) return;
	if(tmp[0] == -1) {
		tr[u].s[0] = tmp[2];
		tr[u].s[1] = tmp[3];
	}
	
	int resdis = -1;
	for(int i = 0 ; i < 4 ; i ++) {
		for(int j = 0 ; j < i ; j ++) {
			int t = dis(tmp[i] , tmp[j]);
			if(t > resdis) {
				resdis = t;
				tr[u].s[0] = tmp[i];
				tr[u].s[1] = tmp[j];
			}
		}
	}
//	printf("! %d %d [%d,%d]\n" , tr[u].l , tr[u].r , tr[u].s[0] , tr[u].s[1]);
	return;
}

void build(int u , int l , int r) {
	tr[u].l = l; tr[u].r = r;
	if(l == r) {
		tr[u].s[0] = l;
		tr[u].s[1] = l;
		return;
	}
	
	int mid = (l + r) >> 1;
	build(u<<1 , l , mid);
	build(u<<1|1 , mid+1 , r);
	pushup(u);
}

void modify(int u , int x) {
	if(tr[u].l == tr[u].r) {
		if(st[x]) {
			tr[u].s[0] = x;
			tr[u].s[1] = x;
		} else {
			tr[u].s[0] = -1;
			tr[u].s[1] = -1;
		}
		st[x] ^= 1;
		return;
	}
	
	int mid = (tr[u].l + tr[u].r) >> 1;
	if(x <= mid) modify(u<<1 , x);
	else modify(u<<1|1 , x);
	pushup(u);
}

int main() {
	scanf("%d" , &n);
	memset(h , -1 , sizeof h);
	for(int i = 1 ; i < n ; i ++) {
		int a , b;
		scanf("%d%d" , &a , &b);
		add(a , b); add(b , a);
	}
	dep[1] = 1;
	dfs(1);
	build(1 , 1 , n);
	
	scanf("%d" , &m);
	while(m --) {
		int x; scanf("%d" , &x);
		modify(1 , x);
		printf("%d\n" , dis(tr[1].s[0] , tr[1].s[1]));
	}
	return 0;
}
```