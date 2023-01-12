import{_ as e,c as a,o,a as p}from"./app.67cbe6a1.js";const A=JSON.parse('{"title":"高德地图 web端使用指南","description":"","frontmatter":{},"headers":[{"level":3,"title":"事件","slug":"事件","link":"#事件","children":[]},{"level":2,"title":"如何使用高德地图API？","slug":"如何使用高德地图api","link":"#如何使用高德地图api","children":[]},{"level":2,"title":"海量图","slug":"海量图","link":"#海量图","children":[]}],"relativePath":"guide/gd-map/README.md","lastUpdated":1655714722000}'),d={name:"guide/gd-map/README.md"},c=p(`<h1 id="高德地图-web端使用指南" tabindex="-1">高德地图 web端使用指南 <a class="header-anchor" href="#高德地图-web端使用指南" aria-hidden="true">#</a></h1><h3 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-hidden="true">#</a></h3><ol><li><p>Map 、 覆盖物 、 叠加层 绑定事件都是通过 object.on(&quot;事件名&quot;, &quot;回调函数&quot;)来绑定， 解绑事件通过调用off函数来解绑</p></li><li><p>销毁地图可以调用<code>destory()</code>方法， 在vue组件中建议在beforeUnMount的时候调用<code>AMap.destroy()</code> 并且对覆盖物、地图相关绑定的方法全部解绑</p></li><li><p>监听地图加载完毕可以通过<code>map.on(&quot;complete&quot;, callback)</code></p></li></ol><p>地图、覆盖物、图层 都可以通过on方法绑定事件，off解绑事件</p><h2 id="如何使用高德地图api" tabindex="-1">如何使用高德地图API？ <a class="header-anchor" href="#如何使用高德地图api" aria-hidden="true">#</a></h2><p>一般通过安装<code>@amap/amap-jsapi-loader</code>这个package，可以方便我们使用高德地图一系列api。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">AMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#A6ACCD;">(config) </span><span style="color:#676E95;font-style:italic;">// 会返回一个带有AMap对象的Promise</span></span>
<span class="line"></span></code></pre></div><p>通过 <code>new AMap()</code> 生成一个地图实例<code>map</code>.</p><p>map中的<code>add</code>方法： <code>map.add(overlay)</code>一般用于添加覆盖物、图层 之类的到地图上，addControl则是添加控件.</p><p>高德地图的控件有： <code>AMap.Scale</code>, <code>AMap.ToolBar</code>, <code>AMap.OverView</code>等等。</p><p>Scale控件一般就是比例尺，在当前的缩放层级上，一小格是多少M/KM，</p><p>ToolBar控件集成了缩放、平移、定位等功能。</p><p>OverView 鹰眼控件，在地图右下角显示缩略图</p><h2 id="海量图" tabindex="-1">海量图 <a class="header-anchor" href="#海量图" aria-hidden="true">#</a></h2><p>海量图数据会随着地图的缩放，数据越加密集或者分散，</p><p>海量图的数据源得是一个数组，数组的每一项（数据项）数据格式不做要求，但必须包含点的坐标信息以及索引</p><p>海量图的<code>TopN</code>区域，是四叉树节点代表的区域，如果该区域内的视图面积小于一定阈值，则展示四叉树某一块区域内的所有点进行绘制，也称为TopN区域 海量图中图片的绘制性能要差于canvas，所以尽量使用canvas进行绘制</p>`,17),t=[c];function s(l,n,i,r,h,_){return o(),a("div",null,t)}const m=e(d,[["render",s]]);export{A as __pageData,m as default};