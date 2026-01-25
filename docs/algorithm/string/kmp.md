---
title: KMP
createTime: 2026/01/23 21:21:57
permalink: /algorithm/string/kmp/
---

## 简介
KMP 是一个可以高效处理字符串匹配问题的算法。

## 实现
KMP 优化匹配主要在于对模式串的处理，令 $next_i$ 表示模式串的第 $i$ 为时的**最长匹配的前后真子串长度**。  
听起来很拗口，实际上就是一个字符串非本身的前后最大匹配长度。  
怎么预处理这玩意呢？考虑当前已经处理过 $next_1\sim next_{i-1}$，需要处理 $next_i$。  
当 $s_{ next_{i-1}+1 } = s_i$ 时，很明显 $next_i=next_{i-1}+1$。  
否则，需要寻找更小的 $next$，令 $j=i-1$，只需要让 $j=next_j$ 即可。  
::: details 证明
$$
\overbrace{\underbrace{\bullet ~ \bullet}_1 \bullet ~ \cdots ~ \bullet ~ \underbrace{\bullet ~ \bullet}_2}^{next_i} ~ \dots ~ \overbrace{\bullet ~ \bullet ~ \cdots \underbrace{\bullet ~ \bullet}_3}^{next_i}
$$
容易发现，在 $next$ 的定义中，区间 $1$ 和 $3$ 实际就是 $next_{i-1}$，又因为在 $next_i$ 定义中，区间 $2$ 和 $3$ 相等，所以区间 $1$ 和 $2$ 相等，也就是 $next_{i-1}$。  
:::
在查询时，我们对匹配串从前往后进行匹配，每次把模式串指针进行跳转即可。

## 模板
``` cpp
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

const int N = 1e5+10 , M = 1e6+10;

int n , m;
char a[N] , b[M];
int ne[N];

int main() {
	scanf("%d" , &n); scanf("%s" , a+1);
	scanf("%d" , &m); scanf("%s" , b+1);
	
	for(int i = 2 , j = 0 ; i <= n ; i ++) {
		while(j && a[j+1] != a[i]) j = ne[j];
		if(a[j+1] == a[i]) j ++;
		ne[i] = j;
	}
	
	for(int i = 1 , j = 0 ; i <= m ; i ++) {
		while(j && a[j+1] != b[i]) j = ne[j];
		if(a[j+1] == b[i]) j ++;
		if(j == n) {
			printf("%d " , i-n);
			j = ne[j];
		}
	}
	return 0;
}
```