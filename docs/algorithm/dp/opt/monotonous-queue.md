---
title: 单调队列优化
createTime: 2025/12/13 16:58:40
permalink: /algorithm/dp/opt/monotonous-queue/
---

## _Intro_
单调队列通常用于维护连续区间最大最小值，可以在动态规划中用于维护状态间的转移。

## _Examples_
### Acwing 135. 最大子序和 {#acwing-135}
[题目传送门](https://www.acwing.com/problem/content/137/)  
一道很经典的题，可以将子段和转换为前缀和的一部分，对于每个 $i$ 只要找到最小的 $f_j<i$ 就可以了。

### Acwing 1088.旅行问题 {#acwing-1088}
[题目传送门](https://www.acwing.com/problem/content/1090/)
> 给题目变量换个名字，后面的 $o$ 实际上指 $p$。

很明显，这是一个环上的问题，所以考虑**破环成链**，转换为线性的问题。  
然后我们来考虑顺逆时针。  
*   **顺时针：**  
    我们可以将原问题转换为从 $i$ 到后面 $n$ 个每个的前缀和都不小于 $0$，前缀和数组为 $s_i=s_{i-1}+o_i-d_i$  
    这时答案 $f_i=\left[ \min(s_j) - s_{i-1}\right]$，所以我们需要取 $\min\limits_{i\leq j\leq i+n-1}(s_j)$，所以从后往前做。  
    由于在 $i\leq n$ 时开始计算，需要让第 $i$ 个参与运算，需要先更新优先队列再处理是否可行。  

*   **逆时针：**  
    某个 $i$ 向左获得的油是 $o_i$，距离是 $d_{i-1}$，所以前缀和是 $s_i=s_{i-1}+o_i-d_{i-1}$（注意要让 $d_0=d_n$）。  
    这个时候答案是 $f_i=\left[ s_i-\max(s_{j-1}) \right]$，所以从前往后做。  
    计算答案时，优先队列中维护 $[i-n,i-1]$ 的信息即可。

### AcWing 1087. 修剪草坪 {#acwing-1087}
[题目传送门](https://www.acwing.com/problem/content/1089/)  
考虑 DP，设状态 $f_i$ 表示前 $i$ 个任意选的最大价值。  
我们可以以 $i$ 选不选进行第一次分类：  
1. 第 $i$ 个不选，即 $f_{i-1}$
2. 连续选 $1\leq x\leq k$ 个，则最左边是 $w_{i-x+1}$，那么前一个不能选，所以需要从 $\max\limits_{1\leq j\leq i-x-1}{f_j}$ 转移上来。  

所以 $f_i=f_{i-j-1}+s_i-s_{i-j}$，整理一下可以得到 $f_i=\max(f_{i-j-1}-s_{i-j})+s_i$，可以使用单调队列维护。  

### AcWing 1089. 烽火传递 {#acwing-1089}
[题目传送门](https://www.acwing.com/problem/content/1091/)  
考虑 DP，状态 $f_i$ 表示前 $i$ 个都被覆盖且第 $i$ 个点燃的最小代价。  
容易发现，$f_i=\min\limits_{i-m\leq j\leq i}f_j+g_i$，可以使用单调队列优化。  
答案状态在 $[n-m+1,n]$ 之间。  

### AcWing 1091. 理想的正方形 {#acwing-1091}
[题目传送门](https://www.acwing.com/problem/content/1093/)  
我们考虑怎么求单独的一个正方形内的最大值。  
可以将一个正方形拆成几行来看，只需要求这 $n$ 行长度为 $n$ 的最大值，每一行可以用单调队列求出当前这个元素左侧 $n$ 个元素的最大值（包含自己）。  
这个时候每一个正方形的最大值可以转换为最右边一列的最大值，所以我们还需要对最右边一列做一遍单调队列。  