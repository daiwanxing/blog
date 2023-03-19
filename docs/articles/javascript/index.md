
## 中断异步任务

js 有个特殊的内置对象用来中断异步任务： `AbortController`,

通过`new AbortController()`生成一个控制器实例, 该实例具有一个属性： signal和一个method: abort()


```ts
const abortController = new AbortController();

const signal = abortController.signal;

abortController.abort(); // 执行中断方法
signal.addEventListener("abort", fn); // 监听abort的事件，执行回调
signal.aborted; // 返回一个布尔值，表示是否被中断
```

与fetch请求深度集成，通过调用fetch传递第二个配置参数对象中的signal属性，来中断fetch请求。（fetch会监听signal的值）


## requestIdleCallback 更精细的任务调度API

在js引擎处于<strong>空闲</strong> 状态时才会执行回调，空闲的字面意思是指本轮事件循环中主线程同步任务执行完毕了，且任务队列里的异步任务也一并执行完成了。它的任务调度优先级很低，一般用来在空闲时处理一些其他的额外的任务，进行更精细的任务调度,避免在主线程“拥挤”的时候执行某些代码。它支持你设定一个超时参数timeout，如果在timeout后仍未执行该回调，则在下一次事件循环中空闲时期下强制执行。
```js
    window.requestIdleCallback(deadline => {
        console.log(deadline);
        // deadline有一个属性叫didTimeout， 就是判断是否是超时执行的
        console.log(deadline.timeRemaining());   
    }, {
        timeout: 40000
    })
```

## JSON.parse

`JSON.parse`方法解析一个形如对象的json字符串的时候，会过滤掉其属性的值为undefined、function以及symbol类型的属性

`JSON.stringify`接收一个对象进行JSON转换时，会对其对象的属性值为`undefined`、`symbol`、`function`的属性直接过滤掉,

```js
const data = { name: undefined };

const json = JSON.stringify(data); // `{}`
```
当然我们也可以给对象声明一个`toJSON`的属性，其值是一个函数，`JSON.stringify`会调用该方法根据得到的返回值进行转化, `toJSON`存在的目的是为了能在某些无法解析值的场景下返回一个适当的值， 此外`JSON.stringify`接收第二个参数replacer，将对象中每一个即将被序列化的值进行转换。

```js
const data = { name: undefined, toJSON () { return { name: "david" } } };

const json = JSON.stringify(data); // `{ name: 'david' }`
```


## 为什么各大浏览器厂商都未实现尾递归调用优化？

尾递归调用是TC39在对ES2015上新增的一个特性，其目的是当一个函数仅在return 一个function的时候，保证其调用栈永远只会保留一个，提升了性能。但是前不久在阅读DC的新书<<JavaScript悟道>>一书中提到尾调用优化这个方案除了apple自家的safari浏览器实现了之外，其他各大浏览器均未实现该特性，理由是认为该特性在某些情况下会出现问题而拒绝实现。在知乎上也寻找到了相关的问题：[DC 的新书《JavaScript 悟道》里面讲了很多尾递归优化，可 TC39 不是已经判其死刑了吗？](https://www.zhihu.com/question/473997712)，不知在未来这个特性是否被永久删除。


## webGL 和 canvas 的区别 

canvas是HTML5推出一个具有绘图功能的画布，可以通过`getContext('2d')` 或者 `getContext('3d')`获取2d或者3d渲染上下文，其中3d是通过凭借webgl的渲染能力实现的。


## 如何获取css中的transform属性的值

假如我们有这么一行代码:

```ts
const el = document.querySelector(".box");
el.style.transform = `translateX(100px)`;
```
我们想通过js去得到el的translateX的值，可能很多人想到了可以直接`el.style.transform`拿到这个属性的值，但是可惜拿到的是一大串字符串，而且必须得
使正则去匹配花括号里面的值还要转换成number类型，较为麻烦。

于是我通过浏览stackOverflow得到一个更为优雅得办法，那就是使用`WebKitCSSMatrix`这个构造函数生成一个4*4的3D矩阵实例，它接收一个DOM对象，
并可以直接访问DOM对象的X,Y,Z轴的变换值。 

:::tip 提示
3D矩阵都是 4 * 4, 而2D矩阵则是3 * 3
:::

```ts
const matrix = new WebKitCSSMatrix(el);

matrix.m41; // 得到了translateX的变换值
```
你可能会好奇m41是个什么属性？为什么能拿到translateX的值?

前面我们提到WebKitCSSMatrix生成的是一个4*4的3D矩阵，4 * 4代表了4行4列，而translateX表示的是第四列第一行的坐标（也就是m41）,
而同样的translateY表示的是第四列第2行所在的坐标（也就是m42），下面有张图清晰的说明了这个偏移值所在的3D矩阵的坐标点。

![3D矩阵各个transform属性所在的位置](https://i.stack.imgur.com/QQX5V.png);


## delete操作符

delete操作符可以删除对象的一个属性（前提是该对象的属性是可配置的).
如果删除的操作成功， 则返回布尔值true, 否则返回false（如果要删除的属性不在对象自身，仍会返回true）

```ts
const obj = {
    name: "lucy"
};

delete obj.name // true
obj.name; // undefined

Object.defineProperty(obj, "gender", {
    configurable: false,
    value: 12
}); 

delete obj.gender; // false
obj.gender; // 12
```

如果对数组的元素进行delete操作则不会改变数组的长度, 只会删除数组下标属性的值, 留出一个空槽

```ts
const fruitList = ["apple", "pear"];

delete fruitList[1]; // true

fruitList; // ["apple", empty * 1];
```

## 生成器
 
生成器函数是一个特殊的函数，其最为强大的功能可以暂停/恢复函数内部的代码的运行。

1. 创建一个生成器 通过`*`标志创建一个生成器函数，执行该函数返回一个迭代器对象

```js
function *foo () {
    // 其中 yield关键字表示当迭代器解析到这行代码时暂停执行
    // 并且只有当调用下一个next时恢复这行代码的执行，直到遇到下一个yield关键字为止
}

const it = foo();

it.next(); // { value: undefined, done: false }
// 第一个next 只是为了负责启动生成器函数，当执行到一个yield时阻塞函数体内的代码的执行, 此时next函数返回的是yield关键字 后面的表达式的值，如果yield关键字后的表达式为空，
// 则value的值是undefined { value: undefined, done: false }
it.next(); // { value: undefined, done: false }
// next的最后一项的值，会作为生成器函数return的值， 如果没有显示指定return的值，则最后一个调用next函数所传递的值会被丢弃，return隐示的值是undefined
it.next();
```

2. 规范和所有兼容浏览器都会默认丢弃传递给第一个next的任何东西，因此第一个next只是负责用来启动生成器，不应该对其传递任何参数。
通常有个规律，next函数的调用次数 = 声明yield关键字的次数+1.
