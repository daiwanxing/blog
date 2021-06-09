## link标签中的prefetch 与 preload 的差异

我们都知道行内样式的优点在于提高首屏渲染速度（不需要额外的请求一个css文件，浏览器下载好的html文件里就包含了css样式）。
但是它也不可避免的造成了代码的维护困难，那么有没有一种办法可以使得既然提高html文档的渲染，又能容易维护css代码呢。
我们可以通过link标签的rel属性中的prefetch 或者 preload属性来实现。

``` css
/*  
    告诉浏览器去预请求这个资源，因为要提前被UA用到，所以html文档下载完毕之后会立即去下
    载这个资源,这是一个异步的操作，不会阻塞HTML的渲染，另外preload属性值可以使得css文件并行下载
    只有rel="preload"时才能使用as属性，另外importance属性规定了资源的优先级，只有当rel="preload"
    或者prefetch才能使用该属性
*/
<link rel="preload" href="xxx.cdn.style.css" as="style">
```
``` css
/*
    告诉浏览器，这是一个将来（下一个导航）可能将要使用的资源，资源的优先级程度没有preload高
    UA会在网络状态空闲的时候去下载好这个资源，同样也是异步操作不会阻塞渲染
*/
<link rel="prefetch" href="xxx.cdn.style.css">
```
具体的资料我们可以参考MDN上关于[rel属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#attr-rel)的知识

## 什么是预请求和简单请求

当UA去请求一个资源的时候（一般是跨域的资源），会通过一个OPTIONS方法发送一个预请求（preflight request）
这个请求的目的：
1. 告诉server，UA实际要请求的Methods
2. 实际请求的header字段

server收到该请求会返回一个response，该repsonse不带body，会告诉浏览器sever能够接受的请求方式以及header字段， UA再去匹配header字段和请求方式是否匹配，来决定是否发送真正的请求。
<br />

简单请求一般是指methods为`GET`或者`POST`且没有任何自定义的header字段，其他的均为预请求。预检测请求的目的是什么， 是为了获知服务器是否允许跨域请求

## Chrome-network

如果我们请求一个接口过于缓慢的问题，我们可以通过chrome控制台的network面板找到对应的接口列表，鼠标移到`waterfall`列表项，会浮出一张图，类似下面这样

<img :src="$withBase('/network-waterfall.png')" alt="network-waterfalll兼容性">

这张图上告诉了开发者关于某个接口从发起请求，DNS查询耗时，服务器响应耗时等等信息，我们一一记录每个字段代表的内容含义。

* Queued at 750.73ms 表示的是该接口进入队列的是发生在750.73ms这个时间, 进入队列耗总耗时752.97ms。

* 浏览器请求资源的时候，html文件和css文件优先级是非常高的，这些资源是最先被进入队列，其次就是js脚本，资源文件。

* stalled 表示停滞的意思，表示的是该连接被推迟了多久（在队列中等待了多久）

* DNS-Lookup 表示的是DNS解析域名耗时

* initial connection 表示的是和server建立连接TCP连接的耗时

* SSL 表示的是SSL握手时间耗时（SSL安全套接字协议， 如果是https请求，需要SSL耗时，非https则不需要）

* request sent 表示客户机发送请求的耗时

* Wating (TTFB) 表示的浏览器等待第一个响应的字节的时间。

* Content DonwLoad 表示的是客户机收到服务机响应的内容耗时

## 浏览器缓存

浏览器缓存分为强缓存和协商缓存，其中强缓存：Expires （http/1.0）, Cache-control(http/1.1)，协商缓存：Etag, Last-Modified。
强缓存的优先级是要高于协商缓存的，如果浏览器请求一个资源，先判断是否能命中强缓存，如果无法命中，再继续判断能否命中协商缓存。

协商缓存中Etag的优先级要大于Last-Modified, 协商缓存必定会请求一次服务器信息，判断资源的etag和Last-Modified，未过期则返回一个几kb的响应头。
强缓存不会发送请求，直接走本地200（from memory cache, from disk cache）


<img :src="$withBase('/clipboard.png')" alt="浏览器缓存命中流程图">

::: warning 注意
Expires和Cache-Control同时存在，则Cache-control会覆盖Expires, 目前只支持http1.0的浏览器的市场份额几乎没有，所有现代浏览器都是用的Cache-Control。
:::

强缓存： cache-control 有很多的值可以相互配合，比如 cache-control: Max-age=300,public

|指令|作用|
|---|:--:|
|public|资源能被代理服务器和客户端同时缓存|
|private|资源只能被客户端缓存|
|no-cache|只是不走200，但是可以走304|
|no-store|不缓存任何响应|
|max-stale=30|30秒内即便缓存过期，也使用该缓存|
|min-fresh=30|希望在30内获取最新的响应|


## git 提交代码的commit前缀术语

1. feat 新功能特性

2. test 增加测试

3. chore 构建工具、辅助文件的变动，比如.gitignore、jsconfig.js

4. fix 某一块功能的bug修复

5. docs 文档添加

6. refactor 对原有的功能进行重构