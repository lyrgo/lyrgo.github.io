---
title: 位运算
createTime: 2026/04/13 13:11:25
permalink: /algorithm/misc/bit/
---

## 龟速乘
给定 $a,b,p\leq 10^{18}$，求 $a\times b\mod p$ 的值。  
一般的解决办法是写个高精度，但是太麻烦了，有没有简单一点的呢？  
有的有的，根据快速幂的思想，$a\times b$ 其实就是 $\underbrace{a+a+\cdots+a}_{b\text{个} a}$，因此我们可以将其二进制分解，每次加若干个 $a$ 即可。  
时间复杂度 $O(\log V)$，其中 $V$ 是值域。（跟高精度差不多）  

### AcWing 90. 64位整数乘法{#acwing-90}
<LinkCard title="AcWing 90. 64位整数乘法" href="https://www.acwing.com/problem/content/92/"/>