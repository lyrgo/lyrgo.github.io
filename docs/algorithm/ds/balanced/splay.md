---
title: Splay
createTime: 2026/01/18 12:47:06
permalink: /algorithm/ds/balanced/splay/
---

## 简介
相较于 Treap 而言，Splay 是一个相当强大的平衡树，Treap 支持的操作都支持。  
Splay 主要是抛弃了堆性质，转而采取每次操作后将操作节点旋转到根节点上来保证复杂度（证明我也不会）。  

## 操作
### 旋转
旋转分为两部分，`rotate` 和 `splay`。  
#### rotate
`rotate` 和 Treap 的左右旋一样，但是可以写作一个函数：
``` cpp
void rotate(int x) {
    int y = tr[x].p , z = tr[y].p;
    int k = tr[y].s[1] == x;
    tr[z].s[tr[z].s[1] == y] = x , tr[x].p = z;
    tr[y].s[k] = tr[x].s[k^1] , tr[tr[y].s[k]].p = y;
    tr[x].s[k^1] = y , tr[y].p = x;
    pushup(y); pushup(x);
}
```
#### splay
根据子节点和父节点及父节点的父节点形成的图形进行讨论：  
![旋转的分类讨论](/algorithm/ds/balanced/splay/rotate.png)
另外还有两种与之相对称的，旋转方式与其相同，这里不做赘述。  
