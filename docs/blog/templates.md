---
title: 模板
createTime: 2026/08/05 14:07:19
permalink: /blog/templates/
sticky: 9
---

磨刀不误砍柴工  

## 字符串
### Manacher
``` cpp
t[0] = '!';
for(int i = 1 ; s[i] && s[i] != '\0' ; i ++)
    t[++ cnt] = '#' , t[++ cnt] = s[i];
t[++ cnt] = '#'; t[++ cnt] = '@';

int r = 0 , c = 0 , ans = 0;
for(int i = 1 ; i < cnt ; i ++) {
    p[i] = i < r ? min(p[2*c-i] , r-i) : 1;
    while(t[i+p[i]] == t[i-p[i]]) p[i] ++;
    if(i + p[i] > r) {
        r = i + p[i];
        c = i;
    }
    ans = max(ans , p[i]-1);
}
```

### 最小表示法
``` cpp
int i = 1 , j = 2 , k = 0;
while(i <= n && j <= n && k <= n) {
    int val = s[(i+k-1)%n+1]-s[(j+k-1)%n+1];
    if(!val) k ++;
    else {
        if(val < 0) j = max(j+k+1 , i+1);
        else i = max(i+k+1 , j+1);
        k = 0;
        if(i == j) j ++;
    }
}
int ans = min(i,j);
```

### AC 自动机
``` cpp
int insert() {
	int p = 0;
	for(int i = 1 ; s[i] ; i ++) {
		int c = s[i]-'a';
		if(!tr[p][c]) tr[p][c] = ++ idx;
		p = tr[p][c];
	}
	return p;
}

void build() {
	int hh = 0 , tt = -1;
	for(int i = 0 ; i < 26 ; i ++)
		if(tr[0][i]) q[++ tt] = tr[0][i];
	
	while(hh <= tt) {
		int t = q[hh ++];
		for(int i = 0 ; i < 26 ; i ++) {
			if(tr[t][i]) {
				ne[tr[t][i]] = tr[ne[t]][i];
				q[++ tt] = tr[t][i];
			} else {
				tr[t][i] = tr[ne[t]][i];
			}
		}
	}
}
```
## 图论
### 朱刘算法
```cpp:collapesd-lines
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <cstring>
#include <cmath>

using namespace std;

const int N = 110;
const double INF = 1e8;

struct PDD {
	double x , y;
};

int n , m;
PDD q[N];
bool g[N][N];
double d[N][N] , bd[N][N];
int pre[N] , bpre[N];
int dfn[N] , low[N] , dfnidx , stk[N] , top;
int id[N] , cnt;
bool st[N] , instk[N];

void dfs(int u) {
	st[u] = true;
	for(int i = 1 ; i <= n ; i ++)
		if(g[u][i] && !st[i]) dfs(i);
}

bool check() {
	memset(st , 0 , sizeof st);
	dfs(1);
	for(int i = 1 ; i <= n ; i ++)
		if(!st[i]) return false;
	return true;
}

double calc(int i , int j) {
	double dx = q[i].x - q[j].x;
	double dy = q[i].y - q[j].y;
	return sqrt(dx*dx + dy*dy);
}

void tarjan(int u) {
	dfn[u] = low[u] = ++ dfnidx;
	stk[++ top] = u; instk[u] = true;
	
	int v = pre[u];
	if(!dfn[v]) {
		tarjan(v);
		low[u] = min(low[u] , low[v]);
	} else if(instk[v]) low[u] = min(low[u] , dfn[v]);
	
	if(low[u] == dfn[u]) {
		cnt ++;
		do {
			v = stk[top --];
			instk[v] = false;
			id[v] = cnt;
		} while(u != v);
	}
}

double solve() {
	double res = 0;
	for(int i = 1 ; i <= n ; i ++)
		for(int j = 1 ; j <= n ; j ++)
			if(g[i][j]) d[i][j] = calc(i,j);
			else d[i][j] = INF;
	while(true) {
		for(int i = 1 ; i <= n ; i ++) {
			pre[i] = i;
			for(int j = 1 ; j <= n ; j ++)
				if(d[pre[i]][i] > d[j][i]) pre[i] = j;
		}
		
		memset(dfn , 0 , sizeof dfn); top = cnt = dfnidx = 0;
		for(int i = 1 ; i <= n ; i ++)
			if(!dfn[i]) tarjan(i);
		if(cnt == n) {
			for(int i = 2 ; i <= n ; i ++) res += d[pre[i]][i];
			break;
		}
		for(int i = 2 ; i <= n ; i ++)
			if(id[pre[i]] == id[i]) res += d[pre[i]][i];
		for(int i = 1 ; i <= cnt ; i ++)
			for(int j = 1 ; j <= cnt ; j ++)
				bd[i][j] = INF;
		for(int i = 1 ; i <= n ; i ++) {
			for(int j = 1 ; j <= n ; j ++) {
				if(d[i][j] < INF && id[i] != id[j]) {
					int a = id[i] , b = id[j];
					if(id[pre[j]] == id[j]) bd[a][b] = min(bd[a][b] , d[i][j]-d[pre[j]][j]);
					else bd[a][b] = min(bd[a][b] , d[i][j]);
				}
			}
		}
		n = cnt;
		memcpy(d , bd , sizeof d);
	}
	
	return res;
}

int main() {
	while(~scanf("%d%d" , &n , &m)) {
		for(int i = 1 ; i <= n ; i ++)
			scanf("%lf%lf" , &q[i].x , &q[i].y);
		memset(g , 0 , sizeof g);
		while(m --) {
			int a , b; scanf("%d%d" , &a , &b);
			if(a != b && b != 1) g[a][b] = true;
		}
		
		if(!check()) puts("poor snoopy");
		else printf("%.2lf\n" , solve());
	}
	return 0;
}
```

## 其他
### 快读
``` cpp
char *p1,*p2,buf[100000];
#define nc() (p1==p2 && (p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++)
inline int read() {
    int x = 0 , f = 1;
    int ch = nc();
    while(ch < 48 || ch > 57) {
        if(ch == '-') f = -1;
        ch = nc();
    }
    while(ch >= 48 && ch <= 57)
        x = x * 10 + ch - 48 , ch = nc();
    return x * f;
}
```