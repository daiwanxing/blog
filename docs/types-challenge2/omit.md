---
sidebar_position: 1
---

# Omit

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 K 中字段的 T 对象。

例如：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};
```

## 答案

<details>
```ts
type MyOmit<T, K> = {
  [Property in keyof T as Property extends K ? never : Property]: T[Property]
}
```

:::info
这个应该没什么好讲的，`never` 作为 TS 的 **Bottom Type** 在类型映射中根据条件可以排除某些特定的属性
:::

</details>
