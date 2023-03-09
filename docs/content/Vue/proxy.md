# 代理数组

## Vue 2 是如何对数组的操作实现响应式监听的？

在 Vue 2 中，Reactivity System 基于 ES5 的 `Object.defineProperty` 这个方法，但是这个方法不能对操作数组的api设置访问器。于是库的作者做了一个很 hack 的方式，将数组原型中的所有方法全都枚举出来, 我写一段简单的代码作为示例：

```js
// 你可能好奇 Array 并不止这些方法，但是只有数组的这些方法是 mutable，所以只需要枚举出这些方法
const methodsToPatch = ["push", "pop", "shift", "unshift", "reverse", "splice"， "sort"];

const originProto = Array.prototype;

const covertMethods = Object.create(originProto); // 接着创建一个新的对象，这个新的对象用来 cover data 中值为数组的原型，这个新的对象的原型是内置的数组原型

// 最后一步，遍历 methodsToPatch 中的所有的值，并在 `covertMethods` 这个新对象重复声明这些属性，这些
methodsToPatch.forEach(method => {
    def(covertMethods, method, function (...args) {
        // 最关键的一步，重新定义每个方法的内部操作，相当于做一层拦截处理
        // 编写相关的 observer 操作，并且 notify 更新 DOM
        // 最后，当调用 新对象的原型上的方法操作数组时, 返回最终操作结果
        return originProto[method].call(this, args);
    })
})

export default {
    data () {
        return {
            list: []
        }
    }
}
// 当 Vue 遍历到这个 property 为 list 且 值为 Array类型时，会改写 list 的原型上的所有数组方法
```

这就是在 Vue 2 中实现拦截数组的 hack 方法

## Vue 3 是如何对数组的操作实现响应式监听的？

Vue 3 使用 ES6 内置的 Proxy 可以对整个数组拦截，不需要这样的取巧方式。

先看看 Proxy 是如何对拦截的数组进行操作的

```js
// 定义一个 数组
const arr = [];

const proxyArr = new Proxy(arr, {
    set () {
        // TODO 
    }
});

// 对原数组操作会造成 mutable的，都会被 [SET] 拦截器捕获
arr.push(100);

{
    set (target, index, newVal, receiver) {
        // set 拦截器会被执行两次
        // 第一次是 target[index] = newVal;
        // 第二次是 target.length = index + 1;
    }
}
```