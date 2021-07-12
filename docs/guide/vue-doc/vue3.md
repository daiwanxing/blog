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

