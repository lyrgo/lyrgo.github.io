---
title: 模逆元
createTime: 2026/07/29 14:35:00
permalink: /algorithm/math/inverse/
---

## 定义
如果 $ab\equiv 1\pmod m$，称 $b$ 为 $a$ 关于 $m$ 的乘法逆元，记作 $a^{-1}$。  
逆元存在当且仅当 $\gcd(a,m)=1$。  

## 求逆元
### 扩展欧几里得
构造 $ax+my=1$，使用 exgcd 求出一组通解 $x_0,y_0$，把 $x$ 规范到 $[0,m)$ 即可。  

``` cpp
int inv(int a , int MOD) {
    int x , y; exgcd(a , MOD , x , y);
    return (x % MOD + MOD) % MOD;
}
```

### 费马小定理与快速幂
费马小定理告诉我们，当 $p$ 为质数且不整除 $a$ 时，$a^{p-1}\equiv 1\pmod p$，我们将其同时乘 $a^{-1}$，得到 $a^{-1}\equiv a^{p-2}\pmod p$。  
因此，直接使用快速幂计算 $a^{p-2}$ 即可。  

### 线性递推
若 $p$ 为质数，且 $2\leq i<p$，可以利用更小逆元递推出 $i$ 的逆元：
$$
i^{-1}\equiv -\left \lfloor \frac p i \right \rfloor \times (p\bmod i)^{-1} \pmod p
$$

::: tip  证明
我们设 $p=qi+r$，其中 $q=\left\lfloor \frac p i \right\rfloor$，$r=p\bmod i$，模 $p$ 后，显然有：  
$$
qi+r\equiv 0 \pmod p\implies qi\equiv -r\pmod p
$$
由于 $p$ 为质数，并且 $2\leq i<p$，则 $i,r$ 都存在逆元，两边同乘 $i^{-1}r^{-1}$ ,得到：
$$
qr^{-1}\equiv -i^{-1} \pmod p \implies i^{-1}\equiv -qr^{-1} \pmod p 
$$
带入 $q,r$ 即为原式，其中 $0\leq r< i$，它的逆元已经求出。  
:::

``` cpp
void init() {
    inv[1] = 1;
    for(int i = 2 ; i <= n ; i ++) {
        inv[i] = (p - p/i) * inv[p % i] % p;
    }
}
```
时间复杂度 $O(n)$，**必须保证 $p>n$**。

### 线性递推阶乘求逆元
我们可以求出 $1\sim n$ 的阶乘，通过快速幂求出 $n!$ 的逆元后依次求出每个数的逆元。  
``` cpp
void init() {
    fac[0] = 1;
    for(int i = 1 ; i <= n ; i ++)
        fac[i] = fac[i-1] * i % MOD;
    invfac[n] = qpow(fac[n] , MOD-2 , MOD);
    for(int i = n ; i >= 1 ; i --) {
        invfac[i-1] = invfac[i] * i % MOD;
        inv[i] = invfac[i] * fac[i-1] % MOD;
    }
}
```
