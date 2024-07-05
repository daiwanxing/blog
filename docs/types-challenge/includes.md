---
sidebar_position: 1
---

# Includes

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `fals`

```ts
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
```

## 答案

<details>

下面的 `Equal` 是一个工具类型：https://github.com/type-challenges/type-challenges/blob/main/utils/index.d.ts

```ts
type Includes<T extends readonly any[], U> = T extends [infer P, ...infer Rest]
  ? Equal<P, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
```

:::info
第一次尝试用下面这种方式，发现并不能跑通这种 case: `Expect<Equal<Includes<[1 | 2], 1>, false>>`

```ts
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
```

因为类型 `1` 是可以分配给类型 `1|2` 返回 `true`。但是这里的 `1|2` 应该视作一个整体: `[1|2]`，而不是使用联合类型的分配律。

所以只能换种思路，将数组的每个元素拆散，挨个去匹配，如果能匹配成功就返回 `true`，所以这里还是得用到递归。
:::

</details>
