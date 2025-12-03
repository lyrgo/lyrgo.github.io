---
title: 数位 DP
createTime: 2025/11/30 12:10:19
permalink: /algorithm/number-dp/
---

## _Intro_
数位 DP 类型的题目一般有一种特征：  
某一个区间内满足某种特定条件的数的个数。  

## _tricks_
*   将二维区间 $[L,R]$ 转换为一维。  
    可以设 $f_i$ 表示从 $0$ 到 $i$ 之间的所求数的个数，则问题等价于 $f_R-f_{L-1}$。  

*   ==从树的角度考虑=={.important}。  
    将一个 $n$ 位整数 $N$ 看作 $\overline{a_{n-1}a_{n-2}\dots a_0}$。  
    这时候可以挨个考虑，例如 $a_{n-1}$ 这一项可以分为 $[0,a_{n-1}-1]$ 和 $a_{n-1}$（对于新数来说），以此类推，形成一种树状结构，而左侧分支可以用组合数直接求出，右侧分支只剩余 $a_0$，便可以直接得出答案。

## _Examples_

### Acwing 1081. 度的数量 {#acwing-1081}
[题目传送门](https://www.acwing.com/problem/content/1083/)   
将题目转换一下，会变成求区间 $[L,R]$ 在 $B$ 进制下有 $K$ 个 $1$ 的方案数。  
我们要求从 $0$ 到 $(x)_B$ 的方案数，我们从头到尾考虑，设 $res$ 为当前答案，$last$ 表示填过的 $1$ 的数量。  
若 $x_i > 0$，即存在左分支，当前位填 $0$ 时方案数为 $\binom{i}{K-last}$，否则只能填 $1$，方案数为 $\binom{i}{K-last-1}$ 且不存在右分支（当前位不能填 $x_i$）。  
若最后存在右分支，即 $i=n$ 且 $last=K$，则有额外的一种方案。  

### Acwing 1082. 数字游戏 {#acwing-1082}
[题目传送门](https://www.acwing.com/problem/content/1084/)  
依旧要求 $0$ 到 $n$ 的方案数，但左侧分支的意义改变了为**求最高位为 $j$，位数为 $i$ 的不降数个数**。  
考虑使用递推处理左分支方案数，设 $f_{i,j}$ 表示最高位为 $j$，位数为 $i$ 的不降数个数。  
根据第二位来划分，发现 $f_{i,j}=\sum\limits _{k=j}^9 f_{i-1,k}$，直接预处理即可。  
至于最右侧的分支，则是直接判断 $N$ 是否为不降数。

### Acwing 1083. Windy数 {#acwing-1083}
[题目传送门](https://www.acwing.com/problem/content/1085/)
同上，由于不能有前导 $0$，所以在 $a_{n-1}$ 上只能填 $1$ 到 $x_{n-1}$，其他分支可以填 $0$。  
令 $f_{i,j}$ 表示最高位为 $j$，共有 $i$ 位的 Windy 数个数，根据第二位划分可以得到： $f_{i,j}=\sum\limits _{k=0}^9 f_{i-1,k}(\left|j-k\right|\geq 2)$，预处理即可。  
特别的，对于不足 $n$ 位的数要特判。  

## _Template_
``` cpp
void init() {
    /* 预处理 f */
}

int calc(int n) {
    if(!n) return 0;

    vector<int> nums;
    while(n) nums.push_back(n%10) , n/=10;

    int res = 0 , last = 0;
    for(int i = nums.size()-1 ; i >= 0 ; i --) {
        int x = nums[i];
        for(int j = 0 ; j < x ; j ++) {
            /* 转移 */
        }

        if(/* x 不满足特殊条件 */) break;
        last = /* 特定数值 */;
        if(!i) res ++;
    }
    return res;
}
```