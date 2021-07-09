# Vue2

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

## Vue中computed 和 watch

不同点：computed可以缓存上次计算的结果（如果依赖没有被更新，只有当依赖的数据发生了变化才会重新计算），watch是只要被侦测的源的值变更了就会执行回调函数

相同点：都是Watcher构造出来的实例

Vue有三个watch， 组件watch，用户watch，computed watch

## 组件的data为什么必须是一个函数 而且 需要return一个对象

一个组件就是一个vue的实例，即便引入了多个相同的组件，那么也会生成多个实例，倘若data定义为一个普通的原始对象，那么其他组件引入该组件并进行操作时，更改了引入组件的状态，进而会影响到同样也引入了该组件的组件状态。

本质就是就是相当于，data对象如果直接放到原型上进行操作，那么其他变量操作了原型上的数据会造成数据污染

## key

使用v-for循环生成一个列表时，通常需要给每一个item绑定一个key，这是便于在更新DOM时，找出只需要比较上次生成的VDOM不同的key那一个进行更细粒度的更新。


## diff

Vue3 在diff算法中相比vue2增加了静态标记，作用于是给将来会发生变化的地方添加一个flag标记

## diff