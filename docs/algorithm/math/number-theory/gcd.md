---
title: 最大公因数
createTime: 2026/04/21 18:29:36
permalink: /algorithm/math/number-theory/gcd/
---

## 定义
**公因数**是指一个数是一组数中每个数的因数。  
**最大公因数**是指公因数中最大的那个。  

通常写作 $\gcd(a,b)$ 或 $(a,b)$。  

## 欧几里得算法
对于两个数 $a$ 和 $b$（$a>b$），怎么求它们的最大公因数呢？  
显然，若 $a\bmod b=0$，则 $b$ 为两者最大公因数；若 $a\bmod b\neq 0$，则 $\gcd(b,a\bmod b)$ 即为最大公因数，下面给出证明。  

::: details 证明 $gcd(a,b)=gcd(b,a\bmod b)$
令 $a=k\times b+c\ (0\leq c<b)$。  

先证充分性。  
设正整数 $d$ 满足 $d\mid a$ 且 $d\mid b$。  
由于 $c=a-k\times b$，则有 $\frac c d=\frac a d-k\times \frac b d$，此时右边都为整数，则 $\frac c d$ 也为整数，即 $d\mid c$ 成立。  
因此，$\gcd(a,b)\Rightarrow\gcd(b,a\bmod b)$。  

再证必要性。  
设正整数 $d$ 满足 $d\mid c$ 且 $d\mid b$。  
由于 $c+k\times b=a$，则有 $\frac c d+k\times \frac b d=\frac a d$，此时左边都为整数，则 $\frac a d$ 也为整数，即 $d\mid a$ 成立。  
因此，$\gcd(b,a\bmod b)\Rightarrow\gcd(a,b)$。  
:::

那么复杂度怎么样呢？我们来讨论一下：  
1.  若 $a<b$，递归 $\gcd(b,a)$。
2.  若 $a\geq b$，递归 $\gcd(b,a\bmod b)$，显然 $a$ 大小至少缩小一倍，而每发生一次 $1$，一定接着发生 $2$，即最多递归 $\log V$ 层。  

即复杂度为 $O(\log \min(a,b))$。  

## Stein 算法
由于大整数的除法及取模操作及其昂贵，而减法与位移操作很快，所以 Stein 算法诞生了。  

具体原理是根据奇偶性进行分类：
1.  若 $a$ 和 $b$ 都是偶数，显然 $\gcd(a,b)=2\times\gcd(\frac a 2,\frac b 2)$。  
2.  若 $a$ 为偶数，$b$ 为奇数，显然 $\gcd(a,b)=\gcd(\frac a 2,b)$。  
3.  若 $a$ 和 $b$ 都是奇数，显然 $\gcd(a,b)=\gcd(\left|a-b\right|,\min(a,b))$。  

时间复杂度为 $O(\log V)$。  

## 扩展欧几里得算法
[裴蜀定理](./bezouts.md){.readmore}
求对于不全为零的整数 $a,b$，$ax+by=\gcd(a,b)$ 的一组整数解 $(x,y)$。  
对于当前的 $a,b$，考虑进行分讨：
1.  $b=0$ 时，显然一组解为 $x=1,y=0$。  
2.  对于下一层状态 $(b,a\bmod b)$ 的解 $x',y'$，显然有 $bx'+(a\bmod b)y'=\gcd(b,a\bmod b)$，将 $a\bmod b=a-a\times\left\lfloor \frac a b \right\rfloor$ 带入并整理，得到 $bx'+(a-a\times\left\lfloor \frac a b \right\rfloor)y'=\gcd(a,b)$，其中 $\gcd(a,a\bmod b)=\gcd(a,b)$。  
    然后，考虑把这个式子写成 $ax+by=\gcd(a,b)$ 的形式，也就是 $a\cdot y'+b\cdot (x'-\left\lfloor \frac a b \right\rfloor)$，所以回溯公式为：

$$
\begin{cases}
x=y' \\
y=x'-\left\lfloor \frac a b\right\rfloor\cdot y'
\end{cases}
$$

那么如何从 $ax+by=\gcd(a,b)$ 扩展到 $ax+by=c$ 呢？  
显然，必须有 $\gcd(a,b)\mid c$。  
有了这个大前提，我们先对 $\gcd(a,b)$ 求出一组特解 $x_0$ 和 $y_0$，然后将其扩倍，显然现在的一组解是 $x_1=x_0\times \frac{c}{\gcd(a,b)}$、$y_1=y_0\times \frac c {\gcd(a,b)}$。  
有了这组特解，我们可以写出**通解公式**：
$$
\begin{cases} 
 x=x_1+k\times \frac{b}{\gcd(a,b)} \\
 y=y_1-k\times \frac{a}{\gcd(a,b)}
\end{cases}
\quad (k\in \mathbb Z)
$$
直观的讲，就是在满足 $ax+by=c$ 的情况下将 $x,y$ 进行一增一减来构造所有解。  

特别的，如果想要求出最小的 $x>0$，则答案为 $x_{\min}=(x_1\bmod m+m)\bmod m$（其中 $m=\left|\frac{b}{\gcd(a,b)}\right|$）