# 性能利器之 web-worker


web-worker 是一种不算太新的技术，可以让开发者将自己编写的 JS 代码运行在一个单独的子线程中。

听起来似乎很 cool，因为一些密集型的 cpu 计算以及耗时的任务在 main thread 中长期执行的话极容易造成页面卡死（DOM 渲染被阻塞）。

来看一个极容易的例子

```js
const len = data.length; // if data.length return a huge number;
for (let idx = 0; idx < len; idx++)
   // 对 data 的每一项进行数据处理
   // 将会是一个十分耗时的操作
```

如果将这些耗时的任务全部放到一个子线程中后台计算。那么主线程就能腾出空间来做更多的事情及时响应用户界面。

But.... Wait, Javascript 不是一门**单线程语言**吗？为什么又有了子线程呢？

JavaScript 是一门单线程语言没错，单线程语言最大的特点在于同一个时刻只会有一个任务被处理，不会存在**竞态**的问题。

但是 `web-worker` 的诞生并不是说 js 又变成了一门多线程语言了。`web worker` 允许你创建可以与主线程同时运行的附加执行线程。

虽然这些工作线程不是 JavaScript 语言本身的一部分，但它们是 Web 平台的一部分，它们提供了一种在后台运行计算密集型任务的方法，而不会阻塞主线程。它们使用消息与主线程进行通信（异步）。 

需要明白的是，本质上在**主线程**中，同一时刻还是只能按顺序一次一次的执行任务。当 `web-worker` 与主线程通信，主线程执行通信的回调任务进行处理。再接着执行下一个异步任务，这还是单线程语言的特点。

```js
// worker.js
postMessage("send some message");

// main.js
const worker = new Worker("./worker.js");
worker.onmessage = (e) => {
    console.log(e.data); // send some message
}
```

## 业务落地

在日常的业务开发者，如果你遇到需要处理 I/O 密集型计算的任务所造成的页面卡顿，那你真的应该毫不疑问的切换到 `web-worker` 中去实现。

例如，我之前就已经落地过一个切换到 `web-worker` 实现轨迹巡航的案例。

当用户在界面上查询一辆车某一段时间内在路上的行驶路线信息时，后台会返回相关的路径报文信息。如果查询的日期区间不算太大还好。

一旦查询超过半个月甚至一个月，报文点的数量可能长达上十万个数量。这是很可怕的，因为在页面中我还需要对这些数据进行格式化处理，以符合界面所需要的数据格式，再接着操作标记点不断移动。（你可能会问为什么不用 nodejs 做 bbf，别问，小公司没有完好的技术基建）所以有的时候界面会在查询的时候如果还需要响应其他的事件任务会非常卡顿。

在了解到了 web-worker 后我毫不疑问的切过去了，现在处理数据的速度虽然没有变化，但是由于计算任务全都放在了一个附加线程中，可以让主线程有更多的空间做其他的事情， That's so amazing!

## 注意事项

::: warning
`web-worker` 很好用，但是也做了诸多的限制，比如不能访问 `DOM` 和 `BOM`。

在 web-worker 中运行的 js 代码可以看作一个沙箱，仅提供了一个纯 javascript 的运行环境。

至于为什么需要这样设计，肯定是有相关原因的，以下是我总结得到的答案：

- 线程安全：`DOM` 和 `BOM` API 不是[线程安全](https://zh.wikipedia.org/wiki/%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8)的，这意味着多个 web-worker 线程同时访问它们可能会导致竞争条件或其他同步问题。
- 性能：`DOM` 和 `BOM` API 通常使用实现低级语言实现的（例如 C 或者 C++，取决于浏览器内核），这可能比在 V8 引擎中运行的 JavaScript 代码慢。如果允许工作线程直接访问 DOM 或 BOM，可能会导致性能问题。
- 安全性：允许 web-worker 直接访问 `DOM` 或 `BOM` 可能会带来安全风险，因为 web-worker 在与主线程不同的上下文中运行，并且可能会访问或修改敏感数据。

这种设计可确保工作线程安全、高效和可靠，并且它们可以在后台运行而不会干扰主线程。
:::


## 在 worker 中引入其他脚本

一般来说，在 web-worker 中尽量不应该依赖其他的脚本，或者依赖尽可能体积的小的脚本以确保在子线程中更快的处理代码计算。

如果需要引入也不是不可以，通过 `importScripts` 关键字即可导入一个或多个脚本，这种导入会将脚本内的声明的变量和函数放到 worker 顶级作用域中。

```js
// 需要注意的是，这种导入脚本的方式，必须导入的是非模块脚本，否则会无法识别 export 关键字
importScripts(["./util.js"]);
```

如果你的确需要 ES2015的 `ES Module`, 你可以在使用 `new Worker()` 的时候传入第二个参数， `{ type: "module" }`

```js
// main.js

const worker = new Worker("./worker", { type: 'module' });

// worker.js
impor { noop } from "lodash-es";

noop();
```

但这种方式直到 2023 年仍然存在兼容性的问题，只适用于较高级别的浏览器（chrome >= 80, safari >= 15），firefox 完全不支持。

一种可行的方式是借助构建工具（例如 rollup），将指定的 worker 脚本用 iife 进行打包。

```js
//worker.js
import { MyModule } from 'my-module.js'

onmessage = async (e) => {
    var port = e.ports[0];
    MyModule.func()

    port.onmessage = (e) => {
        port.postMessage("Hi App");
    }
}

//rollup config
export default [
{
        'input': 'worker.js',
        'output': {
            'file': 'dist/worker.js',
            'format': 'iife'
        },
 },
]


//dist/worker.js (rollup output)
(function () {
    'use strict';
    //MyModule code here, generated by rollup
    MyModule.func()
    onconnect = async (e) => {
        var port = e.ports[0];
        port.onmessage = (e) => {
            port.postMessage("Hi App");
        };
    };

}());
```

但这种方法造成代码增加了，因为模块代码也被复制到 worker 中。所以也不算一种最佳的办法。

## 结束 worker

一旦 worker 不再被需要时，需要关闭该 worker 以防内存中驻留，可以通过 `worker.terminate()` 关闭 worker。


## 总结

本文介绍了 Web Workers 在JavaScript中的基础概念，包括如何创建和使用 Dedicated Workers 和 Shared Workers，如何使用 postMessage()方法进行线程之间的通信，以及如何使用 Transferable Objects来提高性能。文章还提供了一些实际的例子来演示如何使用Web Workers来处理复杂的计算和避免主线程阻塞。最后，文章还讨论了一些关于Web Workers的限制和注意事项，例如同源策略和浏览器兼容性问题。