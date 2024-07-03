---
slug: event-loop
title: 不同运行环境下的事件循环机制
authors: klein
---

<!-- truncate -->

事件循环是一个 JavaScript 处理异步任务的模型，这个基本在面试中都会经常问道，但我估计大部分人是背的滚瓜烂熟，并不是很理解。

其实理解了对写业务代码或多或少还是会有帮助。

事件循环在 Nodejs-runtime 和浏览器的实现不一样， Nodejs 事件循环拆分了 6 个 stage。浏览器环境就没这么多弯弯绕绕的。

由于我大部分时间编写的 JS 代码都是运行在浏览器的，所以先说说浏览器环境下的事件循环机制。

## 浏览器运行环境的 Event-loop

## Nodejs 的 Event-loop
