(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{364:function(s,t,a){"use strict";a.r(t);var r=a(45),n=Object(r.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"用svg实现一个loading"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用svg实现一个loading"}},[s._v("#")]),s._v(" 用svg实现一个loading")]),s._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[s._v("<svg xmlns="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://www.w3.org/2000/svg"')]),s._v(" version="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.1"')]),s._v(" class="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"load"')]),s._v(">\n       <circle cx="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"150"')]),s._v(" cy="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"80"')]),s._v(" r="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"50"')]),s._v(" class="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"other"')]),s._v(" />\n       <circle cx="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"150"')]),s._v(" cy="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"80"')]),s._v(" r="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"50"')]),s._v(" class="),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"loading"')]),s._v(" />\n</svg>\n")])])]),a("svg",{staticClass:"load",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[a("circle",{staticClass:"other",attrs:{cx:"150",cy:"80",r:"50"}}),s._v(" "),a("circle",{staticClass:"loading",attrs:{cx:"150",cy:"80",r:"50"}})]),s._v(" "),a("h2",{attrs:{id:"background-size-属性值的含义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#background-size-属性值的含义"}},[s._v("#")]),s._v(" background-size 属性值的含义")]),s._v(" "),a("ol",[a("li",[s._v("background-size 设定两个值和设定一个值的区别")])]),s._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[s._v("      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* x轴的背景拉伸到容器的宽度，y轴auto */")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 100% 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* x轴和y轴的宽高拉伸到容器的宽高 */")]),s._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("background-size: cover 和 contain 的区别")])]),s._v(" "),a("p",[s._v("都是等比例缩放图片的宽高，区别在于contain总是会显示图片的全部的内容，不会发生裁剪，所以如果图片原始尺寸大于容器尺寸，会造成容器的一侧有一部分空白区域，而cover是将背景完全的覆盖到容器的区域，会发生裁剪，不会失真图片。")]),s._v(" "),a("h2",{attrs:{id:"css不常用的伪类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css不常用的伪类"}},[s._v("#")]),s._v(" CSS不常用的伪类")]),s._v(" "),a("ol",[a("li",[s._v("any-link")])]),s._v(" "),a("p",[s._v("link的替代品，link伪类太鸡肋了，被点击之后，link伪类的样式就没了。而any-link会匹配所有带href属性的链接元素（a,link,area）,即便链接已经被访问过了，仍然样式起效。")]),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[s._v("target\n锚点伪类，可以给命中的锚点设置样式")])]),s._v(" "),a("li",[a("p",[s._v("focus-within")])])]),s._v(" "),a("p",[s._v("如果一个元素的子元素被focus了，那么该元素仍然可以应用focus-within伪类设置的样式，focus的增强版，兼容性很好（IE不支持）")]),s._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[s._v("focus-visible")])]),s._v(" "),a("p",[s._v("兼容性目前比较差（2021/5/20），目前来看就Chrome86以上版本支持，它的作用主要是可以区分一个元素被聚焦时是鼠标聚焦还是键盘聚焦，只有键盘聚焦才会应用该伪类样式。想让鼠标聚焦时设置样式，应该用focus伪类（focus伪类点击后，必须点击其他地方，focus样式才会被取消）")]),s._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[s._v("placeholder-shown")])]),s._v(" "),a("p",[s._v("当输入框设置placeholder时，匹配该输入框，兼容性还可（IE10+,带ms前缀就可以）")]),s._v(" "),a("ol",{attrs:{start:"6"}},[a("li",[s._v("disabled")])]),s._v(" "),a("p",[s._v("表单控件禁用伪类 （IE9+）")]),s._v(" "),a("ol",{attrs:{start:"7"}},[a("li",[s._v("enabled")])]),s._v(" "),a("p",[s._v("表单控件启用伪类（IE9+）")]),s._v(" "),a("ol",{attrs:{start:"8"}},[a("li",[s._v("checked")])]),s._v(" "),a("p",[s._v("表单控件选中伪类（IE9+支持, MAC-OS "),a("code",[s._v("<option>")]),s._v("元素无法应用该伪类）")]),s._v(" "),a("ol",{attrs:{start:"9"}},[a("li",[s._v("is伪类")])]),s._v(" "),a("p",[s._v("is伪类是一个新伪类，没有兼容性包袱（-webkit-any伪类的替代品，该伪类已被废弃，建议两个都写，万一chrome版本更新后-webkit-any伪类被移除就遭殃了），它表示的语义性很强。（IE不支持）， is伪类的优先级由选择器列表中优先级最高的那个选择器来决定。")]),s._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("is(ul, ol) li:first-child")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 42px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("表示: "),a("span",{staticStyle:{color:"red"}},[s._v("“选中ul 或者ol后面的第一个li元素的字体设置为42像素”")])])])}),[],!1,null,null,null);t.default=n.exports}}]);