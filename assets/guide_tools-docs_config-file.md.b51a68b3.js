import{_ as s,c as o,o as n,a as t}from"./app.1868d918.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"tsconfig.json - jsconfig.json","slug":"tsconfig-json-jsconfig-json","link":"#tsconfig-json-jsconfig-json","children":[]}],"relativePath":"guide/tools-docs/config-file.md","lastUpdated":1675415719000}'),a={name:"guide/tools-docs/config-file.md"},e=t(`<h2 id="tsconfig-json-jsconfig-json" tabindex="-1">tsconfig.json - jsconfig.json <a class="header-anchor" href="#tsconfig-json-jsconfig-json" aria-hidden="true">#</a></h2><p>tsconfig.json 和 jsconfig.json文件都是一个配置文件放在项目的根目录，指定了项目中TS/JS的最高语法版本，语法检查、将别名映射到源文件自动提示文件路径，</p><p>如果你的项目是一个ts项目，只需要新建一个<code>tsconfig.json</code>配置相关项，如果ts项目还有少量的js文件，可以开启<code>allowJs: true</code>，将<code>tsconfig.json</code>的配置项应用到js文件里。</p><p>如果项目是一个纯js项目，只需要新建一个<code>jsconfig.json</code>进行少量配置，<code>jsconfig.json</code>配置文件的项少于<code>tsconfig.json</code></p><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">    &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;baseUrl&quot;: &quot;.&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;paths&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;@/*&quot;: [&quot;./src/*&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;target&quot;: &quot;ES6&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;module&quot;: &quot;commonjs&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;allowSyntheticDefaultImports&quot;: true</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;include&quot;: [&quot;src/**/*&quot;],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;exclude&quot;: [&quot;node_modules&quot;]</span></span>
<span class="line"></span></code></pre></div>`,5),c=[e];function l(p,i,u,d,r,f){return n(),o("div",null,c)}const q=s(a,[["render",l]]);export{g as __pageData,q as default};
