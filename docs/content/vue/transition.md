# 深入了解 Transition

## 介绍

Transition 是 Vue 提供的一种为元素实现动画过渡的一种方案。它也是 Vue 内置的一个组件。只不过，该组件本身并不会被渲染成一个 DOM 元素，

以下是一个使用 Transition 组件的案例：

```vue
<Transition>
    <div v-if="show"></div>
</Transition>
```

上面的模板中，我使用了 `v-if` 指令动态控制 div 的显示和隐藏。

此时，如果给 Transition 组件添加一些 props，就可以在 div 显示和隐藏期间设置一些过渡动画效果, 下面是个不错的例子：

```vue
<template>
    <Transition name="scale">
        <div v-if="show"></div>
    </Transition>
</tempalte>

<style lang="scss">
.scale-enter-from,
.scale-leave-to {
   transform: scale(2);
   opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
   transition: 0.5s linear;
}
</style>
```

<script setup>
import TransitionExample from './components/transition-one.vue';
import TransitionExample2 from './components/transition-two.vue';
</script>

<TransitionExample />

上面这个例子，主要是四行 css 的代码控制元素在切换状态时的过渡效果。

Vue 为过渡动画实现了一系列动画编排的预定义类名，如下图所示：

![transition-classes](https://vuejs.org/assets/transition-classes.f0f7b3c9.png)

其中 `v` 是表示过渡动画的前缀名称，

::: info 说明
`<Transition>` 接收一个名为 `name` 的 props。如果用户没有指定，则默认值为 `v`。
:::

一个元素从显示到页面，到最终从页面上消失，分为两个阶段：

-  enter
-  leave

我们可以把一个 DOM 元素想象成一名演员，演员从上台表演（这里的舞台可以想象成页面） 到谢幕需要经历六个步骤：

-  从幕后开始做准备
-  缓缓走向舞台
-  开始表演
-  表演结束，开始准备离场
-  缓缓离开舞台
-  回到幕后

这六个步骤正好对应着上图中一系列预定义的过渡类。

-  从幕后开始做准备 （v-enter-from）
-  缓缓走向舞台 （v-enter-active）
-  开始表演 (v-enter-to)
-  表演结束，开始准备离场 (v-leave-from)
-  缓缓离开舞台 (v-leave-active)
-  回到幕后 (v-leave-to)

我们可以借助这些预设的过渡类来完成一个我们想要的为元素过渡的动画效果。

例如我们想要实现一个这样的动画编排效果

1. 入场前，元素相对于自身 Y 轴偏移 -100%，border-radius: 50%
2. 入场中，设置元素的过渡时间，缓动函数，比如 cubic-bezier(0.68, -0.55, 0.265, 1.55) .5s
3. 入场完毕，transform: scale(2);
4. 离场中，设置元素的过渡时间，缓动函数，比如 cubic-bezier(0.68, -0.55, 0.265, 1.55) .5s
5. 离场后，元素相对于自身 Y 轴偏移 -100%，border-radius: 50%

下面的示例就是上述动画编排后的样子：

<TransitionExample2 />
