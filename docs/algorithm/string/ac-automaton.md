---
title: AC 自动机
createTime: 2026/01/25 14:03:49
permalink: /algorithm/string/ac-automaton/
---

## 前置知识
[KMP](./kmp.md){.readmore}  

## 简介
~~并不是自动 AC 机。~~  
这是一个多模态字符串匹配用的算法，和 KMP 一样，不过可以支持多个模式串。

## 实现
AC 自动机是基于 Trie 和 KMP 的，可以看作在 Trie 上进行 KMP。  
KMP 中 $next$ 数组的定义是：在 $1\sim i$ 中真前后缀相等的最大长度即为 $next_i$。  
相似的，在 AC 自动机中则是指向最长真前后缀中前缀的节点（若为 $0$ 则指向根节点）。  

### 建立
仿照 KMP，我们可以考虑一下怎么建立 AC 自动机。  
KMP 中，我们通过 $1\sim i-1$ 的 $next$ 信息求出了 $next_i$，但是 Trie 是个树状结构，不难想到使用第 $1\sim i-1$ 层的信息来求第 $i$ 层的信息。  
因此 AC 自动机中 $next$ 求法实际上是个 bfs 的过程，每次用**当前节点 $t$ 更新所有子节点**。  
在这其中，匹配相同字符的操作转换为了**判断 $t$ 是否存在某个儿子**。  

### 查询
依旧和 KMP 一样，但是存在一个小问题：由于当前节点表示到 $i$ 为止所能匹配到的最大后缀，所以当前节点的 $next$ 一定符合条件，需要一起统计。  

### 优化
``` cpp
void build() {
	int hh = 0 , tt = -1;
	for(int i = 0 ; i < 26 ; i ++)
		if(tr[0][i]) q[++ tt] = tr[0][i];
	
	while(hh <= tt) {
		int t = q[hh ++];
		for(int i = 0 ; i < 26 ; i ++) {
			int c = tr[t][i];
			if(!c) continue;
			
			int j = ne[t];
			while(j && !tr[j][i]) j = ne[j];
			if(tr[j][i]) j = tr[j][i];
			ne[c] = j;
			q[++ tt] = c;
		}
	}
}
```
在上面的 `build` 函数中，我们多使用了一层 `while` 循环，也就是每次查询都要跳跳跳，能不能一步到位呢？这便是 Trie 图的优化。  
1.  存在子节点 `tr[t][i]`  
    让 `ne[p]=tr[ne[t]][i]`，再将 `p` 入队即可。  
2.  不存在子节点 `tr[t][i]`  
    很明显，让 `tr[t][i]=tr[ne[t]][i]` 即可。  

注意，以上优化其实跟并查集的路径压缩差不多，可以画个图理解一下。  
查询时，只需要直接 `j=tr[j][t]` 即可。  

