---
title: 三角函数
createTime: 2025/11/30 18:19:41
permalink: /study/07s1ojm3/
---

## 前话
起因是什么呢？这个荀弱在学三角函数的时候背不下来公式，故作此篇。

## 定义
在一个平面直角坐标系中，设 $\alpha$ 为任意角，终边上任意一点 $P$ 坐标为 $(x,y)$，它与原点的距离为 $r\left(r=\sqrt{x^2+y^2}>0\right)$。  

*   比值 $\large\frac{y}{r}$ 叫做 $\alpha$ 的正弦，记作 $\sin \alpha=\large\frac{y}{r}$
*   比值 $\large\frac{y}{r}$ 叫做 $\alpha$ 的余弦，记作 $\cos \alpha=\large\frac{x}{r}$
*   比值 $\large\frac{y}{r}$ 叫做 $\alpha$ 的正切，记作 $\tan \alpha=\large\frac{y}{x}$

:::table title="三角函数定义域及值域" align="center"
|     函数     |   定义域    |  值域  |
|:-----------:|:----------:|:------:|
|$\sin \alpha$|$\mathbb{R}$|$[-1,1]$|
|$\cos \alpha$|$\mathbb{R}$|$[-1,1]$|
|$\tan \alpha$|$\left\{ \alpha \| \alpha \neq \frac{\pi}{2} + k\pi,k\in\mathbb{Z}\right\}$|$\mathbb{R}$|
:::

:::table title="三角函数各象限符号" align="center"
|函数          |第一象限|第二象限|第三象限|第四象限|
|:-----------:|:-----:|:-----:|:----:|:-----:|
|$\sin \alpha$|$+$    |$+$    |$-$   |$-$    |
|$\cos \alpha$|$+$    |$-$    |$-$   |$+$    |
|$\tan \alpha$|$+$    |$-$    |$+$   |$-$    |
|$\cot \alpha$|$+$    |$-$    |$+$   |$-$    |
:::

## 特殊值
:::table title="特殊角的三角函数值" align="center"
|角 $\alpha$|$0$|$\frac\pi 6$|$\frac\pi 4$|$\frac\pi 3$|$\frac\pi 2$|$\frac{2\pi}{3}$|$\frac{3\pi}{4}$|$\frac{5\pi}{6}$|$\pi$|$\frac{3\pi}{2}$|$2\pi$|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|$\sin \alpha$|$0$|$\frac 1 2$|$\frac{\sqrt{2}}{2}$|$\frac{\sqrt{3}}{2}$|$1$|$\frac{\sqrt{3}}{2}$|$\frac{\sqrt{2}}{2}$|$\frac 1 2$|$0$|$-1$|$0$|
|$\cos \alpha$|$0$|$\frac{\sqrt{3}}{2}$|$\frac{\sqrt{2}}{2}$|$\frac 1 2$|$0$|$-\frac 1 2$|$-\frac{\sqrt{2}}{2}$|$-\frac{\sqrt{3}}{2}$|$-1$|$0$|$1$|
|$\tan \alpha$|$0$|$\frac{\sqrt{3}}{3}$|$1$|$\sqrt{3}$|X|$-\sqrt{3}$|$-1$|$\frac{\sqrt{3}}{3}$|$0$|X|$0$|
:::

## 公式
### 诱导公式

$\sin(-\alpha)=-\sin \alpha$  
$\cos(-\alpha)=\cos \alpha$  

$\sin(\pi+\alpha)=-\sin \alpha$  
$\cos(\pi+\alpha)=-\cos \alpha$  
$\tan(\pi+\alpha)=\tan \alpha$  
$\cot(\pi+\alpha)=\cot \alpha$  

$\sin(\pi-\alpha)=\sin \alpha$  
$\cos(\pi-\alpha)=-\cos \alpha$  
$\tan(\pi-\alpha)=-\tan \alpha$  
$\cot(\pi-\alpha)=-\cot \alpha$  

$\sin(\frac{\pi}{2}+\alpha)=\cos \alpha$  
$\cos(\frac{\pi}{2}+\alpha)=-\sin \alpha$  

$\sin(\frac{\pi}{2}-\alpha)=\cos \alpha$  
$\cos(\frac{\pi}{2}-\alpha)=\sin \alpha$  

$\sin(-\frac{\pi}{2}-\alpha)=-\cos \alpha$  
$\cos(-\frac{\pi}{2}-\alpha)=-\sin \alpha$  

### 奇变偶不变，符号看象限
对于三角函数 $y=\sin(m\times \frac{\pi}{2}+\varphi)$，假定 $\varphi$ 为第一象限角。  
1.  若 $m$ 为偶数，函数名不变，根据 $m\times \frac{\pi}{2}+\varphi$ 所在象限变换符号。  
2.  若 $m$ 为奇数，函数名改变，根据 $m\times \frac{\pi}{2}+\varphi$ 所在象限变换符号。  

### 两个角之间的公式
*   两角和的正弦公式：$\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$  
    可以通过 $\sin(\alpha+\beta)=\cos\left(\frac{\pi}{2}-(\alpha+\beta)\right)$ 证明。
*   两角差的正弦公式：$\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta$  
    可以通过 $\sin(\alpha-\beta)=\cos\left(\frac{\pi}{2}-(\alpha-\beta)\right)$ 证明。
*   两角和的余弦公式：$\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta$  
    可以通过在第一象限内从 $x$ 轴向下取 $\beta$ 证明。
*   两角差的余弦公式：$\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta$  
    可以通过在第一象限内从 $y$ 轴向右取 $\alpha$ 证明。
*   两角差的正切公式：$\tan(\alpha-\beta)=\frac{\tan\alpha-\tan\beta}{1+\tan\alpha\tan\beta}$  
    可以通过将上述公式带入证明。

### 辅助角公式
$a\sin x+b\cos x=\sqrt{a^2+b^2}\sin(x+\theta)$  
其中：  
$\sqrt{a^2+b^2}\geq r$  
$\cos\theta=\frac{a}{\sqrt{a^2+b^2} }$  
$\sin\theta=\frac{b}{\sqrt{a^2+b^2} }$  

通常用 $\tan\theta=\frac b a$ 确定 $\theta$

### 万能公式
$\sin\alpha=\large\frac{2\tan\frac{\alpha}{2} }{1+\tan^2\frac{\alpha}{2}}$  

$\cos\alpha=\large\frac{1-\tan^2\frac{\alpha}{2} }{1+\tan^2\frac{\alpha}{2} }$  

$\tan\alpha=\large\frac{2\tan\frac{\alpha}{2} }{1-\tan^2\frac{\alpha}{2} }$  