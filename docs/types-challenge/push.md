---
sidebar_position: 1
---

# Push

在类型系统里实现通用的 `Array.push`。

```ts
type Result = Push<[1, 2], "3">; // [1, 2, '3']
```

## 答案

<details>
```ts
type Push<T extends any[], U> = [...T, U]
```
</details>
