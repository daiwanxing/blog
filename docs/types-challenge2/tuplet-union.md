---
sidebar_position: 1
---

Tuple to Union

实现泛型 `TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ["1", "2", "3"];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

## 答案

<details>
```ts
type TupleToUnion<T extends any[]> = T[number]
```
:::info
这种题目不应该被归类为 medium
:::
</details>
