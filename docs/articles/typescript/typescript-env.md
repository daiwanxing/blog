# 搭建一个 Typescript 开发环境

如果要在项目中用到 typescript，那么搭建一个 typescript 的开发环境是必要的。

由于 typescript  代码无法直接在浏览器环境或者 Nodejs 中直接被执行，所以需要借助 tsc 编译器将其编译成 js 代码。

如果你的项目是基于 webpack 构建的，那么你需要下载两个 package

```shell
npm install typescript ts-loader --save-dev
```

`ts-loader` 就是负责如何在 webpack 中处理打包 ts 文件。而 `typescript` 本身就自带一个 tsc compiler，负责编译 ts 代码生成 js 代码。

如果你的项目是基于 Vite 构建，Vite 由于天然支持 TS（因为 Vite 内置了 `@rollup/plugin-typescript` 插件对 Typescript 代码自动进行编译处理）。 你仅需安装 `@rollup/plugin-typescript` 所依赖的 `typescript` 即可。

```shell
npm install typescript --save-dev
```

依赖安装完毕后，接下来需要新建一个 `tsconfig.json` 文件，该文件一般放置在项目的根目录。

这是一个配置文件，负责告诉 tsc 编译器，如何对项目中的 ts 文件做类型检查以及编译哪些文件。

::: warning 注意
**tsconfig.json** 文件是必须的，如果缺少该文件，那么 TypeScript 编译器将无法知道应该如何编译你的 TypeScript 代码。
:::

**tsconfig.json** 文件有很多配置字段，具体的配置教程可以点击[如何配置 tsconfig.json](/articles/typescript/tsconfig.html)这篇文章阅读。

最后，我们还需要对 ts 代码配置一些规则，让 lint 工具支持 lint ts 代码，为了团队开发过程中保持一致的开发体验，约束类型的定义规范。

我们需要安装两个 eslint 插件

```shell
npm install --save-dev @typescript-eslint/parser
npm install --save-dev @typescript-eslint/eslint-plugin
```

其中 `@typescript-eslint/eslint-plugin` 定义了一组 lint 规则 和 环境配置。`@typescript-eslint/parser` 则负责将 ts 代码转换成 AST 解析代码规则。

以上，就是一个 ts 项目开发的一些准备工作，Over Done!