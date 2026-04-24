---
title: 排列组合
createTime: 2026/04/24 19:40:17
permalink: /algorithm/combinatorics/combination/
---

## 曲棍球棒定理
$$
\sum^n_{i=x} \binom{i}{x}=\binom{n+1}{x+1}
$$

::: details 证明
由组合数学基本公式：$\binom{i}{x}=\binom{i}{x-1}+\binom{i-1}{x-1}$，可以将其中每一项拆开后按顺序合并即可。
:::