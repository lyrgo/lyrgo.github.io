---
title: 最小表示法
createTime: 2026/08/05 14:18:04
permalink: /algorithm/string/minimal-string/
---

## 定义
一个字符串 $s$ 从某个位置劈开，把前面的部分接到后面，构成的新字符串 $t$，我们称 $s$ 和 $t$ **循环同构**。  

字符串 $s$ 的最小表示为所有与 $s$ **循环同构**的字符串中，**字典序最小**的字符串。

## 流程
维护 $i,j,k$，其中 $i,j$ 用于指示当前匹配的两个循环同构，$k$ 表示长度。 

-   若 $s[i+k]<s[j+k]$，则 $j$ 所在的循环同构字符串一定不能成为字典序最小的字符串，令 $j\leftarrow j+k+1$。  
-   若 $s[i+k]>s[j+k]$，与上面相似，$i\leftarrow i+k+1$。  
-   若 $s[i+k]=s[j+k]$，令 $k\leftarrow k+1$。  

重复执行这个流程，直到 $i>n$ 或 $j>n$ 或 $k>n$，此时 $\min(i,j)$ 即为答案。  

其实还有一个小优化，显然 $i\sim j$ 之间的元素不能作为答案，所以我们可以直接 $i\leftarrow \max(i+k+1,j+1)$ 或 $j\leftarrow \max(j+k+i,i+1)$。  