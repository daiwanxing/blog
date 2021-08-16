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

##  Vue2的响应式系统的实现原理

Vue2(以下简称v2)的响应式系统的实现，用到了一个ES5的Object.defineProperty的方法，v2内部会将props和data函数返回的对象的自身所有的属性通过调用`defineReactive`方法转换成响应式属性，这个`defineReactive`方法，主要将对象的每一个属性设置一个getter和setter。例如

```js
export default {
    data () {
        return {
            name: "dwx",
            age: 21,
            sex: "male"
        }
    }
}
```
v2通过劫持data函数返回的对象的每一个属性将其变为该对象下的响应式属性, 每一个响应式属性都有一个dep,这个dep是依赖项的数组，每当访问该响应式属性就会将watcher存入到dep中，也就是说在[GET]中收集依赖。每当给该响应式属性[SET]操作会调用`Watcher`对象中的`notify`，`notify`会取出subs这个watcher数组，依次调用每个watcher的update更新视图，也就是说在[SET]操作中触发依赖的更新。

```js
{
    name: {
        value: "dwx",
        get () {
            // reactiveGetter
        },  
        set () {
            // reactiveSetter
        }
    }
}
```
v2会将每个属性通过`defineReactive`变为响应式属性，而属性的[SET]操作的得到的新值（非基本类型的值）会通过`observe`方法构造`Observer`实例将其进行watch，并且打上``__ob__``标记，表示已经该值已经被observer. 为什么基本类型的值不需要被observe，因为在js中基本类型的值都是存在栈中，不像对象放在堆中。我们给基本类型的值赋值都是拿到的一个值的副本。不需要对其进行observe，每当被赋值一个新的基本类型的值时直接update视图即可。


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


## Vue3 移除native修饰符


native修饰符一般用在事件绑定上，例如在vue2上，我们需要给一个组件绑定一个原生事件

```html
<my-foo @click.native='sendFoo'></my-foo>
````

当我们点击my-foo组件的时候执行的是原生click事件的回调，click事件被绑定到了my-foo的根组件上。如果去掉`native`修饰符，是无法通过点击my-foo组件触发回调函数的执行，必须得在组件内通过`this.$emit('click')`才能触发自定义的click事件。也就是说不加`native`修饰符，vue会视为是一个自定义事件。

那么在vue3中由于移除了native修饰符之后，我们应该怎么样触发原生事件呢❓ 认真阅读文档后我发现，vue3新增了一个emits option, vue推荐我们将自定义的事件约定在emits数组内。如果未在emits数组内定义的事件会被视作为原生事件绑定到组件得根组件上（除非inheritAttr: false，这样就不会绑定到根组件了）

```html {1}
<my-foo @click='sendFoo'></my-foo>
````

```js
app.component('my-foo', {
    emits: []
})
````
上面的代码中emits是一个空数组，之前提到过`如果未在emit数组内定义的事件会被视作为原生事件绑定到组件的根组件上`，那么click就是一个原生点击事件


## router-view的新用法

在vue-router4中router-view提供了一个作用域插槽，该插槽暴露了Component、route两个对象

```html
<router-view v-slot="{Component, route}">
    <component :is="Component"></component>
</router-view>
```
如果我们需给视图组件添加过渡效果，则不能再直接通过transition组件包裹router-view, 这是因为router-view不能直接在keep-alive和transition内部使用。 必须由transition inside 到 router-view组件才可以。

```html
<!-- 不再被支持 -->
<transition>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</transtion>
````

```html
<!-- 正确的写法 -->
<router-view v-slot="{Component, route}">
    <transition>
        <keep-alive>
            <component :is="Component"></component>
        </keep-alive>
    </transition>
</router-view>
```

## asyncComponent

Vue2 提供了一个异步加载组件工厂函数， 可以在按需加载的时候加载该组件

```js
  const asyncCompoent = () => ({
      component: import('xxxx.js') // component必须是一个已经被resolve的promise
      loading: loadingComponent,
      delay: 100, // delay表示是等待多久才出现loading组件，这里是延迟100ms出现loading
      timeout: 10000, // 允许加载组件的耗时范围
      error: errorComponent, // 超过设定的timeout 会渲染error组件
  });
```
起初我以为可以用在vue-router中，假设这么一个场景，用户访问某个路由A，在路由A未被resolve的时候先展示loadingComponent，等resolve完成后
再加载该组件。但我这种想法很美好，忽略了路由解析组件背后的流程。 访问某个路由，会先执行一系列守卫，全局守卫 -> 路由守卫 -> 组件守卫, 等这些守卫
全部执行完毕后，导航被resolve, 异步组件本体已经下载完毕了，这时是可以直接render到UI上，如果再将Loading组件渲染，就会很多余也不符合业务要求

具体我通过vue-form的一篇帖子找到了答案[forum-请教一个关于异步组件的问题](https://forum.vuejs.org/t/topic/95387/10),