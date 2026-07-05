---
title: 网络流简介
createTime: 2026/07/01 19:17:40
permalink: /algorithm/graph/flow/concept/
---

## 概念
**流网络**：一个特殊的的有向图 $G=(V,E)$，存在一个源点和一个汇点，特别的，每一条边 $(u,v)$ 都有一个容量 $c(u,v)$，若 $(u,v)\notin E$，则假定 $c(u,v)=0$。  

**可行流**：对于任意一个流网络，我们为每条边定义一个流量，则它的可行流 $f$ 满足两个性质：  
1.  流量必须不超过这条边的容量，即 $0\leq f(u,v)\leq c(u,v)$。  
2.  除源点和汇点外，其余点的流入流出相同，形式化的，$\forall x\in V/\{s,t\},\; \sum\limits_{(u,x)\in E}f(u,x)=\sum\limits_{(x,v)\in E}f(x,v)$。  

对于一个可行流，其流量为 $|f|=\sum\limits_{(s,v)\in E}f(s,v)-\sum\limits_{(u,s)\in E}f(u,s)$。  
**最大流**（最大可行流）：所有可行流中流量最大的那个。  

对于一个可行流，我们定义其**残留网络** $G_f$ 的 $V'=V$，所有边 $E'$ 为原图 $E$ 与其所有反向边，并且流量定义为：
$$
c'(u,v)=
\begin{cases}
c(u,v)-f(u,v),\; &(u,v)\in E \\
f(u,v),\; &(u,v)\notin E
\end{cases}
$$
简单来说就是原图中有的边的边权就是剩余能走的流量，没有的反向边就是可以流回去的流量。  

此时有一个定理：一个可行流 $f$ 和它对应的残留网络的可行流 $f'$ 相加一定为原流网络的一个可行流，即 $|f+f'|=|f|+|f'|$（两个流相加：方向相同的边 $c$ 相加，方向不同的边 $c$ 相减）。  
::: tip 证明
先看流量限制：  
如果 $c'(u,v)$ 是第一种情况，此时一定有 $0\leq f'(u,v)\leq c'(u,v)=c(u,v)-f(u,v)$；如果是第二种情况，此时一定有 $0\leq f'(u,v)\leq c'(u,v)=f(v,u)\leq c(v,u)\implies 0\leq f(v,u)-f'(u,v)\leq c(v,u)$。  
再看出入限制：  
由于都是可行流，它们的进入等于输出，又因为方向相同则相加，方向相反的残留网络等价于原网络回退了一部分，也增加了（可以通过代数手法推导，可以发现残留网络的影响为 $0$）。  
:::

如果从残留网络的源点经过若干条容量不为 $0$ 的边到达汇点，这条路径称为**增广路径**。  

如果我们将流网络 $G(V,E)$ 的点集 $V$ 划分成两部分 $S$ 和 $T$，使得 $S\cup T=V$、$S\cap T=\varnothing$，则其为原流网络的一个**割**。  
**割的容量**定义为从 $S$ 到 $T$ 的边的容量之和，即 $c(S,T)=\sum\limits_{u\in S}\sum\limits_{v\in T}c(u,v)$。  

**最小割**指 $2^{n-2}$ 种割中，容量最小的那个。  

**割的流量**定义为从 $S$ 到 $T$ 的流量减从 $T$ 到 $S$ 的容量，即 $f(S,T)=\left(\sum\limits_{u\in S}\sum\limits_{v\in T}f(u,v)\right) - \left(\sum\limits_{v\in T}\sum\limits_{u\in S}f(v,u)\right)$。  
根据割的流量的定义，显然有 $f(S,T)\leq \left(\sum\limits_{u\in S}\sum\limits_{v\in T}f(u,v)\right)\leq \left(\sum\limits_{u\in S}\sum\limits_{v\in T}c(u,v)\right)$，即割的流量不大于割的容量。  

此外，我们还可以得到**任意可行流通过任意割的流量等于其自身流量**，即 $f(S,T)=|f|$，其中 $|f|$ 表示从原点流出的流量。  
::: tip 证明
首先，对于点集 $X,Y$，显然有 $f(X,Y)=-f(Y,X)$、$f(X,X)=0$，若 $X\cap Y=\varnothing$，则对于点集 $Z$ 有 $f(Z,X\cup Y)=f(Z,X)+f(Z,Y)$、$f(X\cup Y,Z)=f(X,Z)+f(Y,Z)$。  
有了这些，我们开始证明 $f(S,T)=|f|$：  
由 $S\cup T=V,f(S,V)=f(S,S)+f(S,T)$，得 $f(S,T)=f(S,V)-f(S,S)=f(S,V)=f(\{s\},V)+f(S-\{s\},V)=f(\{s\},V)=|f|$，其中 $f(S,S)=0,f(S-\{s\},V)=0$，后者可以通过代数手法推导。  
:::
从而推导出 $|f|\leq c(S,T)$，进而得到最大流 $\leq$ 最小割。  

## 最大流最小割定理
定理内容：可行流 $f$ 是最大流 $\iff$ 可行流 $f$ 的残留网络中没有增广路径 $\iff$ $\exists [S,T],|f|=c(S,T)$。  

::: tip 证明
只要证：  
1.  可行流 $f$ 是最大流 $\implies$ 可行流 $f$ 的残留网络中没有增广路径。  
2.  可行流 $f$ 的残留网络中没有增广路径 $\implies$ $\exists [S,T],|f|=c(S,T)$。  
3.  $\exists [S,T],|f|=c(S,T)$ $\implies$ 可行流 $f$ 是最大流。  

先看 1，若最大流 $f$ 的 $G_f$ 中存在增广路径，将 $G_f$ 的可行流记作 $f'$，则有 $|f+f'|>|f|$，且 $f+f'$ 也是可行流，与题设矛盾，故 1 得证。  

再看 3，显然最大流 $\leq c(S,T)$，那么 $|f|=c(S,T)\geq$ 最大流，又因为最大流 $\geq |f|$，所以最大流 $=|f|$。  

最后看 2，考虑构造点集 $S,T$，其中 $S$ 为从 $s$ 出发，在 $G_f$ 上沿容量大于 $0$ 的边走到的点，$T=V-S$。  
此时 $\forall x\in S,y\in T,\; f(x,y)=c(x,y)$，若 $f(x,y)\neq c(x,y)$，则一定有 $c(x,y)-f(x,y)>0$，此时 $(x,y)>0$，则 $y\in S$，矛盾，所以原题设成立；同理，$f(y,x)=0$，证明方法相同，考虑反向边 $>0$ 即证。  
结合两个结论，我们得到 $|f|=f(S,T)=\sum\limits_{u\in S}\sum\limits_{v\in T}c(u,v)=c(S,T)$，证毕。  
:::