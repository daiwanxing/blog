import{_ as e,r as t,o as p,c as o,b as n,d as c,e as s,a as i}from"./app.658ffcf5.js";const l={},u=n("h2",{id:"\u68C0\u6D4B\u4E00\u4E2A\u5BB9\u5668\u662F\u5426\u51FA\u73B0\u5728\u89C6\u53E3\u5185",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u68C0\u6D4B\u4E00\u4E2A\u5BB9\u5668\u662F\u5426\u51FA\u73B0\u5728\u89C6\u53E3\u5185","aria-hidden":"true"},"#"),s(" \u68C0\u6D4B\u4E00\u4E2A\u5BB9\u5668\u662F\u5426\u51FA\u73B0\u5728\u89C6\u53E3\u5185")],-1),r=s("\u6CE8\u610F\uFF1A \u76EE\u524D\u6709\u66F4\u597D\u7684\u73B0\u6210\u7684API\u63D0\u4F9B\u6211\u4EEC\u7ED9\u67D0\u4E00\u4E2A\u5143\u7D20\u4FA6\u6D4B\u5176\u662F\u5426\u51FA\u73B0\u5728\u89C6\u53E3\u5185\uFF0C\u4F8B\u5982"),k=n("code",null,"element.getBoundingClientRect",-1),d=s(),v={href:"https://caniuse.com/?search=getBoundingClientRect",target:"_blank",rel:"noopener noreferrer"},m=s("\u517C\u5BB9\u6027\u975E\u5E38\u53EF\u89C2"),b=s("\uFF0C\u53E6\u5916\u6709\u66F4\u52A0\u7075\u6D3B\u7684"),g=n("code",null,"Intersection-observer",-1),h=s(" API\uFF08\u4E0D\u9700\u8981\u517C\u5BB9IE\u7684\u4EA7\u54C1\u53EF\u5927\u80C6\u4F7F\u7528\uFF09\u3002"),_=i(`<p>\u6240\u4EE5\u6211\u4EEC\u65E0\u9700\u91CD\u590D\u7684\u53BB\u9020\u4E00\u4E2A\u8F6E\u5B50\uFF0C\u800C\u4E14\u9020\u597D\u7684\u8F6E\u5B50\u8FD8\u4E0D\u4E00\u5B9A\u80FD\u6709\u5404\u4E2A\u6D4F\u89C8\u5668\u5382\u5546\u5B9E\u73B0\u7684\u89C4\u8303\u597D\u7528\u3002</p><p><code>element.getBoundingClientRect</code> \u8FD9\u4E2AAPI\u53EA\u80FD\u9002\u7528\u4E8E\u5224\u65AD\u4E00\u4E2A\u5143\u7D20\u662F\u5426\u51FA\u73B0\u5728\u2019\u7A97\u53E3\u2018\u7684\u89C6\u53E3\u5185\uFF0C\u800C\u65E0\u6CD5\u5224\u65AD\u4E00\u4E2A\u5143\u7D20\u662F\u5426\u51FA\u73B0\u5728\u2019\u5177\u6709\u6EDA\u52A8\u6761\u7684\u5BB9\u5668\u89C6\u53E3\u2018\u5185\uFF0C\u4E3A\u6B64\u81EA\u5DF1\u624B\u5199\u4E86\u4E00\u4E2A\u65B9\u6CD5\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>    <span class="token keyword">function</span> <span class="token function">elementVisibleInContainer</span> <span class="token punctuation">(</span><span class="token parameter">container<span class="token punctuation">,</span> el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6CE8\u610F\uFF0C container\u9700\u8981\u8BBE\u7F6Eposition: relative, el\u5FC5\u987B\u662Fcontainer\u7684\u5B9A\u4F4D\u5B50\u7EA7</span>
        <span class="token keyword">let</span> isVisible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> containerViewHeight <span class="token operator">=</span> container<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
        <span class="token keyword">let</span> elOffsetTop <span class="token operator">=</span> el<span class="token punctuation">.</span>offsetTop<span class="token punctuation">;</span>
        <span class="token keyword">let</span> elHeight <span class="token operator">=</span> el<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
        <span class="token comment">// \u6C42\u51FA\u6EDA\u52A8\u7684\u504F\u79FB\u503C + \u6EDA\u52A8\u6761\u6240\u5728\u7684\u89C6\u53E3\u9AD8\u5EA6\uFF08\u975E\u7A97\u53E3\u89C6\u53E3\uFF09</span>
        <span class="token keyword">let</span> scrollTotal <span class="token operator">=</span> container<span class="token punctuation">.</span>scrollTop <span class="token operator">+</span> containerViewHeight<span class="token punctuation">;</span>
        <span class="token comment">// \u6EDA\u52A8\u7684\u9AD8\u5EA6 \u51CF\u53BB \u8981\u5224\u65AD\u7684\u5143\u7D20\u8DDD\u79BB\u6700\u8FD1\u7684\u7236\u7EA7\u7684\u9876\u90E8\u504F\u79FB\u503C\uFF0C \u53EF\u4EE5\u5F97\u51FA\uFF0C\u5BB9\u5668\u5728\u89C6\u53E3\u5185\u53EF\u4EE5\u88AB&#39;\u770B\u89C1&#39;\u7684\u9AD8\u5EA6</span>
        <span class="token keyword">let</span> visibleHeight <span class="token operator">=</span> scrollTotal <span class="token operator">-</span> elOffsetTop<span class="token punctuation">;</span>
        <span class="token comment">// \u89C6\u53E3\u7684\u9AD8\u5EA6 - \u5BB9\u5668\u53EF\u4EE5\u88AB\u770B\u89C1\u7684\u9AD8\u5EA6\uFF0C \u53EF\u4EE5\u5F97\u5230\u5BB9\u5668\u672C\u53EF\u4EE5\u663E\u793A\u5230\u89C6\u53E3\u7684\u9AD8\u5EA6</span>
        <span class="token keyword">let</span> blank <span class="token operator">=</span> containerViewHeight <span class="token operator">-</span> visibleHeight<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>blank <span class="token operator">&lt;</span> containerViewHeight <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>blank <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> blank <span class="token operator">&lt;</span> containerViewHeight<span class="token punctuation">)</span> <span class="token operator">||</span> blank <span class="token operator">&gt;</span> <span class="token number">0</span>  <span class="token operator">-</span> elHeight<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isVisible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> isVisible<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u8BB0\u5F55\u4E00\u6B21\u5982\u4F55\u7528vue-cli\u5FFD\u7565\u63A7\u5236\u53F0\u914D\u7F6E\u4FE1\u606F\u4EE5\u53CA\u6539\u53D8\u6253\u5305\u65F6\u7684\u8FDB\u5EA6\u6837\u5F0F\u5C55\u793A" tabindex="-1"><a class="header-anchor" href="#\u8BB0\u5F55\u4E00\u6B21\u5982\u4F55\u7528vue-cli\u5FFD\u7565\u63A7\u5236\u53F0\u914D\u7F6E\u4FE1\u606F\u4EE5\u53CA\u6539\u53D8\u6253\u5305\u65F6\u7684\u8FDB\u5EA6\u6837\u5F0F\u5C55\u793A" aria-hidden="true">#</a> \u8BB0\u5F55\u4E00\u6B21\u5982\u4F55\u7528vue-cli\u5FFD\u7565\u63A7\u5236\u53F0\u914D\u7F6E\u4FE1\u606F\u4EE5\u53CA\u6539\u53D8\u6253\u5305\u65F6\u7684\u8FDB\u5EA6\u6837\u5F0F\u5C55\u793A</h3><p>vue-cli \u6253\u5305\u65F6\u63A7\u5236\u53F0\u4F1A\u4E0D\u65AD\u8F93\u51FA\u5F53\u524D\u6253\u5305\u7684\u8D44\u6E90\u8DEF\u5F84\u548C\u4F9D\u8D56\u4FE1\u606F\uFF0C\u5BFC\u81F4\u4E0D\u65AD\u7684\u6EDA\u52A8\u63A7\u5236\u53F0\u4FE1\u606F\uFF0C\u4E0D\u4F18\u96C5\u7F8E\u89C2\uFF0C\u5BF9\u4E8E\u524D\u7AEF\u800C\u8A00\u53EA\u9700\u8981\u5173\u6CE8\u5F53\u524D\u7684\u6253\u5305\u8FDB\u5EA6\u5373\u53EF\uFF0C\u4E0D\u9700\u8981\u5173\u6CE8\u6253\u5305\u65F6\u5B9E\u65F6\u8F93\u51FA\u7684\u4FE1\u606F\u3002</p><p>\u89E3\u51B3\u529E\u6CD5\uFF1A</p><p>\u4F7F\u7528<code>yarn add webpackbar</code>\uFF0C <code>webpackbar</code>\u662F\u4E00\u4E2A\u7F8E\u89C2\u3001\u7B80\u6D01\u7684\u6253\u5305\u5206\u6790\u5E93\uFF0C\u8BA9\u5F00\u53D1\u8005\u5B9E\u65F6\u4E86\u89E3\u5F53\u524D\u7684\u6253\u5305\u8FDB\u5EA6\uFF0C\u53EF\u914D\u7F6E\u5316\u8F93\u51FA\u6253\u5305\u5B8C\u540E\u7684\u5404\u4E2A\u8D44\u6E90\u4FE1\u606F.</p><p>\u7531\u4E8Evue-cli4\u4F7F\u7528\u7684\u662Fwebpack4.*, \u6240\u4EE5\u53EF\u4EE5\u7528stats option\u6765\u5FFD\u7565\u6389\u63A7\u5236\u53F0\u8B66\u544A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&quot;progress&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">plugin</span><span class="token punctuation">(</span><span class="token string">&quot;webpackbar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>WebpackBar<span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">stats</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token comment">// \u8FD9\u91CC\u6211\u9009\u62E9\u5FFD\u7565\u6389vue3\u7684deep\u9009\u62E9\u5668\u4F7F\u7528\u65B9\u5F0F\u8B66\u544A</span>
            <span class="token function-variable function">warningsFilter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">warning</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">::v-deep usage as a combinator has been deprecated</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>warning<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function f(w,x){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[r,k,d,n("a",v,[m,c(a)]),b,g,h]),_])}var V=e(l,[["render",f],["__file","index.html.vue"]]);export{V as default};