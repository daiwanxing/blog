# Event-Loop

1. js 引擎执行任务时，<del>永远不会进行渲染（render），这里是指的是重新绘制 DOM 树，仅当任务完成之后才会重新绘制（浏览器每执行完一次宏任务之后就重新绘制 DOM 树）</del> 会在每一轮事件循环结束后开始一次渲染界面操作，一次事件循环可能会有多个宏任务被执行到，也可能只会执行一个宏任务。具体因素会由页面性能、task 的执行时长等来决定。<strong>并不是每次事件循环结束后就会渲染界面，如果本次事件循环结束后并不会带来视觉上的改变，那么浏览器会聪明的跳过渲染。如果两个宏任务都会触发相同的界面的回流重绘，且宏任务的执行间隔过小，那么一次事件循环结束后只会立即应用到第二个宏任务的操作</strong>.

提到事件循环就得说下`requestAnimationFrame`这个 API，它能够精确得分配自己的执行时间时发生在下一帧的绘制前，当前帧快结束时分配任务（一般 16.6ms 执行一次回调），确保用户看到绘制的每一帧都是最新的，是一个非常适合用来做动画的微任务。

关于事件循环的实现（浏览器 HTML5 定义的规范）：[关于事件循环规范](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue)

2. 一个宏任务队列里包含着若干个微任务，也就是说每个宏任务执行之后，就先执行当前这个宏任务包含的微任务队列。微任务队列执行完毕之后，会触发一个 render。紧接着再接着执行其他宏任务。宏任务是一个个的执行的，微任务是一队列一队列的执行的。我的理解，微任务是发生在其他宏任务（渲染 DOM，事件，ajax）之前会被执行 <br />

有一个地方可能没有讲明白，关于 UI 的渲染时机：<strong>UI render 的时机是发生在本次 loop 中 task（宏任务）执行完毕后，紧接着执行 jobs queue(微任务队列)中的所有 job 后，在下一个宏任务开始之前，本次微任务队列中的所有 job 结束之后开始 render。</strong>

`宏任务 --> 微任务队列 --> render ui --> 宏任务...`

render ui 的时机不总是在微任务队列结束之后，下一次宏任务开始之前。如果当前微任务队列需要获取最新的 DOM 信息，那么就会将之前队列里的操作（引起重绘重排的操作）任务全部执行，并立即发生一次渲染，比如调用`$(li).offsetTop()`来保证用户得到最新的布局信息。

看一段代码

```html
<script>
// 加载script，这个操作是一个marcotask(宏任务)
console.log('hello-world'); // 将宏任务中的同步任务优先放到主线程执行，打印：hello-world
// 执行Promise.resolve()，这是一个同步任务，then函数是一个异步任务，放入微任务队列
Promise.resolve().then(function () {
    console.log('resolve done!'); // 打印该语句微任务队列所有任务结束完毕，将会在下一个定时器任务执行之前开始render页面
    // 如果有这么一段代码
    $(li).offsetTop(); // 此时会将之前对DOM的所有重排重绘操作全部应用到DOM上，并且立即执行一次渲染，保证用户拿到是最新的布局信息
    // 也就是说不一定渲染的时机在微任务队列全部执行完后开始。
});

// setTimeout是一个定时器任务，交给定时器线程处理，当指定的时间到达后，转给事件处理线程将回调放入宏任务队列，下一次事件循环轮询的时候会取出该任务并执行
setTimeout(function () {
    console.log("setTimeout done");
}, 3000);
</script>
```

UI 渲染时机图:<br/>
<img src="https://zh.javascript.info/article/event-loop/eventLoop-full.svg" alt="render-ui时机">

先来看一个例子

```js
setTimeout(() => {
  alert("timeOut");
});

Promise.resolve().then(() => {
  alert("promise");
});

alert("code");
```

它们是如何执行的，或者说它们的执行顺序是什么？

首先，整个 script 作为一个宏任务执行，紧接着执行宏任务中的同步代码`alert("code")`（执行任务都是放在主线程中）,接着执行 then 函数里的 callback，这是一个微任务。
前面我们提到过，微任务一定是在其他宏任务开始之前被执行，因为要确保 microTask-queue 中的每个 micro-job 的 execute-enviroment 是一致的。
执行完所有的微任务队列并出队之后，紧接着执行下一个宏任务，这里就是`setTimeout(() => (alert('timeOut'))`。

参考资料：<br/>
[JavaScript.info 之事件循环](https://zh.javascript.info/article/event-loop/eventLoop-full.svg)<br/>
[一次搞懂 JS 运行机制](https://juejin.cn/post/6844904050543034376#heading-19)

::: tip 提示
如果宏任务队列为空，则 js 引擎会进入“休眠”状态。直到出现了宏任务，又开始了新一轮的事件循环。
如果需要执行一个耗时很长的计算任务，不应该阻塞事件循环，可以使用 web-workers，这是在另一个并行的线程中去运行代码的方式。
:::
