# CSS3 新尺寸关键字

## 前言

这篇文章主要探讨下现代 CSS 中的一些尺寸关键字，可能你已经开始用上了，但是对于原理并不是很了解。也有可能你还从未接触。

不管怎么样，希望正在阅读这篇文章的你能够有所收获，也希望我写的文章能够清晰易懂。

## 正文

CSS 尺寸关键字有如下几个：

-  fit-content
-  max-content
-  min-content

它们可以适用于 `width`、`height`、`min-width`、`min-height`、`max-width`、`max-height`、`flex-basis`等。

```css
width: fit-content;
min-width: max-content;
flex-basis: min-content;
```

这些尺寸关键字和具体的数值（例如 px, rem, vw，%等）不同，它们的尺寸由**内容的大小**来决定。

听起来似乎有点儿抽象，但好像又不难理解。

既然是内容的大小，那么 `max-content` 是否表示盒子的大小由内容的最大尺寸来决定，而 `min-content` 又是否由内容的最小尺寸来决定呢？

不急，我们先一个个的了解。

## min-content

`min-content` 的意思是盒子的大小由尺寸的最小内容来决定，这个最小的内容指的是一行内容中**英文单词中最长的那个单词**作为盒子的最小尺寸。

```css
.box {
   border: 2px solid;
   width: min-content;
}
```

<div class="sze">I bought a macbookAir !</div>

<style>
    .sze {
        border: 2px solid;
        width: min-content;
    }
</style>

上面的例子我们可以发现整个盒子的宽度是由盒子里的内容中最长的那个单词的宽决定，这行句子中 **macbookAir** 的单词是最长。所以整个容器的宽就是这个单词所占的字符的宽。

那如果内容中有中文，会如何处理？

我们调整 div 中的内容，继续看下面的例子：

<div class="sze-2">吃了吗</div>

<style>
    .sze-2 {
        border: 2px solid;
        width: min-content;
    }
</style>

根据上面的浏览器渲染得到的结果后，不难发现如果盒子的内容只存在中文字符，那么 `min-content` 尺寸关键字意味着取一个中文字符的大小。

:::tip 提示
经实测，如果同时存在英文字符和中文字符情况，哪个最长就取哪个（你可能好奇中文字符最长不也就只有一个字符的宽吗，其实不然。如果中文字符后面接很多中文标点符号，那么最长的字符就是第一个中文字符开始到最后一个标点符号结束）
:::

## fit-content

`fit-content` 尺寸关键字会让容器的尺寸尽可能的使用可用的空间以**满足内容填满**，但容器的大小最大也不会超过父级的内容尺寸。

```css
.box {
   border: 2px solid;
   width: fit-content;
}
```

<div class="exp-1">I love css,typescript and html.</div>

<style>
    .exp-1 {
        border: 2px solid red;
        width: fit-content;
    }
</style>

这里名为 `.box` 的块级容器根据流的特性，其默认宽度是适应父级的宽度。但是在这里我们声明了 `fit-content` 尺寸关键字，容器会自动调整到满足内容填满的大小。

其通俗的理解是内容有多大，容器就有多大。但**这不是绝对**的。

现在我们定义了一个父元素，包裹了一个名为 `.exp-1` 的子元素:

```html
<div class="exp-wrapper">
   <div class="exp-1">
      I love css,typescript and html.I love css,typescript and html.I love
      css,typescript and html.
   </div>
</div>
```

样式定义如下：

```css
.exp-wrapper {
   padding: 2px;
   border: 2px solid blue;
}

.exp-1 {
   border: 2px solid red;
   width: fit-content;
}
```

最终渲染结果如下：

<div class="exp-wrapper">
    <div class="exp-1">I love css,typescript and html.I love css,typescript and html.I love css,typescript and html.I love css,typescript and html.</div>
</div>

<style>
    .exp-wrapper {
        padding: 2px;
        border: 2px solid blue;
    }
</style>

由于子元素的内容太长以至于无法完全一行填满所有内容最终导航文本换行，虽然 `fit-content` 尽可能的让自身的大小满足于能够填充整行内容的大小。但是自适应内容的大小的前提在于**内容的大小不能超过父级元素的宽高**。

说到这，你可能会说那 `max-content` 是不是不管怎么样，都会让容器完全遵循内容的宽高，不产生换行？

## max-content

事实的确如此。

还是上面那个例子，但是我们会将 `width: fit-content` 改为 `width: max-content`;

<div class="exp-wrapper-2">
    <div class="exp-2">I love css,typescript and html.I love css,typescript and html.I love css,typescript and html.I love css,typescript and html.</div>
</div>

<style>
    .exp-wrapper-2 {
        padding: 2px;
        border: 2px solid blue;
    }

    .exp-2 {
        border: 2px solid red;
        width: max-content;
    }
</style>

现在容器会拼接全力的去满足内容填满一行所需要的宽！这有点类似于 `word-wrap: no-wrap`。我想内部应该就是这样做的。

如果说 `min-content` 尺寸关键字目的取内容中最长的那个词作为宽高，那么 `max-content` 就是根据内容的大小伸缩宽高，哪怕内容的大小超过自身父级容器的大小。

## 总结

本文总结了现代 CSS 中的三个尺寸关键字用法以及原理，它们可以帮助我们更精确地控制元素的尺寸。

- min-content
  - 该值将尝试将元素的尺寸调整为其内容所需的最小尺寸，不考虑设定的最大尺寸。如果元素内容的宽度或高度大于最大尺寸，则该值将返回最大尺寸。 
- fit-content 
  - 该值将尝试将元素的尺寸调整为其内容所需的最小尺寸，同时不超过设定的最大尺寸。如果元素内容的宽度或高度大于最大尺寸，则该值将返回最大尺寸。如果内容宽度或高度小于最小尺寸，则该值将返回最小尺寸
- max-content
  -  该值将尝试将元素的尺寸调整为其内容所需的最大尺寸，不考虑设定的最小尺寸。如果元素内容的宽度或高度小于最小尺寸，则该值将返回最小尺寸。 