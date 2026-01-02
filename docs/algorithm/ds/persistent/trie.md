---
title: 可持久化字典树
createTime: 2026/01/02 14:54:25
permalink: /algorithm/persistent/trie/
---

## _Intro_
我们知道，在普通的 Trie 中，添加数据后每个节点都有多个字符指针指向儿子。  
如果要维护每次插入后 Trie 的形态怎么办呢？  
由于 Trie 是满足插入后结构不变的，所以我们可以对其进行可持久化，每次只保存较上一次变化的部分。  

## AcWing 256. 最大异或和 {#acwing-256}
[题目传送门](https://www.acwing.com/problem/content/258/)  
由于异或可以进行前缀和，所以我们先进行一次前缀异或，得到数组 $s$。  
这样其实就是求：找到对于 $l\leq p\leq r$，最大的 $s_{p-1}\oplus s_N\oplus x$ 即为答案。  
转换一下，其实就是看 $r-1$ 这个版本的可持久化 Trie 中对于 $l-1\leq p$ 最大的 $s_p\oplus s_N\oplus x$。  
回忆一下 01Trie，为了最优结果每次我们都会从高位向低位尽量找不同的分支进入，也就是我们只需要知道**异于 $s_N\oplus x$ 的这个分支内，是否存在插入时间 $\geq l-1$ 的数**。  
为了维护这个分支内的最大插入时间，我们可以对 Trie 的每个节点都增加一个 $md$ 表示这个子树内的最后操作时间。  
