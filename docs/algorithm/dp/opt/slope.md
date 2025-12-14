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
f_i=\min\limits _{0\leq j < i}\left\{ f_j+st_i\times (sc_i-sc_j)+S\times (sc_n-sc_j)\right\}
$$

由于范围只有 $5000$，可以直接过掉（这道题是后面的前置）。

### Acwing 301. 任务安排2 {#acwing-301}
[题目传送门](https://www.acwing.com/problem/content/303/)  
令 $0\leq j < i$，考虑继续对上面的状态转移方程进行变形：
$$
\begin{aligned}
f_i&=\min\left\{ f_j+st_i\times (sc_i-sc_j)+S\times (sc_n-sc_j)\right\} \\
f_i&=\min\left\{ f_j-sc_j\times (st_i+S)+st_i\times sc_i+S\times sc_n \right\} \\
\end{aligned}
$$
这个时候，先暂时扔掉 $\min$，将 $f_j$ 和 $sc_j$ 分在方程左右两侧：
$$
f_j=(st_i+S)\times sc_j+f_i-st_i\times sc_i-S\times sc_n
$$
容易发现，这是一个形如 $y=kx+b$ 的一次函数，我们可以将其放到一个平面直角坐标系中。  
当 $i$ 固定时，这个函数的斜率（$st_i+S$）也是固定的，且截距中 $f_i$ 的系数为 $1$，要求最小的 $f_i$ 等价于让截距最小，放在图上也就是从下往上这条线第一次碰到的点即为最佳 $f_j$。
![函数图像](/algorithm/dp/opt/slope/function-graph.png)  
这张图里，每一个点代表一个形如 $(sc_j,f_j)$ 的点对，但我们不能每一个都判断。  
怎么办？注意到 $t_i,c_i$ 都是正整数，所以斜率大于零小于正无穷，我们钦定三个点 $A,\ B,\ C$，其中 $sc_A<sc_B<sc_C$，$f_A<f_C$。  
这个时候可以画出 $B$ 在 $AC$ 所在直线的上侧或下侧，会形成上凸或下凸，但有用的情况应该是：  
$$
\frac{f_B-f_A}{sc_B-sc_A}<\frac{f_C-f_B}{sc_C-sc_B}
$$
（其实就是斜率）  
这个时候，我们要维护的也就变成了**连接两侧相邻线段斜率单调递增的下凸壳**。  
哪个点才是我们要找到的转移点呢？如果一条直线斜率为 $k$，如果某个顶点左侧线段斜率小于 $k$，右侧线段斜率大于 $k$，则该顶点就是最优决策。换言之，就是这个凸包上第一个右侧斜率大于 $k$ 的点。  
到这里可能会考虑二分，但我们可以继续挖掘题目的特殊性质：  
1.  斜率单调递增。  
    这个函数的斜率为 $st_i+S$ 且 $st_i>0$。  
2.  新的点一定在凸包右侧被加入。  
    由于 $c_i>0$，所以 $sc_i$ 单调递增且我们以 $sc_i$ 作为横坐标。  

由于这两个性质，我们可以在寻找点时删除所有斜率小于当前直线斜率的点；添加时由于在最右边，这个点一定不会被删掉，可以直接添加，同时将所有不在凸包上的点删掉。  
每个点只会进队列出队列一次，所以这个算法是 $O(n)$ 的。  