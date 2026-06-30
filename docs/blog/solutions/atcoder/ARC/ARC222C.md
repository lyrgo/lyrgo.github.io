---
title: ARC222C 2 Directions vs 4 Directions
createTime: 2026/06/24 21:30:54
permalink: /blog/atcoder/arc/222/c/
tags:
    - DP
---

## 题目大意

有一个 $N \times N$ 的网格，初始所有格子均为黑色。  
每个格子 $(i,j)$ 有一个修改费用 $A_{i,j}$，Alice 可以在游戏开始前支付该费用将任意黑色格子变为白色（操作零次或多次）。  

游戏分为三个步骤：  

1. 裁判指定棋子的初始位置 $(h,w)$。  
2. Alice 选择若干黑色格子并支付相应费用，将其染成白色。  
3. 将棋子放在初始位置，然后 Alice 先手，与 Bob 轮流移动棋子，共进行 $10^{10}$ 轮（即每人各移动 $10^{10}$ 次）。  
   - Alice 每次只能向左或向右移动一格；  
   - Bob 每次可以向上、下、左、右任一方向移动一格；  
   - 移动不可超出网格边界。  

游戏结束时，若棋子位于白色格子则 Alice 获胜，否则 Bob 获胜。双方在移动阶段均采取最优策略。  

对于每个可能的初始格子 $(h,w)$，求 Alice 在步骤 2 中为了确保最终获胜所需支付的最小总费用。  

数据范围：$1 \leq T \leq 10^4,\; 2 \leq N \leq 500,\; 0 \leq A_{i,j} \leq 10^9$，所有输入均为整数，所有测试用例的 $N^2$ 之和不超过 $500^2$。

## 题解
首先有几个性质：
1.  不能让 Bob 走到黑色格子上。
2.  每个 Alice 走到的黑格子四周必须是白格子。  

为了方便~~抽象~~，这里称四个方向都是白格子的格子为周白格子（注意不包括本身）。  
考虑周白格子如何分布，显然我们可以将左右两边的白格子归到这个周白格子上（因为 Alice 不能向上下走），也就是说，周白格子需要斜着走，走到顶和底（没错，只需要一条，因为可以 Alice 强行把 Bob 拉回来）。  
容易发现，开始位置有两种选择，要么往左要么往右，所以我们要统计这两种方案的最小值。  

这样分析算法就比较显然了，我们设 $f[i][j]$ 表示从顶到当前格子的最少花费，$g[i][j]$ 表示从底到当前格子的最少花费，直接转移即可，最终一个格子的花费为 $f[i][j]+g[i][j]-cost$，其中 $cost$ 为这个格子两边的格子涂白花费。

## 代码
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

typedef long long LL;

const int N = 510;

int n;
LL a[N][N];
LL f[N][N] , g[N][N];

LL calc(int x , int y) {
	return a[x][y-1] + a[x][y+1];
}

void solve() {
	scanf("%d" , &n);
	for(int i = 0 ; i <= n+1 ; i ++)
		for(int j = 0 ; j <= n+1 ; j ++) {
			f[i][j] = 0x3f3f3f3f3f3fll;
			g[i][j] = 0x3f3f3f3f3f3fll;
			a[i][j] = 0;
		} 
	
	for(int i = 1 ; i <= n ; i ++)
		for(int j = 1 ; j <= n ; j ++) {
			scanf("%lld" , &a[i][j]);
		}
	
	for(int j = 1 ; j <= n ; j ++)
		f[1][j] = calc(1 , j);
	for(int i = 2 ; i <= n ; i ++) {
		for(int j = 1 ; j <= n ; j ++) {
			f[i][j] = min(f[i][j] , min(f[i-1][j-1] , f[i-1][j+1]) + calc(i , j));
		}
	}
	
	for(int j = 1 ; j <= n ; j ++)
		g[n][j] = calc(n , j);
	for(int i = n-1 ; i >= 1 ; i --) {
		for(int j = 1 ; j <= n ; j ++) {
			g[i][j] = min(g[i][j] , min(g[i+1][j-1] , g[i+1][j+1]) + calc(i , j));
		}
	}
	
	for(int i = 1 ; i <= n ; i ++) {
		for(int j = 1 ; j <= n ; j ++) {
			LL ans1 = f[i][j-1] + g[i][j-1] - calc(i , j-1);
			LL ans2 = f[i][j+1] + g[i][j+1] - calc(i , j+1);
			printf("%lld " , min(ans1 , ans2));
		}
		puts("");
	}
	return;
}

int main() {
	int T; scanf("%d" , &T);
	while(T --) solve();
	return 0;
}
```