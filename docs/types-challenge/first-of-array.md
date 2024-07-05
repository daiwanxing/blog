---
sidebar_position: 1
---

# First of Array

实现一个 `First<T>` 泛型，它接受一个数组 `T` 并返回它的第一个元素的类型。

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // 应推导出 'a'
type head2 = First<arr2>; // 应推导出 3
```

## 答案

<details>
```ts
type First<T extends any[]> = T extends [infer K, ...args: any[]] ? K :never 
```

:::tip
通过 `infer` 关键字推断第一个元素的类型并返回即可
:::

</details>
