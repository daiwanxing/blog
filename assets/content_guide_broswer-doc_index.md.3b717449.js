import{_ as t,f as e,h as l,R as s}from"./chunks/framework.f4a9e748.js";const a="/blog/network-waterfall.png",o="/blog/clipboard.png",n="/blog/tcp三次握手.png",b=JSON.parse('{"title":"浏览器随记","description":"","frontmatter":{},"headers":[],"relativePath":"content/guide/broswer-doc/index.md","lastUpdated":1679202305000}'),p={name:"content/guide/broswer-doc/index.md"},r=s(`<h1 id="浏览器随记" tabindex="-1">浏览器随记 <a class="header-anchor" href="#浏览器随记" aria-label="Permalink to &quot;浏览器随记&quot;">​</a></h1><h2 id="link-标签中的-prefetch-与-preload-的差异" tabindex="-1">link 标签中的 prefetch 与 preload 的差异 <a class="header-anchor" href="#link-标签中的-prefetch-与-preload-的差异" aria-label="Permalink to &quot;link 标签中的 prefetch 与 preload 的差异&quot;">​</a></h2><p>我们都知道行内样式的优点在于提高首屏渲染速度（不需要额外的请求一个 css 文件，浏览器下载好的 html 文件里就包含了 css 样式）。 但是它也不可避免的造成了代码的维护困难，那么有没有一种办法可以使得既然提高 html 文档的渲染，又能容易维护 css 代码呢。 我们可以通过 link 标签的 rel 属性中的 prefetch 或者 preload 属性来实现。</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    告诉浏览器去预请求这个资源，因为要提前被UA用到，所以html文档下载完毕之后会立即去下</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    载这个资源,这是一个异步的操作，不会阻塞HTML的渲染，另外preload属性值可以使得css文件并行下载</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    只有rel=&quot;preload&quot;时才能使用as属性，另外importance属性规定了资源的优先级，只有当rel=&quot;preload&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    或者prefetch才能使用该属性</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">link</span><span style="color:#A6ACCD;"> rel=&quot;preload&quot; href=&quot;xxx</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">cdn</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">style</span><span style="color:#A6ACCD;">.css&quot; as=&quot;style&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    告诉浏览器，这是一个将来（下一个导航）可能将要使用的资源，资源的优先级程度没有preload高</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    UA会在网络状态空闲的时候去下载好这个资源，同样也是异步操作不会阻塞渲染</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">link</span><span style="color:#A6ACCD;"> rel=&quot;prefetch&quot; href=&quot;xxx</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">cdn</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">style</span><span style="color:#A6ACCD;">.css&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>具体的资料我们可以参考 MDN 上关于<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#attr-rel" target="_blank" rel="nofollow noopener noreferrer">rel 属性</a>的知识</p><h2 id="什么是预请求和简单请求" tabindex="-1">什么是预请求和简单请求 <a class="header-anchor" href="#什么是预请求和简单请求" aria-label="Permalink to &quot;什么是预请求和简单请求&quot;">​</a></h2><p>当 UA 去请求一个资源的时候（一般是跨域的资源），会通过一个 OPTIONS 方法发送一个预请求（preflight request） 这个请求的目的：</p><ol><li>告诉 server，UA 实际要请求的 Methods</li><li>实际请求的 header 字段</li></ol><p>server 收到该请求会返回一个 response，该 repsonse 不带 body，会告诉浏览器 sever 能够接受的请求方式以及 header 字段， UA 再去匹配 header 字段和请求方式是否匹配，来决定是否发送真正的请求。 <br></p><p>简单请求一般是指 methods 为<code>GET</code>或者<code>POST</code>且没有任何自定义的 header 字段，其他的均为预请求。预检测请求的目的是什么， 是为了获知服务器是否允许跨域请求</p><h2 id="chrome-network" tabindex="-1">Chrome-network <a class="header-anchor" href="#chrome-network" aria-label="Permalink to &quot;Chrome-network&quot;">​</a></h2><p>如果我们请求一个接口过于缓慢的问题，我们可以通过 chrome 控制台的 network 面板找到对应的接口列表，鼠标移到<code>waterfall</code>列表项，会浮出一张图，类似下面这样</p><p><img src="`+a+'" alt="network-waterfalll兼容性"></p><p>这张图上告诉了开发者关于某个接口从发起请求，DNS 查询耗时，服务器响应耗时等等信息，我们一一记录每个字段代表的内容含义。</p><ul><li><p>Queued at 750.73ms 表示的是该接口进入队列的是发生在 750.73ms 这个时间, 进入队列耗总耗时 752.97ms。</p></li><li><p>浏览器请求资源的时候，html 文件和 css 文件优先级是非常高的，这些资源是最先被进入队列，其次就是 js 脚本，资源文件。</p></li><li><p>stalled 表示停滞的意思，表示的是该连接被推迟了多久（在队列中等待了多久）</p></li><li><p>DNS-Lookup 表示的是 DNS 解析域名耗时</p></li><li><p>initial connection 表示的是和 server 建立连接 TCP 连接的耗时</p></li><li><p>SSL 表示的是 SSL 握手时间耗时（SSL 安全套接字协议， 如果是 https 请求，需要 SSL 耗时，非 https 则不需要）</p></li><li><p>request sent 表示客户机发送请求的耗时</p></li><li><p>Wating (TTFB) 表示的浏览器等待第一个响应的字节的时间。</p></li><li><p>Content DonwLoad 表示的是客户机收到服务机响应的内容耗时</p></li></ul><h2 id="浏览器缓存" tabindex="-1">浏览器缓存 <a class="header-anchor" href="#浏览器缓存" aria-label="Permalink to &quot;浏览器缓存&quot;">​</a></h2><p>浏览器缓存分为强缓存和协商缓存，其中强缓存：Expires （http/1.0）, Cache-control(http/1.1)，协商缓存：Etag, Last-Modified。 强缓存的优先级是要高于协商缓存的，如果浏览器请求一个资源，先判断是否能命中强缓存，如果无法命中，再继续判断能否命中协商缓存。</p><p>协商缓存中 Etag 的优先级要大于 Last-Modified, 协商缓存必定会请求一次服务器信息，判断资源的 etag 和 Last-Modified，未过期则返回一个几 kb 的响应头。 强缓存不会发送请求，直接走本地 200（from memory cache, from disk cache）</p><p><img src="'+o+'" alt="浏览器缓存命中流程图"></p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>Expires 和 Cache-Control 同时存在，则 Cache-control 会覆盖 Expires, 目前只支持 http1.0 的浏览器的市场份额几乎没有，所有现代浏览器都是用的 Cache-Control。</p></div><p>强缓存： cache-control 有很多的值可以相互配合，比如 cache-control: Max-age=300,public</p><table><thead><tr><th>指令</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td>public</td><td style="text-align:center;">资源能被代理服务器和客户端同时缓存</td></tr><tr><td>private</td><td style="text-align:center;">资源只能被客户端缓存</td></tr><tr><td>no-cache</td><td style="text-align:center;">只是不走 200，但是可以走 304</td></tr><tr><td>no-store</td><td style="text-align:center;">不缓存任何响应</td></tr><tr><td>max-stale=30</td><td style="text-align:center;">30 秒内即便缓存过期，也使用该缓存</td></tr><tr><td>min-fresh=30</td><td style="text-align:center;">希望在 30 内获取最新的响应</td></tr></tbody></table><h2 id="git-提交代码的-commit-前缀术语" tabindex="-1">git 提交代码的 commit 前缀术语 <a class="header-anchor" href="#git-提交代码的-commit-前缀术语" aria-label="Permalink to &quot;git 提交代码的 commit 前缀术语&quot;">​</a></h2><ol><li><p>feat 新功能特性</p></li><li><p>test 增加测试</p></li><li><p>chore 构建工具、辅助文件的变动，比如.gitignore、jsconfig.js</p></li><li><p>fix 某一块功能的 bug 修复</p></li><li><p>docs 文档添加</p></li><li><p>refactor 对原有的功能进行重构</p></li></ol><h2 id="页面性能优化" tabindex="-1">页面性能优化 <a class="header-anchor" href="#页面性能优化" aria-label="Permalink to &quot;页面性能优化&quot;">​</a></h2><p>关于页面性能的优化，可以拎出来讲的内容太多太多了。</p><ol><li><p>缓存优化，协商缓存强缓存</p></li><li><p>http 请求优化（使用 Http2 协议，复用同一个 tcp 连接），减少不必要的请求， dns 预解析， 图片上 cdn</p></li><li><p>重要资源预加载，非重要资源懒加载，脚本文件放在 body 末尾</p></li><li><p>代码文件压缩</p></li><li><p>代码优化，js 脚本执行时间不能过长，css 样式编写简洁，动画交互能用户 css 实现就不要用 js 来实现，不要用表格布局，html 文档结构清晰语义规范</p></li><li><p>不要用@import 去加载样式表，不要使用标签选择器，选择器嵌套不要超过三层，使用先进的布局方式</p></li><li><p>少使用一些触发强制同步布局的属性</p></li></ol><div class="tip custom-block"><p class="custom-block-title">提示</p><ol><li><p>css 的@import url(&#39;xx.css&#39;) 慎用，因为这个是串行加载，只有当加载了某个样式表后才会接着去加载 import 内的样式文件，不像 link 标签可以并行加载多个 css 文件。</p></li><li><p>css 样式表的加载会阻塞脚本的执行（防止脚本对样式的查询出现不确定性），脚本的加载会阻塞 DOM 的解析。</p></li><li><p>css 选择器的查找，是从右往左进行的，例如<code>.head .banner div</code>，那么渲染线程在解析 CSS 选择器的时候，先遍历找到 DOM tree 中所有的 div 标签（一个网页的 div 标签是很多的），然后从这些 div 标签集合中找到匹配其父（祖父）的标签类名为<code>banner</code>的标签，再从类名为<code>banner</code>的标签往上找到所有的类名为<code>head</code>标签。要想提升 css 选择器的查找性能，最好不要直接写标签选择器而是用类选择器代替。<strong>另外，选择器的嵌套 🙅‍ 不要超过 3 层，为什么？因为方便以后别人要覆盖你的样式代码，过多的嵌套导致一个样式声明的权重太高，如果其他开发者要覆盖你的声明样式，只能编写比你的样式声明更高的权重，而要想增加样式权重，常见的做法是添加选择器，这样维护很麻烦 🖐</strong></p></li></ol></div><h2 id="tcp-三次握手-四次挥手" tabindex="-1">TCP 三次握手，四次挥手 <a class="header-anchor" href="#tcp-三次握手-四次挥手" aria-label="Permalink to &quot;TCP 三次握手，四次挥手&quot;">​</a></h2><p><img src="'+n+'" alt="tcp三次握手">;</p>',31),i=[r];function c(d,h,m,u,y,f){return e(),l("div",null,i)}const C=t(p,[["render",c]]);export{b as __pageData,C as default};
