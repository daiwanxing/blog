# 元属性编程 - Symbol

## ES2015 带来了 Symbol

ES2015 (简称 ES6) 为 JavaScript 开发者带来了一个新的基本属性: `Symbol`。

本文不会介绍 `Symbol` 的相关知识以及可用的业务场景，如果您还未了解使用过 `Symbol`， 建议阅读相关资料后再阅读本文。

除了在我们的代码内声明自定义的 `symbol` 外, ES6 还为我们带来了几种内建 Symbol（也称之为通用 Symbol - as well know symbol）。

这些内建的 symbol 可以让开发者对 JS 语法掌握更多的控制权，甚至改写语言默认的行为，这种能力称之为**元编程**。

我们在编写业务代码的时候，几乎用不到**元编程**这样的能力，元编程的使用场景更多的是在开发框架、库等方面。（作者本人只在编写业务轮子的时候使用过）。

JS 内建的 `Symbol` 属性有长达 10 多种，下面列举可能常用的几种内建 Symbol

-  iterator
-  toPrimitive
-  replace
-  isConcatSpreadable
-  hasItance
-  search
-  split
-  toStrintTag
-  ....

## [Symobl.iterator]

大家有没有想过一个这样一个问题，像 `Array`，`Set`，`Map` 这样的数据类型。我们可以通过 `for..in`、或者展开运算符 `[...new Set()]` 遍历对象的属性。可是唯独 plain object 却无法这样做到。

当我们尝试为一个 plain object 进行 `[...{}]` 得到的会是一个错误信息

:::danger
`Uncaught TypeError: {} is not iterable`。
:::

根据错误信息我们可知，普通对象不能迭代。 但是 `Array`, `Set` 等也是对象，为什么它们就能迭代呢？

究其原因，是因为像 `Array`，`Set`，`Map` 这样的对象内部有个迭代器对象。当我们对这些可迭代对象进行迭代的时候，会自动调用内置的迭代器对象。而普通对象没有内置的迭代器对象，因此无法被迭代。

你可能很好奇，这个内置的迭代器对象到底长啥样。

其实这个迭代器就是本文要讨论的 `Symbol.iterator`。

例如，我们声明了一个名为 `foo` 的 `Map` 对象。

```js
const foo = new Map();
```

我们可以访问 `foo` 的 `Symbol.iterator` 元属性得到一个返回迭代器对象的工厂函数。当执行这个函数后我们可以得到一个 `Map` 的迭代器对象。

```js
foo[Symbol.iterator]; // ƒ values() { [native code] }

const iterator = foo[Symobl.iterator](); // iterator function
```

JS 内置的可遍历的对象都实现了 `Symbol.iterator` 方法，以支持迭代器协议（iterator protocol），迭代器协议规定了一个统一的接口，使得数据结构可以通过相同的方式进行迭代操作。

当遍历可迭代对象的时候， JS 会自动调用这些可迭代对象的内置迭代器。

如果我们自行为普通对象实现一个迭代器对象适配迭代器协议，是不是同样也能实现对普通对象的迭代呢？

答案：**YES ！**

实现一个迭代器对象很简单，只需要适配迭代器协议的接口即可。

::: info 说明
迭代器协议（Iterator protocol）是 JavaScript 官方定义的一种协议，规定了一种标准的迭代器接口，用于遍历任意对象。这个协议的具体约定如下：

-  迭代器对象必须实现 next() 方法，该方法返回一个对象，对象中包含以下两个属性：

   -  value：表示当前迭代位置的值。
   -  done：表示迭代器是否已经遍历完了所有值。

-  当迭代器对象的 next() 方法被调用时，如果迭代器还有下一个值，则返回一个形如 { value: value, done: false } 的对象，其中 value 属性为当前值，done 属性为 false。

-  当迭代器对象的 next() 方法被调用时，如果迭代器已经遍历完了所有值，则返回一个形如 { value: undefined, done: true } 的对象，表示迭代已经结束。
   :::

