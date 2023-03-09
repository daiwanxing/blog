# Typescript Change-log

## 4.1

### Template Literal Types (模板文字类型)

在 typescript 中，除了会用到一些常用的类型`boolean`、`string`、`number`、`null`等等，我们还可以用字符串文字类型进行值的拼写检查，约束变量的值的类型只能是特定的某些字符串文字类型。

```ts
function printFruit(fruit: "apple" | "pear" | "watermelon") {
   //
}

printFruit("app"); // error

printFruit("apple"); // ok √
```

在 ts4.1 版本中还带来了模板字面量类型，这种写法和 es6 中的模板文字类型的完全相似.

```ts
type World = "world";

type HelloWorld = `Hello ${World}`;
```

当模板文字类型和联合类型进行组合时，会根据分布式条件类型特性与模板文字类型 mixin，通俗易懂就是将联合类型的每一项与模板文字进行组合成一个新的联合类型。

例如:

```ts
type Fruit = "apple" | "watermelon" | "pear";

type LikeFruit = `eat ${Fruit}`; // eat apple | eat watermelon | eat pear

type horizon = "left" | "center" | "right";

type vertical = "top" | "center" | "bottom";

type direction = `${horizon}-${vertical}`; //  "left-top" | "left-bottom" | "left-center" | "center-top" | "center-bottom" | "center-center" | "right-top" | "right-bottom" | "right-center"
```

这非常有用！通过这种组合的特性极大的节省编写`template string`类型的代码量.

### 键名重映射

键名重映射一句话概括就是<b>现在可以根据已有的键名生成新的键名或者过滤掉已有的键名</b>, 这是一个新的 feature.

回顾一下,创建一个新的类型可以通过`keyof`根据传入的泛型进行生成.

```ts
type Type<T> {
    [k in keyof T]: T[k]
}
```

但是要对键名进行过滤或者重命名键名似乎比较难做到, 4.1 版本可以使用`as`关键字用于键名重映射了,这是一个新的 syntax!

```ts
type Type<T> = {
   [k in keyof T as `on${Capitalize<k & string>}`]: () => T[k];
};

type Person = Type<{
   name: string;
   age: number;
   location: string;
}>;
```

现在这个 Person 类型的所有的 key 都是以`onXXX`开头了。 我们已经实现了将键名进行重映射了, 接下来我们还要实现如何对键名进行过滤, 这个很简单, 需要请到`never`类型登台.

```ts
// 将 key 为 name的属性过滤掉即可
type Filter<T> = {
   [k in keyof T as k extends "name" ? never : k]: () => T[k];
};

type Person = Type<{
   name: string;
   age: number;
   location: string;
}>;
```
