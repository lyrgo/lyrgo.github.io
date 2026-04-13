---
title: 递推
createTime: 2026/04/13 20:34:35
permalink: /algorithm/misc/recurrence/
---

## 简介
这里主要记载一些递推思维的体现题。  

## 例题
### AcWing 95. 费解的开关{#acwing-95}
<LinkCard title="AcWing 95. 费解的开关" href="https://www.acwing.com/problem/content/97/">

由于只有 $5\times 5$ 的方格，一个比较朴素的方式是从终止状态（全是 $1$）开始用 BFS 按 $6$ 次，记录所有可行方案然后直接对比。  
可是这样子时间复杂度有亿点点不好算（总 $2^{25}$ 种，但实际可行小很多）。  
接下来发现一个性质：如果第一行确定了，则后面所有操作也确定了（考虑每次按上面是 $0$ 的格子，到最后看最后一行是否全是 $1$ 即可），因此，我们可以枚举第一行按的状态，然后进行递推处理。  

</LinkCard>