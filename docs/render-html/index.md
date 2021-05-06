## link标签中的prefetch 与 preload 的差异

我们都知道行内样式的优点在于提高首屏渲染速度（不需要额外的请求一个css文件，浏览器下载好的html文件里就包含了css样式）。
但是它也不可避免的造成了代码的维护困难，那么有没有一种办法可以使得既然提高html文档的渲染，又能容易维护css代码呢。
我们可以通过link标签的rel属性中的prefetch 或者 preload属性来实现。

``` css
/*  
    告诉浏览器去预请求这个资源，因为要提前被UA用到，所以html文档下载完毕之后会立即去下
    载这个资源,这是一个异步的操作，不会阻塞HTML的渲染，另外preload属性值可以使得css文件并行下载
*/
<link rel="preload" href="xxx.cdn.style.css">
```
``` css
/*
    告诉浏览器，这是一个将来（下一个导航）可能将要使用的资源，资源的优先级程度没有preload高
    UA会在网络状态空闲的时候去下载好这个资源，同样也是异步操作不会阻塞渲染
*/
<link rel="prefetch" href="xxx.cdn.style.css">
```

## 什么是预请求和简单请求

当UA去请求一个资源的时候（一般是跨域的资源），会通过一个OPTIONS方法发送一个预请求（preflight request）
这个请求的目的：
1. 告诉serverUA实际要请求的Methods
2. 实际请求的header字段

server收到该请求会返回一个response，该repsonse不带body，会告诉浏览器sever能够接受的请求方式以及header字段， UA再去匹配header字段和请求方式是否匹配，来决定是否发送真正的请求。
<br />

简单请求一般是指methods为`GET`或者`POST`且没有任何自定义的header字段，其他的均为预请求。预检测请求的目的是什么， 是为了获知服务器是否允许跨域请求