import{_ as s,o as a,c as n,R as p}from"./chunks/framework.62e38f8b.js";const i=JSON.parse('{"title":"揭开 Vue-loader 的面纱","description":"","frontmatter":{},"headers":[],"relativePath":"articles/javascript/KnowAboutVueLoader.md","filePath":"articles/javascript/KnowAboutVueLoader.md","lastUpdated":1686550565000}'),l={name:"articles/javascript/KnowAboutVueLoader.md"},o=p(`<h1 id="揭开-vue-loader-的面纱" tabindex="-1">揭开 Vue-loader 的面纱 <a class="header-anchor" href="#揭开-vue-loader-的面纱" aria-label="Permalink to &quot;揭开 Vue-loader 的面纱&quot;">​</a></h1><p>Vue-loader 是一个负责处理如何对 <strong>Vue SFC</strong> 进行打包处理的 webpack loader。我们都知道 webpack 默认只能对 js 和 json 文件进行打包处理。</p><blockquote><p>webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。</p></blockquote><p>Vue 发明了 <strong>SFC</strong> 这种写法，允许开发者在一个文件内同时编写 template、css 以及 js。为了能让 webpack 正确处理 SFC，Vue-loader 就此应运而生。</p><p>本篇文章对 Vue-loader 内部的工作原理做一个简单的了解，如果你也好奇它是如何工作的，那这篇文章说不定也会让你有所收获。</p><h2 id="进入正题" tabindex="-1">进入正题 <a class="header-anchor" href="#进入正题" aria-label="Permalink to &quot;进入正题&quot;">​</a></h2><p>一个 SFC 组件由 template 、script 和 style 三个部分组成：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Vue-loader 内部会对每个语言块调用内部的 loader 链分别进行处理。</p><p>那么具体是如何处理的呢？</p><p>我们打开 Vue-loader 的源码，找到 <code>/src/index.ts</code> 这个文件，这是 Vue-loader 的入口文件，该脚本默认导出了 loader 函数。</p><p>loader 函数对 <code>script</code>，<code>template</code> 和 <code>style</code> 三个 block 分别进行了不同的处理。</p><h2 id="对-script-块的处理" tabindex="-1">对 script 块的处理 <a class="header-anchor" href="#对-script-块的处理" aria-label="Permalink to &quot;对 script 块的处理&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> scriptImport </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">const script = {}</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 如果在 SFC 文件中，没有指定 script 块，则会使用默认的空对象。</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> isTS </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> script</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> scriptSetup </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> descriptor</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (script </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> scriptSetup) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lang</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">script</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">lang</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">scriptSetup</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">lang</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">isTS</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!!</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">lang</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">tsx</span><span style="color:#89DDFF;">?/</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">test</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">lang</span><span style="color:#F07178;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 这里判断 script 块是不是引用了其他脚本，如果不是，直接取 resourcePath (也就是这个 SFC 文件的绝对路径)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">scriptSetup</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">script</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resourcePath</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 取得 script 标签中的 attributes 并序列化</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 例如 &lt;script lang=&#39;ts&#39; custom-attr=&quot;foo&quot;&gt; 将被解析成 &amp;lang=ts&amp;custom-attr=foo</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">attrsQuery</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">attrsToQuery</span><span style="color:#F07178;">((</span><span style="color:#A6ACCD;">scriptSetup</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">script</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">attrs</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">query</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">?vue&amp;type=script</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">attrsQuery</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">resourceQuery</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 对 src 和 query 参数进行字符串拼接，通过 \`stringifyRequest\` </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 我们可以得到拼接后的文件路径将会是相对 webpack 所在的项目根目录下的文件路径</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">scriptRequest</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">stringifyRequest</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">query</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 最后完成对 sfc 文件的导入导出路径拼接，这里的 scriptImport 字符串 会和下文的 scriptImport 以及 stylesCode 进行拼接并导出</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">scriptImport</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">import script from </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">scriptRequest</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// support named exports</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">export * from </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">scriptRequest</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// App.vue</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// write your code</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>这个 script 块就会被 parse， 取出 script 的 所有 attrs 进行序列化: <code>lang=ts&amp;setup=true</code>。</p><p>最后和给定的字符串进行拼接可以得到这样一个导入导出的字符串： <code>import script from &#39;./App.vue?vue&amp;type=script&amp;lang=ts&amp;setup=true\\n&#39; export * from &#39;./App.vue?vue&amp;type=script&amp;lang=ts&amp;setup=true</code>。</p><h2 id="对-template-块的处理" tabindex="-1">对 template 块的处理 <a class="header-anchor" href="#对-template-块的处理" aria-label="Permalink to &quot;对 template 块的处理&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> templateImport </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> templateRequest</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> renderFnName </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> isServer </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">ssrRender</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">render</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useInlineTemplate </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">canInlineTemplate</span><span style="color:#A6ACCD;">(descriptor</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> isProduction)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">template </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">useInlineTemplate) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resourcePath</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">idQuery</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">&amp;id=</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">scopedQuery</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hasScoped</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">&amp;scoped=true</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">attrsQuery</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">attrsToQuery</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">attrs</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">tsQuery</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">enableTsInTemplate</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isTS</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">&amp;ts=true</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">query</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">?vue&amp;type=template</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">idQuery</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">scopedQuery</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">tsQuery</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">attrsQuery</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">resourceQuery</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#A6ACCD;">templateRequest</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">stringifyRequest</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">src</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">query</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#A6ACCD;">templateImport</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">import { </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">renderFnName</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> } from </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">templateRequest</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#A6ACCD;">propsToAttach</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">([</span><span style="color:#A6ACCD;">renderFnName</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">renderFnName</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>那么 <code>useInlineTemplate</code> 是什么呢，我们进入 <code>canInlineTemplate</code> 方法内部看看。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * inline template mode can only be enabled if:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * - is production (separate compilation needed for HMR during dev)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * - template has no pre-processor (separate loader chain required)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * - template is not using src</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">canInlineTemplate</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">descriptor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SFCDescriptor</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">isProd</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">templateLang</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">template</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">lang</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">templateSrc</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">template</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isProd</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!!</span><span style="color:#A6ACCD;">descriptor</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">scriptSetup</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">templateLang</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">templateSrc</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>通过注释可知，这个方法判断 template 是否可以被内联</p>`,23),e=[o];function t(c,r,y,F,D,C){return a(),n("div",null,e)}const u=s(l,[["render",t]]);export{i as __pageData,u as default};