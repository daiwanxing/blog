import{_ as e,c as a,o as t,a as n}from"./app.257604ca.js";const _=JSON.parse('{"title":"nuxt 是一个基于Vue的服务端渲染框架","description":"","frontmatter":{},"headers":[{"level":2,"title":"路由","slug":"路由","link":"#路由","children":[]},{"level":2,"title":"nuxt概念","slug":"nuxt概念","link":"#nuxt概念","children":[]}],"relativePath":"nuxt-doc/index.md","lastUpdated":1656233727000}'),s={name:"nuxt-doc/index.md"},o=n(`<h1 id="nuxt-是一个基于vue的服务端渲染框架" tabindex="-1">nuxt 是一个基于Vue的服务端渲染框架 <a class="header-anchor" href="#nuxt-是一个基于vue的服务端渲染框架" aria-hidden="true">#</a></h1><h2 id="路由" tabindex="-1">路由 <a class="header-anchor" href="#路由" aria-hidden="true">#</a></h2><p>根据pages目录结构自动生成vue-router模块的路由配置，通过<code>&lt;nuxt-link&gt;</code>可以在页面之间使用路由。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">nuxt-link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>nuxt中定义带参数的动态路由，需要创建下划线为前缀的Vue文件或目录</p><h2 id="nuxt概念" tabindex="-1">nuxt概念 <a class="header-anchor" href="#nuxt概念" aria-hidden="true">#</a></h2><p>基本算是弄懂了nuxt这个框架是怎么运行的，nuxt会在服务端跑一遍得到一个html文件后，转到浏览器再跑一遍。服务端的Vue有专属的钩子函数，比如query，head,fetch，asyncdata等等...</p><p>nuxt服务端，有两个生命周期钩子，<code>beforeCreate</code>和<code>created</code>，<code>asyncData</code>这个钩子函数用来提前获取服务端的数据并注入到data对象, <code>beforeCreate</code>和<code>created</code>是同时运行在客户端和服务端中。</p>`,8),c=[o];function l(d,r,p,i,u,h){return t(),a("div",null,c)}const D=e(s,[["render",l]]);export{_ as __pageData,D as default};