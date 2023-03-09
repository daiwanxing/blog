# 我能用 WeakMap / WeakSet 在业务中做些什么？


ES2015 推出后，出现了很多新的内置对象，例如 `Map()`，`Set()`。它们还各自有个兄弟，名叫`WeakMap()`，`WeakSet()`。

`Map()` 和 `Set()`相信很多人都已经使用过，各自都有不同的特点，开发者一般会根据自己遇到的业务场景来选择不同的对象。

- `Map()` 中的每一项是由 key 和 value构成， key和value的值可以是任意数据类型。
- `Set()` 中的每一项是由每一个独一无二的value构成，`Set`存储的是一系列unique value。

很多开发者认为`Map()` 和 普通对象没什么两样，都是通过设置键并存储对应的值.

```js
const obj = {
    name: "foo"
}

const map = new Map();
map.set("name", "foo")
```

这是一个错误的观点。

- 普通对象的键只能是字符串类型。
- 普通对象中的键值对没有固定的顺序。
- 普通对象是没有迭代器的，而且遍历的顺序不保证固定。

## 再说说WeakMap 和 WeakSet

`WeakMap()`只能接受对象作为键名，值可以是任意类型。

`WeakSet()` 只接受值的类型是对象。

弱引用的意思比较抽象，我的理解是`键名`所引用的`对象`的弱引用，弱引用在计算机中的概念是:
> 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

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