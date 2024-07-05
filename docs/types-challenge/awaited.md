---
sidebar_position: 1
---

# Awaited

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```ts
type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];
```

## 答案

<details>
```ts
type MyAwaited<T> = T extends Promise<infer P> ? 
                    MyAwaited<P> : 
                    T extends { then: (onfulfilled: (arg: infer Y) => any) => any } ? 
                    Y : T
```

:::tip
这里用到了递归是为了判断 `Promise` 里面再包了多层的 `Promise` 的场景。

另外第二个三元表达式是为了跑通：`{ then: (onfulfilled: (arg: number) => any) => any }`。因为这也是一个合法的 Promise，拥有 thenable 对象。
:::

</details>
