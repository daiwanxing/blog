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
    }
}
```

:::info
对于旧版本的 eslint, global 字段的属性值可能是 `true` 或者 `false`。其中 `true` 等同于 `writable`, `false` 等同于 `readonly`。
我们应该摒弃这种旧的写法。
:::

## parserOptions

