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