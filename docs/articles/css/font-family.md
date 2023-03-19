# 说说 css 中的字体

大多数前端开发者平日对 css 中的`font-family`属性了解甚少。如果你习惯通过脚手架快速搭建一个项目，那么你可以从`/src/App.vue`（也可能是`style.css`）中的 style 标签内的找到预设字体的 css 样式.

例如，以下是我用`vite`快速搭建的一个 vue 项目后的默认 css 样式

```css{2}
:root {
   font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
   font-size: 16px;
   line-height: 24px;
   font-weight: 400;

   color-scheme: light dark;
   color: rgba(255, 255, 255, 0.87);
   background-color: #242424;

   font-synthesis: none;
   text-rendering: optimizeLegibility;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   -webkit-text-size-adjust: 100%;
}
```

咱们主要来看看`font-family`属性，这里的`font-family`属性预先设置了一系列字体，这些字体不可能存在于每个用户的电脑里内， 所以大部分开发者会设置一个兜底的 font 放在末尾。常见兜底的字体值一般是`sans-serif` 和 `serif`，这两个字体表示的含义是`无衬线字体（sans-serif）`和`衬线字体（serif）`. 需要注意的是，**_`sans-serif`和`serif`不是指的是具体的某个字体_**，而是指的是字体所属的类别。

在 windows 电脑下，常见的`sans-serif`字体有`微软雅黑`、`Arial`等等。`无衬线字体`和`衬线字体`主要区别在于`衬线`字体的形状会有小装饰，如下图：

![sans-serif和serif的区别](https://newenglandrepro.com/wp-content/uploads/2016/08/BP-Serif-SansSerif-Graphic1-1200x721.jpg)

左边的衬线字体中有黄色标注的就是小装饰. 而无衬线字体就没有任何突出的玩意。当没有指定具体的字体名称时，浏览器会选择哪种衬线字体或非衬线字体一般由`UA`来决定。

接下来咱再说说 `font-weight`这个属性，`font-weight`和`font-family`联系很紧密， 在 css 中 font-weight 可用的值如下.

-  100
-  200
-  300 (lighter)
-  400 (normal)
-  500
-  600
-  700 (bold)
-  800
-  900 (bolder)

有的时候我们想给某个文本元素设置`font-weight: 500`，但是页面并没有任何变化，问题在于当前页面的字体并不支持`500`这个 weight 值。如果不支持这个 500 的值，那么浏览器会如何渲染字体粗细呢，我找到了相关资料。

> If you specify a font-weight that is not supported by the font, the browser will try to approximate the desired weight using the available weights. For example, if you specify a font-weight of 800 for a font that only supports weights of normal and bold, the browser may use the bold weight instead.

可以肯定的是，所有的的`font`都会支持`400`和`700`这两个 weight-value。
