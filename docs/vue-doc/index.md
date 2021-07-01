# Vue2 源码

 ## Vue2 数组是如何实现数据侦测的

 vue2自定义了一些相关的数组的方法（push, pop, splice），放置到data中的数组原型上，每当调用这些方法，转而去调用了vue2自定义的相关方法进行拦截。

```js

data () {
    return {
        list: [1,2,3]
    }
}
```

data中的list是一个数组， 第一次访问this.list 会触发def，将自定义的数组方法挂载到数组的原型上

```js
let originMethods = Array.prototype;
let arrayMethods = Object.create(originMethods); // 拿到数组的原型，arrayMethods 这个空对象的原型指向数组的原型, arrayMethods是需要挂载到data中的数组的原型上

// 自定义数组的方法
[
    'push',
    'pop',
    'shift'
    ...
].forEach(function (method) {
    // 执行原始的数组的方法的操作
    let value = originMethods.call(this, method); // 先用原始方法计算得到的值
    def(target, method, function (...args) { 
        let v = originMethods.apply(this, args);
        //... 加入观察者对象，通知dep更新，返回结果
        return v;
    });
});

function def (target, key ,val) {
    Object.defineProperty(target, key, {
        value: val,
        enumerable: false,
        writeable: true,
        configurable: true
    });
}
// 将自定义的方法放置到data中数组的原型上
```