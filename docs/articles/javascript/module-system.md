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

## 模块循环依赖

在 commonJS 与 ES Module 中，模块与模块之前相互引用对方所带来的一系列副作用是不同的。

什么是模块与模块相互引用？

```js
// bar.js
import foo from "./foo.js";

// foo.js
import bar from "./bar.js";
```

可以从上面两段代码看出，执行脚本 bar.js 第一行代码时, 找到 foo.js 并执行，执行 foo.js，开始导入 bar.js 并执行。由此可看到两个脚本相互构成了一个模块依赖关系。

之前提高过，多次重复导入一个 module, 则该 module 只会执行一次，并且任何后续的导入将只会创建对相同导出的引用。

当执行 bar.js 时，es module 静态加载解析特性，将所有可提升的变量提升到模块最顶层作用域。接着加载 foo.js 导入 bar.js 中的 api，如果该 api 已经被初始化则可立即被执行。接着执行 foo.js 剩余可执行的所有代码后回到 bar.js 执行剩余的代码。

**需要记住的是，一旦某个模块被循环加载，只会输出已经执行了部分，没有执行的不输出。**

在 CommonJS 中循环依赖也是类似的策略，唯一不同的是 commonjs 脚本是动态加载的，导出的 api 不具有变量提升特性。

## ES Module 和 CommonJS 的区别

- esm 只支持静态导入，必须将导入的模块声明在最顶部。cjs支持在模块内的任何作用域中动态加载其他模块，在加载模块时才进行导入分析。
- cjs 的 this 是 `module.exports`，而 esm 中的 this 是 undefined。（node 中的 global 对象等同于浏览器环境中的 window）。
- esm 中的导出的是一个只读的值的引用（如果值是对象类型），而在 cjs 中导出的是一个值的浅拷贝，可以直接对浅拷贝的对象进行操作。
- 如果导出是一个基本类型的值，则在 esm 中该值是一个只读的副本。
- esm 支持 top level await, 这点在 cjs 中不被支持。

## import.meta

import.meta 对象包含了当前模块的信息，在内嵌脚本中，import.meta.url 是文档的链接, 而对于外部脚本，import.meta.url 的值则是脚本的链接

每一个 module 都有一个顶级作用域、每个模块的 this 都是 undefined。


## dynamic import 动态导入

从 chrome63+ 开始，esm 也支持异步加载模块，可以通过 `import(assignExpression)` 动态加载一个模块并返回一个 pending 的 promise 对象，当模块被解析且加载完毕时，该 promise 的 state会被已实现（fulfilled），否则会被已拒绝（rejected）。需要注意的是这是一种特殊的语法，并不是一个函数,而是一个类函数表达式。应该是类似于 `await` 通过语法制导并进行一系列操作。
