import{_ as e,f as o,h as a,R as r}from"./chunks/framework.0f2d6a02.js";const w=JSON.parse('{"title":"ref Vs ShallowRef","description":"","frontmatter":{},"headers":[],"relativePath":"articles/vue/refVsShallowRef.md","lastUpdated":1680597939000}'),s={name:"articles/vue/refVsShallowRef.md"},l=r('<h1 id="ref-vs-shallowref" tabindex="-1">ref Vs ShallowRef <a class="header-anchor" href="#ref-vs-shallowref" aria-label="Permalink to &quot;ref Vs ShallowRef&quot;">​</a></h1><p>Vue 3 声明一个响应式变量提供了 <code>ref</code> 和 <code>reactive</code> 两种 API。</p><p>我平常会根据业务的需要，选择合适的响应式 API。</p><p>本文主要想说说 ref 和 shallowRef 我对这两个 API 的理解。</p><p><code>ref</code> 和 <code>shallowRef</code> 两个方法的签名都是一致，不同之处在于，<code>shallowRef</code> 只会监听 <code>.value</code> 的值的变化，如果 <code>shallowRef</code> 接收的是一个对象，那么对象的值的变化，是无法被 Observer 的。</p>',5),t=[l];function c(f,d,_,h,n,p){return o(),a("div",null,t)}const R=e(s,[["render",c]]);export{w as __pageData,R as default};
