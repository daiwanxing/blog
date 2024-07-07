---
sidebar_position: 1
---

# Readonly

实现一个泛型 `MyReadonly2<T, K>`，它带有两种类型的参数 T 和 K。

类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供 K，则应使所有属性都变为只读，就像普通的 `Readonly<T>` 一样。

例如

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

## 答案

<details>
```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [Key in keyof T as Key extends K ? Key : never]: T[Key]
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}
```

:::tip
这题不难，关键要读懂题目意思，如果传了泛型 `K`，那就只将泛型 `K` 里的属性设置为 `readonly`，其他的属性不变。

如果没传 `K`,由于这里的 `K` 会给一个默认的类型 `= keyof T`, 所以就能实现所有的属性变为只读再和一个 `{}` 交叉。
:::

:::info

```ts
// 看到的更简洁的答案
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;
```

:::

</details>
