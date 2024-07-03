---
slug: event-loop
title: 不同运行环境下的事件循环机制
authors: klein
---

<!-- truncate -->

事件循环是一个 JavaScript 处理异步任务的模型，这个基本在面试中都会经常问道，但我估计大部分人是背的滚瓜烂熟，并不是很理解。

其实理解了对写业务代码或多或少还是会有帮助。

事件循环在 Nodejs-runtime 和浏览器的实现不一样， Nodejs 事件循环拆分了 6 个 stage。浏览器环境就没这么多弯弯绕绕的。

由于我大部分时间编写的 JS 代码都是运行在浏览器的，所以先说说我理解的浏览器环境下的事件循环运行机制。

JavaScript 被设计之初就是一个 _single-thread_ 编程语言，单线程语言最大的特点就是没有 Block 的概念。它总是等第一个任务执行完毕后，再执行第二个任务，这样依次排队执行，是不是觉得和数据结构的队列很像是吧，符合 _FIFO （first in first out）_。

但是对于一些需要延时执行的任务，这种场景就无法处理了。

例如下面这种段代码:

```js
const foo = () => return 'foo';

setTimeout(() => alert('time out'), 3000);

foo();
```

如果没有处理异步任务的模型，那么只能等 3 秒后执行延时器的回调执行完毕后，才能再执行 `foo` 函数，这会变得十分糟糕。

想象一下，你需要发送一个网络请求，这个请求从发送到服务器响应需要长达数秒。而这期间，后续的 JS 代码都无法被执行。

有没有什么办法，能让 JS 得到类似多线程那样，并行执行任务的优点？

于是异步任务就是在这种场景下出来了。

对于 `Promise`，`setTimeout` 以及 `fetch` 等相关的 API，执行这些代码入栈后，它们的回调函数都会单独的存入到一个任务队列中。

![https://media.geeksforgeeks.org/wp-content/uploads/20201130234341/eventQueue1.png](https://media.geeksforgeeks.org/wp-content/uploads/20201130234341/eventQueue1.png)

:::info
这个任务队列并不是**数据结构的队列**，它并不具备 `FIFO` 的特点

> Task queues are sets, not queues, because the event loop processing model grabs the first runnable task from the chosen queue, instead of dequeuing the first task.

上面这段英文引用自: https://html.spec.whatwg.org/multipage/webappapis.html#Events

:::

等到主线程执行栈的任务为后，这些任务队列里的任务就会被放到执行栈中运行，等到任务队列里的执行完毕后，接着继续执行调用栈的任务。

这样依次循环往复，这种循环就是称之为事件循环。

![https://media.geeksforgeeks.org/wp-content/uploads/20201130232637/EventLoop.png](https://media.geeksforgeeks.org/wp-content/uploads/20201130232637/EventLoop.png)

事件循环中的任务队列有两：任务队列（宏任务队列）和微任务队列。

Macro-task 相关的 api: `setTimeout` `，setInterval，` `setImmediate`，`requestAnimationFrame`

Micro-task 相关的 api: `Promise`, `process.nextTick`， `MutationObserver`

如果 JS 引擎执行异步任务时，遇到宏任务放到任务队列，微任务则放到微任务队列。

```html
<script>
  setTimeout(() => console.log("foo"), 0);

  Promise.resolve().then(() => alert("bar"));
</script>
```

上面这段代码 JS 引擎会先输出 `bar` 再输出 `foo`。

是不是觉得微任务队列里的任务优先级比宏任务队列的高？

那继续看下面这段代码

```html
<script>
  new Promise((resolve, reject) => {
    resolve();
    console.log(2);
  }).then(() => {
    console.log(3);
  });
</script>

<script>
  new Promise((resolve, reject) => {
    resolve();
    console.log(22);
  }).then(() => {
    console.log(33);
  });
</script>
```

输出结果是什么？

答案是：2, 3, 22, 33

有些人会觉得是 2,22,3,33。

其实包裹在一个 `<script />` 标签中的 js 代码视作是一个 macrotask。

reference:

> It is possible for a **microtask to be moved to a regular task queue**, if, during its initial execution, it spins the event loop. This is the only case in which the source, document, and **script evaluation** environment settings object set of the microtask are consulted; they are ignored by the perform a microtask checkpoint algorithm.

也就是说当执行完一个宏任务后，才会将微任务队列里的任务全部执行，直到队列为空。并不是微任务队列里的任务优先级高于宏任务。

浏览器内的事件循环模型大致就是这样运转的。

做个简单总结：

1. 事件循环是 JavaScript 用于处理异步和同步任务的一种调度机制。
2. 当主线程执行栈为空，JS 才会从任务队列执行**可以**执行的异步任务。
3. 先取出任务队列（宏任务队列）中的最近的一个任务执行
4. 执行完这个任务后移出，再执行 microtask 队列中所有可用的任务，然后移出。
5. 继续下一轮循环

## Nodejs 的 Event-loop
