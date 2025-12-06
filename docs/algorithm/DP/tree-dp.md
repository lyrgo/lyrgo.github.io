---
title: 树形 DP
createTime: 2025/11/23 11:12:23
permalink: /algorithm/tree-dp/
---

## _Intro_
树形动态规划常在树上进行，且以子树为单位做转移。  
一般在转移方程中会出现节点编号，且所有转移都要考虑当前子树。

## *Examples*
### Acwing 1072. 树的最长路径{#acwing-1072}
[题目传送门](https://www.acwing.com/problem/content/1074/)  
考虑在一颗子树 $i$ 中的所有子节点 $j$。  
求当前子树的直径实际是所有子节点的最大值和次大值的和。  

### Acwing 1073. 树的中心{#acwing-1073}
[题目传送门](https://www.acwing.com/problem/content/1075/)  
> 树的中心是指到其他节点最远距离最近的节点

记当前子树根节点 $i$。  
考虑怎么算最远节点，首先分为两种情况：
1. 最远节点从当前子树中取
2. 从父结点取（向上）。

第一种很好维护，重点在于第二种，如果直接取父节点的话会导致重复经过 $i$（父节点最大路径从 $i$ 经过），所以需要维护一个次大向下值。  

### Acwing 1077. 皇宫看守{#acwing-1077}
[题目传送门](https://www.acwing.com/problem/content/1079/)  
这道题难点在于状态机，需要考虑三种情况。
1. $f_{i,0}$ 表示 $i$ 不放，被父节点覆盖
2. $f_{i,1}$ 表示 $i$ 不放，被子节点覆盖
3. $f_{i,2}$ 表示 $i$ 放。

记 $j,k$ 为 $i$ 的子节点。
1. $f_{i,0}=\sum\limits _{j\in i}\min\left\{f_{j,0},f_{j,1},f_{j,2} \right\}$
2. $f_{i,1}=\min\limits _{j\in i}\left\{ f_{j,2}+\sum\limits _{k\neq j}\min\left\{ f_{k,1},f_{k,2} \right\} \right\}$
3. $f_{i,2}=\sum\limits _{j\in i}\min\left\{ f_{j,0},f_{j,1},f_{j,2} \right\}$

由于第二种不好转移，考虑记 $sum=\sum\limits _{j\in i} \min\left\{ f_{j,1},f_{j,2} \right\}$。  
然后第二种转移可以变成 $f_{i,1}=\min\limits _{j\in i}\left\{ sum-\min\left( f_{j,1},f_{j,2} \right)+f_{j,2} \right\}$。  
这样问题就解决了。  