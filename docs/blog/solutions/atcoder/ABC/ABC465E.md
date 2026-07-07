---
title: ABC465E Digit Circus
createTime: 2026/07/07 18:50:12
permalink: /blog/atcoder/abc/465/e/
tags:
    - 数位DP
---

## 题解
一眼数位 DP，但是怎么设计状态呢？  
显然需要有第几位 $i$，是否小于上界 $b$，当前的余数 $r$，用过的数字 $S$，所以我们设 $f[i][b][r][S]$，其中 $b\in \{0,1\},\; r\in [0,2],\; S\in [0,2^{10})$。  
初始状态为 $f[0][0][0][0]=1$。  

接下来考虑转移：  
首先我们考虑前导 $0$ 的情况（因为有其他位数），显然，当 $r=0\wedge S=0$ 时，我们可以断定当前为前导 $0$，若现在选出的数仍为 $0$，则保持 $S,r$ 不变即可，否则进行更新。  
再看小于上界的更新，我们让 $0$ 表示贴合上界，$1$ 表示自由选，若新选出的数小于原数字且当前贴合上界，那么 $i+1$ 位就应自由选择，反之亦然。  
剩下的就是普通的更新了，计算新的余数和用过的数字集合即可。  

## 代码
``` cpp :collapsed-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <string>

using namespace std;

typedef long long LL;

const int N = 510 , M = (1<<10)+10;
const LL MOD = 998244353;

string s;
LL f[N][2][3][M];

int main() {
	cin >> s;
	
	f[0][0][0][0] = 1;
	for(int i = 0 ; i < (int)s.size() ; i ++) {
		for(int S = 0 ; S < (1<<10) ; S ++) {
			for(int r = 0 ; r < 3 ; r ++) {
				for(int j = 0 ; j <= 9 ; j ++) {
					int nS = S | (1 << j);
					if(S == 0 && j == 0) nS = 0;
					
					int nr = (r*10 + j) % 3;
					
					if(j <= s[i]-'0') {
						LL &t = f[i+1][j < s[i]-'0'][nr][nS];
						t = (t + f[i][0][r][S]) % MOD; 
					}
					
					LL &t = f[i+1][1][nr][nS];
					t = (t + f[i][1][r][S]) % MOD;
				}
			}
		}
	}
	
	LL ans = 0;
	for(int S = 1 ; S < (1<<10) ; S ++) {
		for(int r = 0 ; r < 3 ; r ++) {
			for(int b = 0 ; b <= 1 ; b ++) {
				int cnt = 0 , tmp = 0;
				for(int i = 0 ; i <= 9 ; i ++)
					if((S >> i) & 1) tmp ++;
				if(tmp == 3) cnt ++;
				if((S >> 3) & 1) cnt ++;
				if(r == 0) cnt ++;
				
				if(cnt == 1) ans = (ans + f[s.size()][b][r][S]) % MOD;
			}
		}
	} 
	printf("%lld\n" , ans);
	return 0;
}
```