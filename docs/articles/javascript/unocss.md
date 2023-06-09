# 认识 UnoCSS

[unoCSS](https://unocss.dev/) 是一个 CSS [_原子化_](https://css-tricks.com/lets-define-exactly-atomic-css/) **引擎**。

> 原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。

注意，并非一个[_原子化_](https://css-tricks.com/lets-define-exactly-atomic-css/)的**框架**，它不同于 [tailwind.css](https://tailwindcss.com/) 或者 [windicss](https://windicss.org/)。

目前这个插件已经获得了 _12K_ 的 star，而且出自 [Anthony Fu](https://github.com/antfu) 大佬之手，想必在可靠性和稳定性有着很大的保障。

既然是引擎，那在开发者的角度，是偏向于底层的。我们可以基于 UnoCSS 引擎开发新的 CSS 原子化框架。

UnoCSS [内置的预设](https://unocss.dev/presets/uno)正是基于 UnoCSS 开发的，目前已经有很多的基于 UnoCSS 的[社区预设](https://unocss.dev/presets/community)方案。

我已经上手使用 UnoCSS 一段时间了，UnoCSS 给我最大的感觉是直观而且易于使用，当你真正尝试使用 UnoCSS 后，你可能不得不怀疑自己真的是否需要手写 CSS 样式。

## 原子化框架能做什么

如果你使用过 [tailwind.css](https://tailwindcss.com/) 或者 [windicss](https://windicss.org/) 这类原子化框架的话。

当我给出一段如下的规则：

```html
<div class="py-10 mx-10 fw-300 bg-black border-rounded flex items-center"></div>
```

你肯定已经知道这个 div 最终渲染的效果了。

原子化框架除了预设的静态规则外，还可以支持动态规则，例如：

```js
rules: [
   [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
   [/^p-(\d+)$/, (match) => ({ padding: `${match[1] / 4}rem` })],
];
```

当我们使用 `p-任意的数字` 就会生成对应的规则。

例如 `p-10000` 就会编译完毕后生成 `{ padding: 2500rem }`

除了上述的静态规则和动态规则外，原子化 CSS 框架还支持*可变修饰*。

可变修饰就是通过使用括号对相同的工具类进行编组，将其应用于同一可变修饰。

例如：

```html
<div class="hover:(bg-white fw-700 text-red text-center text-10)"></div>
```

当鼠标移入此 div 中，就会触发 hover 伪类同时应该括号中的所有的工具类样式。

到目前为止，上述提到的功能在 UnoCSS 中均已经得到了实现，如果 unoCSS 的能力仅限于模仿其他原子化框架，那也不会得到这么多 star。

## UnoCSS 真正威力

### 无值属性化模式

UnoCSS 最具创意的点在于支持了**无值属性化模式**，如果你使用过 [windicss](https://windicss.org/)，那你肯定知道 [windicss](https://windicss.org/) 中有一个属性化模式方案。

例如，上面提到的这段规则：

```html
<div class="py-10 mx-10 fw-300 bg-black border-rounded flex items-center"></div>
```

在属性化模式下，可以变成

```html
<div
   p="y-10"
   m="x-10"
   text="300"
   bg="black"
   border="rounded"
   display="flex"
   flex="items-center"
></div>
```

而在，UnoCSS 中，更进一步！

```html
<div py-10 mx-10 fw-300 bg-black border-rounded flex items-center></div>
```

就像写自定义的 CSS 属性一样写原子化 CSS 类，对开发者而言节省了大多的冗余的代码。

> 如果你担心预设的原子类和其他的属性冲突，你可以约束开启[前缀](https://unocss.dev/presets/attributify#properties-conflicts)使用。


### CSS 作用域

如果希望自己在组件内编写的原子类覆盖掉 UnoCSS 预设的原子类样式，那应该怎么办呢？

unoCSS 一开始就想到了这点，这是因为 UnoCSS 设计之初不支持预检（一些原子化CSS框架会使用预检功能重置原生元素样式），它将 CSS 重置的控制权完全留给了用户。

```html
<template>
  <div class="m-2 rounded"><slot></div>
<template>

<!-- 以下内容将被注入 bundler 中 -->
<style scoped>
.m-2{margin:0.5rem;}
.rounded{border-radius:0.25rem;}
</style>
```

### 性能

没什么好说的

> [UnoCSS 可以比 Tailwind 的 JIT 引擎快 200 倍](https://antfu.me/posts/reimagine-atomic-css-zh#%E6%80%A7%E8%83%BD)