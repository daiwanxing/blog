# CSS随记

## 用svg实现一个loading

```css
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="load">
       <circle cx="150" cy="80" r="50" class="other" /> 
       <circle cx="150" cy="80" r="50" class="loading" />
</svg>
````

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="load">
       <circle cx="150" cy="80" r="50" class="other" />
       <circle cx="150" cy="80" r="50" class="loading" />
</svg>


svg的viewBox的含义

svg的viewbox规定了画布所在的x轴方向和y轴的方向的位置以画布的width * height

而svg的width和height则是定义了svg容器的大小，svg容器内的元素会被画布尽量铺满到整个svg容器大小，下面这个直角三角形本来是长50宽50的，画布的大小也是50 * 50,但是由于平铺的特性，画布能计算出可以将三角形最大铺满到多少： 300 / 50  = 6  200 / 50 = 4， 宽度会平铺最大拉伸6，高度拉伸4倍

```html
<svg viewbox="0,0,50,50" width="300" height="200">
       <polygon points="0,0 0,50 50,50"></polygon> 
</svg>
```


## background-size 属性值的含义

1. background-size 设定两个值和设定一个值的区别

 ```css
       background-size: 100%; /* x轴的背景拉伸到容器的宽度，y轴auto */
       background-size: 100% 100%; /* x轴和y轴的宽高拉伸到容器的宽高 */
 ```

2. background-size: cover 和 contain 的区别

都是等比例缩放图片的宽高，区别在于contain总是会显示图片的全部的内容，不会发生裁剪，所以如果图片原始尺寸大于容器尺寸，会造成容器的一侧有一部分空白区域，而cover是将背景完全的覆盖到容器的区域，会发生裁剪，不会失真图片。





## CSS不常用的伪类

1. any-link

link的替代品，link伪类太鸡肋了，被点击之后，link伪类的样式就没了。而any-link会匹配所有带href属性的链接元素（a,link,area）,即便链接已经被访问过了，仍然样式起效。

2. target
锚点伪类，可以给命中的锚点设置样式

3. focus-within

如果一个元素的子元素被focus了，那么该元素仍然可以应用focus-within伪类设置的样式，focus的增强版，兼容性很好（IE不支持）

4. focus-visible 

兼容性目前比较差（2021/5/20），目前来看就Chrome86以上版本支持，它的作用主要是可以区分一个元素被聚焦时是鼠标聚焦还是键盘聚焦，只有键盘聚焦才会应用该伪类样式。想让鼠标聚焦时设置样式，应该用focus伪类（focus伪类点击后，必须点击其他地方，focus样式才会被取消）

5. placeholder-shown

当输入框设置placeholder时，匹配该输入框，兼容性还可（IE10+,带ms前缀就可以）

举个🌰, 当输入框提示文本可见时，设置`outline: 2px solid #2970ff`，不可见时，移除该样式

<input placeholder='这是一段提升文本' type='text' />

<style>
       input:placeholder-shown {
              outline: 2px solid #2970ff;
       }
</style>

6. disabled

表单控件禁用伪类 （IE9+）

7. enabled

表单控件启用伪类（IE9+）

8. checked

表单控件选中伪类（IE9+支持, MAC-OS `<option>`元素无法应用该伪类）

9. is伪类

is伪类是一个新伪类，没有兼容性包袱（-webkit-any伪类的替代品，该伪类已被废弃，建议两个都写，万一chrome版本更新后-webkit-any伪类被移除就遭殃了），它表示的语义性很强。（IE不支持）， is伪类的优先级由选择器列表中优先级最高的那个选择器来决定。

```css
is(ul, ol) li:first-child {
       font-size: 42px;
}
```

表示: <span style="color: red">“选中ul 或者ol后面的第一个li元素的字体设置为42像素”</span>

## border-radius 八个属性值探讨

border-radius是我们用的很频繁的一个属性，它是一个圆角属性，从边框开始向内裁剪。我们一般都是设置一个值：`border-radius: 50%`或者`border-radius: 一个具体的数值`；其实border-radius不光能设置一个值，可以设置2个，4个甚至8个以便对不同方向的边框进行更细微的裁剪，下面一起探讨不同数量的值的含义。

