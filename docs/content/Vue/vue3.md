## 入口函数createApp干了些什么

在Vue3中我们如果要创建一个vue应用实例，其代码如下所示

```js
 import { createApp } from 'vue'
 import App from "./App.vue"

 cosnt app = createApp(App);
 app.mount('#app');
```

那么createApp这个函数到底干了些什么？一起通过打开vue项目的源码来一探究竟, createApp的实现逻辑在
`vue-next\packages\runtime-dom\src\index.ts`,


## defineAsyncComponent 和 import异步引入组件

vue3 新增了`defineAsyncComponent`这个API，表示当需要使用组件的时候异步加载一个组件，返回的是组件实例本身，接收一个返回promise的函数。但是我们不能在vue-router4中去使用这个API异步导入组件到路由，[https://github.com/vuejs/vue-router-next/pull/682](issue )这里提到，如果在router中使用`defineAsyncComponent`引入一个异步组件会报警告，因为函数返回的并不是一个promise，或者返回的对象并没有render函数。而`defineAsyncComponent`仅仅只是返回了这个组件实例对象。


## setup 函数 使用emit options

setup语法糖如何定义emit options

```js
import { defineEmit } from "vue";;

const emits =  defineEmit(['sendMessage']);
```

还有一个`defineEmits`的API，这个API是在编译的时候会自动导入(`defineProps`也是编译宏，不需要手动导入, 可能是尤大觉得移除defineEmit会对3.1.*之前的项目会有break change，但是API命名需要和`defineProps`保持一致（s带复数的形式），所以设计了两个API，其函数签名都是一致的。

详见RFC[https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md](script-setup)

```js
const emits = defineEmits(['sendMessage']); // 不需要手动导入
```