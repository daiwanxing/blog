## 介绍

vue-router4是随着vue3配套的诞生的官方路由库,
下面总结VueRouter4和VueRouter3的配置区别

## 正文

1. 所有的函数式导航，例如`$router.push()/replace()/forward()`，调用之后会返回一个期约状态已经变更的promise对象。

2. `$router.push`导航时如果提供了path，则params参数完全被忽略。

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

### 如何在compositionAPI 中使用vue-router