## 模板
### AC 自动机
``` cpp :collapsed-lines
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

const int N = 1e4+10 , S = 55 , M = 1e6+10;

int n;
int tr[N*S][26] , cnt[N*S] , idx;
char s[M];
int q[N*S] , ne[N*S];

void insert() {
	int p = 0;
	for(int i = 0 ; s[i] ; i ++) {
		int t = s[i]-'a';
		if(!tr[p][t]) tr[p][t] = ++ idx;
		p = tr[p][t];
	}
	cnt[p] ++;
}

void build() {
	int hh = 0 , tt = -1;
	for(int i = 0 ; i < 26 ; i ++)
		if(tr[0][i]) q[++ tt] = tr[0][i];
	
	while(hh <= tt) {
		int t = q[hh ++];
		for(int i = 0 ; i < 26 ; i ++) {
			int c = tr[t][i];
			if(!c) continue;
			
			int j = ne[t];
			while(j && !tr[j][i]) j = ne[j];
			if(tr[j][i]) j = tr[j][i];
			ne[c] = j;
			q[++ tt] = c;
		}
	}
}

void slove() {
	memset(tr , 0 , sizeof tr);
	memset(cnt , 0 , sizeof cnt);
	memset(ne , 0 , sizeof ne);
	idx = 0;
	
	scanf("%d" , &n);
	for(int i = 1 ; i <= n ; i ++) {
		scanf("%s" , s);
		insert();
	}
	
	build();
	
	scanf("%s" , s);
	
	int res = 0;
	for(int i = 0 , j = 0 ; s[i] ; i ++) {
		int t = s[i]-'a';
		while(j && !tr[j][t]) j = ne[j];
		if(tr[j][t]) j = tr[j][t];
		
		int p = j;
		while(p) {
			res += cnt[p];
			cnt[p] = 0;
			p = ne[p];
		}
	}
	
	printf("%d\n" , res);
	return;
}

int main() {
	int T; scanf("%d" , &T);
	while(T --) slove();
	return 0;
}
```
### Trie 图
``` cpp :collapsed-lines
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

const int N = 1e4+10 , S = 55 , M = 1e6+10;

int n;
int tr[N*S][26] , cnt[N*S] , idx;
char s[M];
int q[N*S] , ne[N*S];

void insert() {
	int p = 0;
	for(int i = 0 ; s[i] ; i ++) {
		int t = s[i]-'a';
		if(!tr[p][t]) tr[p][t] = ++ idx;
		p = tr[p][t];
	}
	cnt[p] ++;
}

void build() {
	int hh = 0 , tt = -1;
	for(int i = 0 ; i < 26 ; i ++)
		if(tr[0][i]) q[++ tt] = tr[0][i];
	
	while(hh <= tt) {
		int t = q[hh ++];
		for(int i = 0 ; i < 26 ; i ++) {
			int p = tr[t][i];
			if(!p) tr[t][i] = tr[ne[t]][i];
			else {
				ne[p] = tr[ne[t]][i];
				q[++ tt] = p;
			}
		}
	}
}

void slove() {
	memset(tr , 0 , sizeof tr);
	memset(cnt , 0 , sizeof cnt);
	memset(ne , 0 , sizeof ne);
	idx = 0;
	
	scanf("%d" , &n);
	for(int i = 1 ; i <= n ; i ++) {
		scanf("%s" , s);
		insert();
	}
	
	build();
	
	scanf("%s" , s);
	
	int res = 0;
	for(int i = 0 , j = 0 ; s[i] ; i ++) {
		int t = s[i]-'a';
		j = tr[j][t];
		
		int p = j;
		while(p) {
			res += cnt[p];
			cnt[p] = 0;
			p = ne[p];
		}
	}
	
	printf("%d\n" , res);
	return;
}

int main() {
	int T; scanf("%d" , &T);
	while(T --) slove();
	return 0;
}
```

## 例题
### Acwing 1053. 修复DNA {#acwing-1053}
[题目传送门](https://www.acwing.com/problem/content/1055/)  
对于这道题而言，其实是状态机模型，但是又涉及到多模态，所以考虑在 AC 自动机上做 DP。  
具体的，我们可以定义 $f_{i,j}$ 表示前 $i$ 个字母，到达 Trie 的 $j$ 号节点的所有方案中的最小操作数。  
建立 AC 自动机时，需要标记模式串存在处（不能包含模式串），由于是树状结构，所以子节点都不会被转移到。  
枚举时，先枚举 $i$，然后枚举 $j$，最后枚举 $k$（$k$ 表示四个字母）。

### AcWing 1285. 单词 {#acwing-1285}
[题目传送门](https://www.acwing.com/problem/content/description/1287/)  
这道题的含义是所有字符串既是模式串又是匹配串。  
如果一个串不被别的串包含，我们可以很方便的统计，但是如果一个串是**别的串的后缀**，如何统计呢？  
很明显，我们需要找到它的**相同前缀**，这时候才会产生贡献，相当于这个前缀（也是后缀）在这个大串中出现了。  
这个时候的贡献很明显应该加到前缀上，而最大相同前（后）缀则是 $next$ 数组的定义，所以可以很方便的找到它。  
接下来就是统计，很明显我们可以建个反图跑拓扑排序，但是我们既然已经进行过 BFS，而 BFS 的顺序倒过来就是一个拓扑序，可以直接把那个队列拿来用。  
也就是说，这道题不是被匹配串找匹配串，而是匹配串找被匹配串（可能有点绕，不懂可以忽略这句话）。  