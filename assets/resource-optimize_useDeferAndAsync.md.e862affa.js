import{_ as s,c as a,o as e,a as n}from"./app.d558be66.js";const t="/frontend-notes/assets/defer.5713816c.png",h=JSON.parse('{"title":"defer 和 async","description":"","frontmatter":{},"headers":[],"relativePath":"resource-optimize/useDeferAndAsync.md","lastUpdated":1672278093000}'),l={name:"resource-optimize/useDeferAndAsync.md"},p=n('<h1 id="defer-和-async" tabindex="-1">defer 和 async <a class="header-anchor" href="#defer-和-async" aria-hidden="true">#</a></h1><p>script 标签有一个 defer 和 async 属性，其兼容性在 2021 年已经非常不错了(IE 不支持)。</p><p><img src="'+t+`" alt="defer兼容性"></p><p>defer 和 async 的出现的目的是为了防止 js 脚本阻塞 DOM 的解析，我们都知道渲染进程解析 html 文档生成 DOM 树时，如果遇到 script 标签，那么会停止解析。转而去加载 js 脚本并且等脚本加载完毕并且执行脚本完毕之后再去解析 DOM，这样会徒增 FP 的渲染时间。一般通用的做法是将 js 脚本放到 body 最后面，这对于老旧浏览器是最优解，但是 defer 和 async 能够让我们有更多的优化。</p><p>defer 和 async 的加载都是异步的，不会阻塞 DOM 的解析，唯一的区别在于，async 是下载完毕之后就会被执行，执行的顺序和书写的顺序不一定保持一致（根据网络带宽决定）。 而带 defer 属性的脚本是在下载完毕之后，DOMCONTENTloaded 事件触发之前会被执行。</p><p>都说一图胜千言，下面搬运外网图片比较三种脚本的加载方式的特点：</p><p>英语好的同学可以直接看外网链接<a href="https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html" target="_blank" rel="noreferrer">async vs defer attributes</a></p><p><code>各个不同色块的含义</code></p><p><img src="https://www.growingwiththeweb.com/images/2014/02/26/legend.svg" alt="legend"></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xxx.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 可以看到先是解析html，接着解析到script标签，暂停html的解析，去下载脚本</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 脚本下载完毕之后开始执行脚本，等到执行完毕之后。继续解析后面的HTML</span></span>
<span class="line"></span></code></pre></div><p><img src="https://www.growingwiththeweb.com/images/2014/02/26/script.svg" alt="script normal">;</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xxx.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">defer</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 正常解析HTML，遇到script标签会异步下载</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 等到HTML解析完毕之后，DOMContentLoaded事件触发之前执行脚本</span></span>
<span class="line"></span></code></pre></div><p><img src="https://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg" alt="script defer">;</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight has-highlighted-lines"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xxx.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">async</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 正常解析HTML，遇到script标签会异步下载</span></span>
<span class="line highlighted"><span style="color:#676E95;font-style:italic;">// 异步下载完毕之后会立即执行该脚本，执行脚本期间会阻塞HTML的解析</span></span>
<span class="line"></span></code></pre></div><p><img src="https://www.growingwiththeweb.com/images/2014/02/26/script-async.svg" alt="script async">;</p><p>我们应该根据不同的场景去使用对应的属性：</p><ul><li>如果某些脚本需要依赖上一个脚本执行，推荐使用 defer</li><li>如果某些脚本想在下载完毕之后立即去执行，同时也不需要操作 DOM 也不依赖其他脚本， 推荐使用 async</li><li>如果脚本代码很小，推荐直接使用内联脚本放在 body 最后面</li><li>注意，script 如果是一个 ES Module，其默认设置了 defer 属性</li><li>注意，script 标签还有一个<code>nomodule</code>属性，表示如果浏览器不支持 ES2015+, 则执行该文件，一般用作降级策略</li><li>注意，如果是内嵌脚本（没有 src）属性，设置 defer 无效 (但是设置了 type 为 module 的内嵌模块有效)（async 可以用于普通的内嵌脚本）</li></ul>`,17),o=[p];function c(r,i,y,d,D,F){return e(),a("div",null,o)}const f=s(l,[["render",c]]);export{h as __pageData,f as default};
