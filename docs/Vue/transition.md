# 深入了解 Transition

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
.scale-enter-from {
    transform: scale(2);
}

.scale-enter-active {
    transition: .5s linear;
}
</style>
```
<script setup>
import TransitionExample from './components/transition-example.vue';
</script>

<TransitionExample />