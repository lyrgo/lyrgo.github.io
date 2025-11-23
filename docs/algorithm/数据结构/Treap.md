---
title: Treap
createTime: 2025/11/09 14:04:37
permalink: /algorithm/数据结构/6vin6qej/
---

## 简介
一种树形数据结构
其为[二叉搜索树](https://www.cnblogs.com/lyrgo/articles/19089258)的一种变形

容易发现,二叉搜索树效率取决于树高
由于二叉搜索树容易退化为一条链,所以会退化为$O(n)$
于是`Treap`就出现了

具体思想是将二叉搜索树和堆结合起来,每个点都有一个`key`和`val`
其中`key`是二叉搜索树的权值,`val`是堆的权值
因为限制条件的增加,所以如果`key`互不相同,则有唯一的一颗`Treap`
证明也很简单:
在当前区间$[l,r]$中,取$\max{val}$作为根节点,所有比根节点小的放进左子树,否则放进右子树
则一定会有递归出的唯一一颗`Treap`

由于具有堆的性质,所以需要考虑在一个`Treap`中插入节点
如果我们从底部插入节点,就需要考虑交换子节点与父节点
交换分为左旋和右旋
![无标题](https://img2024.cnblogs.com/blog/3697009/202509/3697009-20250913161923358-39572005.png)
容易发现,这样旋转后`Treap`的中序遍历不便
由于比较难记,这里给一个口诀: `右旋拎左右挂左，左旋拎右左挂右`

由于我们要删除一个树,就要将其移动到一个叶子节点然后删除
又因为具有二叉搜索树的性质,设左右儿子权值为$v_l$和$v_r$
若 $v_l>v_r$ ,则右旋
反之左旋

## CODE
### 各函数解释
|函数名称|功能|
| ---- | ---- |
|`insert`|插入|
|`remove`|删除|
|`getRankByKey`|获取排名为$x$的值|
|`getKeyByRank`|获取值为$x$的排名|
|`getPrev`|获取比$x$小的最大值|
|`getNext`|获取比$x$大的最小值|

#### zig & zag
``` cpp
void zig(int &p) {
	int q = tr[p].l;
	tr[p].l = tr[q].r; tr[q].r = p; p = q;
	pushup(tr[p].r); pushup(p);
	return;
}

void zag(int &p) {
	int q = tr[p].r;
	tr[p].r = tr[q].l; tr[q].l = p; p = q;
	pushup(tr[p].l); pushup(p);
	return;
}
```
左旋和右旋操作
![无标题](https://img2024.cnblogs.com/blog/3697009/202509/3697009-20250913161923358-39572005.png)
和这个图是一样滴
口诀忘了吗? 再来一遍: `右旋拎左右挂左，左旋拎右左挂右`
注意取地址符,最后的`p`其实是`q`,所以原来的`p`在现在的右子树或者左子树
最后应该先`pushup`儿子然后父亲

#### build
``` cpp
void build() {
	getNode(-INF); getNode(INF);
	root = 1; tr[1].r = 2;
	pushup(root);
	return;
}
```
创建两个哨兵( $\text{INF}$ ,$-\text{INF}$ )
`root`初始为 $1$
根的右儿子为$\text{INF}$

#### insert
```cpp
void insert(int &p , int key) {
	if(!p) p = getNode(key);
	else if(tr[p].key == key) tr[p].cnt ++;
	else if(key < tr[p].key) {
		insert(tr[p].l , key);
		if(tr[tr[p].l].val > tr[p].val) zig(p);
	} else {
		insert(tr[p].r , key);
		if(tr[tr[p].r].val > tr[p].val) zag(p);
	}
	pushup(p);
	return;
}
```
找到$key$的放置位置后,若已存在直接增加计数器,否则新建一个新节点接上
注意传入的取地址符,会更改上一层`tr[tr[p]]`的`l`或者`r`
注意`pushup`

#### remove
``` cpp
void remove(int &p , int key) {
	if(!p) return;
	if(tr[p].key == key) {
		if(tr[p].cnt > 1) tr[p].cnt --;
		else if(tr[p].l || tr[p].r) {
			if(!tr[p].r || tr[tr[p].l].val > tr[tr[p].r].val) {
				zig(p);
				remove(tr[p].r , key);
			} else {
				zag(p);
				remove(tr[p].l , key);
			}
		} else p = 0;
	} else if(key < tr[p].key) remove(tr[p].l , key);
	else remove(tr[p].r , key);
	pushup(p);
}
```
这时有几种情况:
1. 找到底没找到,返回
2. 找到了
  a. 有重复节点,直接减一
  b. 有儿子,若没有右儿子或者左儿子的权重大于右儿子,就右旋后继续递归(注意这时的`p`其实是原来的`tr[p].l` , 左儿子同理
  c. 叶节点,直接删了
3. 还是没找到,根据`key`选择左右路径递归

注意`pushup` !!!

#### getRankByKey
``` cpp
int getRankByKey(int p , int key) {
	if(!p) return -1;
	if(tr[p].key == key) return tr[tr[p].l].siz+1;
	if(key < tr[p].key) return getRankByKey(tr[p].l , key);
	return tr[tr[p].l].siz+tr[p].cnt+getRankByKey(tr[p].r , key);
}
```
既然是用`key`找排名
找到了的话排名就应该是当前节点左子树大小加一(自己也是一个)
否则依据`key`选择左右,注意选择右边的话`rank`应该加上左子树大小和父节点重复个数

#### getKeyByRank
``` cpp
int getKeyByRank(int p , int rank) {
	if(!p) return -1;
	if(tr[tr[p].l].siz >= rank) return getKeyByRank(tr[p].l , rank);
	if(tr[tr[p].l].siz+tr[p].cnt >= rank) return tr[p].key;
	return getKeyByRank(tr[p].r , rank-tr[tr[p].l].siz-tr[p].cnt);
}
```
用`rank`找`key`
其实就是如果左子树大小大于等于`rank`,则答案一定在左子树
如果加上重复个数后比`rank`大,说明当前点就是答案
否则就往右子树找

#### getPrev & getNext
``` cpp
int getPrev(int p , int key) {
	if(!p) return -INF;
	if(tr[p].key >= key) return getPrev(tr[p].l , key);
	return max(tr[p].key , getPrev(tr[p].r , key));
}

int getNext(int p , int key) {
	if(!p) return INF;
	if(tr[p].key <= key) return getNext(tr[p].r , key);
	return min(tr[p].key , getNext(tr[p].l , key));
}
```
两个函数刚好相反,就放到一起了
以`getPrev`为例,如果当前的`key`大于等于寻找的,说明不符合,向左子树找
反之就往右子树,并且当前点也有可能是答案,要取$\max$

### 完整代码
``` cpp
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cstdlib>

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

void pushup(int x) {
	tr[x].siz = tr[tr[x].l].siz + tr[tr[x].r].siz + tr[x].cnt;
}

int getNode(int key) {
	tr[++idx].key = key;
	tr[idx].val = rand();
	tr[idx].siz = 1;
	tr[idx].cnt = 1;
	return idx;
}

void build() {
	getNode(-INF); getNode(INF);
	root = 1; tr[1].r = 2;
	pushup(root);
	return;
}

void zig(int &p) {
	int q = tr[p].l;
	tr[p].l = tr[q].r; tr[q].r = p; p = q;
	pushup(tr[p].r); pushup(p);
	return;
}

void zag(int &p) {
	int q = tr[p].r;
	tr[p].r = tr[q].l; tr[q].l = p; p = q;
	pushup(tr[p].l); pushup(p);
	return;
}

void insert(int &p , int key) {
	if(!p) p = getNode(key);
	else if(tr[p].key == key) tr[p].cnt ++;
	else if(key < tr[p].key) {
		insert(tr[p].l , key);
		if(tr[tr[p].l].val > tr[p].val) zig(p);
	} else {
		insert(tr[p].r , key);
		if(tr[tr[p].r].val > tr[p].val) zag(p);
	}
	pushup(p);
	return;
}

void remove(int &p , int key) {
	if(!p) return;
	if(tr[p].key == key) {
		if(tr[p].cnt > 1) tr[p].cnt --;
		else if(tr[p].l || tr[p].r) {
			if(!tr[p].r || tr[tr[p].l].val > tr[tr[p].r].val) {
				zig(p);
				remove(tr[p].r , key);
			} else {
				zag(p);
				remove(tr[p].l , key);
			}
		} else p = 0;
	} else if(key < tr[p].key) remove(tr[p].l , key);
	else remove(tr[p].r , key);
	pushup(p);
}

int getRankByKey(int p , int key) {
	if(!p) return -1;
	if(tr[p].key == key) return tr[tr[p].l].siz+1;
	if(key < tr[p].key) return getRankByKey(tr[p].l , key);
	return tr[tr[p].l].siz+tr[p].cnt+getRankByKey(tr[p].r , key);
}

int getKeyByRank(int p , int rank) {
	if(!p) return -1;
	if(tr[tr[p].l].siz >= rank) return getKeyByRank(tr[p].l , rank);
	if(tr[tr[p].l].siz+tr[p].cnt >= rank) return tr[p].key;
	return getKeyByRank(tr[p].r , rank-tr[tr[p].l].siz-tr[p].cnt);
}

int getPrev(int p , int key) {
	if(!p) return -INF;
	if(tr[p].key >= key) return getPrev(tr[p].l , key);
	return max(tr[p].key , getPrev(tr[p].r , key));
}

int getNext(int p , int key) {
	if(!p) return INF;
	if(tr[p].key <= key) return getNext(tr[p].r , key);
	return min(tr[p].key , getNext(tr[p].l , key));
}

int main() {
	build();
	
	scanf("%d" , &n);
	while(n --) {
		int opt , x; scanf("%d%d" , &opt , &x);
		if(opt == 1) {
			insert(root, x);
		}
		if(opt == 2) {
			remove(root, x);
		}
		if(opt == 3) {
			printf("%d\n" , getRankByKey(root , x)-1);
		}
		if(opt == 4) {
			printf("%d\n" , getKeyByRank(root , x+1));
		}
		if(opt == 5) {
			printf("%d\n" , getPrev(root , x));
		}
		if(opt == 6) {
			printf("%d\n" , getNext(root , x));
		}
	}
	return 0;
}
```