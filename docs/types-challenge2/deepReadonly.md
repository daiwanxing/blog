---
sidebar_position: 1
---

# Deep Readonly

实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如：

```ts
type X = {
  x: {
    a: 1;
    b: "hi";
  };
  s;
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

## 答案

<details>
```ts
type DeepReadonly<T> = T extends object ? {
  readonly [k in keyof T]: DeepReadonly<T[k]>
}: T
```ds
</details>
