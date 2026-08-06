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