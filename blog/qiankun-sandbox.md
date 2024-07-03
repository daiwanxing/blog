---
slug: qiankun-on-vite
title: 为什么 qiankun 无法直接在 Vite 运行
authors: klein
---

<!-- truncate -->

qiankun 是一个比较优秀的开源的微前端解决方案（虽然目前 v3 已经鸽了 3 年多了还没发布正式版）。

但是 qiankun 的官方文档一直推荐都是用 webpack 构建微前端项目。目前 Vite 的市占份额已经恐怖如斯，我相信很多 qiankun 的用户都希望官方能支持用 Vite 构建。

好消息是 v3 版本已经确定支持 Vite 了

[![pkgdUv8.md.jpg](https://s21.ax1x.com/2024/07/02/pkgdUv8.md.jpg)](https://imgse.com/i/pkgdUv8)

坏消息是 v3 不确定何时会发布（_大厂 KPI 项目的下场就是这样_）

言归正传，那么为什么 qiankun v2 不支持 Vite？

如果你在互联网搜索可能得到的回答是 vite 由于天然的 es module 特性在开发环境下无法被编译 umd 模块，又或者 Vite 不支持 runtime-path。

答案听起来是太过抽象了，以至于听起来给人一种云里雾里感觉。

在 qiankun 的文档内，我们留意到，qiankun 要求在子应用 webpack 配置如下代码：

```js
const packageName = require("./package.json").name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
  },
};
```

这里的配置会让每个子应用打包后的模块格式为 `UMD` 模块。

为什么是 UMD 模块而不是 ES Module？

_因为这样做的目的是为了能用 `eval` 方法执行 `UMD` 模块内的代码，以及能对子应用的 window 对象做代理。_

ES Module 最大的特点就是每个模块的作用域都是顶级的，开发者是无法代理模块内访问的全局 `window`

但是 UMD 模块这很容易做到:

```js
(function(root, factory) {
    const window = {}:
    factory(root, window);
})(this, function(root, window) {
    window.document; // undefined
});
```

上面这段 UMD 代码，模块内访问的 `window` 早已不是全局的 `window` 对象了，而是被劫持的一个用户构造的 window 对象。

无法直接在 Vite 的构建下运行还有一个原因是因为 `eval` 函数无法导入 `es module`。

qiankun 的实现主要依赖了两个包，分别是 [single-spa](https://single-spa.js.org/) 和 [import-html-entry](https://github.com/kuitos/import-html-entry)。

其中 [import-html-entry](https://github.com/kuitos/import-html-entry) 负责 fetch 子应用的 index.html 作为入口文件，对 index.html 的 `script`、`style` 进行加载嵌入到 HTML 内。

js 脚本的加载部分主要是靠 `execScripts` 函数。

```js title="import-html-entry/src/index.js"
export function execScripts(entry, scripts, proxy = window, opts = {}) {
  const {
    fetch = defaultFetch,
    strictGlobal = false,
    success,
    error = () => {},
    beforeExec = () => {},
    afterExec = () => {},
    scopedGlobalVariables = [],
  } = opts;

  return getExternalScripts(scripts, fetch, entry)
    .then((scriptsText) => {
      const geval = (scriptSrc, inlineScript) => {
        const rawCode = beforeExec(inlineScript, scriptSrc) || inlineScript;
        const code = getExecutableScript(scriptSrc, rawCode, {
          proxy,
          strictGlobal,
          scopedGlobalVariables,
        });

        evalCode(scriptSrc, code);

        afterExec(inlineScript, scriptSrc);
      };

      function exec(scriptSrc, inlineScript, resolve) {
        const markName = `Evaluating script ${scriptSrc}`;
        const measureName = `Evaluating Time Consuming: ${scriptSrc}`;

        if (process.env.NODE_ENV === "development" && supportsUserTiming) {
          performance.mark(markName);
        }

        if (scriptSrc === entry) {
          noteGlobalProps(strictGlobal ? proxy : window);

          try {
            geval(scriptSrc, inlineScript);
            const exports =
              proxy[getGlobalProp(strictGlobal ? proxy : window)] || {};
            resolve(exports);
          } catch (e) {
            // entry error must be thrown to make the promise settled
            console.error(
              `[import-html-entry]: error occurs while executing entry script ${scriptSrc}`
            );
            throw e;
          }
        } else {
          if (typeof inlineScript === "string") {
            try {
              if (scriptSrc?.src) {
                geval(scriptSrc.src, inlineScript);
              } else {
                geval(scriptSrc, inlineScript);
              }
            } catch (e) {
              // consistent with browser behavior, any independent script evaluation error should not block the others
              throwNonBlockingError(
                e,
                `[import-html-entry]: error occurs while executing normal script ${scriptSrc}`
              );
            }
          } else {
            // external script marked with async
            inlineScript.async &&
              inlineScript?.content
                .then((downloadedScriptText) =>
                  geval(inlineScript.src, downloadedScriptText)
                )
                .catch((e) => {
                  throwNonBlockingError(
                    e,
                    `[import-html-entry]: error occurs while executing async script ${inlineScript.src}`
                  );
                });
          }
        }

        if (process.env.NODE_ENV === "development" && supportsUserTiming) {
          performance.measure(measureName, markName);
          performance.clearMarks(markName);
          performance.clearMeasures(measureName);
        }
      }

      // ....
      return new Promise((resolve) => schedule(0, success || resolve));
    })
    .catch((e) => {
      error();
      throw e;
    });
}
```

这里只需要看 `evalCode` 函数的实现，该函数负责加载模块脚本。

```js {5}
export function evalCode(scriptSrc, code) {
  const key = scriptSrc;
  if (!evalCache[key]) {
    const functionWrappedCode = `(function(){${code}})`;
    evalCache[key] = (0, eval)(functionWrappedCode);
  }
  const evalFunc = evalCache[key];
  evalFunc.call(window);
}
```

这里有个和文章无关的知识点, 知道这行代码的意思吗？

`(0, eval)(functionWrappedCode);`

如果 `eval` 函数在函数作用域内执行的话，那么这些代码字符串声明的变量的提升也只能到 `evalCode` 的函数作用域。

例如：

```js
function foo() {
  eval('var myname = "foo"');
  console.log(myname); // output: foo
}

foo();
console.log(myname); // ReferenceError: myname is not defined
```

但是作者巧妙地使用了逗号运算符将返回的 `eval` 间接调用，这个间接调用使得 `eval` 函数的执行实际上实在全局作用域下执行的。
这样就能在全局作用于下访问 `eval` 函数内的字符串代码了。

`eval` 函数最大的问题就是无法加载 ES Module, 例如 `eval("import foo from 'http://localhost:9099/node_modules/.vite/deps/chunk-BGQR2HAS.js?v=e881222e'");`

此时浏览器会抛出 `SyntaxError: Cannot use import statement outside a module`。

所以这也是无法在开发环境下使用 Vite 的 devServer 运行子应用。

那有没有办法能在 Vite 使用 qiankun？

答案是，有。社区有人写了一个 [vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun)。我在上家公司就是用的这个插件实现了将 qiankun 接入到 Vite 构建。

这个插件已经不维护了，好在没什么 Bug 出现，而且源码也不难读懂。
