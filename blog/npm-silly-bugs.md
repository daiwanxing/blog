---
slug: npm-silly-bugs
title: 使用 pnpm 有助于避免犯下愚蠢的错误
authors: klein
---

<!-- truncate -->

这篇文章的标题是我引用了 pnpm 作者 [Zoltan Kochan](https://www.kochan.io/) 早期写的一篇关于 npm 古早版本的愚蠢 bug 分析。

下面是原文的链接，感兴趣的朋友可以阅读一下：

> https://www.kochan.io/nodejs/pnpms-strictness-helps-to-avoid-silly-bugs.html

我觉得这老哥写的挺有意思的，阅读后也让我加深了对 pnpm 性能独特之处的印象。

所以下面是我阅读这篇文章后的一些输出。

好了，开始正文。

原文作者所提到的 _silly bugs_ 具体指的什么呢？

首先 [Zoltan Kochan](https://www.kochan.io/) 用一个示例进行阐述。

假如你需要使用 _express_ 搭建一个服务端项目，你肯定首先想到的是 `npm install express --save`，安装完毕后，一切很完美。

但是当你展开 _node_modules_ 目录时，你会发现里面塞满了一连串的依赖。 wtf ? 如果你是一个 noob 你肯定会疑惑为什么我的 _node_modules_ 目录出现了这么多我没手动安装过的依赖。

```
accepts
array-flatten
content-disposition
content-type
cookie
cookie-signature
debug
depd
...
```

上面说的这个不算 bug，正常来讲是的确预期效果，但是用户体验大打折扣。如果用户希望从 _node_modules_ 找到自己安装的那个 package 查看源码的话，那么鼠标滚轮都不知道要滚动多长距离。

真正的 bug 在于**幽灵依赖**。

想象一下，你为一个新项目安装了一个 _express_ 依赖，_express_ 依赖了其中的一个 _debug_ 库。

而你的项目里恰好也需要用到这个 _debug_，虽然你没有使用 `npm install debug -D` 手动安装，但这也不妨碍你直接在项目内直接 `require`。因为 _express_ 依赖的 _debug_ 已经被安装到了项目的 `node_modules` 目录。

这样似乎很 nice 是吧，不需要用户多敲下几个字符就能直接导入。

于是你直接在项目编写了类似的业务代码：

```js title="src/index.js"
const debug = require("debug")("myModule");

debug("This is a debug message");
```

然后提交代码并发布到线上，你端着 ☕，吹着热气，望着系统日志，没有任何尖刺，系统运转得如呼吸般自然。

过了没多久，_express_ 发布了一个 _minior patch_，这个 _minor-patch_ 的主要变动就是移除了 _debug_ 这个 package 。

:::caution
不要怀疑这种变动为什么不会放在下一个 major 版本，因为这是库内部的依赖，不会影响到用户使用。
:::

而你并没有注意查看这个补丁的 CHANGELOG。于是在 express 发布的 minor-patch 没多久后，你又提交了一次业务代码到仓库，并接着自动执行了 CI/CD。

**然而** 这次自动构建执行的 `npm install` 会下载最新的 express 次版本号。（除非你的 package.json 内设置了 express 的固定版本，默认情况下为最新的次版本），于是项目上线发布后直接 Crush 了.

你内心想着这个月的绩效是不是要无了，于是你赶紧回退版本，好好研究一番再发布上线。

:::info
正常情况来讲，因为找不到 debug 这个 package，所以在 build 的过程就不会成功。这里只是假设性举个例子。
:::

没多久你就发现了原来是 express 移除了 `debug` 这个 package，_damn it!_

为了汲取教训，你记住了下次一定要手动安装依赖，这个小故事就到这结束了。

造成这起事故的核心原因就是**幽灵依赖**造成的，你引用了一个包的依赖，这个依赖并非你手动声明安装的。

如果你觉得我这种大白话听起来似懂非懂，那么我贴一段官方解释好了：

> 幽灵依赖（Phantom Dependency）是指在软件开发中，某个模块或包间接依赖于另一个未显式声明的模块或包。这种依赖关系通常是通过其他依赖项的依赖引入的，而不是直接在项目的依赖声明中显式指定的。这种情况会导致潜在的维护和升级问题，因为间接依赖关系可能在没有预警的情况下发生变化。

那 pnpm 作者是怎么解决幽灵依赖的？

首先使用 pnpm 安装的直接依赖会添加到 node_modules 的根目录，而依赖的依赖会放到 `node_modules/.pnpm/xxx` 目录中，从目录结构直观感受要更加简洁。

```
- node_modules
    - .pnpm
        - debug
        - body-parser
    - .bin
    - express
```

另外这样的好处就是如果这种情况下，尝试在项目内使用依赖的依赖会直接报错找不到模块。

```js
const debug = require("debug"); // error
```

上面这段代码的 `debug` 模块已经被放到 `.pnpm` 文件夹内了。这种裸导入的模块只会从 node_modules 的一级目录下去查找，如果找不到就会报错。

我不会信口开河，这是 `commonjs` 导入第三方模块的流程：

> If the module identifier passed to `require()` is not a [built-in](https://nodejs.org/api/modules.html#built-in-modules) module, and does not begin with `'/'`, `'../'`, or `'./'`, then Node.js starts at the directory of the current module, and adds `/node_modules`, and attempts to load the module from that location. Node.js will not append `node_modules` to a path already ending in `node_modules`.

这样就能避免遇到幽灵导入这种愚蠢的错误了。

当然 pnpm 的特性绝不止这一个，还有其他例如 _离线缓存_，_硬链接/符号链接 npm package_ 等等后续有时间会补上。
