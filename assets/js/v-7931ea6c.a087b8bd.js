(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[205],{9962:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>t});const t={key:"v-7931ea6c",path:"/guide/vue-doc/",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"Vue2 数组是如何实现数据侦测的",slug:"vue2-数组是如何实现数据侦测的",children:[]},{level:2,title:"Vue2的响应式系统的实现原理",slug:"vue2的响应式系统的实现原理",children:[]},{level:2,title:"Vue中computed 和 watch",slug:"vue中computed-和-watch",children:[]},{level:2,title:"组件的data为什么必须是一个函数 而且 需要return一个对象",slug:"组件的data为什么必须是一个函数-而且-需要return一个对象",children:[]},{level:2,title:"key",slug:"key",children:[]},{level:2,title:"diff",slug:"diff",children:[]},{level:2,title:"Vue3 移除native修饰符",slug:"vue3-移除native修饰符",children:[]},{level:2,title:"router-view的新用法",slug:"router-view的新用法",children:[]}],filePathRelative:"guide/vue-doc/index.md",git:{updatedTime:162657553e4,contributors:[{name:"daiwanxing",email:"daiwanxing@antvsion.com",commits:3}]}}},8537:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>p});const t=(0,a(6252).uE)('<h2 id="vue2-数组是如何实现数据侦测的" tabindex="-1"><a class="header-anchor" href="#vue2-数组是如何实现数据侦测的" aria-hidden="true">#</a> Vue2 数组是如何实现数据侦测的</h2><p>vue2自定义了一些相关的数组的方法（push, pop, splice），放置到data中的数组原型上，每当调用这些方法，转而去调用了vue2自定义的相关方法进行拦截。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>\n<span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        list<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>data中的list是一个数组， 第一次访问this.list 会触发def，将自定义的数组方法挂载到数组的原型上</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> originMethods <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>\n<span class="token keyword">let</span> arrayMethods <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>originMethods<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 拿到数组的原型，arrayMethods 这个空对象的原型指向数组的原型, arrayMethods是需要挂载到data中的数组的原型上</span>\n\n<span class="token comment">// 自定义数组的方法</span>\n<span class="token punctuation">[</span>\n    <span class="token string">&#39;push&#39;</span><span class="token punctuation">,</span>\n    <span class="token string">&#39;pop&#39;</span><span class="token punctuation">,</span>\n    <span class="token string">&#39;shift&#39;</span>\n    <span class="token operator">...</span>\n<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 执行原始的数组的方法的操作</span>\n    <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token function">originMethods</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> method<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 先用原始方法计算得到的值</span>\n    <span class="token function">def</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> method<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> \n        <span class="token keyword">let</span> v <span class="token operator">=</span> <span class="token function">originMethods</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">//... 加入观察者对象，通知dep更新，返回结果</span>\n        <span class="token keyword">return</span> v<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">def</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key <span class="token punctuation">,</span>val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        value<span class="token operator">:</span> val<span class="token punctuation">,</span>\n        enumerable<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        writeable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        configurable<span class="token operator">:</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// 将自定义的方法放置到data中数组的原型上</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h2 id="vue2的响应式系统的实现原理" tabindex="-1"><a class="header-anchor" href="#vue2的响应式系统的实现原理" aria-hidden="true">#</a> Vue2的响应式系统的实现原理</h2><p>Vue2(以下简称v2)的响应式系统的实现，用到了一个ES5的Object.defineProperty的方法，v2内部会将props和data函数返回的对象的自身所有的属性通过调用<code>defineReactive</code>方法转换成响应式属性，这个<code>defineReactive</code>方法，主要将对象的每一个属性设置一个getter和setter。例如</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            name<span class="token operator">:</span> <span class="token string">&quot;dwx&quot;</span><span class="token punctuation">,</span>\n            age<span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>\n            sex<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>v2通过劫持data函数返回的对象的每一个属性将其变为该对象下的响应式属性, 每一个响应式属性都有一个dep,这个dep是依赖项的数组，每当访问该响应式属性就会将watcher存入到dep中，也就是说在[GET]中收集依赖。每当给该响应式属性[SET]操作会调用<code>Watcher</code>对象中的<code>notify</code>，<code>notify</code>会取出subs这个watcher数组，依次调用每个watcher的update更新视图，也就是说在[SET]操作中触发依赖的更新。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n    name<span class="token operator">:</span> <span class="token punctuation">{</span>\n        value<span class="token operator">:</span> <span class="token string">&quot;dwx&quot;</span><span class="token punctuation">,</span>\n        <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// reactiveGetter</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>  \n        <span class="token function">set</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// reactiveSetter</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>v2会将每个属性通过<code>defineReactive</code>变为响应式属性，而属性的[SET]操作的得到的新值（非基本类型的值）会通过<code>observe</code>方法构造<code>Observer</code>实例将其进行watch，并且打上<code>__ob__</code>标记，表示已经该值已经被observer. 为什么基本类型的值不需要被observe，因为在js中基本类型的值都是存在栈中，不像对象放在堆中。我们给基本类型的值赋值都是拿到的一个值的副本。不需要对其进行observe，每当被赋值一个新的基本类型的值时直接update视图即可。</p><h2 id="vue中computed-和-watch" tabindex="-1"><a class="header-anchor" href="#vue中computed-和-watch" aria-hidden="true">#</a> Vue中computed 和 watch</h2><p>不同点：computed可以缓存上次计算的结果（如果依赖没有被更新，只有当依赖的数据发生了变化才会重新计算），watch是只要被侦测的源的值变更了就会执行回调函数</p><p>相同点：都是Watcher构造出来的实例</p><p>Vue有三个watch， 组件watch，用户watch，computed watch</p><h2 id="组件的data为什么必须是一个函数-而且-需要return一个对象" tabindex="-1"><a class="header-anchor" href="#组件的data为什么必须是一个函数-而且-需要return一个对象" aria-hidden="true">#</a> 组件的data为什么必须是一个函数 而且 需要return一个对象</h2><p>一个组件就是一个vue的实例，即便引入了多个相同的组件，那么也会生成多个实例，倘若data定义为一个普通的原始对象，那么其他组件引入该组件并进行操作时，更改了引入组件的状态，进而会影响到同样也引入了该组件的组件状态。</p><p>本质就是就是相当于，data对象如果直接放到原型上进行操作，那么其他变量操作了原型上的数据会造成数据污染</p><h2 id="key" tabindex="-1"><a class="header-anchor" href="#key" aria-hidden="true">#</a> key</h2><p>使用v-for循环生成一个列表时，通常需要给每一个item绑定一个key，这是便于在更新DOM时，找出只需要比较上次生成的VDOM不同的key那一个进行更细粒度的更新。</p><h2 id="diff" tabindex="-1"><a class="header-anchor" href="#diff" aria-hidden="true">#</a> diff</h2><p>Vue3 在diff算法中相比vue2增加了静态标记，作用于是给将来会发生变化的地方添加一个flag标记</p><h2 id="vue3-移除native修饰符" tabindex="-1"><a class="header-anchor" href="#vue3-移除native修饰符" aria-hidden="true">#</a> Vue3 移除native修饰符</h2><p>native修饰符一般用在事件绑定上，例如在vue2上，我们需要给一个组件绑定一个原生事件</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-foo</span> <span class="token attr-name">@click.native</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>sendFoo<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-foo</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>当我们点击my-foo组件的时候执行的是原生click事件的回调，click事件被绑定到了my-foo的根组件上。如果去掉<code>native</code>修饰符，是无法通过点击my-foo组件触发回调函数的执行，必须得在组件内通过<code>this.$emit(&#39;click&#39;)</code>才能触发自定义的click事件。也就是说不加<code>native</code>修饰符，vue会视为是一个自定义事件。</p><p>那么在vue3中由于移除了native修饰符之后，我们应该怎么样触发原生事件呢❓ 认真阅读文档后我发现，vue3新增了一个emits option, vue推荐我们将自定义的事件约定在emits数组内。如果未在emits数组内定义的事件会被视作为原生事件绑定到组件得根组件上（除非inheritAttr: false，这样就不会绑定到根组件了）</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-foo</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>sendFoo<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-foo</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="highlight-lines"><div class="highlight-line"> </div></div><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;my-foo&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    emits<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>上面的代码中emits是一个空数组，之前提到过<code>如果未在emit数组内定义的事件会被视作为原生事件绑定到组件的根组件上</code>，那么click就是一个原生点击事件</p><h2 id="router-view的新用法" tabindex="-1"><a class="header-anchor" href="#router-view的新用法" aria-hidden="true">#</a> router-view的新用法</h2><p>在vue-router4中router-view提供了一个作用域插槽，该插槽暴露了Component、route两个对象</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{Component, route}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Component<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果我们需给视图组件添加过渡效果，则不能再直接通过transition组件包裹router-view, 这是因为router-view不能直接在keep-alive和transition内部使用。 必须由transition inside 到 router-view组件才可以。</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token comment">&lt;!-- 不再被支持 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transtion</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token comment">&lt;!-- 正确的写法 --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{Component, route}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Component<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>```\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>',36),p={render:function(n,s){return t}}}}]);