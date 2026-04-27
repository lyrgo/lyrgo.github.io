---
title: ABC455E Unbalanced ABC Substrings
createTime: 2026/04/27 19:29:46
permalink: /blog/atcoder/455/e/
tags:
    - 容斥原理
---

## 题目大意
给定一个由 `A`、`B`、`C` 构成的字符串 $s$，问其中有多少三个字母出现次数各不相同的字串。  

## 题解
显然考虑容斥，我们以 `A`、`B` 为例。  
考虑进行前缀和，记为 $A_i$、$B_i$，出现次数相同等价于 $A_r-A_{l-1}=B_r-B_{l-1}\Leftrightarrow A_r-B_r=A_{l-1}=B_{l-1}$，也就是说我们可以用一个桶 $cnt_i$ 表示 $A_x-B_x=i$ 的个数，每次先更新答案再更新桶即可。  

容易发现，互不相同的方案数等价于字串数量减两两相等数量加上两倍三个相等的方案数。  

## 代码
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <map>

using namespace std;

typedef pair<int,int> PII;
typedef long long LL;

const int N = 2e5+10;

int n;
char s[N];
int c1[N*2] , c2[N*2] , c3[N*2];
map<PII , int> c4;

int main() {
	scanf("%d%s" , &n , s+1);
	int a = 0 , b = 0 , c = 0;
	LL res = 1ll*n*(n+1)/2;
	c1[N] = c2[N] = c3[N] = 1;
	c4[make_pair(0,0)] = 1;
	for(int i = 1 ; i <= n ; i ++) {
		if(s[i] == 'A') a ++;
		if(s[i] == 'B') b ++;
		if(s[i] == 'C') c ++;
		
		res -= c1[a-b+N];
		res -= c2[b-c+N];
		res -= c3[a-c+N];
		res += 2ll*c4[make_pair(a-b,b-c)];
		
		c1[a-b+N] ++;
		c2[b-c+N] ++;
		c3[a-c+N] ++;
		c4[make_pair(a-b,b-c)] ++;
	}
	printf("%lld\n" , res);
	return 0;
}
```