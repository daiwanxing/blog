# 重新认识 typescript

## ts 中的结构化类型系统

typescript 中的类型系统借鉴了数学中的集合的概念，让我先仔细回顾下大学线代课程的集合的概念

-  集合是一组元素的组成的无序的结构，集合的基本单位就是元素，这些元素可以是数字、字符、字母。
-  集合的操作有并集、补集、交集、差集。
-  空集是一个特殊的集合，空集与任意集合的交集总是空集，空集与任意集合的并集是全集.

在 typescript 中，定义以下的类型

```ts
type SN = string | number;

// 这里的类型SN就是string 和 number 的 supertype，它是类型string和类型number的并集.
// 类型SN 同时具有 string 和 number 全部属性.
```

```ts
type SN = string & number;

// 将类型string和类型number做交集运算，取出它们公共的属性 作为类型SN, 这里的类型SN得到的其实是一个never类型
// 因为 类型string 和 类型 number 并无相交的属性.
```

在集合中我们知道空集不属于任意集合，而在 typescript 中`never`类型同样也是不能被其他任何类型所分配。

-  `never` 与 其他类型 进行类型交叉 得到的永远是 `never`。

-  `never` 与其他类型进行联合，得到的永远都是其他的类型。

`never`是 typescript 类型系统中的底端集合，而与之相反的，`unknown`是 typescript 中的顶端集合.

`unknown`表示的是任何类型，如果一个变量的类型是`unknown`，那么它可以被任意其他的类型的变量所分配.`unknown`此外还具备类型收窄的功能.

什么是类型收窄？类型收窄会在代码块中的每个 if...else，switch...case 中，根据表达式返回的值的类型判断变量的类型.

```ts
function print(arg: unknown) {
   // isArray 如果为true， 那么 arg的值的类型会被限定为数组类型
   if (Array.isArray(arg)) {
      // 在这个代码块, arg已经被收窄成了Array类型
      arg.push(100);
   }

   if (typeof arg === "string") {
      // arg 被收窄成了string类型
      // 在该if代码块中可以安全的使用 string原型上的方法
      arg.split(""); // safe
   }
}
```

除了`never` 和 `unknown` 之外，还有一个特殊的类型 `any`。严格的来讲，`any`不是类型，如果一个变量的类型为`any`，那么这个变量就已经失去了类型保护，在该变量上调用相关方法或者进行算数运算操作返回的值也是`any`类型，ts 也无法检测到这些操作是否是合法的、有效的。作为开发者，已经无法具得知值的类型。在我看来，如果不到万不得已，是千万不要使用`any`类设置变量的类型的。

在一切需要用到 any 的地方，你最好用`unknown`去替代它。至少`unknown`搭配类型断言或者 ts 的类型收窄功能可以轻松的得到确切的值的类型，不会丢失类型保护。

## 分布式条件类型 （Distributive conditional types）

我认为 ts 中的分布式条件类型有点类似于小学数学中的分配律， `(a+b)c = ab + bc`。

例如在 ts 中有如下一个条件类型

```ts
type ABC = "A" | "B" | "C";

type AB = "A" | "D";

type Distributive<T> = T extends ABC ? T : never;
```

在这里，如果把类型 AB 传入到泛型 T 中。

可得：`'A' extends ABC ? 'A' : never | 'D' extends ABC  ? 'D' : never`

简化运算结果: `'A' | never => 'A'`, 虽然传入给泛型 T 的是类型`AB`, 但是这里的 AB 是一个`union-type`，所以会将每个类型拆分出来判断是否能分配给类型`ABC`。

## subtype 与 superType

subType 和 superType 分别代表的是子类型和父类型

```ts
// Fruit 是一个superType
type Fruit = {
   apperance: string;
   shape: string;
};

// Apple 是一个 subType
interface Apple extends Fruit {
   hasCore: boolean;
}

let apple: Apple;

let fruit: Fruit;

fruit = apple; // apple 可以被 分配给 fruit，因为Fruit类型定义的结构可以兼容Apple

apple = fruit; // error, fruit不能分配给apple，因为fruit中没有apple类型中定义的hasCore属性
```

在 ts 中，subType 的属性比 superType 更多，且更为具体。也就是说子类型是父类型的超集，父类型是子类型的子集。这点有别于数学中的集合。

在集合中，如果集合 A 的任意一个元素都属于集合 B，那么可得，集合 A 属于集合 B，或者集合 A 是集合 B 的子集。**_在集合中属性更少的集合是子集,这个与 ts 中的类型正好相反_**。

由 ts 中的子类型和父类型可以引申出来`协变`和 `逆变`两个概念。`协变`和`逆变`的概念很生涩难懂，我只会谈谈我的理解，并且理解的知识并不会脱离官方定义的概念中。

-  `协变` 是指 `subType` 可以分配给 `superType`
-  `逆变` 是指 `superType` 可以分配给`superType`

在前面的例子中, `fruit = apple`就是协变，因为`Apple`类型是`Fruit`类型的子类型，所以`Apple`类型的变量可以分配给`Fruit`类型的变量.

```ts
fruit = apple; // fruit 依然可以使用Fruit类型上定义的属性和方法

fruit.shape; // ok
```

再来看看一个`逆变`的例子

```ts
let printApple = (apple: Apple) => {
   if (apple.hasCore) {
      console.log("apple has core");
   }
};

let printFruit = (fruit: Fruit) => {
   console.log(fruit.shape);
};

printFruit = printApple;

const fruit:Fruit = {
   apperance: "red";
   shape: "circle";
}

printFruit(fruit);
```

如果将 `printFruit = printApple`，请问`printFruit()` 还能正常执行吗？

答案肯定是执行会报类型错误的，因为`printApple()`函数中访问了参数的`hasCore`属性，但是`printFruit`中的参数并未实现该属性。

但是反之，`printApple = printFruit`是完全可行的，因为后续调用`printApple()`会传入一个比`fruit`属性更为具体的`apple`，函数体内部的一切访问都会是正常的。

在`tsconfig.json`中,`strictFunctionType`值默认为`false`,也就意味着上面的例子是不会报错的，因为默认开启了双向协变，`subType`可以分配给`superType`，反之也可。在开启 `strictFunctionType: true` 后才会严格按照 `逆变` 来约束赋值关系。
