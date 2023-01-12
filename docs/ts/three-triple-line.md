# 三斜线指令是什么?

-   三斜线指令是一种以`///`开头包含一个 XML 标记的单行注释，三斜线指令只能放在文件最顶层，放在其他位置会被视作无效.

-   三斜线指令用于导入包的类型声明，类似于`import`.我的理解是可以通过三斜线指令导入第三包的类型声明，防止编译器报错。

你可能会说第三方依赖的包的类型声明不都是放在`node_modules/@types/**`下吗，为啥还需要三斜线指令？

的确，如果第三方包的类型声明能在`@types`中找到，就不需要这个方法，但是像部分库的类型声明是放在包的目录下的，这样我们可以通过三斜线指令导入声明进来。

```ts
// global.d.ts

/// <reference path="node_modules@amap/amap-jsapi-types/index.d.ts" />
```

总而言之，三斜线指令了解就好，基本用不到这个东西，大部分导入类型声明的场景直接用`tsconfig.json`中的`types`字段配置好即可。