---
title: 数论基础
createTime: 2026/04/14 20:22:17
permalink: /algorithm/math/basic/
---

## 带余除法
对于任意 $a\in\mathbb{Z},b\in\mathbb{N^+}$，存在**唯一**的一对整数 $q,r$ 使得 $a=b\times q+r\ (0\leq r<b)$。  

**整除**：若 $r=0$，则称 $b$ 整除 $a$，记作 $b\mid a$。  
性质：  
*   传递性：若 $a\mid b$ 且 $b\mid c$，则 $a\mid c$。  
*   线性组合：若 $d\mid a$ 且 $d\mid b$，则对于任意 $x,y$，有 $d\mid (a\times x+b\times y)$。  