## 目前常用的包管理工具有npm、yarn已经最新出来的pnpm，它们的诞生是为了解决前端项目中各个库之前的依赖繁杂的问题

### yarn 和 npm 安装管理依赖所执行的cmd区别
||yarn|npm|
|---|---|:--:|
|安装所有依赖|yarn install / yarn|npm install / npm i|
|安装单个依赖|yarn add package-name|npm install package-name|
|卸载单个依赖|yarn remove package-name|npm uninstall package-name|
|升级某个依赖|yarn upgrade package-name|npm update package-name|

注意：在yarn1.*中是兼容`.npmrc`文件的且`.npmrc`优先级高于`.yarnrc`，但是yarn2.*(又名 yarn Berry)开始不再支持`.npmrc`和`.yarnrc`，而是用`.yarnrc.yml`作为替代。

而且`.yarnrc.yml`和`.npmrc`的配置文件语法格式不同,

`.yarnrc.yml`: `"strict-ssl": false` <br />
`.npmrc`: `strict-ssll=false`

[pnpm、npm、yarn三者之间的区别](https://blog.logrocket.com/javascript-package-managers-compared/#brief-history-javascript-package-managers)

## 现在就停止使用yarn classic和npm，换上最新的pnpm!

一个新事物的诞生往往就有其存在的意义，过去常用的包管理工具一般都是npm或者yarn。现在我们又多了一种新的选择：pnpm

pnpm相比yarn 和 npm 作为包管理工具真的是有太多厉害的地方可以吊打其他两位了。

1. 超快的安装速度以及节省大量的磁盘存储空间

```md
Suppose you have 10 projects that use the exact same dependencies, then when using npm or Yarn, you will keep copies of those 10 exact dependencies on disk. When you have enough projects or dependencies, your disk can burst.

And pnpm uses content-addressable storage technology. This technique maximizes the use of disk space. Specifically this:

When a dependency is not installed, pnpm will download it and place it in a unified location. Then add to the project via hard link. Similarly, when this dependency is also used in other projects, it will also be hard-linked to the corresponding location. Of course, this is all based on the version applicable. If the version is not applicable, then the new one will be downloaded and used.

It can be said that it uses hard links cleverly to save disk space. And it installs faster!
```

2. 拥有一个非flat的node_modules目录

```md
When installing dependencies, npm and Yarn Classic try to elevate all packages to the root of node_modules whenever possible. Therefore, dependencies not listed in package.json are accessible in the project code.

In contrast to pnpm, it uses symbolic links to ensure that only those dependencies listed in package.json are accessible in the project code. This avoids silly bugs and avoids repeated installations.

It would take a lot of time to explain the details of how it works, so I put it in another article. If you are interested in it, please check it out.
```
