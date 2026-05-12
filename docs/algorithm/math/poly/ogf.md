---
title: 普通生成函数
createTime: 2026/05/12 12:51:21
permalink: /algorithm/math/poly/ogf/
---

## 定义
对于一个离散的数列 $a$，定义它的普通生成函数为：
$$
A(x)=\sum_{n=0}^\infty a_nx^n=a_0+a_1x+a_2x^2+\cdots
$$
对于算法竞赛而言，我们不考虑收敛域的问题，这里的 $x$ 仅是一个占位符，我们真正关心的是如何将 $x^k$ 的系数 $a_k$ 取出来。  

## 麦克劳林展开
如果已经知道 $A(x)$ 的具体表达式，怎么求 $a_k$？  
*   对于 $a_0$，显然只需要将 $x=0$ 就可以了。  
*   对于 $a_1$，先对 $A$ 求一阶导数 $A'$，再代入 $x=0$ 即可。  

以此类推，想要提取 $a_k$ 就需要对 $A$ 一直求导，那么 $a_kx^k$ 这一项的系数会受到 $k\times (k-1)\times \cdots \times 1=k!$ 的连乘。  

综上，对于一个在 $x=0$ 处无穷可导的函数 $f(x)$，都可以展开为无穷多项式，且第 $n$ 项的系数为：
$$
a_n=\frac{f^{(n)}(0)}{n!}
$$
这就是麦克劳林展开。 

## 封闭形式
我们已经了解了生成函数的展开，那么有没有简短一点的形式呢？有的有的，就是封闭形式。  

我们以 $\{1,1,\cdots,1\}$ 为例，它的普通生成函数为 $F(x)=\sum_{n=0}^\infty x^n$，可以发现有 $F(x)x+1=F(x)$，解这个方程得到 $F(x)=\frac 1 {1-x}$，也就是这个 OGF 的封闭形式。  


## 代数操作
两个生成函数相加减，等于对应序列系数相加减：
$$
A(x)\pm B(x)=\sum_{n=0}^\infty(a_n\pm b_n)x^n
$$

一个序列平移，将整体提升 $x^k$：
$$
x^k\times A(x)=\sum_{n=0}^\infty a_nx^{n+k}=\sum_{n=0}^\infty a_{n-k}x^n
$$

两个生成函数相乘，相当于原序列的**离散卷积**：
$$
A(x)B(x)=\sum_{n=0}^\infty\left(\sum_{i=0}^n a_i b_{n-i}\right)x^n
$$

一个序列 $A$ 进行前缀和操作，考虑将序列 $A$ 与 $B=\{1,1,\cdots,1\}$ 相乘，得到：
$$
A(x)\cdot \frac 1{1-x}=\sum_{n=0}^\infty\left(\sum_{i=0}^n a_i\right)x^n
$$
容易发现，每个 $x^i$ 的系数恰好变成了 $\sum a_i$。  

一个序列每一项乘其下标，即原序列变成 $\{0\times a_0,1\times a_1x,2\times a_2x^2,\cdots,i\times a_ix^i\}$，考虑先对 $A$ 求导，在乘 $x$ 进行补位：
$$
xA'(x)=x\sum_{n=1}^{\infty} n\cdot a_nx^{n-1}=\sum_{n=0}^{\infty} n\cdot a_nx^n
$$

## 斐波那契数列的生成函数
已知 $f_0=1,f_1=0$，且 $\forall n\geq 2,f_n=f_{n-1}+f_{n-2}$，求 $f_n$ 生成函数封闭形式及其通项公式。  

令 $F(x)=\sum_{n=0}^\infty f_nx^n$，根据递推式构造生成函数：
$$
\begin{alignat*}{5}
F(x) & = f_0 & + & f_1 & + & \sum_{n=2}^{\infty} f_nx^n \\
xF(x) & = 0 & + & f_0x & + & \sum_{n=2}^{\infty} f_{n-1}x^n \\
x^2F(x) & = 0 & + & 0 & + &\sum_{n=2}^{\infty} f_{n-2}x^n \\ 
\end{alignat*}
$$
将上式带入递推关系 $F(x)-xF(x)-x^2F(x)$ 进行消项，得到 $x$，提取公因式后解得封闭形式：
$$
F(x)=\frac 1 {1-x-x^2}
$$

得到了封闭形式，我们来尝试将其展开，首先进行因式分解，即 $1-x-x^2=(1-\alpha x)(1-\beta x)$，得到 $\alpha=\frac{1+\sqrt 5} 2,\beta=\frac{1-\sqrt 5}2$，带入原式后拆分为常用的等比数列求和形式：
$$
F(x)=\frac x{(1-\alpha x)(1-\beta x)}=\frac A {1-\alpha x}+\frac B {1-\beta x}
$$
通过待定系数，得到 $A=\frac 1 {\sqrt 5},B=-\frac 1{\sqrt 5}$，然后带入原式并进行展开：
$$
F(x) = \frac{1}{\sqrt{5}} \left( \sum_{n=0}^\infty \alpha^n x^n - \sum_{n=0}^\infty \beta^n x^n \right) = \sum_{n=0}^\infty \frac{1}{\sqrt{5}} (\alpha^n - \beta^n) x^n
$$
由此，我们得到斐波那契数列的通项公式：
$$
f_n = \frac{1}{\sqrt{5}} \left[ \left( \frac{1 + \sqrt{5}}{2} \right)^n - \left( \frac{1 - \sqrt{5}}{2} \right)^n \right]
$$

## 生成函数乘法与排列组合
假设我们有两个物品集合 $A$ 和 $B$，集合 $A$ 有一种总重量为 $i$ 的选取方案记为 $x^i$，同样地 $B$ 有一种总重量为 $j$ 的选取方案 $x^j$，如果我们将两个选择合并，总重量 $i+j$，恰好对应代数乘法 $x^i\cdot x^j=x^{i+j}$。  

一些选取模型：
*   无限制，可选任意多个：  
    $1+x+x^2+\cdots=\frac 1{1-x}$
*   最多选取 $k$ 个：  
    $1+x+x^2+\cdots+x^k=\frac{1-x^{k+1}}{1-x}$  
    上式可以从等比数列求和或组合意义（选取任意多个减去选取多于 $k$ 个的）得到。
*   只能选取偶数个：  
    $1+x^2+x^4+\cdots=\frac 1 {1-x^2}$  
    上式可以从无限制选取推得。  
*   只能选取 $k$ 的倍数个：  
    $1+x^k+x^{2k}+\cdots=\frac 1 {1-x^k}$  