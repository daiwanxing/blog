---
sidebar_position: 1
---

# Unshift

实现类型版本的 `Array.unshift`。

```ts
type Result = Unshift<[1, 2], 0>; // [0, 1, 2]
```

## 答案

<details>
```ts
type Unshift<T extends readonly any[], U> = [U, ...T]
```

</details>
