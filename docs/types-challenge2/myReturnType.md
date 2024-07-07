---
sidebar_position: 1
---

# ReturnType

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

例如：

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"
```

## 答案

<details>
```ts
type MyReturnType<T> = T extends (...args: any[]) => infer P ? P : never
```

</details>