```css

div {
       border-radius: 50%; /* 盒子的宽高比： width / height， 如果宽高一致，则可以得到一个正圆 */
       border-radius: 50% 50px; /* 盒子的左上、右下 值为50%， 右上，左下的值为50px */
       border-radius: 10px 20px 40px; /* 盒子左上角椭圆： 10px, 左下，右上 20px, 右下30px*/
       border-radius: 10px 20px 30px 40px; /* 盒子左上角椭圆： 10px, 右上 20px, 右下30px, 左下 40px*/
       border-radius: 10px 20px 30px 40px / 10px 20px 30px 40px; /* 顺序和上面一样 */
       /* 斜杠左边的代表的是水平方向，斜杠右边代表的是垂直方向 */
}
```

重叠曲线的渲染机制是有一套公式的:  <code>
                        f = min(l
                        <sub>h</sub> / S
                        <sub>h</sub>, l
                        <sub>v</sub> / s
                        <sub>v</sub>)
                    </code>

如果f的值是小于1的话，那么每个圆角的实际值 * f， 反之则无需相乘。

其中 <code>l<sub>h</sub></code> 是指的是水平方向的宽， <code>l<sub>v</sub></code> 是垂直方向的高.
<code>s<sub>h</sub></code> 是水平方向的半径之和,<code>s<sub>v</sub></code> 是垂直方向的半径之和。

```css
div {
  width: 150px;
  height: 100px;
  border-raidus: 100%;
  /* 求实际的圆角值 */
}
```

根据上面的公式可得，f = min(150 / 300, 100 / 200); f = 0.5; 最终所有的半径都要乘以0.5, 这里border-radius使用的百分比是参照自己身的宽高
也就是`border-radius: 150px 100px` * 0.5 = `border-radius: 75px 50px`;


## box-shadow 多阴影

可以利用box-shadow 设置多个阴影来实现一个简单的loading效果

<div class='shadow-loading'></div>

## Flex布局深入了解

flex: none 和 flex: 0的区别点

1. flex: none === flex: 0  0 auto, 其中auto属性表示flex项目的宽度由内容来撑开。适合设置在内容不能换行显示的小控件元素上

2. flex: 0 === flex: 0 1 0%，flex-basis 为 0 表现为最小内容宽度，就是一柱擎天的效果， flex-shrink为1能够在容器宽度不足的时候得到很好的收缩。

3. flex: auto === flex: 1 1 auto, 适合用于元素的宽度比值不固定的情况，或者宽度的值由内容来决定。对每个flex项的宽度不要求一致

4. flex: 100px === flex: 1 1 100px

flex-basis属性与width属性的关系，flex-basis属性下的最小尺寸是由内容决定的，而width属性下的最小尺寸是由width的计算值来决定的。

如果flex-basis和width属性同时设置，则width属性失效，flex-basis和width都是表示的是元素的基本尺寸。

flex-shrink 累加 < 1 ，则每一项乘以各自设定的比值, >=1 就是 每个flex-item的shrink值累加，再等比平分.

一个flex子项最终尺寸是基础尺寸、弹性增长或收缩、最大最小尺寸共同作用的结果。
优先级：最大最小尺寸 > 弹性增长尺寸 > 基础尺寸   

## Grid布局

给一个容器声明`display: grid`，或者`display: inline-grid`该容器将生成二维的行列布局，inline-grid和grid的区别仅仅在于容器在外部的排列方式是独占一行还是和其他行内元素参与排列。grid容器的直接子元素为grid项，grid项拥有一些属于自己的属性，grid也拥有一些属于自己的属性，grid-item的宽度没有被指定时占满整个容器宽。

```css
.grid-box {
       display: grid;
       grid-template-columns: repeat(3, 100px);
       grid-template-rows: repeat(3, 100px);
       /* 上面的属性还可以直接简写成  */
       grid: repeat(3, 100px) / repeat(3, 100px);

       /* 之前的grid-gap属性已经被废弃，新的定义间距的属性为gap */
       gap: 20px; /* 可以是px、%、vh、vw、em、rem等等 */
}
```
gap属性是row-gap和column-gap属性的合并简写， column-gap：列与列之间的间距，row-gap: 行与行之间的间距。


