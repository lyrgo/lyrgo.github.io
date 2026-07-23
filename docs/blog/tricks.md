---
title: 技巧
createTime: 2026/04/24 20:34:50
permalink: /blog/tricks/
sticky: 1
---

## 数论
*   对于一个形如 $\sum f(x)$ 的东西，如果 $f(x)$ 具有递推公式，则可以将其在内部展开，经过拆解，添项转换为 $f(x)$，$f(x-1)$ 之类的，经过消项之后可以得到新的式子。  
    [CF1548C](/blog/solutions/codeforces/CF1548C.md){.readmore}

## DP
*   如果出现状态数与答案范围差距较大，可以考虑交换状态和答案。  
*   树形 DP 中如果子树不好考虑可以考虑全局贡献。  
*   遇到状态无法放入 DP 的转移，可以考虑贡献延后计算。  
    [P14364 [CSP-S 2025] 员工招聘](/blog/solutions/luogu/P14364.md){.readmore}  
*   如果状态与进制有关，且每一位相互独立，可以试试开拆高低位。  
    [3579.晚安。](/blog/solutions/zr/3579.md){.readmore}  

## 字符串
*   遇到字符串替换问题可以将原串与替换串压缩。  
    [P14363 [CSP-S 2025] 谐音替换](/blog/solutions/luogu/P14363.md){.readmore}