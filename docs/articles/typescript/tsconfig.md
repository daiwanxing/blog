# 如何配置 tsconfig.json

-  `tsconfig.json`是专为 ts 项目进行相关的 typescript 配置的，它包含了 tsc 编译器使用的输入和输出路径、源文件扩展名、编译目标版本以及其他编译选项。

-  `tsconfig.json`是一个 JSON 格式的文件，主要的几个配置模块分别有：`compilerOptions`、`include`、`include`

-  `tsconfig.json` 必须位于 ts 项目的根目录。

`compilerOptions`用于对项目中的 ts 代码进行编译配置。

```json
{
   "compilerOptions": {
      // target 表示编译产出的文件代码的 ecmascript语法版本
      "target": "esnext",
      // module 表示编译产出的文件应遵循的模块系统，一般常见的模块系统有：commonjs、UMD、AMD 以及 es module
      "module": "esnext",
      // strict 值如果为true 会为项目中的每个编译后的js文件 开头 添加 "use strict;"
      "strict": true,
      // 指定`.(j|t)sx`的文件 如何 被转换成 js 文件，一般非react项目设置`preserve`即可，
      // preserve 意味着 进行保留，tsc不会对jsx语法进行转换处理，而是交给babel、esbuild相关编译工具进行处理
      "jsx": "preserve",
      // 跳过对默认库的声明文件类型检查
      "skipLibCheck": true,
      // 作用同上，但是该属性被废弃，所以只需要配置 skipLibCheck 即可
      "skipDefaultLibCheck": false,
      // 用于指定是否在编译期间引入辅助函数。辅助函数是由ts编译器自动生成的代码，用于支持一些功能，例如装饰器、解构赋值等。
      // 一般用不着，对于语法polyfill，可以借助esbuild、babel等工具.
      "importHelpers": false,
      // 顾名思义，允许你的项目中是否能用js写代码
      "allowJs": true,
      // this 不能是any, 如果在一个普通函数中访问this，它的类型是any，开启此选项会对this为any的代码进行报错。
      "noImplicitThis": false,
      // 在不支持 es-module的js版本中，是否需要将代码转换成common-js模块
      "esModuleInterop": false,
      // 是否开启双向协变，默认是 false
      "strictFunctionType": true,
      // 指定模块的解析策略，这里的模块就是ts项目中用import导入的各个文件路径具体如何解析， 具体解析策略默认是classic，可选的node
      "moduleResolution": "node",
      // 指定ts项目的 root-directory, 如果解析非绝对路径，会根据该根目录进行解析，项目的根目录路径是参照tsconfig.json文件所在位置
      "baseUrl": ".",
      // 配置文件路径别名， 作用同 webpack中的resolve-alias 相同
      // 但是这个选项并不会在打包时进行真正的处理，只是在开发阶段让ts能正确解析配置了别名的文件路径，进行lint
      "paths": {
         "@/*": ["src/*"]
      },
      // 有选择性的引入ts内置的type-define，一般不用做配置，除非你的ts项目是跑在node
      // 那么，可以设置 lib: ["ESNext"],把dom的类型定义移除掉
      "lib": ["esnext", "dom"],
      // 配置指定的要导入的类型定义的包名，如果值不包含路径，会默认查找@types目录下的声明包, 否则会从node_modules根据定义的路径查找声明
      // lodash-es的声明从@types目录下查找，第二个包含了路径的会从node_modules目录下查找
      "types": ["lodash-es", "@amap/@amap-jsapi-types"],
      // 配置要导入的第三方的类型定义包的文件夹有哪些，默认是 /node_modules/@types，
      "typeRoots": ["./vendor/types"]
   },
   // 配置包含在项目中的所有的文件，ts会在编译期间从Include匹配的那些文件进行编译
   "include": [],
   // exclude 表示解析文件时 应该 从include配置项忽略掉的文件名或者 glob-pattern
   "exclude": []
}
```

## Trouble Shoot
