# 浏览器随记

## link 标签中的 prefetch 与 preload 的差异

我们都知道行内样式的优点在于提高首屏渲染速度（不需要额外的请求一个 css 文件，浏览器下载好的 html 文件里就包含了 css 样式）。
但是它也不可避免的造成了代码的维护困难，那么有没有一种办法可以使得既然提高 html 文档的渲染，又能容易维护 css 代码呢。
我们可以通过 link 标签的 rel 属性中的 prefetch 或者 preload 属性来实现。

```css
/*
    告诉浏览器去预请求这个资源，因为要提前被UA用到，所以html文档下载完毕之后会立即去下
    载这个资源,这是一个异步的操作，不会阻塞HTML的渲染，另外preload属性值可以使得css文件并行下载
    只有rel="preload"时才能使用as属性，另外importance属性规定了资源的优先级，只有当rel="preload"
    或者prefetch才能使用该属性
*/
<link rel="preload" href="xxx.cdn.style.css" as="style">
```

```css
/*
    告诉浏览器，这是一个将来（下一个导航）可能将要使用的资源，资源的优先级程度没有preload高
    UA会在网络状态空闲的时候去下载好这个资源，同样也是异步操作不会阻塞渲染
*/
<link rel="prefetch" href="xxx.cdn.style.css">
```

具体的资料我们可以参考 MDN 上关于[rel 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#attr-rel)的知识

## 什么是预请求和简单请求

当 UA 去请求一个资源的时候（一般是跨域的资源），会通过一个 OPTIONS 方法发送一个预请求（preflight request）
这个请求的目的：

1. 告诉 server，UA 实际要请求的 Methods
2. 实际请求的 header 字段

server 收到该请求会返回一个 response，该 repsonse 不带 body，会告诉浏览器 sever 能够接受的请求方式以及 header 字段， UA 再去匹配 header 字段和请求方式是否匹配，来决定是否发送真正的请求。
<br />

简单请求一般是指 methods 为`GET`或者`POST`且没有任何自定义的 header 字段，其他的均为预请求。预检测请求的目的是什么， 是为了获知服务器是否允许跨域请求

## Chrome-network

如果我们请求一个接口过于缓慢的问题，我们可以通过 chrome 控制台的 network 面板找到对应的接口列表，鼠标移到`waterfall`列表项，会浮出一张图，类似下面这样

![network-waterfalll兼容性](/network-waterfall.png)

这张图上告诉了开发者关于某个接口从发起请求，DNS 查询耗时，服务器响应耗时等等信息，我们一一记录每个字段代表的内容含义。

-  Queued at 750.73ms 表示的是该接口进入队列的是发生在 750.73ms 这个时间, 进入队列耗总耗时 752.97ms。

-  浏览器请求资源的时候，html 文件和 css 文件优先级是非常高的，这些资源是最先被进入队列，其次就是 js 脚本，资源文件。

-  stalled 表示停滞的意思，表示的是该连接被推迟了多久（在队列中等待了多久）

-  DNS-Lookup 表示的是 DNS 解析域名耗时

-  initial connection 表示的是和 server 建立连接 TCP 连接的耗时

-  SSL 表示的是 SSL 握手时间耗时（SSL 安全套接字协议， 如果是 https 请求，需要 SSL 耗时，非 https 则不需要）

-  request sent 表示客户机发送请求的耗时

-  Wating (TTFB) 表示的浏览器等待第一个响应的字节的时间。

-  Content DonwLoad 表示的是客户机收到服务机响应的内容耗时

## 浏览器缓存

浏览器缓存分为强缓存和协商缓存，其中强缓存：Expires （http/1.0）, Cache-control(http/1.1)，协商缓存：Etag, Last-Modified。
强缓存的优先级是要高于协商缓存的，如果浏览器请求一个资源，先判断是否能命中强缓存，如果无法命中，再继续判断能否命中协商缓存。

协商缓存中 Etag 的优先级要大于 Last-Modified, 协商缓存必定会请求一次服务器信息，判断资源的 etag 和 Last-Modified，未过期则返回一个几 kb 的响应头。
强缓存不会发送请求，直接走本地 200（from memory cache, from disk cache）

![浏览器缓存命中流程图](/clipboard.png)

::: warning 注意
Expires 和 Cache-Control 同时存在，则 Cache-control 会覆盖 Expires, 目前只支持 http1.0 的浏览器的市场份额几乎没有，所有现代浏览器都是用的 Cache-Control。
:::

强缓存： cache-control 有很多的值可以相互配合，比如 cache-control: Max-age=300,public

| 指令         |                作用                |
| ------------ | :--------------------------------: |
| public       | 资源能被代理服务器和客户端同时缓存 |
| private      |        资源只能被客户端缓存        |
| no-cache     |    只是不走 200，但是可以走 304    |
| no-store     |           不缓存任何响应           |
| max-stale=30 | 30 秒内即便缓存过期，也使用该缓存  |
| min-fresh=30 |     希望在 30 内获取最新的响应     |

## git 提交代码的 commit 前缀术语

1. feat 新功能特性

2. test 增加测试

3. chore 构建工具、辅助文件的变动，比如.gitignore、jsconfig.js

4. fix 某一块功能的 bug 修复

5. docs 文档添加

6. refactor 对原有的功能进行重构

## 页面性能优化

关于页面性能的优化，可以拎出来讲的内容太多太多了。

1. 缓存优化，协商缓存强缓存

2. http 请求优化（使用 Http2 协议，复用同一个 tcp 连接），减少不必要的请求， dns 预解析， 图片上 cdn

3. 重要资源预加载，非重要资源懒加载，脚本文件放在 body 末尾

4. 代码文件压缩

5. 代码优化，js 脚本执行时间不能过长，css 样式编写简洁，动画交互能用户 css 实现就不要用 js 来实现，不要用表格布局，html 文档结构清晰语义规范

6. 不要用@import 去加载样式表，不要使用标签选择器，选择器嵌套不要超过三层，使用先进的布局方式

7. 少使用一些触发强制同步布局的属性

:::tip 提示

1. css 的@import url('xx.css') 慎用，因为这个是串行加载，只有当加载了某个样式表后才会接着去加载 import 内的样式文件，不像 link 标签可以并行加载多个 css 文件。

2. css 样式表的加载会阻塞脚本的执行（防止脚本对样式的查询出现不确定性），脚本的加载会阻塞 DOM 的解析。

3. css 选择器的查找，是从右往左进行的，例如`.head .banner div`，那么渲染线程在解析 CSS 选择器的时候，先遍历找到 DOM tree 中所有的 div 标签（一个网页的 div 标签是很多的），然后从这些 div 标签集合中找到匹配其父（祖父）的标签类名为`banner`的标签，再从类名为`banner`的标签往上找到所有的类名为`head`标签。要想提升 css 选择器的查找性能，最好不要直接写标签选择器而是用类选择器代替。<strong>另外，选择器的嵌套 🙅‍ 不要超过 3 层，为什么？因为方便以后别人要覆盖你的样式代码，过多的嵌套导致一个样式声明的权重太高，如果其他开发者要覆盖你的声明样式，只能编写比你的样式声明更高的权重，而要想增加样式权重，常见的做法是添加选择器，这样维护很麻烦 🖐</strong>
   :::

## TCP 三次握手，四次挥手

![tcp三次握手](/tcp三次握手.png);
