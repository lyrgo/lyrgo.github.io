---
title: Splay
createTime: 2026/01/18 12:47:06
permalink: /algorithm/ds/balanced/splay/
---

## 简介
相较于 Treap 而言，Splay 是一个相当强大的平衡树，Treap 支持的操作都支持。  
Splay 主要是抛弃了堆性质，转而采取每次操作后将操作节点旋转到根节点上来保证复杂度~~（证明我也不会）~~，下面是证明。  

::: details 证明
考虑使用势能分析。  
首先我们需要找到一个势能函数的定义，而 Splay 操作实际上是**将有序变为无序**，所以我们需要找到一个能描述这棵树混乱程度的表示方法。  
为了兼顾整棵树，同时限制增加一个节点造成的影响，这里令 $\Phi=\log\sum|S|$，其中 $S$ 为这棵树的一个子树。  
![zig-zig 示意图](/algorithm/ds/balanced/splay/zig-zig.png)  
如图所示，我们来分析一下 Zig-zig 对势能的影响。  
很明显，我们这次的花费是 $2$，势能变化为 $R_{x'}+R_{y'}+R_{z'}-R_{x}-R_{y}-R_{z}$，所以我们可以把花费表示为 $cost=2+R_{x'}+R_{y'}+R_{z'}-R_{x}-R_{y}-R_{z}$。  
很明显这并不能分析，需要引入一个不等式：
$$
\text{若有} c=a+b\text{，则} \log a+\log b\leq\log c+2
$$
怎么来的？由于 $\log$ 是一个凸函数，结合图像可以知道 $\frac{\log a+\log b}{2}\leq \log\left(\frac{a+b}{2}\right)$，然后就可以推出原式了。  
观察一下，我们会发现 $R_z=R_{x'}$，直接约掉，剩下的怎么办？考虑将不等式变化为 $2\leq 2R_{x'}-R_{z'}-R_x$，带入以后就是 $cost \leq 3\left(R_{x'}-R_x\right)$。  
证毕。  
:::

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
经过 splay 长期的发展，现在有一种比较简便的写法如下：
``` cpp
void splay(int x , int k) {
    while(tr[x].p != k) {
        int y = tr[x].p , z = tr[y].p;
        if(z != k) {
            if((tr[z].s[1] == y) ^ (tr[y].s[1] == x)) rotate(x);
            else rotate(y);
        }
        rotate(x);
    }
    if(!k) root = x;
}
```
简单来说，就是根据弯折情况决定转 x 还是转 y，然后执行一次转 x。

## 例题
<LinkCard title="Acwing 950. 郁闷的出纳员" href="https://www.acwing.com/problem/content/952/" />
由于需要维护全局的加减，考虑使用一个变量 $x$ 存储全局偏移量，这样可以解决加减工资的问题。  
对于查询第 $k$ 大，只需要维护一下 $size$ 即可。  
那么怎么删除工资过低的人呢？只需要找到左侧哨兵 $l$（$-\infty$），然后找到第一个 $v\geq min-x$ 的 $r$，将 $r$ 移到根节点，$l$ 移到 $r$ 的左子树，然后删除 $l$ 的右子树即可。  