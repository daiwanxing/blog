# GSAP 是一个高性能的Javascript动画库，通过使用gsap可以实现许多精美的交互效果

<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/logo-man.svg" />

## 使用GSAP

通过cdn 或者 `npm i gsap` 安装gsap

```ts
// gsap.ts

import { gsap } from "gsap";
// gsap除了核心模块，还有其他的插件，可以通过resigerPlugin方法注册插件
import { PixiPlugin } from "gsap/PixiPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
```

## 使用gsap给DOM元素设置animate

通过`gsap.to`代表设置一个元素`要完成`的动画状态，以及`gsap.from`设置元素最开始的入场动画状态。

## gsap 定义了一些特殊的属性

1. delay， 定义了动画延迟多久开始执行
2. onComplete 当动画结束后，回调函数会被触发
3. onUpdate 每次动画更新（绘制新的一帧）/渲染时都将会被执行，（UI线程每隔16.6ms绘制一次UI，应该是每16.6ms执行一次回调，当然并不能保证每次都是16.6ms绘制一次UI）
4. ease  设置缓动函数
5. stagger 交错可以为一组对象设置动画的延时时间
6. onStart 当动画开始的时候被触发
7. onRepeat 当动画每次被重复执行时执行回调
7. onReverseComplete 当动画反转时再次到达开头时触发

// 可以自己指定回调的参数, 必须是一个数组将参数包裹

stagger的值是一个number，例如: `stagger: .2`； 那么gsap访问到的每个元素的delay都会依次以0.2的公差递增delay。

使用`gsap.timeline`可以编排时间线动画