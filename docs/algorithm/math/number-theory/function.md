---
title: 数论函数
createTime: 2026/04/21 19:23:24
permalink: /algorithm/math/number-theory/function/
---

## 定义
设 $f(n)$ 为定义在 $\mathbb{N}^+$ 上的函数，值域任意（可以为 $\mathbb Z$，$\mathbb R$，甚至是 $\mathbb C$）。  

## 积性函数
若 $\forall a,b\ (a\bmod b=1)$，都有 $f(a\times b)=f(a)\times f(b)$，且 $f(1)=1$，则称 $f(n)$ 为积性函数。  
根据定义，显然有 $f(n)=\prod f(p_i^{c_i})$。  

常见的积性函数有：  
1.  欧拉函数 $\varphi(n)$：$[1,n]$ 中与 $n$ 互质的数的个数。  
2.  莫比乌斯函数 $\mu(n)$：若 $n=1$，则 $\mu(n)=1$；若存在质数 $p$ 使得 $p^2\mid n$，则 $\mu(n)=0$；否则 $n$ 为 $k$ 个不同质数的乘积， $\mu(n)=(-1)^k$。  
3.  约数个数 $d(n)$：$n$ 的正约数个数，即 $\sum_{d\mid n} 1$。  
4.  约数之和 $\sigma(n)$：$n$ 的正约数之和，即 $\sum_{d\mid n} d$。  

## 完全积性函数
若 $\forall a,b\in \mathbb N^+$，都有 $f(a\times b)=f(a)\times f(b)$，且 $f(1)=1$，则称 $f(n)$ 为完全积性函数。  
根据定义，显然有 $f(n)=\prod f(p_i^{c_i})=\prod f(p_i)^{c_i}$。  

常见的完全积性函数有：
1.  单位函数 $\epsilon(n)$：$\epsilon(n)=\left[n=1\right]$（卷积单位元）。  
2.  恒等函数 $\text{id}(n)$：$\text{id}(n)=n$。  
3.  常数函数 $\text{1}(n)$：$\text{1}(n)=1$。  
4.  幂函数 $\text{Id}_k(n)$：$\text{Id}_k(n)=n^k$。  
