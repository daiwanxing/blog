# js 中的模块系统

## 为什么 javascript 需要模块系统

在 es6 之前，并没有原生的模块系统，有的只是各路门派发明出来的 non-standard 的 module-system, 例如 node 中的`Commonjs`，Broswer 中的`AMD`、`UMD`等。

那么模块系统为什么会被创造出来呢？

先忘记模块系统，咱们穿越到那个刀耕火种的 es5、es3 时代，如果用 js 开发一个 web 项目，不可能将所有的 js 代码全部写在一个`<script>`标签中，因为随着项目的迭代，功能代码会不断地增加。那样会导致非常的难以维护，难以阅读。想一想在`<script>`中包含了上万行代码，简直是一坨 shit。

那么还有一种办法，就是将不同的业务功能写在不同的`<script>`中

```html
<script src="foo.js"></script>
<script src="bar.js"></script>
<script src="baz.js"></script>
```

例如上面的代码,你可以将`foo`,`bar`和`baz`视作为各自的功能模块。比起将所有的功能写在一个`<script>`中, 这样的方式使得各个 script 的职责清晰了很多，业务功能划分到不同的 script 更容易阅读代码。

**but** 假如`foo.js`和`bar.js`以及`baz.js`都需要用到一个相同的业务函数，不可能在每个 script 中 copy 一份这样的函数。 我们必须得将这个函数拎出来放到一个单独的`<script>`，还需要确保这个 script 必须最先被 loaded。

```html
<script src="common.js"></script>
<script src="foo.js"></script>
<script src="bar.js"></script>
<script src="baz.js"></script>
```

这样虽然解决了代码无法复用的问题，但是可读性也变差了，因为你无法知道某个业务脚本中用到的函数是在哪个脚本中声明的。

更加致命的问题是，对于一些公共方法和公共变量，需要对变量命名约束要求极为严格，否则很容易被其他来自业务脚本中声明的变量所覆盖。

虽然所有的 script 脚本中声明的全局变量都处于同一个全局作用域下造成作用域污染，可以通过 IIFE 对代码进行包裹避免此种情况。但这种方法并不完美。

缺陷如下：

-  每一个 IIFE 中返回对象的命名必须保证唯一，才能在其他模块正确的被访问；
-  代码写起来混乱不堪，`<script>`中的代码都需要包裹在一个匿名函数中来编写；

这就是为什么 ES6 的 Module 姗姗来迟之前，民间发明出各种模块化规范的原因。

这一节不介绍`AMD`和`UMD`的规范，它们的历史使命在 E6 出来的那一刻就已经结束了。除非你想编写一个库需要兼容低版本的浏览器。

重点说说 CommonJS 和 ESM。 CommonJS 模块化从 Node.js 诞生之初就有了，在 node runTime 中。我们可以通过使用`require()`导入一个 js 文件。通过`module.expors`导出 js 文件中的变量，这很容易上手。

在 node14+正式实现了 ES Module，现在我们可以在 node 中同时使用 commonjs 和 esm 两种模块。如果的确想在 node 环境中使用 ES Module， 需要将你的 `*.js` 文件名变为 `*.mjs`，node 会将 `*.mjs` 文件遵循 es module 规范执行，而普通的 `*.js` 或者 `*.cjs` 仍遵循 commonjs 规范执行。

如果这样嫌麻烦的话，我们也可以在 `package.json` 设置 `type: "module"`, 这样会将项目内的所有 js 文件 treat as es module.

ES-Module 是 ECMA-262 官方定义的一个 JS 模块化规范。

ES-Module 定义了通过 `import` 导入一个 js 模块的功能，通过 `export` 导出一个 js 模块内的功能。

ES-Module 将所有导入的 js 文件视作为一个 module，多次重复导入一个 module, 则该 module 只会加载一次。（这一点和 Commonjs 的模块加载相同）

### 模块导入

```js
import defaultFetch from "./foo"; // import default export

import { fetch } from "./foo"; // import features named fetch

import defaultFetch, { fetch } from "./foo"; // import named features and default features at the same time

import * as allFetch from "./foo"; // import all features and named allNamedFetch to access
```

需要注意的是最后一种导入方式应该不能被 tree-shaking 所支持。

### 模块导出