<del>`auto`关键字表示宽度自适应,grid-tempalte-rows: 50px auto 50px; 第一个单元格和最后一个单元格的宽度设定为50px，第二个单元格的宽度自适应剩余的宽度。 </del>

`auto`值是基于grid项本身的内容宽度来设定，类似于`width: fit-content`

该值和fr有着本质的区别，grid项的内容过长，其auto的值也会变大

而fr的实际是各个fr累加然后平分剩余的宽度，如果累加的fr总值小于1，则每个grid项实际的宽高是 设置fr * 剩余可用的宽高。大于1那就根据累加的总值来均分。

```css
div {
    display: grid-box;
    grid: 100px / repeat(3, 1fr 2fr 3fr);
    /* 已知容器总宽是1000，求三个grid项的宽 */
    /* 1fr + 2fr + 3fr = 6fr,  6fr = 1000, 平均1fr = 166px */
    /* 所以就很容易得到了 */
}
```

```css
div {
    display: grid-box;
    grid: 100px / repeat(3, .2fr .1fr .2fr);
    /* 已知容器总宽是1000，求三个grid项的宽 */
    /* .2fr + .1fr + .2fr = .5fr < 1, 每个grid项的实际宽度是容器可用宽度  * 各自设定的fr得到值 */
}
```


### css自定义属性

1. css自定义属性不能用于媒体查询
```css
:root {
  --lg: 1020px;
}

@media screnn and (max-width: var(--lg)); /* 无效 */
```

2. 自定义属性不能自身赋值

像在javascript中我们可以设置`let a = 123; a = 321`, 但是在css的自定义属性值中是违法的


### Grid布局中的三个常用函数

1. fit-content()
2. minmax()
3. repeat()

fit-content函数的作用是让尺寸适应内容，但不会超过设定的尺寸，例如我给一个grid项设置fit-content(200px)，如果该grid项的内容大于200px,也不会让grid项撑开。如果内容小于200px，则grid项的实际宽度以内容为准。

minmax函数的作用是限制grid项的宽度最小不能超过min的设定值，最大不能超过max的设定值，例如`minmax(100px, 200px)`, grid项的最大宽度是200px,最小宽度是100px，但是当我们设定后，grid项会直接取设定的最大宽度。那么最小宽度在什么时候会生效呢。根据我的实践一般在搭配`minmax(100px, 1fr)`的时候会生效介于100px ~ 1fr之间的宽度，grid容器希望能够尽可能的容纳更多的grid项，只要值不小于设定的min，grid容器会计算出最大可容纳grid项目的宽度。

注意：repeat()函数 是不能和auto搭配使用的，但是可以和长度、百分比搭配使用。

```css
div {
   grid: repeat(auto-fit, 300px, 200px, 100px) auto /* invalid */
}
```

grid-auto-flow指明了grid-item的放置顺序（是先行后列row，还是先列后行column）配合dense值，能够使得item紧密填满，尽量不出现空白的单元格。
grid-auto-flow的属性值可以用在grid属性里,

```css
.grid-container {
       grid: auto-flow dense 100px / 100px 100px;
       /* 等同于 */
       grid-auto-flow: row dense;
       grid-auto-rows: 100px;
       grid-template-columns: 100px 100px;
       /* auto-flow的值取决与在斜杠左边还是右边,如果是右边 auto-flow的值则是columns,否则为row */
       /* 并且auto-flow后面的值会被自动归并到 grid-auto-rows(grid-auto-columns)中 */
}
```

`grid-auto-flow: row dense`。 

项目属性： grid-column-start, grid-column-end, grid-row-start, grid-row-end，这四个属性指定了item的四个边框分别定位在哪根网格线

```css
 .grid-box div:nth-child(1) {
       grid-column-end: 4; /* 定位在了第四根网格线，也就是占满了3个格子，也可以写成 span 3*/
       grid-column: span 3;
 }
```

