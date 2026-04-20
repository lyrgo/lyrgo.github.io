---
title: 矩阵
createTime: 2026/04/19 10:27:37
permalink: /algorithm/math/linear-algebra/matrix/
---

$$
\begin{bmatrix}
f(n) \\
f(n-1) \\
f(n-2) \\
\vdots \\
f(n-k+1)
\end{bmatrix}
=
\begin{bmatrix}
a_1 & a_2 & a_3 & \cdots & a_k \\
1 & 0 & 0 & \cdots & 0 \\
0 & 1 & 0 & \cdots & 0 \\
\vdots & \vdots & \ddots & \ddots & \vdots \\
0 & 0 & \cdots & 1 & 0
\end{bmatrix}
\begin{bmatrix}
f(n-1) \\
f(n-2) \\
f(n-3) \\
\vdots \\
f(n-k)
\end{bmatrix}
$$

https://www.luogu.me/article/srdbw7fa