# Web Worker

在事件循环一章中我提到了web-worker，本篇将展开说说web-worker是什么，以及为什么需要web-worker。

随着芯片的高速发展，现在的cpu动不动就是6核，8核甚至12核 以及 N * 2 个线程（N为核心数）。由于js是单线程，无法并行执行多个任务，根本发挥不出计算机的全部威力，而且有的计算任务特别耗时容易阻塞事件循环导致界面响应不及时，卡顿等。在这样的背景之下，web worker诞生了。

web-worker可以在后台执行计算任务同时又不妨碍到主线程的执行，web-worker会将计算的到的结果返回给主线程。

```js 
 // index.js
 let worker = new worker('worker.js'); // 得到一个worker的实例， 初始化worker.js脚本文本，有一个self的全局对象或者称之为this

 worker.postmessage("some info"); // 发送给worker脚本

 worker.onmessage = e => {
     console.log(e,data); // a ha
 };
```

```js
    // worker.js

    self.addEventListener("message", e => {
        console.log(e.data); // some info
    });

    self.postMessage("a ha");
````

::: warning 注意
1. web-worker是无法操作DOM的，BOM中只能操作navigator和location对象
2. web-worker受同源策略限制（分配给worker中运行的脚本资源必须与主线程同源）
3. web-worker不能使用confirm, alert, 可以使用ajax
4. web-worker一旦创建就会一直运行下去，除非手动释放
5. web-worker和主线程不在一个context，通过post-message进行通信
:::