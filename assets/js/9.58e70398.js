(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{364:function(t,s,a){"use strict";a.r(s);var n=a(45),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"用svg实现一个loading"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用svg实现一个loading"}},[t._v("#")]),t._v(" 用svg实现一个loading")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v("<svg xmlns="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://www.w3.org/2000/svg"')]),t._v(" version="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.1"')]),t._v(" class="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"load"')]),t._v(">\n       <circle cx="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"150"')]),t._v(" cy="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"80"')]),t._v(" r="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"50"')]),t._v(" class="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"other"')]),t._v(" />\n       <circle cx="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"150"')]),t._v(" cy="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"80"')]),t._v(" r="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"50"')]),t._v(" class="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"loading"')]),t._v(" />\n</svg>\n")])])]),a("svg",{staticClass:"load",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[a("circle",{staticClass:"other",attrs:{cx:"150",cy:"80",r:"50"}}),t._v(" "),a("circle",{staticClass:"loading",attrs:{cx:"150",cy:"80",r:"50"}})]),t._v(" "),a("h2",{attrs:{id:"background-size-属性值的含义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#background-size-属性值的含义"}},[t._v("#")]),t._v(" background-size 属性值的含义")]),t._v(" "),a("ol",[a("li",[t._v("background-size 设定两个值和设定一个值的区别")])]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v("      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* x轴的背景拉伸到容器的宽度，y轴auto */")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100% 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* x轴和y轴的宽高拉伸到容器的宽高 */")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("background-size: cover 和 contain 的区别")])]),t._v(" "),a("p",[t._v("都是等比例缩放图片的宽高，区别在于contain总是会显示图片的全部的内容，不会发生裁剪，所以如果图片原始尺寸大于容器尺寸，会造成容器的一侧有一部分空白区域，而cover是将背景完全的覆盖到容器的区域，会发生裁剪，不会失真图片。")]),t._v(" "),a("h2",{attrs:{id:"css不常用的伪类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css不常用的伪类"}},[t._v("#")]),t._v(" CSS不常用的伪类")]),t._v(" "),a("ol",[a("li",[t._v("any-link")])]),t._v(" "),a("p",[t._v("link的替代品，link伪类太鸡肋了，被点击之后，link伪类的样式就没了。而any-link会匹配所有带href属性的链接元素（a,link,area）,即便链接已经被访问过了，仍然样式起效。")]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[t._v("target\n锚点伪类，可以给命中的锚点设置样式")])]),t._v(" "),a("li",[a("p",[t._v("focus-within")])])]),t._v(" "),a("p",[t._v("如果一个元素的子元素被focus了，那么该元素仍然可以应用focus-within伪类设置的样式，focus的增强版，兼容性很好（IE不支持）")]),t._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[t._v("focus-visible")])]),t._v(" "),a("p",[t._v("兼容性目前比较差（2021/5/20），目前来看就Chrome86以上版本支持，它的作用主要是可以区分一个元素被聚焦时是鼠标聚焦还是键盘聚焦，只有键盘聚焦才会应用该伪类样式。想让鼠标聚焦时设置样式，应该用focus伪类（focus伪类点击后，必须点击其他地方，focus样式才会被取消）")]),t._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[t._v("placeholder-shown")])]),t._v(" "),a("p",[t._v("当输入框设置placeholder时，匹配该输入框，兼容性还可（IE10+,带ms前缀就可以）")]),t._v(" "),a("ol",{attrs:{start:"6"}},[a("li",[t._v("disabled")])]),t._v(" "),a("p",[t._v("表单控件禁用伪类 （IE9+）")]),t._v(" "),a("ol",{attrs:{start:"7"}},[a("li",[t._v("enabled")])]),t._v(" "),a("p",[t._v("表单控件启用伪类（IE9+）")]),t._v(" "),a("ol",{attrs:{start:"8"}},[a("li",[t._v("checked")])]),t._v(" "),a("p",[t._v("表单控件选中伪类（IE9+支持, MAC-OS "),a("code",[t._v("<option>")]),t._v("元素无法应用该伪类）")]),t._v(" "),a("ol",{attrs:{start:"9"}},[a("li",[t._v("is伪类")])]),t._v(" "),a("p",[t._v("is伪类是一个新伪类，没有兼容性包袱（-webkit-any伪类的替代品，该伪类已被废弃，建议两个都写，万一chrome版本更新后-webkit-any伪类被移除就遭殃了），它表示的语义性很强。（IE不支持）， is伪类的优先级由选择器列表中优先级最高的那个选择器来决定。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("is(ul, ol) li:first-child")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 42px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("表示: "),a("span",{staticStyle:{color:"red"}},[t._v("“选中ul 或者ol后面的第一个li元素的字体设置为42像素”")])]),t._v(" "),a("h2",{attrs:{id:"border-radius-八个属性值探讨"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#border-radius-八个属性值探讨"}},[t._v("#")]),t._v(" border-radius 八个属性值探讨")]),t._v(" "),a("p",[t._v("border-radius是我们用的很频繁的一个属性，它是一个圆角属性，从边框开始向内裁剪。我们一般都是设置一个值："),a("code",[t._v("border-radius: 50%")]),t._v("或者"),a("code",[t._v("border-radius: 一个具体的数值")]),t._v("；其实border-radius不光能设置一个值，可以设置2个，4个甚至8个以便对不同方向的边框进行更细微的裁剪，下面一起探讨不同数量的值的含义。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 盒子的宽高比： width / height， 如果宽高一致，则可以得到一个正圆 */")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 50% 50px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 盒子的左上、右下 值为50%， 右上，左下的值为50px */")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px 20px 40px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 盒子左上角椭圆： 10px, 左下，右上 20px, 右下30px*/")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px 20px 30px 40px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 盒子左上角椭圆： 10px, 右上 20px, 右下30px, 左下 40px*/")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px 20px 30px 40px / 10px 20px 30px 40px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 顺序和上面一样 */")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 斜杠左边的代表的是水平方向，斜杠右边代表的是垂直方向 */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"box-shadow-多阴影"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#box-shadow-多阴影"}},[t._v("#")]),t._v(" box-shadow 多阴影")]),t._v(" "),a("p",[t._v("可以利用box-shadow 设置多个阴影来实现一个简单的loading效果")]),t._v(" "),a("div",{staticClass:"shadow-loading"}),t._v(" "),a("h2",{attrs:{id:"grid布局"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#grid布局"}},[t._v("#")]),t._v(" grid布局")]),t._v(" "),a("p",[t._v("给一个容器声明"),a("code",[t._v("display: grid")]),t._v("，该容器生成二维布局，grid容器的直接子元素为grid-item，grid-item拥有一些属于自己的属性，grid也拥有一些属于自己的属性，grid-item的宽度没有被指定时占满整个容器宽。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".grid-box")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" grid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-columns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("repeat")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 100px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-columns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("repeat")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 100px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-rows")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("repeat")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 100px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("gap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 20px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("gap属性是row-gap和column-gap属性的合并简写， column-gap：列与列之间的间距，row-gap: 行与行之间的间距。")]),t._v(" "),a("p",[t._v("grid-auto-flow指明了grid-item的放置顺序（是先行后列row，还是先列后行column）配合dense值，能够使得item紧密填满，尽量不出现空白。")]),t._v(" "),a("p",[a("code",[t._v("grid-auto-flow: row dense")]),t._v("。")]),t._v(" "),a("p",[t._v("项目属性： grid-column-start, grid-column-end, grid-row-start, grid-row-end，这四个属性指定了item的四个边框分别定位在哪根网格线")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v(" "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".grid-box div:nth-child(1)")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-column-end")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 4"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 定位在了第四根网格线，也就是占满了3个格子，也可以写成 span 3*/")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-column")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" span 3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"grid-box"},[a("div",[t._v("grid-1")]),t._v(" "),a("div",[t._v("grid-2")]),t._v(" "),a("div",[t._v("grid-3")])]),t._v(" "),a("p",[t._v("关于grid-template-column 和 grid-template-row的属性值")]),t._v(" "),a("ol",[a("li",[t._v("fr, 表示"),a("code",[t._v("片段")]),t._v("的意思")])]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v("   "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-column")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1fr  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 表示第一列占据容器的全部宽度*/")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-column")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1fr 2fr  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 表示第一列占据容器宽度的1/3, 第二列占据 2/3 */")]),t._v("\n       "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-column")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1fr auto 100px "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* auto默认会平分剩余的宽度, 容器的总宽度 - 100px， 得到剩余的宽度.\n       其中 第二列的宽度是文字内容的宽度，剩下的宽度 = 1fr  */")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[t._v("grid-template-area属性")]),t._v(" "),a("p",[t._v("网格布局允许指定”区域“（area），一个区域由单个或多个单元格组成。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-area")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a a a'")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"css层的定位问题-父元素设置overflow-绝对定位的子元素会被隐藏或一起滚动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css层的定位问题-父元素设置overflow-绝对定位的子元素会被隐藏或一起滚动"}},[t._v("#")]),t._v(" css层的定位问题--父元素设置overflow，绝对定位的子元素会被隐藏或一起滚动")]),t._v(" "),a("p",[t._v("如果一个元素设置了overflow： auto，产生了滚动条，则脱离文档流的子元素将会被隐藏或者被一起滚动，这种情况下解决的办法，让滚动的内容由一个新的容器去包裹，这个新的容器隶属于父元素的最近子级元素怒")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("can scroll"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("滚动的内容"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("fixed-menu"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);