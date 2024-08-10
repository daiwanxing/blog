---
slug: uniapp-trap
title: uniapp 陷阱
authors: klein
---

## Trap 1:`v-bind` 无法编译到小程序平台

小程序不支持 `v-bind='$attrs'` 将所有的未声明在组件内部的 `props` 传递给其他子组件。只能一个个手动声明需要传递的 `props` 给其他子组件。

## Trap 2: `<component :is='component' />` 无法编译到小程序平台

小程序不支持动态加载组件，如果在业务组件内部能事先知道可能会有哪些组件被加载，可以预先导入所有的组件。

使用 `v-if` 指令动态切换（虽然这个方案性能极低，如果导入的组件很多，那么模板代码里充斥着大量的 `v-if`）。

:::info
尝试过使用 render 函数，编写多个 `switch case` 来实现 `<component :is='' />` 但是发现编写的 render 函数在小程序端编译不通过。 因为 render 函数生成的 VNode 并不会编译成 wxml 文件，导致组件会导入失败。 orz...
:::

## Trap 3： iconfont 字体文件在 app 真机未能加载

可以用条件编译，在 app 端填写 `https://` 前缀，否则会将 `//xxxxx.woff` 视作为一个 `file` 协议。

## Trap 4： 组件只能在 `vue` 文件内导入。

这个 bug 通常是开发者希望将多个 vue 组件内用到的大量的相同的组件抽到一个单独的 js 文件，然后再单独导入 JS 文件即可，提高维护性。

例如很多页面用到的相同的组件抽到 `foo.js`：

```js title="foo.js"
export { default as Wformapplyfortender } from "./wformapplyfortender/index.vue";
export { default as Wformhrsclasschange } from "./wformhrsclasschange/index.vue";
export { default as Wformhrscurstate } from "./wformhrscurstate/index.vue";
export { default as Wformhrsmove } from "./wformhrsmove/index.vue";
export { default as Wformhrsposition } from "./wformhrsposition/index.vue";
export { default as Wformhrsquit } from "./wformhrsquit/index.vue";
export { default as Wformhrsrecruitment } from "./wformhrsrecruitment/index.vue";
export { default as Wformhrsrehiring } from "./wformhrsrehiring/index.vue";
export { default as Wformhrsrenewalcheck } from "./wformhrsrenewalcheck/index.vue";
export { default as Wformhrsrepost } from "./wformhrsrepost/index.vue";
export { default as Wformhrswagesvary } from "./wformhrswagesvary/index.vue";
export { default as Wformproinspection } from "./wformproinspection/index.vue";
```

然后希望在那些用到 `foo.js` 文件的组件直接 import 命名导入即可。

```html title="bar.vue"
<script setup>
  import * as FlowComponents from "@/components/foo";
</script>
```

但是这没有用，会编译失败找到不到对应的组件声明（也就是编译后不会生成这些组件的 JSON 文件）。个人猜测是因为普通 js 脚本不会视作为一个页面模块，所以也就不会将这个脚本内导入的组件编译声明。
