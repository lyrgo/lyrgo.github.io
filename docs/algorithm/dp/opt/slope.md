---
title: 斜率优化
createTime: 2025/12/13 20:34:02
permalink: /algorithm/dp/opt/slope
---

## _Intro_

## _Tricks_
斜率优化通常有以下几个步骤：
1.  **分析**  
    寻找出这个问题的一般解决方式，保证正确性。  
2.  **优化**  
    对正确代码的转换进行等价变形，优化复杂度。  

## _Examples_
### Acwing 300. 任务安排1 {#acwing-300}
[题目传送门](https://www.acwing.com/problem/content/302/)  
::: tip
容易发现，我们每次增加一批任务会对后面造成影响，考虑将影响提前处理。  
如果当前批次结束是 $c_i$，则对后面造成的变化量是 $S\times (c_{i+1}+c_{i+2}+\dots +c_n)$
:::

我们先来考虑状态设计：
*   状态集合：$f_i$ 表示完成前 $i$ 个任务的所有方案的花费
*   状态属性：$\max$
*   **状态转移**：考虑依据上一批次的最后一个进行分类。  
    具体的，令 $st_i=\sum\limits _{j=1}^{j=i}t_j,\ sc_i=\sum\limits _{j=1}^{j=i}c_j$：
$$
\begin{aligned}
f_i&=\min\limits _{0\leq j < i}\left\{ f_j+st_i\times (sc_i-sc_j)+S\times (sc_n-sc_j)\right\}
\end{aligned}
$$

由于范围只有 $5000$，可以直接过掉（这道题是后面的前置）。