---
title: ABC459F -1, +1
createTime: 2026/05/31 09:04:31
permalink: /blog/atcoder/abc459/f/
tags:
    - Trick
---

## 题目大意
有一个长度为 $n$ 的非负整数序列 $a$，可以进行任意多次操作，每次操作选择一个 $a_i$ 并将 $a_i\leftarrow a_i-1,\; a_{i+1} \leftarrow a_{i+1}+1$，求使 $a_i$ 严格单调递增的最小操作次数。  
**多组测试数据**。  

数据范围：$1\leq T\leq 3\times 10^5,\; 1\leq n\leq 2\times 10^5,\; \sum n\leq 6\times 10^5,\; 0\leq a_i\leq 10^9$。  

## 题解
::: tip 技巧
由于需要 $a$ 严格单调递增，考虑 $a_i\leftarrow a_i-i$，只需要使更改后 $a_i\geq 0$ 即可。  
:::
为了求最小操作次数，我们需要寻找一种表示方式，注意到如果现在的 $a_i$ 进行一次操作后其前缀和 $s_i\leftarrow s_i-1$，其余不变，所以答案可以表示为：
$$
\sum s_i-s_i'
$$
我们需要最大化 $\sum s_i$，但是有一个限制条件：原数组 $a_i$ 严格单调递增意味着现在的 $a_i$ 要单调不降，进而 $s_i$ 需要满足下凸包性质，考虑如何处理。  

考虑 $i-s_i$ 图像，对于这个图像的下凸包而言，每个整数 $i$ 对应的凸包上的纵坐标值可能不是整数，怎么办？显然，我们要将下凸包上每个边的斜率都变成整数。  
对于一条边，设其横坐标**长度**为 $\Delta x$，纵坐标**长度**为 $\Delta y$，显然存在整数 $k$ 使得 $k\leq \frac{\Delta y}{\Delta x}\leq k+1$，那么有：
$$
\begin{aligned}
kt+(\Delta x-t)\cdot (k+1) &=\Delta y \\
\Delta x\cdot k+\Delta x-t &=\Delta y \\
t &= \Delta x\cdot (k+1)-\Delta y
\end{aligned}
$$
显然 $t>0$，也就是说我们能把原来的边拆成两条斜率为整数的边，做完了。  

## 代码
注意，由于 $a_i-i$ 可能小于 $0$，所以向上平移 $n$。  
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

typedef long long LL;

const int N = 2e5+10;

int n;
LL a[N] , s[N];
LL g[N] , f[N];

void solve() {
	scanf("%d" , &n); LL ans = 0;
	for(int i = 1 ; i <= n ; i ++) {
		scanf("%lld" , &a[i]);
		a[i] += n-i;
		s[i] = s[i-1]+a[i];
		ans += s[i];
	}
	
	int tt = 1;
	for(int i = 1 ; i <= n ; i ++) {
		while(tt > 1 && (s[g[tt]]-s[g[tt-1]])*(i-g[tt]) >= (s[i]-s[g[tt]])*(g[tt]-g[tt-1])) tt --;
		g[++ tt] = i;
	}
	
	for(int i = 1 ; i < tt ; i ++) {
		LL dx = g[i+1]-g[i] , dy = s[g[i+1]]-s[g[i]];
		LL k = dy/dx; LL t = dx*(k+1)-dy;
		
		if(dy % dx == 0) t = dx;
		for(int j = 1 ; j <= dx ; j ++) {
			f[g[i]+j] = f[g[i]+j-1]+k+(j>t);
		}
	}
	
	for(int i = 1 ; i <= n ; i ++) {
		ans -= f[i];
		s[i] = g[i] = f[i] = 0; 
	}
	printf("%lld\n" , ans);
	return;
}

int main() {
	int T; scanf("%d" , &T);
	while(T --) solve();
	return 0;
}
```