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

vue3 新增了`defineAsyncComponent`这个API，表示当需要使用组件的时候异步加载一个组件，返回的是组件实例本身，接收一个返回promise的函数。但是我们不能在vue-router4中去使用这个API，[https://github.com/vuejs/vue-router-next/pull/682](issue)这里提到，如果在router中使用`defineAsyncComponent`引入一个异步组件会报警告，因为函数返回的并不是一个promise，或者返回的对象并没有render函数。而`defineAsyncComponent`仅仅只是返回了这个组件实例对象。