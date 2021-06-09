# nuxt 是一个基于Vue的服务端渲染框架

## 路由
   根据pages目录结构自动生成vue-router模块的路由配置，通过`<nuxt-link>`可以在页面之间使用路由。

   ```js
   <nuxt-link to="/">
   ```

   nuxt中定义带参数的动态路由，需要创建下划线为前缀的Vue文件或目录


## nuxt概念


基本算是弄懂了nuxt这个框架是怎么运行的，nuxt会在服务端跑一遍得到一个html文件后，转到浏览器再跑一遍。服务端的Vue有专属的钩子函数，比如query，head,fetch，asyncdata等等...

nuxt服务端，有两个生命周期钩子，`beforeCreate`和`created`，`asyncData`这个钩子函数用来提前获取服务端的数据并注入到data对象, `beforeCreate`和`created`是同时运行在客户端和服务端中。