"use strict";(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[165],{2607:(n,s,e)=>{e.r(s),e.d(s,{data:()=>a});const a={key:"v-6a3c23fc",path:"/guide/vue-doc/vue3.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"入口函数createApp干了些什么",slug:"入口函数createapp干了些什么",children:[]},{level:2,title:"defineAsyncComponent 和 import异步引入组件",slug:"defineasynccomponent-和-import异步引入组件",children:[]},{level:2,title:"setup 函数 使用emit options",slug:"setup-函数-使用emit-options",children:[]}],filePathRelative:"guide/vue-doc/vue3.md",git:{updatedTime:162882402e4,contributors:[{name:"daiwanxing",email:"daiwanxing@antvsion.com",commits:4},{name:"daiwanxing",email:"377099119@qq.com",commits:1}]}}},332:(n,s,e)=>{e.r(s),e.d(s,{default:()=>p});const a=(0,e(6252).uE)('<h2 id="入口函数createapp干了些什么" tabindex="-1"><a class="header-anchor" href="#入口函数createapp干了些什么" aria-hidden="true">#</a> 入口函数createApp干了些什么</h2><p>在Vue3中我们如果要创建一个vue应用实例，其代码如下所示</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code> <span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n <span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&quot;./App.vue&quot;</span>\n\n cosnt app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">;</span>\n app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>那么createApp这个函数到底干了些什么？一起通过打开vue项目的源码来一探究竟, createApp的实现逻辑在 <code>vue-next\\packages\\runtime-dom\\src\\index.ts</code>,</p><h2 id="defineasynccomponent-和-import异步引入组件" tabindex="-1"><a class="header-anchor" href="#defineasynccomponent-和-import异步引入组件" aria-hidden="true">#</a> defineAsyncComponent 和 import异步引入组件</h2><p>vue3 新增了<code>defineAsyncComponent</code>这个API，表示当需要使用组件的时候异步加载一个组件，返回的是组件实例本身，接收一个返回promise的函数。但是我们不能在vue-router4中去使用这个API异步导入组件到路由，<a href="issue">https://github.com/vuejs/vue-router-next/pull/682</a>这里提到，如果在router中使用<code>defineAsyncComponent</code>引入一个异步组件会报警告，因为函数返回的并不是一个promise，或者返回的对象并没有render函数。而<code>defineAsyncComponent</code>仅仅只是返回了这个组件实例对象。</p><h2 id="setup-函数-使用emit-options" tabindex="-1"><a class="header-anchor" href="#setup-函数-使用emit-options" aria-hidden="true">#</a> setup 函数 使用emit options</h2><p>setup语法糖如何定义emit options</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineEmit <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> emits <span class="token operator">=</span>  <span class="token function">defineEmit</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;sendMessage&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>还有一个<code>defineEmits</code>的API，这个API是在编译的时候会自动导入(<code>defineProps</code>也是编译宏，不需要手动导入, 可能是尤大觉得移除defineEmit会对3.1.*之前的项目会有break change，但是API命名需要和<code>defineProps</code>保持一致（s带复数的形式），所以设计了两个API，其函数签名都是一致的。</p><p>详见RFC<a href="script-setup">https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md</a></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> emits <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;sendMessage&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不需要手动导入</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>',12),p={render:function(n,s){return a}}}}]);