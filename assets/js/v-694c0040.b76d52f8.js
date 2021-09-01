"use strict";(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[283],{6911:(e,t,l)=>{l.r(t),l.d(t,{data:()=>s});const s={key:"v-694c0040",path:"/guide/broswer-doc/",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"link标签中的prefetch 与 preload 的差异",slug:"link标签中的prefetch-与-preload-的差异",children:[]},{level:2,title:"什么是预请求和简单请求",slug:"什么是预请求和简单请求",children:[]},{level:2,title:"Chrome-network",slug:"chrome-network",children:[]},{level:2,title:"浏览器缓存",slug:"浏览器缓存",children:[]},{level:2,title:"git 提交代码的commit前缀术语",slug:"git-提交代码的commit前缀术语",children:[]},{level:2,title:"页面性能优化",slug:"页面性能优化",children:[]},{level:2,title:"TCP三次握手，四次挥手",slug:"tcp三次握手-四次挥手",children:[]}],filePathRelative:"guide/broswer-doc/index.md",git:{updatedTime:162627481e4,contributors:[{name:"daiwanxing",email:"daiwanxing@antvsion.com",commits:5}]}}},2886:(e,t,l)=>{l.r(t),l.d(t,{default:()=>g});var s=l(6252);const n=(0,s.uE)('<h2 id="link标签中的prefetch-与-preload-的差异" tabindex="-1"><a class="header-anchor" href="#link标签中的prefetch-与-preload-的差异" aria-hidden="true">#</a> link标签中的prefetch 与 preload 的差异</h2><p>我们都知道行内样式的优点在于提高首屏渲染速度（不需要额外的请求一个css文件，浏览器下载好的html文件里就包含了css样式）。 但是它也不可避免的造成了代码的维护困难，那么有没有一种办法可以使得既然提高html文档的渲染，又能容易维护css代码呢。 我们可以通过link标签的rel属性中的prefetch 或者 preload属性来实现。</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token comment">/*  \n    告诉浏览器去预请求这个资源，因为要提前被UA用到，所以html文档下载完毕之后会立即去下\n    载这个资源,这是一个异步的操作，不会阻塞HTML的渲染，另外preload属性值可以使得css文件并行下载\n    只有rel=&quot;preload&quot;时才能使用as属性，另外importance属性规定了资源的优先级，只有当rel=&quot;preload&quot;\n    或者prefetch才能使用该属性\n*/</span>\n&lt;link rel=<span class="token string">&quot;preload&quot;</span> href=<span class="token string">&quot;xxx.cdn.style.css&quot;</span> as=<span class="token string">&quot;style&quot;</span>&gt;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token comment">/*\n    告诉浏览器，这是一个将来（下一个导航）可能将要使用的资源，资源的优先级程度没有preload高\n    UA会在网络状态空闲的时候去下载好这个资源，同样也是异步操作不会阻塞渲染\n*/</span>\n&lt;link rel=<span class="token string">&quot;prefetch&quot;</span> href=<span class="token string">&quot;xxx.cdn.style.css&quot;</span>&gt;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>',4),a=(0,s.Uk)("具体的资料我们可以参考MDN上关于"),r={href:"https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#attr-rel",target:"_blank",rel:"noopener noreferrer"},i=(0,s.Uk)("rel属性"),c=(0,s.Uk)("的知识"),p=(0,s.uE)('<h2 id="什么是预请求和简单请求" tabindex="-1"><a class="header-anchor" href="#什么是预请求和简单请求" aria-hidden="true">#</a> 什么是预请求和简单请求</h2><p>当UA去请求一个资源的时候（一般是跨域的资源），会通过一个OPTIONS方法发送一个预请求（preflight request） 这个请求的目的：</p><ol><li>告诉server，UA实际要请求的Methods</li><li>实际请求的header字段</li></ol><p>server收到该请求会返回一个response，该repsonse不带body，会告诉浏览器sever能够接受的请求方式以及header字段， UA再去匹配header字段和请求方式是否匹配，来决定是否发送真正的请求。 <br></p><p>简单请求一般是指methods为<code>GET</code>或者<code>POST</code>且没有任何自定义的header字段，其他的均为预请求。预检测请求的目的是什么， 是为了获知服务器是否允许跨域请求</p><h2 id="chrome-network" tabindex="-1"><a class="header-anchor" href="#chrome-network" aria-hidden="true">#</a> Chrome-network</h2><p>如果我们请求一个接口过于缓慢的问题，我们可以通过chrome控制台的network面板找到对应的接口列表，鼠标移到<code>waterfall</code>列表项，会浮出一张图，类似下面这样</p>',7),o=["src"],d=(0,s.uE)('<p>这张图上告诉了开发者关于某个接口从发起请求，DNS查询耗时，服务器响应耗时等等信息，我们一一记录每个字段代表的内容含义。</p><ul><li><p>Queued at 750.73ms 表示的是该接口进入队列的是发生在750.73ms这个时间, 进入队列耗总耗时752.97ms。</p></li><li><p>浏览器请求资源的时候，html文件和css文件优先级是非常高的，这些资源是最先被进入队列，其次就是js脚本，资源文件。</p></li><li><p>stalled 表示停滞的意思，表示的是该连接被推迟了多久（在队列中等待了多久）</p></li><li><p>DNS-Lookup 表示的是DNS解析域名耗时</p></li><li><p>initial connection 表示的是和server建立连接TCP连接的耗时</p></li><li><p>SSL 表示的是SSL握手时间耗时（SSL安全套接字协议， 如果是https请求，需要SSL耗时，非https则不需要）</p></li><li><p>request sent 表示客户机发送请求的耗时</p></li><li><p>Wating (TTFB) 表示的浏览器等待第一个响应的字节的时间。</p></li><li><p>Content DonwLoad 表示的是客户机收到服务机响应的内容耗时</p></li></ul><h2 id="浏览器缓存" tabindex="-1"><a class="header-anchor" href="#浏览器缓存" aria-hidden="true">#</a> 浏览器缓存</h2><p>浏览器缓存分为强缓存和协商缓存，其中强缓存：Expires （http/1.0）, Cache-control(http/1.1)，协商缓存：Etag, Last-Modified。 强缓存的优先级是要高于协商缓存的，如果浏览器请求一个资源，先判断是否能命中强缓存，如果无法命中，再继续判断能否命中协商缓存。</p><p>协商缓存中Etag的优先级要大于Last-Modified, 协商缓存必定会请求一次服务器信息，判断资源的etag和Last-Modified，未过期则返回一个几kb的响应头。 强缓存不会发送请求，直接走本地200（from memory cache, from disk cache）</p>',5),h=["src"],u=(0,s.uE)('<div class="custom-container warning"><p class="custom-container-title">注意</p><p>Expires和Cache-Control同时存在，则Cache-control会覆盖Expires, 目前只支持http1.0的浏览器的市场份额几乎没有，所有现代浏览器都是用的Cache-Control。</p></div><p>强缓存： cache-control 有很多的值可以相互配合，比如 cache-control: Max-age=300,public</p><table><thead><tr><th>指令</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td>public</td><td style="text-align:center;">资源能被代理服务器和客户端同时缓存</td></tr><tr><td>private</td><td style="text-align:center;">资源只能被客户端缓存</td></tr><tr><td>no-cache</td><td style="text-align:center;">只是不走200，但是可以走304</td></tr><tr><td>no-store</td><td style="text-align:center;">不缓存任何响应</td></tr><tr><td>max-stale=30</td><td style="text-align:center;">30秒内即便缓存过期，也使用该缓存</td></tr><tr><td>min-fresh=30</td><td style="text-align:center;">希望在30内获取最新的响应</td></tr></tbody></table><h2 id="git-提交代码的commit前缀术语" tabindex="-1"><a class="header-anchor" href="#git-提交代码的commit前缀术语" aria-hidden="true">#</a> git 提交代码的commit前缀术语</h2><ol><li><p>feat 新功能特性</p></li><li><p>test 增加测试</p></li><li><p>chore 构建工具、辅助文件的变动，比如.gitignore、jsconfig.js</p></li><li><p>fix 某一块功能的bug修复</p></li><li><p>docs 文档添加</p></li><li><p>refactor 对原有的功能进行重构</p></li></ol><h2 id="页面性能优化" tabindex="-1"><a class="header-anchor" href="#页面性能优化" aria-hidden="true">#</a> 页面性能优化</h2><p>关于页面性能的优化，可以拎出来讲的内容太多太多了。</p><ol><li><p>缓存优化，协商缓存强缓存</p></li><li><p>http请求优化（使用Http2协议，复用同一个tcp连接），减少不必要的请求， dns预解析， 图片上cdn</p></li><li><p>重要资源预加载，非重要资源懒加载，脚本文件放在body末尾</p></li><li><p>代码文件压缩</p></li><li><p>代码优化，js脚本执行时间不能过长，css样式编写简洁，动画交互能用户css实现就不要用js来实现，不要用表格布局，html文档结构清晰语义规范</p></li><li><p>不要用@import 去加载样式表，不要使用标签选择器，选择器嵌套不要超过三层，使用先进的布局方式</p></li><li><p>少使用一些触发强制同步布局的属性</p></li></ol><div class="custom-container tip"><p class="custom-container-title">提示</p><ol><li><p>css的@import url(&#39;xx.css&#39;) 慎用，因为这个是串行加载，只有当加载了某个样式表后才会接着去加载import内的样式文件，不像link标签可以并行加载多个css文件。</p></li><li><p>css样式表的加载会阻塞脚本的执行（防止脚本对样式的查询出现不确定性），脚本的加载会阻塞DOM的解析。</p></li><li><p>css选择器的查找，是从右往左进行的，例如<code>.head .banner div</code>，那么渲染线程在解析CSS选择器的时候，先遍历找到DOM tree中所有的div标签（一个网页的div标签是很多的），然后从这些div标签集合中找到匹配其父（祖父）的标签类名为<code>banner</code>的标签，再从类名为<code>banner</code>的标签往上找到所有的类名为<code>head</code>标签。要想提升css选择器的查找性能，最好不要直接写标签选择器而是用类选择器代替。<strong>另外，选择器的嵌套🙅‍不要超过3层，为什么？因为方便以后别人要覆盖你的样式代码，过多的嵌套导致一个样式声明的权重太高，如果其他开发者要覆盖你的声明样式，只能编写比你的样式声明更高的权重，而要想增加样式权重，常见的做法是添加选择器，这样维护很麻烦🖐</strong></p></li></ol></div><h2 id="tcp三次握手-四次挥手" tabindex="-1"><a class="header-anchor" href="#tcp三次握手-四次挥手" aria-hidden="true">#</a> TCP三次握手，四次挥手</h2>',10),m=["src"],g={render:function(e,t){const l=(0,s.up)("OutboundLink");return(0,s.wg)(),(0,s.iD)(s.HY,null,[n,(0,s._)("p",null,[a,(0,s._)("a",r,[i,(0,s.Wm)(l)]),c]),p,(0,s._)("img",{src:e.$withBase("/network-waterfall.png"),alt:"network-waterfalll兼容性"},null,8,o),d,(0,s._)("img",{src:e.$withBase("/clipboard.png"),alt:"浏览器缓存命中流程图"},null,8,h),u,(0,s._)("img",{src:e.$withBase("/tcp 三次握手.png"),alt:"tcp三次握手"},null,8,m)],64)}}}}]);