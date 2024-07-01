---
slug: npm-work-on-terminal
title: Npm 包是如何在终端被执行的
authors:
  name: Klein
  title: freelancer
  url: https://github.com/daiwanxing
  image_url: https://avatars.githubusercontent.com/u/37327614?v=4
tags: [npm]
---

大家有没有思考过一个问题，当你在操作系统终端输入一些 npm 包提供的命令例如:

```sh
$ rollup foo.js
# 或者
$ vue-cli create demo
```

当用户按下回车键后这些命令是怎么被系统执行的？

下面我将要一一揭秘。

首先就上面示例的两行命令执行的必要条件是需要 `npm -g` 全局安装的到本机，否则在终端将找不到此命令的执行文件。

就以 `vue-cli` 举例，当用户在本机全局安装 `vue-cli` 后，`vue-cli` 将会被安装的本机的全局 npm 所在的 node_modules。

但是如果你的本机有多个 nodejs 的版本，你可能用到了 `nvm` 或者 `pnpm` 管理你本机的 node 版本，那么你的全局 npm 包会安装到当前的 Nodejs 版本的 node_modules 中。

我本地是安装了两个 Nodejs 版本，当前使用的版本是 `20.10.0`，那么我执行了下面的命令后

```sh
$ npm install -g vue-cli
```

`vue-cli` 会全局安装到 `20.10.0` 这个文件夹内的 node_modules 目录。

[![pkcz0G4.md.jpg](https://s21.ax1x.com/2024/07/01/pkcz0G4.md.jpg)](https://imgse.com/i/pkcz0G4)

上面都是题外话，我们把视角带回到问题本身，当我们在终端输入 `vue` 为什么会出来控制台提示呢？

[![pkczwiF.md.png](https://s21.ax1x.com/2024/07/01/pkczwiF.md.png)](https://imgse.com/i/pkczwiF)

首先在操作系统终端输入的命令分为两种，一种是内部命令，一种是外部命令（也就是在环境变量配置的目录中查找可执行文件）。

对于非操作系统内部的命令会读取 `PATH` 一系列的目录列表，查找是否有与之同名的可执行文件并尝试执行。

那么很显然 `vue` 是一个外部命令，它被安装在全局的 `node_modules` 目录。`npm` 在安装了包后，会查找该包的 `package.json` 是否配置了 `bin` 属性。

bin 是一个什么字段，看官方文段说明：

> A lot of packages have one or more executable files that they'd like to install into the PATH. npm makes this pretty easy (in fact, it uses this feature to install the "npm" executable.)

翻译：大量的 npm 包会有一个或者多个的可执行文件想要安装在环境变量内，`npm` 让这种方式变得十分的容易（事实上，它就是使用这个特性来安装 npm 可执行文件）

那么 npm 是怎么让其变得十分容易呢，接着往下看文档：

> To use this, supply a `bin` field in your package.json which is a map of command name to local file name. When this package is installed globally, that file will be either linked inside the global bins directory or a cmd (Windows Command File) will be created which executes the specified file in the `bin` field, so it is available to run by `name` or `name.cmd` (on Windows PowerShell). When this package is installed as a dependency in another package, the file will be linked where it will be available to that package either directly by `npm exec` or by name in other scripts when invoking them via `npm run-script`.

这里就不翻译了，如果简单描述的话，就是需要在你的 `npm` 包的 `package.json` 文件添加一个 `bin` 的字段（`bin` 字段可以是一个对象也可以是一个字符串路径）。

然后这个文件就会  link 到全局的 bin 目录或者会创建一个 `cmd` 文件（如果是 windows 系统） 来执行 `bin` 字段的指定文件。

还有一段：

> So, when you install myapp, in case of unix-like OS it'll create a symlink from the `cli.js` script to `/usr/local/bin/myapp` and in case of windows it will create a cmd file usually at `C:\Users\{Username}\AppData\Roaming\npm\myapp.cmd` which runs the `cli.js` script.

上面写了新创建 `cmd ` 文件会在 `npm` 目录下。

之前不是已经全局安装了一个 `vue-cli`吗，那么跟着文档介绍走：


果不其然我找到了一个 `vue` 的 cmd 文件。

也就是说，当我在控制台输入 `vue` 的时候操作系统（windows）就会执行这个目录下的 `vue.cmd` 这个文件，操作系统是怎么找到这个目录下的 `cmd` 文件的？


前面说了：

> 对于非操作系统内部的命令, 会读取 `PATH` 目录下的列表，查找是否有与之同名的可执行文件并尝试执行。


ok，继续往下走。

在 vscode 内打开这个 `vue.cmd` 文件查看内容

```cmd
@ECHO off
GOTO start
:find_dp0
SET dp0=%~dp0
EXIT /b
:start
SETLOCAL
CALL :find_dp0

IF EXIST "%dp0%\node.exe" (
  SET "_prog=%dp0%\node.exe"
) ELSE (
  SET "_prog=node"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)

endLocal & goto #_undefined_# 2>NUL || title %COMSPEC% & "%_prog%"  "%dp0%\node_modules\vue-cli\bin\vue" %*
```

只需要关注最后一行，执行这个 `vue.cmd` 文件后又会执行 `node_modules` 目录下的的 `\vue-cli\bin\vue` 这个文件，那我们继续追找到这个文件，下面是这个文件的代码。

```js
#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('list', 'list available official templates')
  .command('build', 'prototype a new project')
  .command('create', '(for v3 warning only)')

program.parse(process.argv)
```

最后我们终于找到了执行 `vue` 命令后运行该命令的脚本是哪个了。

上面的这行 `#!/usr/bin/env node` 至关重要，意思是告诉操作系统用 `node` 作为解释器来执行脚本。

然后当我们在终端输入 `vue create foo` 时，接下来的一切都是脚本内部来解析并处理命令的。

至此整个 npm 包是如何在终端被执行的这个问题的探讨就结束了。