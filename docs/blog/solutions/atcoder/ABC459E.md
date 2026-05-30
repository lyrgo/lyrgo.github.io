---
title: ABC459E Select from Subtrees
createTime: 2026/05/30 10:24:34
permalink: /blog/atcoder/abc459/e/
tags:
    - 树形DP
    - 数学
---

## 题目大意
给你一棵有 $n$ 个节点的树，$1$ 号点为根节点，每个节点有 $c_i$ 个糖果（所有糖果不互相同），且有一只松鼠，它需要在这颗子树中选出 $d_i$ 个糖果，两种方案互不相同当且仅当选出的糖果或拿糖果的松鼠不同，求方案数。  

数据范围：$2\leq n\leq 2\times 10^5,\; 1\leq c_i\leq 10^9,\; \sum d_i\leq 10^6$。  

## 题解
很明显的树形 DP，考虑 $f_u$ 为当前子树答案。  
令 $sd_u$ 为子树 $u$ 中 $d_i$ 之和，$sc_u$ 同理，对于所有子节点 $v_i$，有：
$$
f_u=\binom{sc_u-sd_u+d_u}{d_u}\times \prod f_v
$$
可以理解为从选剩下的糖果中再选 $d_u$ 个。  

此时有一个问题，左边的组合数怎么算？$c_u$ 是 $10^9$ 级别的，$sc_u$ 就能达到 $10^{14}$，考虑把它拆开：
$$
\binom{sc_u-sd_u+d_u}{d_u}=\frac{(sc_u-sd_u+d_u)!}{(sc_u-sd_u)!\times d_u!}
$$
题目条件中有一个 $\sum d_i\leq 10^6$，结合上面的阶乘，容易发现括号中只有 $d_u$ 项，完全可以现场跑一遍，至于 $\frac{1}{d_u!}$，预处理即可。  

## 代码
``` cpp :collapsed-lines
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

typedef long long LL;

const int N = 2e5+10 , D = 1e6+10;
const int MOD = 998244353;

int n;
int h[N] , e[N] , ne[N] , idx;
LL c[N] , d[N] , sc[N] , sd[N];
LL fac[D] , inv[D];
LL f[N];

void add(int a , int b) {
	e[idx] = b , ne[idx] = h[a] , h[a] = idx ++;
}

LL qmi(LL a , LL b) {
	LL res = 1;
	while(b) {
		if(b & 1) res = res*a%MOD;
		a = a*a%MOD; b >>= 1;
	}
	return res;
}

void dfs(int u) {
	sc[u] += c[u];
	sd[u] += d[u];
	f[u] = 1;
	for(int i = h[u] ; ~i ; i = ne[i]) {
		int v = e[i];
		dfs(v);
		sc[u] += sc[v];
		sd[u] += sd[v];
		f[u] = f[u]*f[v]%MOD;
	}
	if(d[u] <= sc[u]-sd[u]+d[u]) {
		for(LL x = sc[u]-sd[u]+1 ; x <= sc[u]-sd[u]+d[u] ; x ++)
			f[u] = f[u]*(x%MOD)%MOD;
		f[u] = f[u]*inv[d[u]]%MOD;
	} else f[u] = 0;
}

int main() {
	scanf("%d" , &n);
	memset(h , -1 , sizeof h);
	for(int v = 2 ; v <= n ; v ++) {
		int u; scanf("%d" , &u);
		add(u , v);
	}
	int maxd = 0;
	for(int i = 1 ; i <= n ; i ++) scanf("%lld" , &c[i]);
	for(int i = 1 ; i <= n ; i ++)
		scanf("%lld" , &d[i]) , maxd = max(maxd , (int)d[i]);
	
	fac[0] = 1;
	for(int i = 1 ; i <= maxd ; i ++)
		fac[i] = fac[i-1]*i % MOD;
	inv[maxd] = qmi(fac[maxd] , MOD-2);
	for(int i = maxd-1 ; i >= 0 ; i --)
		inv[i] = inv[i+1]*(i+1)%MOD;
	
	dfs(1);
	printf("%lld\n" , f[1]);
	return 0;
}
```
~~一个取模没写调了半个多小时~~