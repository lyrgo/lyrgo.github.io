---
title: ABC461E E-liter
createTime: 2026/07/02 20:24:28
permalink: /blog/atcoder/abc/461/e/
tags:
    - 树状数组
---

## 题解
树状数组好题。  
我们发现，一个格子的颜色取决于它最后被执行的操作，很明显我们不能考虑单个格子，所以考虑行和列。  
设 $row_i$ 表示第 $i$ 行最后被涂黑的时间，$col_i$ 表示第 $i$ 列最后被涂白的时间。  

对于操作一，假设我们操作第 $i$ 行，那么这行里的所有白格数量等于 $\sum_j [col_j\geq row_i]$，也就是这一行上一次涂黑以后经历过涂白的列数。  

对于操作二，假设我们操作第 $i$ 列，那么这列里所有的黑格数量等于 $\sum_j [row_j\geq col_i]$，即这一列上次涂白后经历过涂黑的行数。  

经过这样的转化，我们可以使用两个树状数组维护最后操作时间 $\leq k$ 的列/行个数，用 $n$ 减去这个个数就是答案的变化量。  

## 代码
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

typedef long long LL;

const int N = 3e5+10;

int n , m;
LL c[N] , r[N];
int col[N] , row[N];

inline int lowbit(int x) {
	return x & (-x);
}

void add(LL fen[] , int x , LL y) {
	while(x <= m+1) fen[x] += y , x += lowbit(x);
}

LL query(LL fen[] , int x) {
	LL res = 0;
	while(x) {
		res += fen[x];
		x -= lowbit(x);
	}
	return res;
}

int main() {
	scanf("%d%d" , &n , &m);
	add(c , 1 , n);
	add(r , 1 , n); 
	LL ans = 0;
	for(int t = 1 ; t <= m ; t ++) {
		int opt , x;
		scanf("%d%d" , &opt , &x);
		if(opt == 1) {
			ans += 1ll*n-query(c , row[x]);
			add(r , row[x]+1 , -1);
			add(r , t+1 , 1);
			row[x] = t;
		} else {
			ans -= 1ll*n-query(r , col[x]+1);
			add(c , col[x]+1 , -1);
			add(c , t+1 , 1);
			col[x] = t;
		}
		printf("%lld\n" , ans);
	}
	return 0; 
}
```