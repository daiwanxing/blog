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

## async - await

async是Generator 函数的语法糖

```js
    // 声明一个生成器函数
    function* foo (x) {
        yield x + 1;
        yield x + 2;
        yield x + 3;
        return x + 4;
        yield x + 5;
    }

    let bar = foo(100); // 返回的是一个生成器函数的实例
    bar.next();
    // { value: 101, done: false } 每次调用实例的next方法就会返回一个对象，包含了yield的值和是否可继续调用next
    // 执行到return语句的时候，剩下的yield不再执行
```

## import & export

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

    // 重新导出默认导出,
    export { default } from "./module.js";

    // 重新将默认导出命名为命名导出
    export { default as module } from "./module.js";

    // 重新导出所有的命名导出
    export * from "./module.js";
```

## defer 和 async

script标签有一个defer和async属性，其兼容性在2021年已经非常不错了，IE本身就快淘汰了。

<img :src="$withBase('/defer.png')" alt="defer兼容性">

总而言之，defer和async的出现的目的是为了防止js脚本阻塞DOM的解析，我们都知道渲染进程解析html文档生成DOM树时，如果遇到script标签，那么会停止解析。转而去加载js脚本并且等脚本加载完毕并且执行脚本完毕之后再去解析DOM，这样会徒增FP的渲染时间。一般通用的做法是将js脚本放到body最后面，这对于老旧浏览器是最优解，但是defer和async能够让我们有更多的优化。

defer 和 async 的加载都是异步的，不会阻塞DOM的解析，唯一的区别在于，async是下载完毕之后就会被执行，执行的顺序和书写的顺序不一定保持一致（根据网络带宽决定）。
而带defer属性的脚本是在下载完毕之后，DOMCONTENTloaded事件触发之前会被执行。

都说一图胜千言，下面搬运外网图片比较三种脚本的加载方式的特点：

英语好的同学可以直接看外网链接[async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

`各个不同色块的含义`

![legend](https://www.growingwiththeweb.com/images/2014/02/26/legend.svg)

```js
    <script src="xxx.js"></script>
    // 可以看到先是解析html，接着解析到script标签，暂停html的解析，去下载脚本
    // 脚本下载完毕之后开始执行脚本，等到执行完毕之后。继续解析后面的HTML
```
![script normal](https://www.growingwiththeweb.com/images/2014/02/26/script.svg);

```js
    <script src="xxx.js" defer></script>
    // 正常解析HTML，遇到script标签会异步下载
    // 等到HTML解析完毕之后，DOMContentLoaded事件触发之前执行脚本 
```
![script normal](https://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg);

```js {3}
    <script src="xxx.js" async></script>
    // 正常解析HTML，遇到script标签会异步下载
    // 异步下载完毕之后会立即执行该脚本，执行脚本期间会阻塞HTML的解析
```
![script normal](https://www.growingwiththeweb.com/images/2014/02/26/script-async.svg);

我们应该根据不同的场景去使用对应的属性：

* 如果某些脚本需要依赖上一个脚本执行，推荐使用defer
* 如果某些脚本想在下载完毕之后立即去执行，同时也不需要操作DOM也不依赖其他脚本， 推荐使用async
* 如果脚本代码很小，推荐直接使用内联脚本放在body最后面


## weak-map 弱引用

Weakmap对象只能接受对象作为键名，值可以是任意类型，弱引用的意思比较抽象，我的理解是`键名`所引用的`对象`的弱引用，弱引用在计算机中中的概念是:<br/>
``在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收``。
在js中手动创建一个对象一般都是强引用

```js
let obj = {}; // 这是一个强引用，手动设置obj = null， 才有可能释放obj这个对象的内存
```
那么弱引用呢？

```js
let obj = {};
let weakMap = new WeakMap();
weakMap.set(obj, 123);
obj = null; // 注意此时weakmap对象的“obj”这个键名所引用的对象自动被释放了！！

// 如果是强引用，是不可能会被自动释放的
let obj = {};
let obj2 = {
    obj
}
obj = null; // 注意此时 obj2.obj所引用的仍旧是 {}
```
从下面的代码可以看出WeakMap,在键名所引用的对象的其他引用释放了内存后，WeakMap也能“聪明”的将该键名所引用的对象的内存给释放掉，键名也会随之自动消失。
这就称之为弱引用，WeakMap为什么不可遍历，是因为不知道GC何时会执行，每次GC可能会造成weakmap里的成员个数变动。

```js
// 在node环境下查看内存占用情况
node --expose-gc

global.gc(); // 手动执行一次gc
// 获取内存的单位 - MB
function getMb () {
    global.gc();
    const size = process.memoryUsage().heapUsed;
    console.log(size / 1024 / 1024);
}

let obj = new Array(1024 * 1024);

let map = new WeakMap();
map.set(obj, "hi");
getMb(); // 9.76MB

obj = null;
getMb(); // 1.96MB
```

## reflect 的作用

ES5中的Object对象有一个defineProperty属性，为JS语言提供了’元编程‘的功能，但Object这个对象太重了，有二十多个属性，而且’元编程‘操作不应该是一个Object对象应该做的事情，所以ES6单独设计出了proxy和reflect两个方法。Reflect主要是可以对对象进行’元编程‘，可以根据操作的结果返回一个布尔值判断是否操作成功；

::: warning 警告
Reflect和Proxy 都是由Object原型构造的，两者都不能派生（new）新的实例，它们都是一个全局的对象；
:::