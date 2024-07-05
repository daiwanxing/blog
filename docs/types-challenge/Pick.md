---
sidebar_position: 1
---

# Pick

不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。从类型 T 中选出符合 K 的属性，构造一个新的类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

## 答案

<details>
```ts
type MyPick<T, U> = {
    [k in keyof T as k extends U ? k : never]: T[k]
}
```

</details>
