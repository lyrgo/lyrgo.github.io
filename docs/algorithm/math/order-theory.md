---
title: 序理论
createTime: 2026/05/10 10:48:56
permalink: /algorithm/math/order-theory/
---

## 定义
### 二元关系
对于集合 $S$ 中的元素 $x$ 定义关系 $R$，定义如下性质：
*   自反性：$xRx$。  
*   反自反性：$\neg(xRx)$
*   对称性：$xRy\Leftrightarrow yRx$
*   反对称性：$(xRy\wedge yRx)\Rightarrow x=y$
*   非对称性：$xRy\Rightarrow\neg(yRx)$
*   传递性：$(aRb)\wedge (bRc)\Rightarrow aRc$
*   连接性：$a\neq b\Rightarrow (aRb\vee bRa)$

## 偏序集
若集合 $S$ 上的一个二元关系 $\preceq$ 具有**自反性**、**反对称性**、**传递性**，则称 $S$ 是**偏序集**，$\preceq$ 为其上一**偏序**。  
若偏序 $\preceq$ 还具有**连接性**，则称其为**全序**，对应的集合称为**全序集**、**线性序集**、**简单序集**。  