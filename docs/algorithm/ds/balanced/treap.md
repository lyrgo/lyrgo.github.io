---
title: Treap
createTime: 2026/01/10 17:33:40
permalink: /algorithm/ds/balanced/treap/
---

## 简介
由于 BST 众所周知的退化问题，Treap 出现了。  
Treap 通过给每个节点一个额外的 $val$ 并使其满足大根堆性质来进行**平衡**。  
事实上，Treap 可以看作 BST 的结构相对固定版。  

## 操作
### 左旋 & 右旋
为了维持大根堆性质，Treap 添加了旋转操作，我们知道，在普通的堆中可以直接交换父子节点，但 BST 中不能这样。  
具体的，为了保持 Treap 的**中序遍历**不变所进行的旋转，可以参考下图：
![Treap 的左旋和右旋示意图](/algorithm/ds/balanced/treap/zig&zag.png)  
容易发现，这样既满足了 BST 和堆的性质又让 $x$ 和 $y$ 互换。  

### 插入
考虑进行递归处理，以下是几种情况（记当前节点为 $u$，要插入节点的关键码为 $key$）：  
1.  $u=0$  
    直接创建一个新节点。  
2.  $key_u=key$  
    节点存在，$cnt_u$ 自增即可。  
3.  $key<key_u$  
    去 $u$ 的左节点插入，记得判断插入后是否需要维持平衡（右旋）。  
4.  $key>key_u$  
    去 $u$ 的右节点插入，记得判断插入后是否需要维持平衡（左旋）。  

### 删除
将需要删除的节点旋转到最底层后直接删除，讨论如下：  
1.  $u=0$  
    节点不存在。  
2.  $key_u=key$  
    *   $cnt_u>1$  
        直接删一个即可。  
    *   $cnt_u=1$ 且有左儿子或者右儿子  
        考虑右儿子不存在或左儿子 $val$ 大于右儿子 $val$，进行右旋及递归删除，左儿子同理。
3.  $key<key_u$  
    去左儿子删。  
4.  $key_u<key$  
    去右儿子删。  

### 关键码查询排名
每次向左右递归，不做赘述。

### 排名查询关键码
每次向左右递归，不做赘述。

### 查询前驱
进行分讨：  
1.  $u=0$  
    不存在前驱。  
2.  $key\leq key_u$  
    向左子树查找。  
3.  $key_u<key$  
    这时候有两种情况，要么 $u$ 就是前驱，要么在右子树，递归取最大值即可。  

### 查询后继
同前驱。

## 模板
```cpp :collapsed-lines
#include <cstdio>
#include <algorithm>
#include <iostream>
#include <cstring>

using namespace std;

struct Node {
    int l , r;
    int key , val;
    int cnt , siz;
};

const int N = 1e5+10 , INF = 0x3f3f3f3f;

int n;
Node tr[N];
int root , idx;

void pushup(int u) {
    tr[u].siz = tr[tr[u].l].siz + tr[tr[u].r].siz + tr[u].cnt;
}

int getNode(int key) {
    tr[++ idx].key = key;
    tr[idx].val = rand();
    tr[idx].cnt = tr[idx].siz = 1;
    return idx;
}

void zig(int &u) {
    int v = tr[u].l;
    tr[u].l = tr[v].r , tr[v].r = u , u = v;
    pushup(tr[u].r); pushup(u);
    return;
}

void zag(int &u) {
    int v = tr[u].r;
    tr[u].r = tr[v].l , tr[v].l = u , u = v;
    pushup(tr[u].l); pushup(u);
    return;
}

void build() {
    getNode(-INF); getNode(INF);
    root = 1 , tr[1].r = 2;
    pushup(root);

    if(tr[1].val < tr[2].val) zag(root);
}

void insert(int &u , int key) {
    if(!u) u = getNode(key);
    else if(tr[u].key == key) tr[u].cnt ++;
    else if(key < tr[u].key) {
        insert(tr[u].l , key);
        if(tr[tr[u].l].val > tr[u].val) zig(u);
    } else {
        insert(tr[u].r , key);
        if(tr[tr[u].r].val > tr[u].val) zag(u);
    }
    pushup(u);
    return;
}

void remove(int &u , int key) {
    if(!u) return;
    else if(tr[u].key == key) {
        if(tr[u].cnt > 1) tr[u].cnt --;
        else if(tr[u].l || tr[u].r) {
            if(!tr[u].r || tr[tr[u].l].val > tr[tr[u].r].val) {
                zig(u);
                remove(tr[u].r , key);
            } else {
                zag(u);
                remove(tr[u].l , key);
            }
        } else u = 0;
    } else if(key < tr[u].key) remove(tr[u].l , key);
    else remove(tr[u].r , key);

    pushup(u);
    return;
}

int getRankByKey(int u , int key) {
    if(!u) return 0;
    if(tr[u].key == key) return tr[tr[u].l].siz + 1;
    if(key < tr[u].key) return getRankByKey(tr[u].l , key);
    return tr[tr[u].l].siz + tr[u].cnt + getRankByKey(tr[u].r , key);
}

int getKeyByRank(int u , int rank) {
    if(!u) return INF;
    if(rank <= tr[tr[u].l].siz) return getKeyByRank(tr[u].l , rank);
    if(rank <= tr[tr[u].l].siz + tr[u].cnt) return tr[u].key;
    return getKeyByRank(tr[u].r , rank-tr[tr[u].l].siz-tr[u].cnt);
}

int getPrev(int u , int key) {
    if(!u) return 0;
    if(key <= tr[u].key) return getPrev(tr[u].l , key);
    return max(tr[u].key , getPrev(tr[u].r , key));
}

int getNext(int u , int key) {
    if(!u) return INF;
    if(tr[u].key <= key) return getNext(tr[u].r , key);
    if(!tr[u].l) return tr[u].key;
    return min(tr[u].key , getNext(tr[u].l , key));
}

int main() {
    scanf("%d" , &n);
    build();
    while(n --) {
        int opt , x; scanf("%d%d" , &opt , &x);
        if(opt == 1) insert(root , x);
        else if(opt == 2) remove(root , x);
        else if(opt == 3) printf("%d\n" , getRankByKey(root , x)-1);
        else if(opt == 4) printf("%d\n" , getKeyByRank(root , x+1));
        else if(opt == 5) printf("%d\n" , getPrev(root , x));
        else printf("%d\n" , getNext(root , x));
    }
    return 0;
}
```