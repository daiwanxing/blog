## 介绍

vue-router4是随着vue3配套的诞生的官方路由库,
下面总结VueRouter4和VueRouter3的配置区别

## 正文

1. 所有的函数式导航，例如`router.push()/replace()/forward()`，调用之后会返回一个期约状态已经变更的promise对象。

2. `router.push()`导航时如果提供了path，则params参数完全被忽略。

``` js
this.$router.push({path: '/user', params: { name: 'xxx' }});
// will be ignored, works bad

// works good
this.$router.push({path: `/user/${name}`});
```

3. `router.replace()`和`router.push()`唯一的区别是不会创建一个新的历史记录到栈中，只会替换当前路由栈最顶层的历史记录。

``` js
<router-link :to="{name: 'xxx'}" replace></router-link>

this.$router.push({}, replace: true) === this.$router.replace
```

## 如何在compositionAPI 中使用vue-router

<p>本节将介绍vue-router如何搭配组合式api进行开发。</p>

由于我们无法在setup中访问this，所以也不能像Vue2一样通过`this.$router()` / `this.$route`来对路由进行相关的操作。替代的办法就是通过从Vue中导入`useRoute`和`useRouter`，`useRoute`返回的是一个记录了当前路由信息的响应式对象， `useRouter`返回的是一个操作路由跳转相关的对象。同样的，路由相关的导航守卫，也是通过导入的形式来使用。

``` js
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const router = useRouter(); // 返回的是一个router对象， 提供了一系列的路由操作的api
// router.push()
const route = useRoute(); // 返回的是一个route对象，记录了当前路由的相关信息

console.log(route.params);
```