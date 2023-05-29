import{_ as s,o as a,c as e,R as o}from"./chunks/framework.62e38f8b.js";const h=JSON.parse('{"title":"在 Nuxt 中异步请求数据","description":"","frontmatter":{},"headers":[],"relativePath":"articles/nuxt/nuxt-guide.md","filePath":"articles/nuxt/nuxt-guide.md","lastUpdated":1685340449000}'),t={name:"articles/nuxt/nuxt-guide.md"},n=o(`<h1 id="在-nuxt-中异步请求数据" tabindex="-1">在 Nuxt 中异步请求数据 <a class="header-anchor" href="#在-nuxt-中异步请求数据" aria-label="Permalink to &quot;在 Nuxt 中异步请求数据&quot;">​</a></h1><p>Nuxt 中内置了几个开箱即用的请求数据方法。</p><p>它们分别是：</p><ul><li><code>$fetch</code></li><li><code>useFetch</code></li><li><code>useLazyFecth</code></li><li><code>useAsyncData</code></li><li><code>useLazyAsyncData</code></li></ul><p>我第一次认识到在 Nuxt 中有这么多调用 API 的方法时，内心是懵逼的。不明白 Nuxt 的开发者为什么要创建这么多的请求 API 的方法。</p><p>好在他们的官方文档描述的很清楚，每个 API 都过一遍后，结合实际使用就能上手了。</p><h2 id="fetch" tabindex="-1">$fetch <a class="header-anchor" href="#fetch" aria-label="Permalink to &quot;$fetch&quot;">​</a></h2><p><code>$fetch</code> 是基于 <a href="https://github.com/unjs/ofetch" target="_blank" rel="nofollow noopener noreferrer"><code>unjs/ofetch</code></a> 而来的，<code>$fetch</code> 会执行两次调用请求，第一次请求发生在服务端，第二次请求发生在客户端。</p><p>为什么要触发两次调用呢？根据文档的解释，是因为 <code>$fetch</code> 并不会自动序列化响应数据并传输到客户端。也就是 <code>$fetch</code> 拿到的数据不会挂载到 <code>window.__NUXT</code> 上了。</p><p>当然我们也可以做一些处理，只让它在服务端上运行。但是在客户端就拿不到这个数据了。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 仅在服务端执行请求</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">server) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">$fetch</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/artcile/detail</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 此时，如果该组件已经在客户端执行后，则无法获取到 data 的数据。因为 $fetch 并不会传输数据到客户端。</span></span></code></pre></div><h2 id="usefetch" tabindex="-1">useFetch <a class="header-anchor" href="#usefetch" aria-label="Permalink to &quot;useFetch&quot;">​</a></h2><p><code>useFetch</code> 这个 API 用来异步请求数据，它的执行时机由打开页面的方式而决定，假设 B 页面需要请求很多接口，用户从 A 页面导航到 B 页面，那么这些请求是客户端发出。</p><p>如果是初次打开的页面就是 B 页面，则这些请求会在服务端进行。换言之，<code>useFetch</code> 的具体请求场合根据是否用户初次打开页面而决定。<code>useFetch</code> 的执行只会发生在 CSR 或者 SSR 中的其中一个。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> pending </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useFetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/artcile/detail</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><blockquote><p><code>useFetch</code> 会 block 掉导航（仅在 CSR 期间），这句话的意思是只有当请求接口的数据返回成功或者失败后，才会导航页面。 如果不希望请求的数据阻塞导航，可以使用 <code>useLazyFetch</code>，这个 API 不会阻塞导航，而是优先导航页面，当数据返回过来后再填充数据到页面中。</p></blockquote><h2 id="uselazyfetch" tabindex="-1">useLazyFetch <a class="header-anchor" href="#uselazyfetch" aria-label="Permalink to &quot;useLazyFetch&quot;">​</a></h2><p><code>useLazyFetch</code> 是 <code>useFetch(&quot;/artcile/detail&quot;, { lazy: true })</code> 的另一种简写，正如上面我说的那样，这个异步请求 API 不会<em>阻塞</em>导航。这意味，如果我们从 A 页面导航 B 页面，不必等待 B 页面的所有请求执行完成，可以立即导航。但是我们需要对页面进行一些 loading 操作以便用户能知道需要等待时间才能将数据呈现到页面中。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> pending</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> refresh</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> error  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useLazyFetch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://api.github.com/users/daiwanxing</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>此外，由于使用了 <code>useLazyFetch</code>，我们不能立即在 B 页面使用接口响应的数据，而是应该 <code>watch</code> 数据的变化以进行下一步业务操作。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>useLazyFetch</code> 具有和 <code>useFetch</code> 相同的签名</p></div><h2 id="useasyncdata" tabindex="-1">useAsyncData <a class="header-anchor" href="#useasyncdata" aria-label="Permalink to &quot;useAsyncData&quot;">​</a></h2>`,22),l=[n];function c(p,r,i,d,y,u){return a(),e("div",null,l)}const D=s(t,[["render",c]]);export{h as __pageData,D as default};
