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

在集合中我们知道空集不属于任意集合，而在 typescript 中`never`类型同样也是不能被其他任何类型所分配。

-  `never` 与 其他类型 进行类型交叉 得到的永远是 `never`。

-  `never` 与其他类型进行联合，得到的永远都是其他的类型。

`never`是 typescript 类型系统中的底端集合，而与之相反的，`unknown`是 typescript 中的顶端集合.

`unknown`表示的是任何类型，如果一个变量的类型是`unknown`，那么它可以被任意其他的类型的变量所分配.`unknown`此外还具备类型收窄的功能.

什么是类型收窄？类型收窄会在代码块中的每个 if...else，switch...case 中，根据表达式返回的值的类型判断变量的类型.

```ts
function print(arg: unknown) {
   // isArray 如果为true， 那么 arg的值的类型会被限定为数组类型
   if (Array.isArray(arg)) {
      // 在这个代码块, arg已经被收窄成了Array类型
      arg.push(100);
   }
}
```
