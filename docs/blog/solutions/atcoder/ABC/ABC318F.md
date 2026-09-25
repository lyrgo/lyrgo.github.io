---
title: ABC318F Octopus
createTime: 2026/09/22 15:32:11
permalink: /blog/atcoder/abc/318/f/
---

<LinkCard title="ABC318F  Octopus"href="https://atcoder.jp/contests/abc318/tasks/abc318_f"/>  

## 题解
考虑怎么判断一个位置合法，可以把到所有宝藏的距离排序，然后贪心匹配即可，可以在 $O(n\log n)$ 时间内完成。  
观察到合法位置应该连成若干个区间，思考发现左端点一定满足某个 $x_i=k-L_j$，右端点一定满足某个 $x_i=k+L_j$。  
这样的话考虑一个套路，把所有端点排序，这样只需要判断所有端点中间的一个点是否满足条件就等价于整个区间是否满足条件。  

## 代码
``` cpp:collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

typedef long long LL;

#define LOCAL
namespace IO {
	#ifndef LOCAL
		#define SIZE (1<<20)
		char in[SIZE] , *p1=in , *p2=in;
		#define getchar() (p1==p2 && (p2=(p1=in)+fread(in,1,SIZE,stdin)) , p1==p2 ? EOF : *p1 ++)
	#endif

	inline LL read() {
		LL x = 0 , f = 1;
		int c = getchar();
		while(c < '0' || '9' < c) {
			if(c == '-') f = -1;
			c = getchar();
		}
		while('0' <= c && c <= '9') {
			x = (x<<3) + (x<<1) + c - '0';
			c = getchar();
		}
		return x*f;
	}

	inline void write(LL x , bool f = true) {
		if(x < 0) x = -x , putchar('-');
		static short stk[30] , top; top = 0;
		do {stk[++ top] = x%10 , x/=10; } while(x);
		while(top) putchar(stk[top --] | '0');
		if(f) putchar('\n');
		else putchar(' ');
	}

	#ifndef LOCAL
		#undef getchar
		#undef SIZE
	#endif
} using namespace IO;

const int N = 210;

int n , cnt;
LL x[N] , l[N];
LL pos[N*N*2] , t[N];

bool check(LL k) {
	for(int i = 1 ; i <= n ; i ++)
		if(x[i] <= k) t[i] = k-x[i];
		else t[i] = x[i]-k;
	sort(t+1,t+n+1);
	for(int i = 1 ; i <= n ; i ++)
		if(l[i] < t[i]) return false;
	return true;
}

int main() {
	n = read();
	for(int i = 1 ; i <= n ; i ++) x[i] = read();
	for(int i = 1 ; i <= n ; i ++) {
		LL p = l[i] = read();
		for(int j = 1 ; j <= n ; j ++)
			pos[++ cnt] = x[j]+p,
			pos[++ cnt] = x[j]-p;
	}
	sort(pos+1 , pos+cnt+1);
	cnt = unique(pos+1 , pos+cnt+1)-pos-1;
	
	LL ans = 0;
	for(int i = 1 ; i < cnt ; i ++) {
		if(check(pos[i]+1)) ans += pos[i+1]-pos[i]-1;
		if(check(pos[i])) ans ++;
	}
	if(check(pos[cnt])) ans ++;
	write(ans);
	return 0;
}
```