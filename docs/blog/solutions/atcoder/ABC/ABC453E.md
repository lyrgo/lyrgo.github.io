---
title: ABC453E Team Division
createTime: 2026/07/08 15:14:12
permalink: /blog/atcoder/abc/453/e/
tags:
    - 组合计数
---

## 题解
由于只有两个队伍，我们考虑枚举 $A$ 队 $i$ 人，$B$ 队 $n-i$ 人，此时我们把人分成四种：  
1.  两个队都不能去。  
2.  只能去 $A$ 队。  
3.  只能去 $B$ 队。  
4.  两个队都能去。  

由于每个人对人数的要求 $1\leq x<n$，所以我们考虑差分数组 $a,b,c$，其中 $a$ 表示**能去** $A$ 队的，$b$ 表示**能去** $B$ 队的，$c$ 表示都可以去的。  
对于一个人的要求 $(l,r)$，我们将 $a[l],b[n-r]$ 加 $1$，$a[r+1],b[n-l+1]$ 减 $1$，若 $\max(l,n-r)\leq \min(r,n-l)$，则对 $c$ 做一样的处理。  

全部进行一遍前缀和之后，我们考虑统计答案：  
若 $(a[i]+b[i]-c[i]\neq n)\vee (a[i]-c[i]>i)\vee (b[i]-c[i]>n-i)$，则当前情况无解。  
否则，我们将 $c[i]$ 中选出 $i-(a[i]-c[i])$ 填补 $A$ 队空位，此时 $B$ 队选择唯一，所以相乘即为 $\binom{c[i]}{i-a[i]+c[i]}$。  

## 代码
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

typedef long long LL;

const int N = 2e5+10;
const LL MOD = 998244353;

int n;
LL a[N] , b[N] , c[N];
LL fac[N] , inv[N];

LL qpow(LL a , LL b) {
	LL res = 1;
	while(b) {
		if(b & 1) res = res * a % MOD;
		a = a * a % MOD; b >>= 1;
	}
	return res;
}

void init() {
	fac[0] = 1;
	for(int i = 1 ; i < N ; i ++) {
		fac[i] = fac[i-1] * i % MOD;
	}
	inv[N-1] = qpow(fac[N-1] , MOD-2);
	for(int i = N-2 ; i >= 0 ; i --) {
		inv[i] = inv[i+1] * (i+1) % MOD;
	}
}

LL getC(LL n , LL m) {
	if(m > n || m < 0) return 0;
	return fac[n] * inv[m] % MOD * inv[n-m] % MOD;
}

int main() {
	init();
	
	scanf("%d" , &n);
	for(int i = 1 ; i <= n ; i ++) {
		int l , r; scanf("%d%d" , &l , &r);
		a[l] ++; a[r+1] --;
		b[n-r] ++; b[n-l+1] --;
		if(max(l , n-r) <= min(r , n-l))
			c[max(l,n-r)] ++, c[min(r,n-l)+1] --;
	}
	for(int i = 1 ; i <= n ; i ++)
		a[i] += a[i-1] , b[i] += b[i-1] , c[i] += c[i-1];
	
	LL ans = 0;
	for(int i = 1 ; i <= n-1 ; i ++) {
		if(a[i] + b[i] - c[i] == n && a[i]-c[i] <= i && b[i]-c[i] <= n-i)
			ans = (ans + getC(c[i] , i-a[i]+c[i])) % MOD;
	}
	printf("%lld\n" , ans);
	return 0;
}
```