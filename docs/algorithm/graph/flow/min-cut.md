---
title: 最小割
createTime: 2026/08/17 15:10:06
permalink: /algorithm/graph/flow/min-cut/
---

## 前置知识
[网络流简介](./concept.md){.readmore}
[最大流](./max.md){.readmore}  

## 最大权闭合图

在一个有向图 $G=(V,E)$ 中，对于其一个子图 $G'=(V',E')$，若 $\forall (u,v)\in E',\; u\in V',v\in V'$，则称 $G'$ 为 $G$ 的一个**闭合子图**。  
**最大权闭合图**是指所有闭合子图中，点权和最大的。  