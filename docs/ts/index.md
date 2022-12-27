# typescript 题集

## 1. 定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下：

```ts
interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;

//=> {a: string}
```

:::details

```ts
type ConditionalPick<T, U> = {
    [k in keyof T as T[k] extends U ? k : never]: T[k];
};
```
:::

## 2. 定义一个 SetOptional 工具类型， 支持部分属性变得可选，其他属性保持不变，对应的使用示例如下：

```ts
type Foo = {
    a: number;
    b?: string;
    c: boolean;
    d: null;
};

// 测试用例
type Result = SetOptional<Foo, "a" | "b">;

//=> {a?: number; b?: string; c: boolean; d: null}
```
:::details
```ts
type SetOptional<T, U extends keyof T> = {
    [P in U]?: T[P];
} & {
    [P in Exclude<keyof T, U>]: T[P];
};
```
:::

## 3. 定义一个 RemoveDict 类型，支持删除类型中的所有字典类型，对应的使用示例如下：

```ts
type Foo = {
    a: number;
    [index: string]: unknown;
    [index: number]: unknown;
}

// 测试用例
type Result = RemoveDict<Foo>;

//=> {a: number;}
```
:::details
```ts
type RemoveDict<T> = {
    [k in keyof T as string extends k ? never : number extends k ? never : k]: T[k]
}
```
:::

## 4. 定义一个 PickInsideArray 类型, 支持获取数组中的所有项的类型的集合

```ts
type Foo = [number, string, null]

// 测试用例
type Result = PickInsideArray<Foo>;

//=> number | string | null
```


:::details
```ts
type PickInsideArray<T> = T extends Array<infer P> ? P : never;
```
:::

## 5. 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数。

```ts
type Fn = (a: number, b: string) => number
type AppendArgument<F, A> = // 你的实现代码

type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number
```

:::details
```ts
type AppendArgument<F, A> = F extends (...args: infer P) => infer R ? (x: A, ...args: P) => R : never;

type AppendArgument<F, A> = (x: A, ...args: Parameters<F>) => ReturnType<F>;
```
:::
