---
sidebar_position: 1
---

# Concat

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

```ts
type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

## 答案

<details>
```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]
```

</details>
