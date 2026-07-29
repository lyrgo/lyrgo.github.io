---
title: 中国剩余定理
createTime: 2026/07/29 15:14:12
permalink: /algorithm/math/crt/
---

## 定义
CRT 用来求解以下形式的一元线性同余方程组：
$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\vdots \\
x \equiv a_k \pmod{m_k}
\end{cases}
$$

## 中国剩余定理
CRT 要求所有 $m$ 必须**两两互质**，我们设
$$
P=\prod_{i=1}^k m_i,\; r_i=\frac P {m_i}
$$
显然，$r_i$ 中包含除 $m_i$ 以外的两两互质的质数，即 $\gcd(r_i,m_i)=1$，即 $r_i$ 在模 $m_i$ 意义下有逆元。  
考虑构造 $y_i\equiv a_i\cdot r_i^{-1} \pmod {m_i}$，则 $x_i=y_i\cdot r_i$。  
则 $x_i$ 模 $m_i$ 为 $a_i$，模其他 $m_j$ 都为 $0$，我们对于每个 $i$ 都这么构造，最终所有的叠加起来即为原方程组一个解，我们将所有 $x_i$ 相加：
$$
x=\sum_{i=1}^k x_i\equiv \sum_{i=1}^k a_i\cdot r_i\cdot r_i^{-1} \pmod P
$$
注意：**这里的 $r_i^{-1}$ 是在其对应的 $m_i$ 下的逆元**。

``` cpp
LL M = 1;
for(int i = 1 ; i <= n ; i ++) M *= m[i];
for(int i = 1 ; i <= n ; i ++) {
    LL Mi = M / m[i] , ti = inv(Mi%m[i] , m[i]);
    ans = (ans + (int128) a[i] * Mi % M * ti % M) % M;
}
```

## 扩展中国剩余定理
与 CRT 不同，由于每个 $m$ 不能保证两两互质，我们考虑合并同余方程，比如我们要合并  
$$
x\equiv a_1\pmod {m_1}
$$
和
$$
x\equiv a_2\pmod {m_2}
$$
只需要将 $x=a_1+m_1\cdot k$ 带入第二个方程：
$$
m_1\cdot k\equiv a_2-a_1\pmod {m_2}
$$
这样就转换成了一次同余方程，取 $g=\gcd(m_1,m_2)$：
-   若 $g \nmid (a_2-a_1)$，原方程无解。
-   否则考虑解出 $m_1\cdot x+m_2\cdot y=g$ 的特解 $x_0$，由于 $g\mid (a_2-a_1)$，两边同乘 $\frac{a_2-a_1}{g}$ 得到特解 $k_0$，我们直接，新余数为 $a_1+m_1\cdot k$，新模数为 $\text{lcm}(m_1,m_2)=\frac {m_1} g\cdot m_2$。  

不断把新方程合并，就能得到最终结果。  
``` cpp
LL M = 1 , ans = 0;
for(int i = 1 ; i <= n ; i ++) {
    LL x , y; LL g = exgcd(M , m[i] , x , y);
    LL nM = M / g * m[i];
    ans = (ans + (int128) (((int128(a[i]-ans)/g * x % (m[i]/g)) + m[i]/g) % (m[i]/g)) * M % nM) % nM;
    M = nM;
}
```