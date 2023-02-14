# 元属性编程 - Symbol

## ES2015 带来了 Symbol

ES2015 (简称 ES6) 为 JavaScript 开发者带来了一个新的基本属性: `Symbol`。

本文不会介绍 `Symbol` 的相关知识以及可用的业务场景，如果您还未了解使用过 `Symbol`， 建议阅读相关资料后再阅读本文。

除了在我们的代码内声明自定义的 `symbol` 外, ES6 还为我们带来了几种内建 Symbol（也称之为通用 Symbol - as well know symbol）。

这些内建的 symbol 可以让开发者对 JS 语法掌握更多的控制权，甚至改写语言默认的行为，这种能力称之为**元编程**。

我们在编写业务代码的时候，几乎用不到**元编程**这样的能力，元编程的使用场景更多的是在开发框架、库等方面。（作者本人只在编写业务轮子的时候使用过）。

JS 内建的 `Symbol` 属性有长达10多种，下面列举可能常用的几种内建 Symbol

- iterator
- toPrimitive
- replace
- isConcatSpreadable
- hasItance
- search
- split
- toStrintTag
- ....

## [Symobl.iterator]

大家有没有想过一个这样一个问题，像 `Array`，`Set`，`Map` 这样的数据类型。我们可以通过 `for..in`、或者展开运算符 `[...new Set()]` 遍历对象的值。可是唯独 plain object 却无法这样做到。

当我们尝试为一个 plain object 进行 `[...{}]` 得到的会是一个错误信息 `Uncaught TypeError: {} is not iterable`。

根据错误信息我们可知，普通对象不能迭代。 但是 `Array`, `Set` 等也是对象，为什么它们就能迭代呢？

究其原因，是因为像 `Array`，`Set`，`Map` 这样的对象内部有个迭代器对象。