---
sidebar_position: 5
---

# Tuple to Object

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

// expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
type result = TupleToObject<typeof tuple>;
```

## 答案

<details>
```ts
type TupleToObject<T extends readonly any[]> = {
  [k in T[number]]: k
}
```

:::caution
传入的泛型 `T` 一定要断言成字面量数组，否则会得到宽泛的 `string` 或者 `number` 类型的数组，无法得到正确的转换后的类型结果。

```ts
type A1 = [1, 2, 3]; // number[]

type A2 = [1, 2, 3] as const; // [1,2,3]
```

为什么要断言成字面量数组的类型？因为这样的目的是能准确的得到数组的元素值作为类型。

可以通过 `T[number]` 得到泛型 `T` 数组的所有的下标对应的元素类型的一个 Union，再用 `in` 遍历联合类型的成员即可。

:::

</details>
