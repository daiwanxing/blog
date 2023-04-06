# eslint 配置指南

eslint 在前端工程化方面，有很大的作用，负责保证项目产出的高质量代码，根据 `rule`，`plugin`， 分析代码的潜在风险并提示开发者纠正编码方式，让代码更健壮。

要想系统性的学习 **eslint** 的配置方式，可以访问 [https://eslint.org/](https://eslint.org/) 中的文档一步步学习。

`eslint` 的配置文件一般需要放置在你项目的根目录，文件名可以是 `.eslintrc.js` 或者 `eslint.config.c?js`。当然，有效的 eslint 文件名可不止这些。

以下是所有的合法的 eslint 配置文件。

-  `.eslintrc.cjs`
-  `.eslintrc.js`
-  `.eslintrc.yaml`
-  `.eslintrc.json `
-  `.eslintrc.yml`

同时，我们还需要在 vscode 中的扩展市场搜索并安装 eslint 插件，这个插件的作用是为了识别项目中的 eslint 配置文件，根据配置文件内的参数，识别编辑 1 机器中具有潜在错误风险的代码，对代码进行高亮标注，并支持鼠标移到具有问题的代码上，显示具体的错误的原因。

## 配置 eslint

`.eslintrc.js`

:::info
目前 eslint 还不支持 esm，所以无法使用 `export default`

> Note that ESLint does not support ESM configuration at this time.

:::

## env

env 字段用于配置项目的工作环境可用的全局 API，例如，某个项目是基于 Nodejs 开发的，那自然没有 BOM 和 DOM 两个对象的全局 API。

为了防止其他开发人员在项目中用到这两个对象的 API，可以将 `browser` 设置为 `false`。

```js
module.exports = {
   env: {
      node: true,
      browser: false,
   },
};
```

这样，如果有人使用了 `window` 或者 `document` 对象。eslint 就会在编辑器中提示并高亮相关的错误代码。

![eslint-code](/eslint-01.png)

env 中所有合法的属性值，可以点击 [language-options](https://eslint.org/docs/latest/use/configure/language-options#specifying-environments) 查看。

## global

在项目中，我们可能用到第三方脚本注入的全局变量，但是由于 eslint 无法识别该全局变量导致会提示 `no-undef`

例如，安装百度地图 javascript sdk 的时候，我们需要全局访问 `BMap` 对象。

![eslint-code](/eslint-02.png)

但是 eslint 发现这是一个未定义的变量，合乎预期的高亮该错误代码。

但是这个 BMap 对象的确是可以被访问的。有没有办法能让 eslint 识别到这个全局变量呢。

答案是，YES。 我们可以在 `global` 字段中配置要使用到的全局变量。配置完成后， eslint 就能识别到 `BMap` 是一个全局的变量了。

```js
module.exports = {
   global: {
      // global 的属性值可以是 `readonly` 或 `writable`
      BMap: "readonly",
   },
};
```

:::info
对于旧版本的 eslint, global 字段的属性值可能是 `true` 或者 `false`。其中 `true` 等同于 `writable`, `false` 等同于 `readonly`。
我们应该摒弃这种旧的写法。
:::

## parserOptions

ESLint 的底层实现涉及将 JavaScript 代码解析为抽象语法树（AST），然后在 AST 中进行分析和检查以查找可能的问题和错误。具体来说，ESLint 会使用一个名为 Esprima 的默认解析器来解析代码，将其转换为 AST，然后将 AST 提供给规则来进行检查。

我们可以给解析器传入一些配置项。例如 eslint 默认解析 es5 的语法代码，如果尝试使用 es6+ 的代码，则会解析失败。

我们可以为 `parserOptions` 传入 `ecmaVersion` 指定 eslint 支持解析的 js 语法代码版本。

```js
module.exports = {
   // ---------
   parserOptions: {
      ecmaVersion: "2015",
   },
};
```

此外，如果要让 eslint 识别解析 jsx 的语法格式，我们还需要设置 `ecmaFeatures: { jsx: true }` 以开启 jsx 语法。

```js
module.exports = {
   // ---------
   parserOptions: {
      ecmaVersion: "2015",
      ecmaFeatures: {
         jsx: true,
      },
   },
};
```

`ecmaFeatures` 除了可以开启 `jsx` 让 eslint 识别 jsx 语法外，还可以设置 `impliedStrict`、`globalReturn` 等。

具体的属性含义本文不会细说，可以查看官网文档有详细说明。

## rules

eslint 的配置核心是规则，eslint 预设了很多的规则来保证代码的可靠性。

规则的值可以是

-  off（0） 关闭规则
-  warn（1）开启规则，当代码未能通过该规则时，代码的下划线展示黄色的波浪线
-  error（2）开启规则，当代码未能通过该规则时，代码的下划线部分展示红色的波浪线

```js
module.exports = {
   // ---------
   rules: {
      // 对于代码中出现的单引号的，展示错误提示
      quotes: "error",
   },
};
```

此外，部分规则还接收参数传递，例如