```js
export default const foo = 1; // export default features

export const bar = 2; // export named features as bar

export { fetchBar } from "./bar"; // import fetchBar features from bar and export it as named export.

export { default } from "./bar"; // import default features from bar and as current module default features export.

export { default as moduleA } from "./bar"; // import default features from bar as current module named features and export it.

export { sayHi as Default } from "./bar"; // import named features from bar and as current module default features.

export * from "./bar"; // import all named features from bar and export it.
```

:::warning 注意
`export * from "./bar"` 与 `import * as allFetch from "./foo"` 不同。 前者只会导入 bar 模块中所有的**命名功能**并导出。而后者会将 foo 模块中**所有的导出**并赋值给变量来访问。
:::

## 模块相互依赖

在 commonjs 与 Es Module 中，模块与模块之前相互引用对方所带来的一系列变化是不同的。

什么是模块与模块相互引用？

```js
// bar.js
import foo from "./foo.js";

// foo.js
import bar from "./bar.js";
```

可以从上面两段代码看出，执行脚本 bar.js 第一行代码时, 找到 foo.js 并执行，执行 foo.js，开始导入 bar.js 并执行。由此可看到两个脚本相互构成了一个模块依赖关系。

回顾之前学过的知识，在 ES Module 中同一个脚本一旦被 import 就会被 cache，之后不管 import N 次都只会取出之前缓存的脚本. 所以在上面这个例子中，并不会构成一个 import 死循环的关系。

当执行 bar.js 时，es module 静态加载解析特性，将所有可提升的变量提升到模块最顶层作用域。接着加载 foo.js 导入 bar.js 中的 api，如果该 api 已经被初始化则可立即被执行。接着执行 foo.js 剩余可执行的所有代码后回到 bar.js 执行剩余的代码。

一句话总结：一旦某个模块被循环加载，只会输出已经执行了部分，没有执行的不输出。

在 CommonJS 中循环依赖也是类似的策略，唯一不同的是 commonjs 脚本是动态加载的，导出的 api 不具有变量提升特性。

## ES Module 和 CommonJS 模块化的区别

ES Module 是静态导入的，在预解析时就能分析代码，必须写在模块的最顶层，ES Module 导出的是一个只读的副本，如果导出的是一个基本类型的值的变量，那么我们无法对变量的值进行更改，如果导出的是一个对象，那么不能更改对象的引用。而 Common JS 则相反，在运行时加载文件，而且 Common JS 允许在各种判断语句中动态 require 相关模块，ES Module 则无法完成。Common JS 的 this 指向的是当前模块的最顶层，ES Module 的 this 是 undefined（ES Module 自动开启严格模式，common js 不会）。

此外，commonjs 中输出的是一个值的拷贝，一旦模块内部的改变了这个值，则不影响外部的变化。

## 在 node 中使用 es module

在 node 版本>= 14，支持使用 es module, 需要将文件名命名成`.mjs`表示是一个 es module 的文件，或者可以直接在项目的根目录下的 package.json 文件中，设置`type = "module"` 表示所有的 js 文件都是基于 es module 规范。此外如果想单独在某个文件使用 commonjs，可以将该文件命名成`.cjs`表示一个 commonjs module。

:::tip
因为 es module 允许顶级 await 的特性（ES Modoule 的脚本支持异步加载，而 cjs 加载的脚本必须同步加载），所以不能在 cjs 文件里直接导入 mjs 的文件，但是可以在 mjs 文件里导入 cjs 的默认导出，不能导出其命名导出。这是因为 CJS 脚本和 ES Module 内部执行逻辑不同，CJS 脚本只有在执行时才计算它们的命名导出，而 ES Module 要求在解析脚本时就确定命名的导出。
:::

## ES Module

import.meta 对象包含了当前模块的信息，在内嵌脚本中，import.meta.url 是文档的链接, 而对于外部脚本，import.meta.url 的值则是脚本的链接

每一个 module 都有一个顶级作用域、每个模块的 this 都是 undefined, module 会自动开启严格模式。

```js
// commonjs 模块导出语法
exports = {};

export.a = 132;
```

现在 node.js 中也能使用 es module，需要后缀名为`.mjs`的脚本或者在 package.json 中指定 type 为 module

## dynamic import 动态导入

`import()`表达式加载模块并返回一个 promise, 用于实现动态导入

`尽管import()看起来像一个函数调用，但它只是一种特殊语法，只是恰好使用了括号（类似于 super()）。因此，我们不能将 import 复制到一个变量中，或者对其使用 call/apply。因为它不是一个函数。`
