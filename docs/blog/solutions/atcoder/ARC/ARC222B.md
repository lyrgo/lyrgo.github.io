---
title: ARC222B Circular RPS
createTime: 2026/06/24 19:50:55
permalink: /blog/atcoder/arc/222/b/
tags:
    - 分类讨论
---

## 题目大意
有一场石头剪刀布比赛，$a$ 个人出石头，$b$ 个人出剪刀，$c$ 个人出布，且这 $a+b+c$ 个人**围成一圈**。  
一个人属于获胜者，当且仅当满足以下条件之一：
*   他出的是石头，两边的人都出剪刀。  
*   他出的是剪刀，两边的人都出布。  
*   他出的是布，两边的人都出石头。  

求本场比赛最多有多少获胜者。  

**多组测试数据**。  
数据范围：$1\leq T\leq 5\times 10^5,\; 0\leq a,b,c\leq 10^9,\; 3\leq a+b+c$。  

## 题解
不妨根据获胜者中有几种手势进行讨论，令 $x,y,z$ 分别表示石头、剪刀、布的获胜者数量。  

1.  获胜者中只有一种手势。  
    这里我们以获胜者都出 A 为例，显然至少需要 $x+1$ 个 B 包裹 A 才能使 A 全部获胜，也就是说答案为 $\max(a,b-1)$，其他情况同理。  
2.  获胜者中有两种手势。  
    以 A、B 两种手势为例，由于使 A 获胜的 B 和获胜的 B 不能共用，显然有如下约束：
    $$
    \begin{cases}
    a\geq x \\
    b\geq x+y+1 \\
    c\geq y+1
    \end{cases}
    $$
    将第一个约束与第三个约束相加，容易得到最终答案为 $\min(a+c-1,b-1)$，其他情况同理。  
3.  获胜者中三种手势都有。  
    与 $2$ 同理，显然有如下约束：
    $$
    \begin{cases}
    a\geq x+z+1 \\
    b\geq x+y+1 \\
    c\geq y+z+1 \\
    \end{cases}
    $$
    由于这种情况的约束为 $x,y,z\geq 1$，我们将 $1$ 拆出来，即令 $x'=x-1,\; y'=y-1,\; z'=z-1$。  
    接下来，将 $x',y',z'$ 带入约束，将其两两相加与全部相加，得到：
    $$
    x' + y' + z' \leq \min \left( a + b - 6, \, a + c - 6, \, b + c - 6, \, \left\lfloor \frac{a + b + c - 9}{2} \right\rfloor \right)
    $$
    所以答案为：
    $$
    3 + \min \left( a + b - 6, \, a + c - 6, \, b + c - 6, \, \left\lfloor \frac{a + b + c - 9}{2} \right\rfloor \right)
    $$

除了这三种情况，还有一种：如果两个手势各占总人数一半，那么此时答案为其中一个手势，具体可以看下面代码中高亮部分。  
讨论完了，只需要把上面所有情况取最大值，时间复杂度 $O(1)$。  

## 代码
``` cpp{24-28} :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

typedef long long LL;

void solve() {
	LL a , b , c;
	scanf("%lld%lld%lld" , &a , &b , &c);
	LL ans = 0;
	ans = max(ans , min(a , b-1)); 
	ans = max(ans , min(b , c-1)); 
	ans = max(ans , min(c , a-1));
	ans = max(ans , min(a+c-1 , b-1));
	ans = max(ans , min(a+b-1 , c-1));
	ans = max(ans , min(c+b-1 , a-1));
	if(a >= 3 && b >= 3 && c >= 3)
		ans = max(ans , 3+min({a+b-6 , a+c-6 , b+c-6 , (a+b+c-9)/2}));
	
	if((a+b+c) % 2 == 0) {
		if(a == b && c == 0) ans = max(ans , a);
		if(b == c && a == 0) ans = max(ans , b);
		if(c == a && b == 0) ans = max(ans , c);
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