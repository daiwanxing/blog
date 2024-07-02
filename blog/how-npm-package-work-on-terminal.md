---
slug: npm-work-on-terminal
title: Npm 包是如何在终端被执行的
authors: klein
---

你是否思考过一个问题，当用户在操作系统终端输入一些 npm 包提供的命令，例如:

```sh
$ rollup foo.js
# 或者
$ vue-cli create demo
```

当用户按下回车键后这些命令是怎么被系统执行的？

现在，一起来在这篇文章里好好探究一番。

首先，就上面示例的两行命令执行的必要条件是需要 `npm -g` 全局安装的到本机，否则在终端将找不到此命令的执行文件。

> 当然，如果是 `npx rollup foo.js` 那又是另一种情况了。

就以 `vue-cli` 举例，当用户在本机全局安装 `vue-cli` 后，`vue-cli` 将会被安装的本机的全局 npm 所在的 node_modules。

但是如果你的本机有多个 nodejs 的版本，你可能用到了 `nvm` 或者 `pnpm` 管理你本机的 node 版本，那么你的全局 npm 包会安装到当前使用的 Nodejs 版本的 node_modules 中。

我本地目前是安装了两个 Nodejs 版本，当前使用的版本是 `20.10.0`，那么我执行了下面的命令后

```sh
$ npm install -g vue-cli
```

`vue-cli` 会全局安装到 `20.10.0` 这个文件夹内的 node_modules 目录。

[![pkcz0G4.md.jpg](https://s21.ax1x.com/2024/07/01/pkcz0G4.md.jpg)](https://imgse.com/i/pkcz0G4)

上面都是题外话，我们把视角带回到问题本身，当我们在终端输入 `vue` 为什么会出来控制台提示呢？

[![pkczwiF.md.png](https://s21.ax1x.com/2024/07/01/pkczwiF.md.png)](https://imgse.com/i/pkczwiF)

这里有个前置知识，用户在操作系统终端输入的命令分为两种，一种是内部命令，一种是外部命令（也就是在环境变量配置的目录中查找可执行文件）。

对于非操作系统内部的命令会读取 `PATH` 一系列的目录列表，查找是否有与之同名的可执行文件并尝试执行。

那么很显然 `vue` 是一个外部命令，它被安装在全局的 `node_modules` 目录。`npm` 在安装了包后，会查找该包的 `package.json` 是否配置了 `bin` 属性。

`bin` 是一个什么字段，在 [npm 的官方文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bin)我们找到了答案：

*以下的引用都是译文，为了确保理解的准确性，均用 GPT-4o 翻译的*

> 很多包都有一个或多个可执行文件，它们希望将其安装到 PATH 中。npm 使这变得相当容易（实际上，它使用此功能来安装“npm”可执行文件）。

那么 npm 是怎么让其变得十分容易呢，接着往下看文档：

> 要使用此功能，请在您的 package.json 中提供一个 `bin` 字段，它是命令名称到本地文件名的映射。当此包全局安装时，该文件将在全局 bins 目录中链接，或者会创建一个 cmd（Windows 命令文件），该文件执行 `bin` 字段中指定的文件，因此可以通过名称或 name.cmd（在 Windows PowerShell 上）运行。当此包作为依赖项安装在另一个包中时，该文件将被链接，以便该包可以直接通过 npm exec 访问，或者在通过 npm run-script 调用其他脚本时通过名称访问。

总结起来就是需要在 npm 包的 `package.json` 文件添加一个 `bin` 的字段（`bin` 字段可以是一个对象也可以是一个字符串路径）。

例如 `vue-cli` 的 `bin` 配置如下：

```json
"bin": {
    "vue": "bin/vue",
    "vue-init": "bin/vue-init",
    "vue-list": "bin/vue-list"
},
```

这个 `bin` 配置了三个命令，分别是 `vue`，`vue-init`，`vue-list`，这三个命令会 link 到全局的 `bin` 目录（如果是 unix 系统），或者创建三个与之同名的 cmd 文件，目的是为了执行这些命令。

这些文件的内容就是执行这些命令对应的脚本。

由于我之前已经全局安装了 `vue-cli`，我可以在全局的 `npm` 目录下找到这三个 CMD 文件。

[![pkgpZAf.md.jpg](https://s21.ax1x.com/2024/07/01/pkgpZAf.md.jpg)](https://imgse.com/i/pkgpZAf)

也就是说，当我在控制台输入 `vue` 的时候，操作系统（windows）就会执行这个目录下的 `vue.cmd` 这个文件，操作系统是怎么找到这个目录下的 `cmd` 文件的？

前面说了：

> 对于非操作系统内部的命令, 会读取 `PATH` 目录下的列表，查找是否有与之同名的可执行文件并尝试执行。


[![pkgaz90.md.jpg](https://s21.ax1x.com/2024/07/02/pkgaz90.md.jpg)](https://imgse.com/i/pkgaz90)

ok，继续往下走。

在 vscode 内打开这个 `vue.cmd` 文件查看内容

```sh
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

const program = require("commander");

program
  .version(require("../package").version)
  .usage("<command> [options]")
  .command("init", "generate a new project from a template")
  .command("list", "list available official templates")
  .command("build", "prototype a new project")
  .command("create", "(for v3 warning only)");

program.parse(process.argv);
```

最后我们终于找到了执行 `vue` 命令后运行该命令的脚本是哪个了。

上面的这行 `#!/usr/bin/env node` 至关重要，意思是告诉操作系统用 `node` 作为解释器来执行脚本。

然后当我们在终端输入 `vue create foo` 时，接下来的一切都是由脚本内部来解析并处理命令的。

至此整个 npm 包是如何在终端被执行的这个问题的探讨就结束了。

最后来个简单的总结。

1. 全局安装的 Npm Package 默认会放在 `%AppData%\npm\node_modules`（MacOS: `/usr/local/lib/node_modules`）
2. 如果一个 npm 包以全局的形式安装，并且 npm 包的 `package.json` 配置了 `bin`，那么 npm 会将 `bin` 配置项的所有命令名称创建对应的 `bin` 文件并（如果是 Windows，则是 `cmd` 文件）链接到 `npm` 根目录。
3. 当在终端输入命令名称时，由于在安装 npm 时系统已经配置好了 npm 的环境变量，所以系统能找到 npm 目录下的命令文件（如果有）并执行命令文件。