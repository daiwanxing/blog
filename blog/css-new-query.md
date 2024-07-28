---
slug: css-new-query
title: "CSS @container"
authors: klein
---

import CSSContainerExample from '@site/src/components/example/container';

<!-- truncate -->

你知道 CSS 的 `@container` （下文统一称为容器查询）是什么吗？它是响应式布局的新晋王者，比传统的媒体查询 `@media` 更为强大、灵活。

> `容器查询` 与基于视口大小的响应能力的媒体查询不同，`容器查询` 允许基于**父容器**的大小设置子元素样式。这种转变使开发人员能够创建更加模块化、可重用的组件，这些组件可以在不同的容器环境中无缝适应。

这段话很好理解。回顾以前使用媒体查询，在不同视口下，我们需要为一个元素编写特定的样式：

```css
@media screen and (max-width: 720px) {
  div {
    color: white;
  }
}
```

ok，这似乎没什么问题。假设一个页面上有若干个元素，都需要在视口小于 `720px` 下调整对应的样式，那么这些元素的新样式是否都得写在这？

然后又需要添加一个断点，在视口小于 `375px` 相关的容器的样式。拜托这样写一坨真的很难受。

为什么我们不能将关注点从视口转移到容器本身呢？

如果有一种技术方案能使得我们只需要关注要调整的容器在不同页面下的尺寸，那这样就能拥抱组件化的思想了。**只需要关注组件本身的`视口`（就是宽度）**，然后再动态调整相关的样式。

`@container`：正是在下 😂。

:::info
目前主流浏览器版本都支持容器查询：Chromium 和 Edge (105+) 以及 Safari (16+)。
:::

如果你公司的业务不需要考虑过旧的浏览器兼容下实现响应式布局，为什么不尝试 `@container` 这一利器呢？

:::info
在我用了 `@container` 写了几个简单的响应式页面后决定彻底与 `@media` 说拜拜！（除非考虑兼容性）。
:::

要想使用容器查询，首先得需要在容器元素样式内声明一行 `container-name` 属性，标明容器的名称。这样我们就能在容器查询中引用该容器。

还需要声明容器的类型，声明容器类型的目的是以便浏览器知道查询该容器的维度，`container-type` 可选的值有：

- inline-size
  - 基于容器的行内尺寸（通常是宽度）
- size
  - 容器的尺寸（包括宽度和高度）将用于容器查询
- normal
  - 容器不会参与容器查询

:::tip
默认情况下，`container-type` 是 `normal`，这意味着元素不会被当作容器来进行容器查询。
:::

例如下面这段 CSS 代码，我给 `.my-box` 这个类名声明了容器的名称为 `notify-card`。

```css
.my-box {
  height: 100px;
  container-name: notify-card;
  background: black;
  border-radius: 1em;
  container-type: inline-size;
}
```

这样我们就能编写容器查询规则，使用这个名称来应用特定的样式。

比如我希望在容器 `>300px && < 500px` 子元素的背景颜色为蓝色，`> 500px` 为灰色。这样实现特别简单。

```css
@container notify-card (min-width: 300px) and (max-width: 500px) {
  .child-element {
    background-color: blue;
  }
}

@container notify-card (min-width: 500px) {
  .child-element {
    background-color: gray;
  }
}
```

以一段简单的 CSS 代码快速过一下这个规则的使用。

```css
.my-box {
  height: "100px",
  container-name: "notify-card";
  background: black;
  border-radius: 1em;
}
```

下面是样式应用到元素的示例：

<CSSContainerExample />
