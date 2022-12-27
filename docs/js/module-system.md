# ES-Module Vs CommonJS

ES6 带来了ES Module的特性，模块的功能可以让我们更好的解耦代码功能逻辑，共用且不会与其他模块变量命名冲突, 浏览器的模块加载不同于node中的模块加载，浏览器是异步加载各个ESM。


1. 导入的几种方式

```js
    // 导入的是module的默认导出
    import moduleList from "./module.js";

    // 导入的是module脚本中的命名变量：moduleA
    import { moduleA } from "./module.js"; 

     // 导入的是module的默认导出与命名导出moduleA
    import moduleList, { moduleA } from "./module.js";

    // 导入的module脚本所有导出（包括默认导出）到 allModule变量中
    import * as allModule from "./module.js"; 
```

2. 导出的几种方式

```js
    // 导出的是一个默认导出foo变量 
    export default const foo = 1; 

    // 导出的是一个命名导出bar变量
    export const bar = 2;

    // 重新导出命名导出，从module脚本文件导出moduleA再导出给其他模块
    export { moduleA } from "./module.js";

    // 重新导出默认的导出,
    export { default } from "./module.js";

    // 重新将默认导出命名为命名导出
    export { default as moduleA } from "./module.js";

    // 将命名导出改为默认导出
    export { sayHi as Default }

    // 重新导出所有的命名导出
    export * from "./module.js";
```

3. 模块相互依赖

在commonjs与Es Module中，模块与模块之前相互引用对方所带来的一系列变化是不同的。

什么是模块与模块相互引用？

```js
// bar.js
import foo from "./foo.js"

// foo.js
import bar from "./bar.js"
```

可以从上面两段代码看出，执行脚本bar.js第一行代码时, 找到foo.js并执行，执行foo.js，开始导入bar.js并执行。由此可看到两个脚本相互构成了一个模块依赖关系。

回顾之前学过的知识，在ES Module中同一个脚本一旦被import就会被cache，之后不管import N次都只会取出之前缓存的脚本. 所以在上面这个例子中，并不会构成一个import死循环的关系。

当执行bar.js时，es module静态加载解析特性，将所有可提升的变量提升到模块最顶层作用域。接着加载foo.js导入bar.js中的api，如果该api已经被初始化则可立即被执行。接着执行foo.js剩余可执行的所有代码后回到bar.js执行剩余的代码。

一句话总结：一旦某个模块被循环加载，只会输出已经执行了部分，没有执行的不输出。

在CommonJS中循环依赖也是类似的策略，唯一不同的是commonjs脚本是动态加载的，导出的api不具有变量提升特性。

## ES Module 和 CommonJS模块化的区别

ES Module是静态导入的，在预解析时就能分析代码，必须写在模块的最顶层，ES Module 导出的是一个只读的副本，如果导出的是一个基本类型的值的变量，那么我们无法对变量的值进行更改，如果导出的是一个对象，那么不能更改对象的引用。而Common JS则相反，在运行时加载文件，而且Common JS允许在各种判断语句中动态require相关模块，ES Module则无法完成。Common JS 的this指向的是当前模块的最顶层，ES Module的this是undefined（ES Module自动开启严格模式，common js不会）。

此外，commonjs中输出的是一个值的拷贝，一旦模块内部的改变了这个值，则不影响外部的变化。

## 在node中使用es module

在node版本>= 14，支持使用es module, 需要将文件名命名成`.mjs`表示是一个es module的文件，或者可以直接在项目的根目录下的package.json文件中，设置`type = "module"` 表示所有的js文件都是基于es module规范。此外如果想单独在某个文件使用commonjs，可以将该文件命名成`.cjs`表示一个commonjs module。

:::tip
因为es module允许顶级await的特性（ES Modoule的脚本支持异步加载，而cjs加载的脚本必须同步加载），所以不能在cjs文件里直接导入mjs的文件，但是可以在mjs文件里导入cjs的默认导出，不能导出其命名导出。这是因为CJS脚本和ES Module内部执行逻辑不同，CJS脚本只有在执行时才计算它们的命名导出，而ES Module要求在解析脚本时就确定命名的导出。
:::

## ES Module
import.meta 对象包含了当前模块的信息，在内嵌脚本中，import.meta.url是文档的链接, 而对于外部脚本，import.meta.url的值则是脚本的链接

每一个module都有一个顶级作用域、每个模块的this都是undefined, module会自动开启严格模式。

```js
// commonjs 模块导出语法
exports = {};

export.a = 132;
```
现在node.js中也能使用es module，需要后缀名为`.mjs`的脚本或者在package.json中指定type为module

## dynamic import 动态导入

`import()`表达式加载模块并返回一个promise, 用于实现动态导入

`尽管import()看起来像一个函数调用，但它只是一种特殊语法，只是恰好使用了括号（类似于 super()）。因此，我们不能将 import 复制到一个变量中，或者对其使用 call/apply。因为它不是一个函数。`