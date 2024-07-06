---
sidebar_position: 1
---

# Parameters

实现内置的 `Parameters` 类型，而不是直接使用它，可参考 [TS 官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)

```ts
const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```

## 答案

<details>
```ts
type MyParameters<T extends (...args: any[]) => any> 
    = T extends (...args: [...infer Rest]) => any ? Rest : []
```

</details>