### 关于Grid布局中的隐式网格和显式网格

grid布局中控制显式网格的属性有： grid-column、 grid-row、grid-template-column、grid-template-row

grid布局中控制隐式网格的属性有： grid-auto-columns、grid-auto-rows， 这两个属性的作用是指定任何自动生成的网格的宽高，所谓的自动生成的网格就是当我们显示指定了网格的大小后，超出指定的网格的大小的那些网格。

## 关于grid布局一些缩写属性

grid-column是grid-column-start / grid-column-end属性的缩写
grid-row是grid-row-start / grid-row-end属性的缩写。


## css层的定位问题--父元素设置overflow，绝对定位的子元素会被隐藏或一起滚动

如果一个元素设置了overflow： auto，产生了滚动条，则脱离文档流的子元素将会被隐藏或者被一起滚动，这种情况下解决的办法，让滚动的内容由一个新的容器去包裹，这个新的容器隶属于父元素的最近子级元素

```html
<div>
  <div class="can scroll">滚动的内容</div>
  <div class="fixed-menu"></div>
</div>
```

## 关于calc()函数使用的一些限制规则

随着css变量的兴起与浏览器的大力至此，calc函数的使用率也非常广泛，但是在使用calc函数进行 + - * / 运算的时候有需要注意的事项。

1. 运算前后必须保留空格

```css
div {
  /* 为了区分负数运算 */
  width: calc(100px - 20px); 
}
```

2. 运算符左侧如果是一个不带单位的数值那么可以与带单位的相乘

3. 运算符左侧如果是一个带单位的那么可以与不带单位的数值（该数值不能为0）相除

4. 如果两侧都有单位，只能进行加减运算

## 视口（View Port）
移动端未设定`<meta name="viewport" content="width=device-width, initial-scale=1.0">`, 默认宽度是980， 指定视口后，页面的宽度就是屏幕的宽度。

## 重绘（repaint）与回流(reflow)

重绘一般发生在元素的样式属性发生变化，而回流一般是元素的几何属性发生变化。重绘会跳过绘制layout-tree 与 layer tree，直接进入绘制阶段。而回流（重排）会重新开始执行整个渲染流水线

## img标签srcset 属性

```html
<img srcset="1x.png 128w, 2x.png 256">
<!-- 表示当img的宽度为128是展示1x.png 宽度为256时展示2x.png -->
<img srcset="https://www.hetianlab.com/img/home/10.jpg?e5a1f659 256w, https://www.hetianlab.com/img/home/6.jpg?e6b206e9 512w"
    src="https://www.hetianlab.com/img/home/12.jpg?7db3a17a"
    sizes="(max-width: 360px) 512px, 128px"
>
```
[详见这篇文章](https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/)
size属性让我们可以定义在视口宽度小于360px时，我们展示512px规格的图片， 其他情况展示128p像素的图片。
srcset的w标识符需要搭配size属性一起使用，srcset可以根据不同分辨率，显示对应的图片，比如我们的iphon6的devicePixelRatio是2，也就是一个css像素会在iphone6下会被渲染成2个像素。像这种高像素的手机用来展示二倍图可以得到更好的观感体验。

## font-display属性

```css
div {
       font-display: swap 
       /* 先用默认字体展示文本，字体加载完毕后再替换成新的下载好的字体 */
       /* 背景图只有当元素挂载到DOM树上，才会发生请求 */
}
```


## 用hr标签装饰分割线

一般我们在开发页面时常常需用用到两根横线 + 中间一段文字分割展示内容,例如下面这样

<hr data-content="这是一条分割线" class="sp-hr">

我们可以借助hr标签轻易做到，同时拥有良好的语义化，以前我都是通过一个div标签，然后设置before和after两个伪元素一前一后来完成。


现在只需要 `<hr data-content="这是一条分割线" class="sp-hr">`

