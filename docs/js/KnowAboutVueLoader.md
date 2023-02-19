# 揭开 Vue-loader 的面纱

Vue-loader 是一个负责处理如何对 **Vue SFC** 进行打包处理的 webpack loader。我们都知道 webpack 默认只能对 js 和 json 文件进行打包处理。

> webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。

Vue 发明了 **SFC** 这种写法，允许开发者在一个文件内同时编写 template、css 以及 js。为了能让 webpack 正确处理 SFC，Vue-loader 就此应运而生。

本篇文章对 Vue-loader 内部的工作原理做一个简单的了解，如果你也好奇它是如何工作的，那这篇文章说不定也会让你有所收获。

## 进入正题

一个 SFC 组件由 template 、script 和 style 三个部分组成：

```vue
<template></template>

<script></script>

<style></style>
```

Vue-loader 内部会对每个语言块调用内部的 loader 链分别进行处理。

那么具体是如何处理的呢？

我们打开 Vue-loader 的源码，找到 `/src/index.ts` 这个文件，这是 Vue-loader 的入口文件，该脚本默认导出了 loader 函数。

loader 函数对 `script`，`template` 和 `style` 三个 block 分别进行了不同的处理。

## 对 script 块的处理

```js
let scriptImport = `const script = {}` // 如果在 SFC 文件中，没有指定 script 块，则会使用默认的空对象。
let isTS = false
const { script, scriptSetup } = descriptor
if (script || scriptSetup) {
    const lang = script?.lang || scriptSetup?.lang
    isTS = !!(lang && /tsx?/.test(lang))

    // 这里判断 script 块是不是引用了其他脚本，如果不是，直接取 resourcePath (也就是这个 SFC 文件的绝对路径)
    const src = (script && !scriptSetup && script.src) || resourcePath

    // 取得 script 标签中的 attributes 并序列化
    // 例如 <script lang='ts' custom-attr="foo"> 将被解析成 &lang=ts&custom-attr=foo
    const attrsQuery = attrsToQuery((scriptSetup || script)!.attrs, 'js')
    const query = `?vue&type=script${attrsQuery}${resourceQuery}`

    // 对 src 和 query 参数进行字符串拼接，通过 `stringifyRequest` 
    // 我们可以得到拼接后的文件路径将会是相对 webpack 所在的项目根目录下的文件路径
    const scriptRequest = stringifyRequest(src + query)

   // 最后完成对 sfc 文件的导入导出路径拼接，这里的 scriptImport 字符串 会和下文的 scriptImport 以及 stylesCode 进行拼接并导出
    scriptImport =
      `import script from ${scriptRequest}\n` +
      // support named exports
      `export * from ${scriptRequest}`
  }

```

## 对 template 块的处理

```js
let templateImport = ``;
let templateRequest;
const renderFnName = isServer ? `ssrRender` : `render`;
const useInlineTemplate = canInlineTemplate(descriptor, isProduction);
if (descriptor.template && !useInlineTemplate) {
   const src = descriptor.template.src || resourcePath;
   const idQuery = `&id=${id}`;
   const scopedQuery = hasScoped ? `&scoped=true` : ``;
   const attrsQuery = attrsToQuery(descriptor.template.attrs);
   const tsQuery =
      options.enableTsInTemplate !== false && isTS ? `&ts=true` : ``;
   const query = `?vue&type=template${idQuery}${scopedQuery}${tsQuery}${attrsQuery}${resourceQuery}`;
   templateRequest = stringifyRequest(src + query);
   templateImport = `import { ${renderFnName} } from ${templateRequest}`;
   propsToAttach.push([renderFnName, renderFnName]);
}
```

那么 `useInlineTemplate` 是什么呢，我们进入 `canInlineTemplate` 方法内部看看。

```js
/**
 * inline template mode can only be enabled if:
 * - is production (separate compilation needed for HMR during dev)
 * - template has no pre-processor (separate loader chain required)
 * - template is not using src
 */
export function canInlineTemplate(descriptor: SFCDescriptor, isProd: boolean) {
   const templateLang = descriptor.template && descriptor.template.lang;
   const templateSrc = descriptor.template && descriptor.template.src;
   return isProd && !!descriptor.scriptSetup && !templateLang && !templateSrc;
}
```

通过注释可知，这个方法判断 template 是否可以被内联
