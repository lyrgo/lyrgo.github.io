---
title: 分数规划
createTime: 2026/08/11 18:29:33
permalink: /algorithm/misc/frac-programming/
---

## 简介
分数规划用于解决求分数的极值的问题，通常形式为 $\frac {\sum f(x)} x$ 装物，且上下有关。  

## 解法
### 二分法
应该是最常用的方法（？  
具体做法就是二分一个值 $\lambda$，将分母乘到 $\lambda$ 上，移项后合并变成形如 $\sum (*)>0$ 状物，然后按照原题要求进行求解。  

## 例题
与最小割结合：
[AcWing 2279. 网络战争](/blog/solutions/acwing/2279.md){.readmore}