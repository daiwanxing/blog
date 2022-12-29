# 重新认识 typescript

## ts 中的类型系统

typescript 中的类型系统借鉴了数学中的集合的概念，让我先仔细回顾下大学线代课程的集合的概念

-  集合是一组元素的组成的无序的结构，集合的基本单位就是元素，这些元素可以是数字、字符、字母。
-  集合的操作有并集、补集、交集、差集。
-  空集是一个特殊的集合，空集与任意集合的交集总是空集，空集与任意集合的并集是全集.

在 typescript 中，定义以下的类型

```ts
type SN = string | number;

// 这里的类型SN就是string 和 number 的 supertype，它是类型string和类型number的并集.
// 类型SN 同时具有 string 和 number 全部属性.
```

```ts
type SN = string & number;

// 将类型string和类型number做交集运算，取出它们公共的属性 作为类型SN, 这里的类型SN得到的其实是一个never类型
// 因为 类型string 和 类型 number 并无相交的属性.
```
