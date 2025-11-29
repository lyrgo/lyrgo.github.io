---
title: 绝对值不等式
createTime: 2025/11/16 17:27:46
permalink: /algorithm/abs-inequality/
---

## 简介
若存在 $n$ 个单调不减数记作 $a_1$ 到 $a_n$，将其放置在数轴上，此时若想取一点 $x$，使得 $|a_1-x|+|a_2-x|+...+|a_n-x|$ 最小，则 $x$ 应取在中间点处。

## 证明
考虑仅存在两个数 $a_1$ 和 $a_2$，则 $|a_1-x|+|a_2-x|\geq |a_1-a_2|$。  
扩展到 $n$ 个数，则可以将 $a_1$ 和 $a_n$ 放一组，直到全部配对或剩一个，若全部配对则可以任意取 $a_{\frac n 2}$ 到 $a_{\frac n 2+1}$ 中的一点，若仅剩一个则取那一个数的位置。

这个过程也可以理解为每次固定左右两端的范围，然后依次缩小。  
所以绝对值不等式一般形式为：

::: center
$$
|a_1-x|+|a_2-x|+...+|a_n-x|\geq |a_1-a_n|+|a_2-a_{n-1}|+...
$$
:::
若 $n$ 为奇数则后面还有一项下标为 $\left\lceil \frac n 2\right\rceil$。  
如果要求最小值，只需要把中间点下标看作 $\left\lfloor \frac n 2\right\rfloor$  

::: important
可以使用 `nth_element` 将时间复杂度优化至 $O(n)$。
:::

实际上，如果注意力惊人会发现：
::: center
$$
\sum^n_{i=1} |a_i-a_\frac n 2|=\sum^n_{i=1} |a_i-a_\frac i 2|
$$
:::
::: details 证明如下
*   若 $n$ 为奇数。  
    将第一项展开，可以得到：  
    $$
    \begin{align*}
    \sum^n_{i=1} |a_1-a_\frac n 2| &= \underbrace{(a_n-a_\frac n 2)+(a_{n-1}-a_\frac n 2)+...}_{\text{共}\frac n 2-1\text{项}} +(a_\frac n 2-a_\frac n 2)+\underbrace{...+(a_\frac n 2-a_2)+(a_\frac n 2-a_1)}_{\text{共}\frac n 2-1\text{项}} \\
    &= a_{\frac n 2+1}+a_{\frac n 2+2}+...+a_{n-1}+a_n-a_0-a_1-...-a_{\frac n 2-2}-a_{\frac n 2-1}
    \end{align*}
    $$
    将右侧展开，可以得到：  
    $$
    \begin{align*}
    \sum^n_{i=1} |a_i-a_\frac i 2| &= a_1+a_2+...+a_{n-1}+a_n-2(a_1+a_2+...+a_{\frac n 2-1})-a_\frac n 2 \\
    &= a_{\frac n 2+1}+a_{\frac n 2+2}+...+a_{n-1}+a_n-a_0-a_1-...-a_{\frac n 2-2}-a_{\frac n 2-1}
    \end{align*}
    $$
    证毕。
*   若 $n$ 为偶数。  
    同理。
:::

## 扩展
*   扩展到 $d$ 维空间
    算法：模拟退火