根据上面的规范，我们一步步来为普通对象 `foo` 实现一个迭代器对象。

首先，需要声明一个返回迭代器的工厂函数

```js
function genIterator() {
   // TODO
}
```

将 `genIterator` 赋值给 `foo[Symbol.iterator]`

```js
const foo = {
   bar: "bar",
   baz: "baz",
};
foo[Symbol.iterator] = genIterator;
```

接着我们需要实现 `genIterator` 的以下功能，

-  `genIterator()` 需要返会一个迭代器对象
-  该迭代器对象需要实现一个 `next()` 方法
-  每次调用 `next()` 需要返回固定格式的对象值 `{ done: boolean; value: any }`
-  当调用 `next()` 遍历完毕后, 需要返回 `{ done: true, value: undefined }` 表示迭代结束

有了上面的需求，接下来就只剩完成这些需求了。让我们一步步来实现它。

> `genIterator()` 需要返会一个迭代器对象，该迭代器对象需要实现一个 `next()` 方法

```js
function genIterator() {
   const iterator = {
      next() {
         // TODO
      },
   };
   return iterator;
}
```

根据上面的定义，我们在 `genIterator` 函数中声明了一个 `iterator` 作为迭代器对象，并且该对象已具有 `next` 函数。

> 每次调用 `next()` 需要返回固定格式的对象值 `{ done: boolean; value: any }`

根据定义，每次调用 `next()` 都需要返回指定格式的对象，这里我们需要实现如何设置 `done` 的值和 `value` 的值。

```js{4-7}
function genIterator() {
   const iterator = {
      next() {
         return {
            done: null,
            value: null
         }
      },
   };
   return iterator;
}
```

很简单，我们的需求是能够遍历普通对象，每次遍历可以得到每一项 key 和 value。我们可以借助 `Object.keys` 得到对象所有可枚举的键名，并且需要设置一个下标，以便每次调用 `next()` 偏移下标值。

```js{2,3}
function genIterator() {
   const anchor = 0;
   const keys = Object.keys(this) // this 指向被调用该函数的对象
   const iterator = {
      next() {
         return {
            done: null,
            value: null
         }
      },
   };
   return iterator;
}
```

获取到了对象所有可枚举的键名后，每次调用 `next()` 方法时我们可以对 `done` 和 `value` 设置值了。其中，`done` 的是一个布尔值，如果为 `true` 表示遍历已结束。

```js{5-11}
function genIterator() {
   let anchor = 0;
   const keys = Object.keys(this); // this 指向被调用该函数的对象
   const iterator = {
      next: () => {
         const done = anchor > keys.length - 1;
         return {
            done,
            value: done ? undefined : {
                key: keys[anchor],
                value: this[keys[anchor++]]
            },
         };
      },
   };
   return iterator;
}
```

有个小细节，这里的 `next()` 函数由之前的普通函数改写成了箭头函数，这是为了方便获取父级的 `this`。

之前提到过，如果迭代结束，需要将 `next()` 函数返回的 `value` 设置为 `undefined` 并且 `done` 设置为 `true`。

这里我通过判断 `anchor` 的索引是否大于可枚举的长度来确定是否迭代结束。

现在，为普通对象适配一个迭代器协议的迭代器对象功能就实现了，剩下的就是验证是否可用。

```js
const foo = {
    name: 'foooo',
    age: '1000',
    sex: 'unknown'
}

foo[Symbol.iterator] = genIterator;
```

对 `foo` 进行使用展开运算符会获取每次 `next()` 返回的值

```js
[...foo]
```

其执行结果如下图所示：

![实现一个迭代器](/iterator.png)

## 🎉 最后

现在我们通过 `Symbol.iterator` 元属性，成功为一个普通对象实现了迭代器接口，让其具有更加强大的遍历操作。

元编程可以让开发者自己实现语言某个方面的特性，这种特性太棒了！