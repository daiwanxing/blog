## 事件循环

#### 什么是事件循环?

1. 引擎执行任务时，永远不会进行渲染（render），这里是指的是重新绘制DOM树，仅当任务完成之后才会重新绘制（浏览器每执行完一次宏任务之后就重新绘制DOM树）

2. 一个宏任务队列里包含着若干个微任务，也就是说每个宏任务执行之后，就先执行当前这个宏任务包含的微任务队列。微任务队列执行完毕之后，会触发一个render。紧接着再接着执行其他宏任务。宏任务是一个个的执行的，微任务是一队列一队列的执行的。我的理解，微任务是发生在其他宏任务（渲染DOM，事件，ajax）之前会被执行 <br />

先来看一个例子

``` js
setTimeout(() => {
    alert("timeOut");
});

Promise.resolve().then(() => {
    alert("promise")
});

alert("code");
```
它们是如何执行的，或者说它们的执行顺序是什么？

首先，加载script，这是一个宏任务，紧接着执行宏任务中的同步代码`alert("code")`,接着执行then函数里的callback，这是一个微任务。
前面我们提到过，微任务一定是在其他宏任务开始之前被执行，因为要确保microTask-queue中的每个micro-job的execute-enviroment是一致的。
执行完所有的微任务队列并出队之后，紧接着执行下一个宏任务，这里就是`setTimeout(() => (alert('timeOut'))`。

::: tip 提示
如果宏任务队列为空，则js引擎会进入“休眠”状态。直到出现了宏任务，又开始了新一轮的事件循环。
如果需要执行一个耗时很长的计算任务，不应该阻塞事件循环，可以使用web-workers，这是在另一个并行的线程中去运行代码的方式。
:::

## Web Worker

上面提到了web worker，本篇说说web-worker是一个什么技术。

随着芯片的高速发展，现在的cpu动不动就是6核，8核甚至12核 以及 N * 2 个线程（N为核心数）。由于js是单线程，无法并行执行多个任务，根本发挥不出计算机的全部威力，而且有的计算任务特别耗时容易阻塞事件循环导致界面响应不及时，卡顿等。在这样的背景之下，web worker诞生了。

web-worker可以在后台执行计算任务同时又不妨碍到主线程的执行，web-worker会将计算的到的结果返回给主线程。

::: warning 注意
1. web-worker是无法操作DOM的，BOM中只能操作navigator和location对象
2. web-worker受同源策略限制（分配给worker中运行的脚本资源必须与主线程同源）
3. web-worker不能使用confirm, alert, 可以使用ajax
4. web-worker一旦创建就会一直运行下去，除非手动释放
5. web-worker和主线程不在一个context，通过post-message进行通信
:::


## async - await

async是Generator 函数的语法糖

```js
    // 声明一个生成器函数
    function* foo (x) {
        yield x + 1;
        yield x + 2;
        yield x + 3;
        return x + 4;
    }

    let bar = foo(100); // 返回的是一个生成器函数的实例
    bar.next();
    // { value: 101, done: false } 每次调用实例的next方法就会返回一个对象，包含了yield的值和是否可继续调用next
    // 执行到return语句的时候，剩下的yield不再执行
```

## 导入导出

ES6 带来了ES Module的特性，模块的功能可以让我们更好的解耦代码功能逻辑，共用且不会与其他模块变量命名冲突

1. 导入的几种方式

```js
    // 导入的是module的默认导出
    import moduleList from "./module.js";

    // 导入的是module脚本中的命名变量：moduleA
    import { moduleA } from "./module.js"; 

     // 导入的是module的默认导出与命名导出moduleA
    import moduleList, { moduleA } from "./module.js";

    // 导入的module脚本所有导出（包括默认导出）到 allModule变量中
    import * as allModule from "./module.js"; 
```

2. 导出的几种方式

```js
    // 导出的是一个默认导出foo变量 
    export default const foo = 1; 

    // 导出的是一个命名导出bar变量
    export const bar = 2;

    // 重新导出命名导出，从module脚本文件导出moduleA再导出给其他模块
    export { moduleA } from "./module.js";

    // 重新导出默认导出
    export { default as otherName } from "./module.js";

    // 重新导出所有的命名导出
    export { * } from "./module.js";
```