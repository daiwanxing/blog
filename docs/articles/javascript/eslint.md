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

-  `off` 或者 `0`, 表示关闭规则
-  `warn` 或者 `1`， 表示开启规则，当代码未能通过该规则时，代码的下划线展示黄色的波浪线
-  `error` 或者 `2`，表示开启规则，当代码未能通过该规则时，代码的下划线部分展示红色的波浪线

```js
module.exports = {
   // ---------
   rules: {
      // 对于代码中出现的单引号的，展示错误提示
      quotes: "error",
   },
};
```

此外，部分规则还支持传入 `options`，此时, 规则属性的值应该为一个数组。

```js
module.exports = {
   rules: {
      "no-magic-numbers": ["error", { ignore: ["1n"], detectObjects: true }],
   },
};
```

需要注意的是，不同的规则，其 `options` 也是不同的。

## extends

`extends` 字段用来继承来自其他的规则、插件和语言选项的共享配置。例如 `eslint` 内置通用的核心规则插件 `eslint:recommended`，这样我们就不手动一个个去定义规则了。

`extends` 属性值可以是一个字符串，也可以是一个字符串数组。属性值一般要求以 `eslint-config-*` 开头，其中 `*` 表示 `module name`。

当然我们可以省略以 `eslint-config` 开头的前缀，直接书写成 `module name`

```js{2,6}
{
    "extends": "eslint-config-myconfig"
}

{
    "extends": "myconfig"
}
```

```js
module.exports = {
   extends: ["eslint:recommended"],
};
```

如果你在开发一个基于 Vuejs 的项目，你很可能还需要一个 Vue 官方推荐的 eslint 插件， `eslint-plugin-vue`，这个插件提供一些扩展的基于 Vue 文件的规则

```js
module.exports = {
   extends: ["eslint:recommended", "plugin:vue/vue3-strongly-recommended"],
   plugins: ["vue"],
};
```

## overides

`overides` 字段用于对目录下的某些特定的文件配置相关的 rule 或者 parser。

来看一个示例。

```js
module.exports = {
   rules: {
      quotes: ["error", "single"],
   },
   overides: [
    {
        files: "/src/**/*.ts",
        parserOptions: {
            parser: "@typescript-eslint/parser"
        }
    }
   ]
};
```

在上面的一段配置代码中，我们指定了 src 目录下的所有的 ts 文件，让 eslint 使用 **`@typescript-eslint/parser`** 作为 `parser` 来 lint 代码。

## plugin

所有的 eslint plugin 包名都必须以 `eslint-plugin` 开头，但是我们在使用这些 eslint 插件的时候，可以省略这个前缀。

例如使用 `eslint-plugin-vue` 时，下面的两种写法都是等效的。

```js{3,4}
{
    "plugins": [
        "vue",
        "eslint-plugin-vue"
    ]
}
```

一个 plugin 定义了一组规则、环境和配置。特别要注意的是，要使用插件内定义的规则时，需要以 `plugin/name` 这样的方式开启/关闭规则。

例如，对于 `eslint-plugin-vue` 定义的规则，我们使用该插件的规则时候，需要在规则名前面加上插件的名称。

```js{6-7}
{
    "plugins": [
        "vue"
    ],
    "rules": {
        "vue/no-arrow-functions-in-watch": "error",
        "vue/multi-word-component-names": "error",
    }
}
```

如果去掉规则名称前面的前缀和`/`，则 eslint 无法识别该规则。因为对于没有前缀的规则名称，eslint 会从自身定义的一套规则里去查有没有该规则。

不属于 eslint 官方预设的规则就无法被识别。

## parser

eslint 最核心的功能就是负责将文件内的 javascript 代码转换成 AST（抽象语法树）去解析代码的格式、代码语法等。

那么做这个功能的就是 eslint 提供的 parser 接口，eslint 内置的 parser 是 Espree。我们还可以使用其他的 parser，它只需要能够符合 eslint 的parser 接口。

像下面的 `vue-eslint-parser` 就是负责解析以 `.vue` 结尾的文件。 对于 vue  文件内的 `<script>` 我们而也可以通过设置 `parserOptions.parser` 来指定解析

```js
{
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: {
            // 解析 lang="ts" 的代码
            ts: "@typescript-eslint/parser"
        }
    }
}
```

## ignorePatterns 

对于项目中的某些文件，我们想跳过 eslint 对它们的检查，可以配置 `ignorePatterns` 字段。告诉 eslint 忽略某些文件。

`ignorePatterns` 可以是一个 glob 模式的数组，该字段遵循与 `.eslintignore` 相同的规则。

需要注意的是, glob 模式是相对于当前的 `.eslintrc` 配置文件所在的路径。

在 `overrides` 字段下使用该配置项无效。

`.eslintignore` 文件的配置规则优先级要高于此字段。

```js
{
    ignorePatterns: [
        "src/schema/*.js"
    ]
}
```

## 总结

这篇文章，是我对 eslint 目前所掌握的一个总结，一个多人开发的项目必定离不开 eslint 对代码的约束以及代码风险的规避。

eslint 配置起来并不难，关键是理解每个配置项的作用，多看看官方文档，多练习下相信很快就能学会掌握，让自己的团队开发更加舒服。

如果你不确定自己的配置文件是否编写有误，最好的办法是 `ctrl + j` 打开 vscode 的 terminal，点击 `OUTPUT` 在右侧的下拉框找到 `Eslint` 可以看到具体的输出信息。

![eslint-code](/eslint-03.png)