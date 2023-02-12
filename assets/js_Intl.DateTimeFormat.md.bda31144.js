import{_ as s,c as a,o,a as n}from"./app.90452c48.js";const i=JSON.parse('{"title":"玩转Intl.DateTimeFormat","description":"JS内置的日期格式化对象Intl.DateTimeFormat","frontmatter":{"title":"玩转Intl.DateTimeFormat","description":"JS内置的日期格式化对象Intl.DateTimeFormat"},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"认识 Intl.DateTimeFormat","slug":"认识-intl-datetimeformat","link":"#认识-intl-datetimeformat","children":[]},{"level":2,"title":"dateStyle","slug":"datestyle","link":"#datestyle","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]},{"level":2,"title":"timeStyle","slug":"timestyle","link":"#timestyle","children":[]},{"level":2,"title":"示例","slug":"示例-1","link":"#示例-1","children":[]}],"relativePath":"js/Intl.DateTimeFormat.md","lastUpdated":1676195793000}'),l={name:"js/Intl.DateTimeFormat.md"},e=n(`<h1 id="intl-datetimeformat-揭秘" tabindex="-1">Intl.DateTimeFormat 揭秘 <a class="header-anchor" href="#intl-datetimeformat-揭秘" aria-hidden="true">#</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-hidden="true">#</a></h2><p>在日常的业务开发中， 你也许会遇到对日期的格式化处理的需求，比如将 <code>new Date.now()</code> 格式化成 <code>YYYY年 MM月 DD日 HH时MM分SS秒</code>，又或者将其格式化成 <code>2023癸卯年闰二月12星期日</code>。</p><p>这看起来似乎也不算很难，相信你脑海里第一时间想到的是借助 <code>moment.js</code> 或者 <code>dayjs</code> 这类的日期操作库去解决这类问题，毕竟内置的 <code>Date</code> 对象缺少太多灵活格式化的 API 了。</p><p>但引入库也是有格外的 bundle 开销的，像 <code>momentjs</code> 这类体积过于庞大且无法 <code>tree-shake</code> 的库，渐渐淡出了开发者的视线。幸好我们等来了 <code>dayjs</code> 这类轻巧（不安装格外的插件下打包最小 2kb）且支持 <code>immutable</code> 的插件，看起来已经很完美了。</p><p>其实，有个可能鲜为人知的内置日期对象早在 2012 年提供对日期的灵活转换了，那就是 <code>Intl.DateTimeFormat</code>。由于刚出来的时候兼容性不佳且有很多 API 还未完善，很少有人提起过。</p><p>但是在今天，如果你不考虑兼容 <code>chrome76</code> 以下的版本的话，可以放心去使用 <code>Intl.DateTimeFormat</code> 全部 API 了。</p><p><img src="https://awesomescreenshot.s3.amazonaws.com/image/3951069/37019360-0d97c8d0400f7c023150f18b16361947.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20230212%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20230212T084953Z&amp;X-Amz-Expires=28800&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=2ad61e9f2cb8f5eec3d8b9589d86ae9bbc04107e142cefb7e4e4750264c8203a" alt=""></p><h2 id="认识-intl-datetimeformat" tabindex="-1">认识 Intl.DateTimeFormat <a class="header-anchor" href="#认识-intl-datetimeformat" aria-hidden="true">#</a></h2><blockquote><p>Intl.DateTimeFormat 对象能使日期和时间在特定的语言环境下格式化。</p></blockquote><p><code>Intl.DateTimeFormat</code>函数需要通过 <code>new</code> 关键字构造调用并返回一个 <code>Intl.DateTimeFormat</code> 对象。</p><blockquote><p>注：其实也可以不需要通过 <code>new</code> 关键字构造调用， 但不使用 <code>new</code> 会导致非预期的行为，例如 <code>this</code> 可能会指向另一个<code>Intl.DateTimeFormat</code>。</p></blockquote><p><code>Intl.DateTimeFormat</code>构造函数接收两个参数，这两个参数都是可选的。</p><p>第一个参数是 <code>locales</code>, 可以理解为需要 <code>format</code> 的日期语言是哪国的， <code>locales</code> 可以是一个 <code>Array&lt;string&gt;</code> 也可以是 <code>string</code>。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 如果是一个数组，则意味着指定多个 fallback language</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 在本例中，如果指定的日期内容无法被\`zh-Hant\`匹配，则继续往左匹配 \`zh\`，如果 \`zh\` 也没有匹配到，则会使用默认值</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// match-pattern 可以通过 https://datatracker.ietf.org/doc/html/rfc4647#section-3.4 查阅</span></span>
<span class="line"><span style="color:#A6ACCD;">Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">([</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh-Hant</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>第二个参数 <code>options</code> 给定一个具有多个属性的对象，用于指定如何格式给定的日期内容。</p><h2 id="datestyle" tabindex="-1">dateStyle <a class="header-anchor" href="#datestyle" aria-hidden="true">#</a></h2><p><code>dateStyle</code>属性指定调用 <code>format()</code> 时使用的日期格式样式，其枚举值如下：</p><ul><li><code>full</code>， 格式的日期内容包含<code>年月日</code>以及<code>本周的星期几</code></li><li><code>long</code>， 格式的日期内容包含<code>年月日</code></li><li><code>medium</code>，格式的日期内容包含<code>年月日</code>（如果 <code>locale</code> 为 <code>en-US</code>等英语语言，则月份的单词是简写形式，例如 <code>February</code> 会被输出 <code>Feb</code>）</li><li><code>short</code>，格式的日期内容包含<code>年月日</code>（拼接日期的单位会被简写符号替代，例如<code>/</code>,<code>-</code>）</li></ul><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 输出 2023年2月12日星期日</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dateStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">full</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 输出 2023年2月12日</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dateStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">long</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 输出 2023年2月12日</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dateStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">medium</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// \`long\` 和 \`medium\`在英语中书写有区别</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// February 12, 2023</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en-US</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dateStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">long</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Feb 12, 2023</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en-US</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dateStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">medium</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2023/2/12 （short不会拼接日期单位）</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dateStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">short</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="timestyle" tabindex="-1">timeStyle <a class="header-anchor" href="#timestyle" aria-hidden="true">#</a></h2><p><code>timeStyle</code>属性指定调用 <code>format()</code> 时使用的时间格式样式，其枚举值如下：</p><ul><li><code>full</code>，格式的时间内容包含<code>国家</code>，<code>时</code>，<code>分</code>，<code>秒</code></li><li><code>long</code> , 格式的时间内容包含<code>时区</code>，<code>时</code>，<code>分</code>，<code>秒</code></li><li><code>medium</code>，格式的时间内容包含<code>时</code>，<code>分</code>，<code>秒</code></li><li><code>short</code>，格式的时间内容包含<code>时</code>，<code>分</code></li></ul><h2 id="示例-1" tabindex="-1">示例 <a class="header-anchor" href="#示例-1" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 中国标准时间 17:37:16</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">timeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">full</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// GMT+8 17:37:21</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">timeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">long</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 17:37:37</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">timeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">medium</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 17:37</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">timeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">short</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 5:38:02 PM GMT+8</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en-US</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">timeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">long</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 5:37:58 PM</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en-US</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">timeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">medium</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 5:37 PM</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Intl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">DateTimeFormat</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en-US</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">timeStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">short</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">提醒</p><p><code>dateStyle</code> 可以与 <code>timeStyle</code> 一起使用，但不能与其他选项（例如工作日、小时、月份等）一起使用(<code>timeStyle同样如此</code>)。</p></div>`,27),p=[e];function t(c,r,D,F,y,A){return o(),a("div",null,p)}const d=s(l,[["render",t]]);export{i as __pageData,d as default};
