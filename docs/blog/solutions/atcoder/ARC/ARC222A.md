---
title: ARC222A Colorful Intervals
createTime: 2026/06/24 19:08:40
permalink: /blog/atcoder/arc/222/a/
tags:
    - 构造
---

## 题目大意
给定一个 $n$，要求你构造一个正整数序列 $A$ 满足 $m$ 条限制，每条限制形式为 $(l_i,r_i)$，要求为 $A_{l_i}\sim A_{r_i}$ 每个数字互不相同。  

**多组测试数据**。  
数据范围：$1\leq T\leq 10^5,\; 1\leq n\leq 2\times 10^5,\; 1\leq m\leq 2\times 10^5,\; \sum n\leq 2\times 10^5,\; \sum m\leq 2\times 10^5$。  

## 题解
已经没有人类了。  
显然答案有一个下界 $k=\max(r_i-l_i+1)$，考虑以下构造：$1,2,3,\cdots,k,1,2,3,\cdots k,\cdots$，显然满足题目要求。  
所以 $k$ 就是答案。  

## 代码
``` cpp
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

void solve() {
	int n , m;
	scanf("%d%d" , &n , &m);
	int ans = 0;
	while(m --) {
		int l , r;
		scanf("%d%d" , &l , &r);
		ans = max(ans , r-l+1);
	}
	for(int i = 1 ; i <= n ; i ++)
		printf("%d " , i%ans+1);
	puts("");
	return;
}

int main() {
	int T; scanf("%d" , &T);
	while(T --) solve();
	return 0;
}
```