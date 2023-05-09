import{_ as e,o,c as s,R as a}from"./chunks/framework.a8ae3dec.js";const _=JSON.parse('{"title":"cookie 操作","description":"","frontmatter":{},"headers":[],"relativePath":"articles/javascript/set-cookie.md","lastUpdated":1683643495000}'),n={name:"articles/javascript/set-cookie.md"},t=a(`<h1 id="cookie-操作" tabindex="-1">cookie 操作 <a class="header-anchor" href="#cookie-操作" aria-label="Permalink to &quot;cookie 操作&quot;">​</a></h1><p>cookie是由服务端响应给浏览器的，一般只有同源的情况下，浏览器才会自动保存cookie信息，如果需要跨域也能保存响应头的cookie信息。则服务器需要设置：</p><p><code>Access-Control-Allow-Origin: 前端项目的域名</code>,<code>Access-Control-Allow-Credentials: true</code>,浏览器在请求的时候设置<code>withCredentials: true</code>, 对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。否则该请求将会失败。</p><p>通过调用<code>document.cookie</code>方法我们可以一串包含所有cookie信息的字符串，也可以通过该属性对某个cookie属性进行设置，<strong>每次调用document.cookie只能对一个cookie进行设置或更新，同时对多个cookie属性进行设置则会导致静默失败。</strong></p><p>如果要删除一个cookie，直接将max-age设置为0或者-1即可删除，如果对expires进行设置过去的时间，则会在当前页关闭后清除，保留在本次会话中。如果设置cookie的时候没有定义expires/max-age，则cookie会在对话结束之后过期。</p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie" target="_blank" rel="nofollow noopener noreferrer">更多资料请点击MDN-cookie</a></p><h2 id="子元素滚动到顶部或者尾部如何防止父元素也滚动" tabindex="-1">子元素滚动到顶部或者尾部如何防止父元素也滚动？ <a class="header-anchor" href="#子元素滚动到顶部或者尾部如何防止父元素也滚动" aria-label="Permalink to &quot;子元素滚动到顶部或者尾部如何防止父元素也滚动？&quot;">​</a></h2><p>一般这种业务场景出现在一个具有滚动条的浮层侧边栏，以及父元素body也有滚动条，那么我们在浮层侧边栏上滚动到顶部或者尾部，此时就不能再继续滚动条了，但是body会开始进行滚动，这就是浏览器的默认行为。</p><p>而我们为了更好的用户体验，希望子元素滚动到顶部或者尾部时，禁止body滚动。那么需要借助js来帮我们完成这个交互逻辑。</p><p>pc端的解决方案参考了<a href="https://www.zhangxinxu.com/wordpress/2015/12/element-scroll-prevent-parent-element-scroll-js/" target="_blank" rel="nofollow noopener noreferrer">张鑫旭-父子滚动-pc</a>, 移动端同样如此：<a href="https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/?shrink=1" target="_blank" rel="nofollow noopener noreferrer">张鑫旭-父子滚动-h5</a></p><p>另外需注意：<code>mousewheel</code>是一个非standard的属性，而且已经被deprecated,非Gecko浏览器都实现了它，建议用wheel事件替换</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(element)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">wheel</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//  注意mousewheel在firefox的类似事件名为DOMMouseScroll</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 其实有一种歪路子，当我子元素滚动的时候，我干掉父元素的滚动条，不就行了吗，当子元素消失的时候，</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 再让父元素滚动条出来，但是这种办法适用于浮层的情况，可以遮掉body的滚动条，用户本身就看不到，也不会有何影响。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 所以这不是一种较为完美的解决办法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 最好的移动端办法是，借助touchmove, touchstart 和 touchend</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// touchStart获取第一次记录的触摸位置信息，判断是否往上走（负值）且滚动的位置已经到了底部，就执行默认事件，禁止父级和子级滚动</span></span></code></pre></div>`,12),l=[t];function c(r,p,i,d,h,k){return o(),s("div",null,l)}const f=e(n,[["render",c]]);export{_ as __pageData,f as default};
