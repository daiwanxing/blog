import{_ as s,o as a,c as n,R as l}from"./chunks/framework.a8ae3dec.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/javascript/index.md","lastUpdated":1683643495000}'),o={name:"articles/javascript/index.md"},p=l(`<h2 id="中断异步任务" tabindex="-1">中断异步任务 <a class="header-anchor" href="#中断异步任务" aria-label="Permalink to &quot;中断异步任务&quot;">​</a></h2><p>js 有个特殊的内置对象用来中断异步任务： <code>AbortController</code>,</p><p>通过<code>new AbortController()</code>生成一个控制器实例, 该实例具有一个属性： signal和一个method: abort()</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> abortController </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">AbortController</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> signal </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> abortController</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">signal</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">abortController</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">abort</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 执行中断方法</span></span>
<span class="line"><span style="color:#A6ACCD;">signal</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">abort</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> fn)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 监听abort的事件，执行回调</span></span>
<span class="line"><span style="color:#A6ACCD;">signal</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">aborted</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 返回一个布尔值，表示是否被中断</span></span></code></pre></div><p>与fetch请求深度集成，通过调用fetch传递第二个配置参数对象中的signal属性，来中断fetch请求。（fetch会监听signal的值）</p><h2 id="requestidlecallback-更精细的任务调度api" tabindex="-1">requestIdleCallback 更精细的任务调度API <a class="header-anchor" href="#requestidlecallback-更精细的任务调度api" aria-label="Permalink to &quot;requestIdleCallback 更精细的任务调度API&quot;">​</a></h2><p>在js引擎处于<strong>空闲</strong> 状态时才会执行回调，空闲的字面意思是指本轮事件循环中主线程同步任务执行完毕了，且任务队列里的异步任务也一并执行完成了。它的任务调度优先级很低，一般用来在空闲时处理一些其他的额外的任务，进行更精细的任务调度,避免在主线程“拥挤”的时候执行某些代码。它支持你设定一个超时参数timeout，如果在timeout后仍未执行该回调，则在下一次事件循环中空闲时期下强制执行。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">requestIdleCallback</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;font-style:italic;">deadline</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">deadline</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// deadline有一个属性叫didTimeout， 就是判断是否是超时执行的</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">deadline</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">timeRemaining</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;">   </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">timeout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">40000</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h2 id="json-parse" tabindex="-1">JSON.parse <a class="header-anchor" href="#json-parse" aria-label="Permalink to &quot;JSON.parse&quot;">​</a></h2><p><code>JSON.parse</code>方法解析一个形如对象的json字符串的时候，会过滤掉其属性的值为undefined、function以及symbol类型的属性</p><p><code>JSON.stringify</code>接收一个对象进行JSON转换时，会对其对象的属性值为<code>undefined</code>、<code>symbol</code>、<code>function</code>的属性直接过滤掉,</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">undefined</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> json </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(data)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// \`{}\`</span></span></code></pre></div><p>当然我们也可以给对象声明一个<code>toJSON</code>的属性，其值是一个函数，<code>JSON.stringify</code>会调用该方法根据得到的返回值进行转化, <code>toJSON</code>存在的目的是为了能在某些无法解析值的场景下返回一个适当的值， 此外<code>JSON.stringify</code>接收第二个参数replacer，将对象中每一个即将被序列化的值进行转换。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">undefined,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">toJSON</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">david</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> json </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(data)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// \`{ name: &#39;david&#39; }\`</span></span></code></pre></div><h2 id="为什么各大浏览器厂商都未实现尾递归调用优化" tabindex="-1">为什么各大浏览器厂商都未实现尾递归调用优化？ <a class="header-anchor" href="#为什么各大浏览器厂商都未实现尾递归调用优化" aria-label="Permalink to &quot;为什么各大浏览器厂商都未实现尾递归调用优化？&quot;">​</a></h2><p>尾递归调用是TC39在对ES2015上新增的一个特性，其目的是当一个函数仅在return 一个function的时候，保证其调用栈永远只会保留一个，提升了性能。但是前不久在阅读DC的新书&lt;&lt;JavaScript悟道&gt;&gt;一书中提到尾调用优化这个方案除了apple自家的safari浏览器实现了之外，其他各大浏览器均未实现该特性，理由是认为该特性在某些情况下会出现问题而拒绝实现。在知乎上也寻找到了相关的问题：<a href="https://www.zhihu.com/question/473997712" target="_blank" rel="nofollow noopener noreferrer">DC 的新书《JavaScript 悟道》里面讲了很多尾递归优化，可 TC39 不是已经判其死刑了吗？</a>，不知在未来这个特性是否被永久删除。</p><h2 id="webgl-和-canvas-的区别" tabindex="-1">webGL 和 canvas 的区别 <a class="header-anchor" href="#webgl-和-canvas-的区别" aria-label="Permalink to &quot;webGL 和 canvas 的区别&quot;">​</a></h2><p>canvas是HTML5推出一个具有绘图功能的画布，可以通过<code>getContext(&#39;2d&#39;)</code> 或者 <code>getContext(&#39;3d&#39;)</code>获取2d或者3d渲染上下文，其中3d是通过凭借webgl的渲染能力实现的。</p><h2 id="如何获取css中的transform属性的值" tabindex="-1">如何获取css中的transform属性的值 <a class="header-anchor" href="#如何获取css中的transform属性的值" aria-label="Permalink to &quot;如何获取css中的transform属性的值&quot;">​</a></h2><p>假如我们有这么一行代码:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> el </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.box</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">transform </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">translateX(100px)</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>我们想通过js去得到el的translateX的值，可能很多人想到了可以直接<code>el.style.transform</code>拿到这个属性的值，但是可惜拿到的是一大串字符串，而且必须得 使正则去匹配花括号里面的值还要转换成number类型，较为麻烦。</p><p>于是我通过浏览stackOverflow得到一个更为优雅得办法，那就是使用<code>WebKitCSSMatrix</code>这个构造函数生成一个4*4的3D矩阵实例，它接收一个DOM对象， 并可以直接访问DOM对象的X,Y,Z轴的变换值。</p><div class="tip custom-block"><p class="custom-block-title">提示</p><p>3D矩阵都是 4 * 4, 而2D矩阵则是3 * 3</p></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> matrix </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WebKitCSSMatrix</span><span style="color:#A6ACCD;">(el)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">matrix</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">m41</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 得到了translateX的变换值</span></span></code></pre></div><p>你可能会好奇m41是个什么属性？为什么能拿到translateX的值?</p><p>前面我们提到WebKitCSSMatrix生成的是一个4*4的3D矩阵，4 * 4代表了4行4列，而translateX表示的是第四列第一行的坐标（也就是m41）, 而同样的translateY表示的是第四列第2行所在的坐标（也就是m42），下面有张图清晰的说明了这个偏移值所在的3D矩阵的坐标点。</p><p><img src="https://i.stack.imgur.com/QQX5V.png" alt="3D矩阵各个transform属性所在的位置">;</p><h2 id="delete操作符" tabindex="-1">delete操作符 <a class="header-anchor" href="#delete操作符" aria-label="Permalink to &quot;delete操作符&quot;">​</a></h2><p>delete操作符可以删除对象的一个属性（前提是该对象的属性是可配置的). 如果删除的操作成功， 则返回布尔值true, 否则返回false（如果要删除的属性不在对象自身，仍会返回true）</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lucy</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">delete</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// undefined</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">defineProperty</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">gender</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">configurable</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">delete</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">gender</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">gender</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 12</span></span></code></pre></div><p>如果对数组的元素进行delete操作则不会改变数组的长度, 只会删除数组下标属性的值, 留出一个空槽</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fruitList </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">apple</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pear</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">delete</span><span style="color:#A6ACCD;"> fruitList[</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">fruitList</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// [&quot;apple&quot;, empty * 1];</span></span></code></pre></div><h2 id="生成器" tabindex="-1">生成器 <a class="header-anchor" href="#生成器" aria-label="Permalink to &quot;生成器&quot;">​</a></h2><p>生成器函数是一个特殊的函数，其最为强大的功能可以暂停/恢复函数内部的代码的运行。</p><ol><li>创建一个生成器 通过<code>*</code>标志创建一个生成器函数，执行该函数返回一个迭代器对象</li></ol><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 其中 yield关键字表示当迭代器解析到这行代码时暂停执行</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 并且只有当调用下一个next时恢复这行代码的执行，直到遇到下一个yield关键字为止</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> it </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">it</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// { value: undefined, done: false }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 第一个next 只是为了负责启动生成器函数，当执行到一个yield时阻塞函数体内的代码的执行, 此时next函数返回的是yield关键字 后面的表达式的值，如果yield关键字后的表达式为空，</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 则value的值是undefined { value: undefined, done: false }</span></span>
<span class="line"><span style="color:#A6ACCD;">it</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// { value: undefined, done: false }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// next的最后一项的值，会作为生成器函数return的值， 如果没有显示指定return的值，则最后一个调用next函数所传递的值会被丢弃，return隐示的值是undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">it</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span></code></pre></div><ol start="2"><li>规范和所有兼容浏览器都会默认丢弃传递给第一个next的任何东西，因此第一个next只是负责用来启动生成器，不应该对其传递任何参数。 通常有个规律，next函数的调用次数 = 声明yield关键字的次数+1.</li></ol>`,38),e=[p];function t(c,r,y,D,i,C){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};
