# 整理一些前端计算用到的数学公式

## 三角函数

### 给定一个容器， 其宽为x，高为y，求得其对角线的长度 ？

```js
// 长的平方 + 宽的平方，再开平方，就求得对角线的长
const diagonalLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
```

### 给定一个容器， 其宽为x，高为y，求得其对角线的角度 ？

```js
// 利用反正切公式，
const diagonalDeg = Math.atan(height / width) * (180 / Math.PI); // 乘以(180 / Math.PI)的目的是将弧度值转换为角度值
```
