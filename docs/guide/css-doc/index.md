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

## box-shadow 多阴影

可以利用box-shadow 设置多个阴影来实现一个简单的loading效果

<div class='shadow-loading'></div>

## grid布局

给一个容器声明`display: grid`，该容器生成二维布局，grid容器的直接子元素为grid-item，grid-item拥有一些属于自己的属性，grid也拥有一些属于自己的属性，grid-item的宽度没有被指定时占满整个容器宽。

```css
.grid-box {
       display: grid;
       grid-template-columns: repeat(3, 100px);
       grid-template-columns: repeat(3, 100px);
       grid-template-rows: repeat(3, 100px);
       gap: 20px;
}
```
gap属性是row-gap和column-gap属性的合并简写， column-gap：列与列之间的间距，row-gap: 行与行之间的间距。

`auto`关键字表示宽度自适应,grid-tempalte-rows: 50px auto 50px; 第一个单元格和最后一个单元格的宽度设定为50px，第二个单元格的宽度自适应剩余的宽度。 

grid-auto-flow指明了grid-item的放置顺序（是先行后列row，还是先列后行column）配合dense值，能够使得item紧密填满，尽量不出现空白的单元格。

`grid-auto-flow: row dense`。 

项目属性： grid-column-start, grid-column-end, grid-row-start, grid-row-end，这四个属性指定了item的四个边框分别定位在哪根网格线

```css
 .grid-box div:nth-child(1) {
       grid-column-end: 4; /* 定位在了第四根网格线，也就是占满了3个格子，也可以写成 span 3*/
       grid-column: span 3;
 }
```
<div class='grid-box'>
   <div>grid-1</div>
   <div>grid-2</div>
   <div>grid-3</div>
</div>

关于grid-template-column 和 grid-template-row的属性值

1. fr, 表示`片段`的意思
```css
   div {
       grid-template-column: 1fr  /* 表示第一列占据容器的全部宽度*/
       grid-template-column: 1fr 2fr  /* 表示第一列占据容器宽度的1/3, 第二列占据 2/3 */
       grid-template-column: 1fr auto 100px /* auto默认会平分剩余的宽度, 容器的总宽度 - 100px， 得到剩余的宽度.
       其中 第二列的宽度是文字内容的宽度，剩下的宽度 = 1fr  */
   }
```

2. grid-template-area属性

   网格布局允许指定”区域“（area），一个区域由单个或多个单元格组成。

   ```css
       grid-template-area: 'a a a'
   ```

## css层的定位问题--父元素设置overflow，绝对定位的子元素会被隐藏或一起滚动

如果一个元素设置了overflow： auto，产生了滚动条，则脱离文档流的子元素将会被隐藏或者被一起滚动，这种情况下解决的办法，让滚动的内容由一个新的容器去包裹，这个新的容器隶属于父元素的最近子级元素怒

```html
<div>
  <div class="can scroll">滚动的内容</div>
  <div class="fixed-menu"></div>
</div>
```

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