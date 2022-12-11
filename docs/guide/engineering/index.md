## 我是如何将基于 vue-cli 搭建的项目迁移到 vite 中的

### ❓我为什么需要将 vue-cli 替换成 vite

公司某个项目是基于 vue-cli4 开发的，而 cli4 又是基于 webpack4 构建的一个脚手架。在这半年的开发过程中，给我遇到了很多头疼的问题，其中最为难受的是打包、启动无比的慢。这个项目的所有源码文件加起来也有 500 多个，算是一个中大型项目。我在 vue-cli 中的一些原有的配置基础上进行了打包的优化，例如：拆分多个打包到 app.js 中的 chunk，尽可能的使首页白屏时长缩短, 删除`Moment.js`中其他的语言包，只保留中文，在 UI 库`ant-design-vue`方面，利用`unplugin-vue-components`，自动按需加载需用用到的组件以及组件的 style，减少打包后的 bundle size.启用 webpack 中的**_tree-shaking_**, 删除未使用的代码...

即便做了这些工作，start、build 也需要平均耗费 2-3 分钟的时间，并且每次热更新也需要 3~5 秒左右的时间。 这对开发者而言这几分钟的等待无疑是十分的漫长。

### ⚠️替换的准备工作

1. 卸载项目中一些和 webpack 以及 cli 相关的依赖

```json
{
  "@vue/cli-plugin-babel": "~4.5.0",
  "@vue/cli-plugin-eslint": "~4.5.0",
  "@vue/cli-plugin-router": "~4.5.0",
  "@vue/cli-plugin-typescript": "~4.5.0",
  "@vue/cli-plugin-vuex": "~4.5.0",
  "@vue/cli-service": "~4.5.0",
  "webpack-bundle-analyzer": "^4.4.2",
  "webpackbar": "^5.0.2"
}
```

2. 安装vite等相关依赖

```shell
$ pnpm install vite rollup-plugin-visualizer unplugin-vue-components

# rollup-plugin-visualizer的作用类似于webpack-bundle-analyzer，build之后可以对打包后的每个文件大小进行分析

# unplugin-vue-components 用于实现按需导入ui库的组件与组件样式的插件

$ pnpm install @vitejs/plugin-vue-jsx @vitejs/plugin-vue vite-plugin-eslint

# @vitejs/plugin-vue-jsx 为了支持在vue文件中使用jsx的语法

# @vitejs/plugin-vue 让vite知道如何编译vue文件

# vite-plugin-eslint 在编译期或热更新对lint错误的代码进行报错并停止继续编译
```


### 🔜开始进行迁移

1. 在项目的根目录新建vite.config.js

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ command, mode }) => {
    return {
        build: {
            target: ["es2019", "chrome80"],
            minify: mode === "development" ? false : "esbuild",
            outDir: "dist",
            sourcemap: command === "serve" ? "inline" : false,
            cssCodeSplit: true,
            rollupOptions: {
                output: {
                    assetFileNames(assetInfo) {
                        const info = assetInfo.name.split(".");
                        let extType = info[info.length - 1];
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            extType = "img";
                        } else if (/woff|woff2|tff/.test(extType)) {
                            extType = "font";
                        }
                        return `static/${extType}/[hash][extname]`;
                    },
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    entryFileNames: "assets/js/[name]-[hash].js",
                },
            },
        },
        server: {
            port: 8080,
            strictPort: true,
            open: true,
            proxy: {
                "/api": {
                    target: "0:0:0:0:8086",
                    changeOrigin: true,
                },
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import url('src/styles/preload.less');`,
                },
            },
        },
        plugins: [
            Components({
                resolvers: [
                    AntDesignVueResolver({
                        resolveIcons: true,
                    }),
                ],
                version: 3,
            }),
            vueJsx(),
            vue(),
            visualizer({
                open: true,
            }),
            eslint({
                failOnWarning: false,
                failOnError: true,
            }),
        ],

        resolve: {
            alias: {
                "@": path.join(__dirname, "src"),
            },
        },
    };
});

```


2. 在main.ts中删除全局安装ant-design-vue的代码

```ts {1,2, 4}
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

app.use(Antd);
```

3. 在项目的根目录删除 babel.config.js, 在vite中我们不需要babel对业务代码进行polyfill，也不需要babel-plugin-import来实现按需导入。vite面向是的现代的浏览器（指的是能够支持dynamic import的浏览器）无需做api层面的转换，语法层面上的转换交给了esbuild.

4. 将public中的文件夹内的index.html文件挪到项目的根目录中，vite服务器只会从项目根目录找到index.html文件, 删除html文件中声明的模板变量