```css
.sp-hr {
    position: relative;
    padding: 1em 0;
    border: 0;
}

.sp-hr::before {
    position: absolute;
    content: attr(data-content);
    line-height: 1px;
    border: solid #d0d0d5;
    border-width: 0 99vw; /* 需要特别注意的是border-width 两个属性表示的是上下两条边宽度为0，左右各99vw */
    width: fit-content;
    white-space: nowrap;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #d0d0d5;
}
```

还可以借助hr实现波浪线分割
<hr class='wavy'>

```css
.wavy {
    border: 0;
    color: #d0d0d5;
    height: .5em;
    white-space: nowrap;
    letter-spacing: 100vw;
    padding: .5em;
}

.wavy::after {
    content: "\2000\2000";
    text-decoration: overline wavy;
}
```

## BFC、FFC、IFC

BFC（Blcok Formatting Context） 块级格式化上下文

FFC(Flex Formate Context) 自适应格式化上下文 

IFC（Inline Formate Context）行级格式化上下文

## 浅谈css中的clip-path属性

说起clip-path属性就不得不说clip-path属性的前身clip属性，clip-path是clip属性的增强。在还未用clip-path属性前，我曾经常用clip属性的rect函数对容器进行裁剪。clip-path同样也是对容器进行裁剪，但是要注意<strong>clip-path要比clip属性的功能多得多，而且clip属性已经被web标准给删除了,[具体详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip)，虽然很多浏览器都实现了该属性，但是性能没有clip-path高，而且clip能做的clip-path也能做，所以不推荐在项目中继续使用clip属性了
</strong>。clip-path的兼容性在不考虑IE的情况下只需要加上`-webkit-`的前缀就能放心使用。


那么clip-path属性具体要如何使用呢，clip-path属性有很多个函数，例如：ellipse()（椭圆） circle()（圆形） polygon()（多边形）path()（路径） inset() 矩形

```css
.noraml {
       /* inset函数会画出一个矩形，有五个值分别表示代表上右下左，以及圆角 */
       clip-path: inset(top right bottom left round [px]);
       /*  polygon函数 表示画出一个多边形，一个多边形至少要有三个坐标点， 坐标点(x, y)与坐标点之间用逗号分割 */
       /* 绘制一个三角形 */
       clip-path: polygon(50% 0, 0 100%, 100% 100% );
       /* 绘制一个圆形，有两个参数作为输入， 第一个参数是半径（px或者%） -> r， 第二个参数是圆心，默认是盒模型中心 */
       clip-path: circle(10px at 150px);
       /* 绘制一个椭圆, rx表示x轴方向的半径，ry表示y轴方向的radius， position默认是盒模型的center */
       circle-path: ellipse(rx ry at position | postionX positionY)
}
```

clip-path和transform一起使用，则先执行clip-path裁剪后的图形，再通过transform属性的函数对图形进行变化。

元素应用transform属性后的变化

1. 创建层叠上下文
2. 改变overflow对绝对定位元素的限制


## vertical-align的原理

vertical-align 只能用于inline元素


## animation-delay 负值的思考

今天再次拜读了张鑫旭的<<CSS新世界>>，其中animation动画那个章节中提到了animation-delay也可以是负值，老实说我从来没有使用该属性时用到负值。
其实负值得意思很简单，就是动画提前进行。

例如下面这段简单的code

描述了一个盒子会从0 运动到 100px， 整个动画的持890ji续时间是4秒，但是我设定了`aniamtion-delay: -2s`，之前提到过负值，就是让动画提前进行，
那么-2s就是立即播放到第2秒对应的帧，然后再就是我们肉眼可见的从第二秒开始的帧进行渲染。

由下面的偏移参数可知，从 0 - 100px 需要运动4秒， 那么每秒运动了25px, 我们设置了delay为-2，就是提前播放到了第二秒，也就是提前将盒子渲染
到了第50px，那么用户从观感上就是从第50px运动到了100px， 并且视觉上整个动画的持续时间也就2秒。

```html
<style lang="scss">
   .box {
       width: 300px;
       height: 200px;
       animation: moveX -2s 4s ease;  
   }

   @keyframes moveX {
       from {
            transform: translateX(0);
       }
       to {
          transform: translateX(100px);
       }
   }
</style>
```
