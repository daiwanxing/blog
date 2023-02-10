# JavaScript 内存管理探秘

> 注1：这篇文章由作者本人在国外某位大佬的博客网站自行翻译过来的，如翻译有误还请指正 

> 注2：原文链接 https://felixgerschau.com/javascript-memory-management/

> 注3：如果您想转载此篇译文，请注明转载出处 

![https://felixgerschau.com/static/3b4b854ed9762de030a94a9368be7d40/c1b63/javascript-memory-management-cover.png](https://felixgerschau.com/static/3b4b854ed9762de030a94a9368be7d40/c1b63/javascript-memory-management-cover.png)

作为一名 JS 开发者，大多数情况下，可能你从没有思考过如何进行内存管理。毕竟，JS 引擎会自动帮我们去做这些事情。不过，有时你总会遇到例如内存泄露的问题，只有你了解内存分配是如何工作的才能知道如何去解决这个问题。

在这篇文章中，我将向你介绍 **内存分配** 和 **垃圾回收** 是如何工作的，并且教你如何避免一些常见的内存泄露。

## 内存生命周期

在 js 中，当我们创建了变量、函数或者任何你可以想得到的东西，js 引擎都会对其进行内存分配并且一旦不再需要时对其释放内存。

**分配内存** 是在内存中保留空间的过程，而释放内存是为了腾出空间用于其他目的。

每次我们给变量赋值或者创建一个函数，内存分配都将经历以下几个阶段：

![https://felixgerschau.com/static/87cb911a5bdda814cdc38a1679e327e5/c1b63/memory-life-cycle.png](https://felixgerschau.com/static/87cb911a5bdda814cdc38a1679e327e5/c1b63/memory-life-cycle.png)


- **分配**内存
  - JS 为我们处理了这件事，它为我们创建的对象分配了需要的内存。
- **使用**内存
  - 使用内存是我们在代码中明确做的事情：读取和写入内存仅仅只是读取变量和写入变量。
- **释放**内存
  - 这一步由 JS 引擎处理，一旦分配的内存被释放，它就能被用于新的地方。


:::tip 提示
内存管理上下文中的“对象”不仅是 js 中的对象，还包括了函数以及函数作用域。
:::

## 内存中的堆和栈

现在我们知道了在 JS 中定义的一切变量都会由 JS 引擎分配内存，一旦我们不再需要它的时候自动进行释放。

浮现在我脑海里的下一个问题是：数据被存储在了哪里？

JS 引擎有两个可以存储数据的地方：**堆**和**栈**，栈和堆是 JS 引擎用于将数据存储在不同场合的两种数据结构。

## 栈：静态内存分配

![https://felixgerschau.com/static/b94165593eb6e02d73039d8b2cfccfdd/c1b63/stack-memory-explained.png](https://felixgerschau.com/static/b94165593eb6e02d73039d8b2cfccfdd/c1b63/stack-memory-explained.png)

<p align="center">所有的值都会被存储在栈中，因为它们都是原始值</p>

栈是 JS 用来存储静态数据的数据结构，引擎在编译的时候就能确定静态数据的大小。在 JS 中，这包括了**原始值** ***`string`,`number`,`boolean`，`null` 和 `undefined`*** 和指向对象和函数**引用**。

由于引擎知道值的大小不会改变，所以它会为每个值分配固定数量的内存。

在执行之前分配内存的过程称之为静态内存分配。因为引擎会为那些值分配固定的内存，所以**原始值的大小是有限的**。

***分配内存的大小取决于不同的浏览器各自的实现***。

## 堆：动态内存分配

堆是一个存储数据的不同空间，JS 在其中存储对象和函数。与栈不同，引擎不会为这些对象和函数分配固定的内存空间。相反，将根据需要分配更多的内存空间，这种分配内存的方法也称之为按需分配。

为了方便对比，下面列出了一个表格比较两种数据结构的区别：

| 栈         |                堆                |
| ------------ | :--------------------------------: |
| 原始值和指向对象与函数的引用       | 对象和函数 |
| 在编译时确定分配内存大小      |        在运行时确定分配大小        |
| 分配固定的内存     |   没有大小限制    |



## 示例

让我们来看一些代码案例

```js
const pesrson = {
    name: "John",
    age: 24,
}
```

<p align="center">JS 会为这个 <code>person</code> 对象在堆中分配内存，但是 `person` 这个变量实际上还是存储在栈中，栈中的变量的值指向的是存储在堆中的引用</p>


```js
const hobbies = ['hiking', 'reading'];
```

<p align="center">数组和对象同样如此，这就是为什么它们存储在堆中的原因</p>

```js
let name = 'John'; // allocates memory for a string
const age = 24; // allocates memory for a number

name = 'John Doe'; // allocates memory for a new string
const firstName = name.slice(0,4); // allocates memory for a new string
```

<p align="center">原始值是不可变的，这意味着当你改变原始值话，JS 会创建一个新值覆盖掉旧值。</p>

## JavaScript 中的引用

JS 中所有的变量都首先指向栈，如果变量的值是一个非原始值，那么栈中会指向一个在堆中的对象的引用。

被分配在堆中的内存是不按顺序存储的，这也就是为什么我们需要在栈中保留对堆中的引用。你可以将引用看作成一个个地址，存储在堆中的对象看作为这些地址所属的房屋。

:::tip 提示
记住，JS 为**对象和函数**分配的内存都会放在堆中，而**原始值和引用**存储在栈内。（译者注：引用相当于一个指针，指向的是堆中的对象或者函数的地址。）
:::

![https://felixgerschau.com/static/b452488bd7eeac0405c48f164da6280d/c1b63/stack-heap-pointers.png](https://felixgerschau.com/static/b452488bd7eeac0405c48f164da6280d/c1b63/stack-heap-pointers.png)

<p align="center">在这张图中，我们可以看到不同的值是如何被存储的。注意, <code>person</code> 和 <code>new Person</code>实际上指向的是同一个对象。</p>

## 示例

```js
const person = {
  name: 'John',
  age: 24,
};
```

<p align="center">这会在堆中创建了一个新的对象，并且在栈中创建一个指向这个对象的引用。</p>


## 垃圾回收（GC）

现在，我们知道了 JS 是如何为各种对象分配内存的，但是如果你还记得上文提到的内存生命周期一图，我们还少了最后一步：释放内存。

就像内存分配那样，JS 引擎也会为我们处理这一步。更具体的来说，这一步由**垃圾收集器(garbage collector)** 负责处理这个问题。

一旦 JS 引擎识别到了给定的变量或者函数不再被需要了，那么就会释放其占用的内存。

听起来似乎很完美，但这里的主要问题在于，内存是否仍然需要是一个不可判定的问题，这意味着不可能有一种算法能够在内存不再需要时精确地收集所有多余的内存。


一些算法为这个问题提供了一个折中的解决方案。在本节中，我将讨论使用最广泛的两种算法：引用计数算法和标记清除算法。


## 引用计数

这是最简单的一种方案，引用计数算法的核心在于收集那些**没有指向它们引用的对象**。

让我们看看下面的例子：

<video src="https://felixgerschau.com/video/stack-heap-gc-animation.mp4" controls muted loop autoplay="autoplay"></video>

注意，这段视频的结尾只有 `hobbies` 保留在了堆中，因为只有它被栈中的 `hobbies` 变量所引用。

## 周期

这个算法的核心问题在于它并没有考虑到**循环引用**, 当一个对象或者多个对象相互引用对方，但不能再通过代码访问它们时，就会发生问题。

先来看一个例子，认识什么是**循环引用**

```js
let son = {
  name: 'John',
};

let dad = {
  name: 'Johnson',
}

son.dad = dad;
dad.son = son;

son = null;
dad = null;
```
根据上面的示例，变量`son.dad` 引用了 `dad` 对象，同时变量 `dad.son` 也引用 `son` 对象。这就是循环引用，互相引用自身。

代码最后两行各自将变量赋值为 `null`，想触发引用计数搜集对象（前面我们提到过引用计数关键在于收集那些没有指向它们引用的对象）。

按理来说 `son` 和 `dad` 赋值为 `null` 后，栈中已经没有任何变量指向堆中的这两个对象了，真实情况并非如此。

![https://felixgerschau.com/static/30c115f91d53d20972287fa05592520c/c1b63/reference-cycle.png](https://felixgerschau.com/static/30c115f91d53d20972287fa05592520c/c1b63/reference-cycle.png)

<p align="center"><code>son</code>和<code>dad</code>对象在堆中相互指向对方，引用计数算法不会释放分配的内存。我们已经没有任何办法访问这两个对象了。</p>

## 标记清除

标记清除算法可以解决循环依赖的问题，它不再是简单的计算给定对象的引用次数，而是检测它们是否可以从根对象上访问。

如何理解这个**根对象**呢？

在浏览器中，根对象即`window`，而在 node runtime 中则是 `Global`。

![https://felixgerschau.com/static/87b4e1eb66afc84d49da13af8e897367/c1b63/garbage-collectoion-algorithm.png](https://felixgerschau.com/static/87b4e1eb66afc84d49da13af8e897367/c1b63/garbage-collectoion-algorithm.png)

**标记清除**将那些永远无法到达的对象当作垃圾清理（收集），根对象永远不会被收集。

> 译者注：如何理解**永远无法到达的对象**很重要，"永远无法到达的对象" 指的是 JavaScript 代码中无法通过任何方式（例如变量、函数调用等）访问到的对象。这些对象不再被程序使用，因此可以将其视为垃圾，可以清理回收

这样，循环依赖就变得容易解决了。在前面的例子中，`dad` 和 `son` 都不能从根访问。因此，它们都将被标记为垃圾并被收集。

自 2012 年以来，该算法已在所有现代浏览器中实现。仅对性能和实现进行了改进，但并未对算法的核心思想本身进行改进。

