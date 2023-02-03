# Git 命令


## git restore --staged \<file\>

`git restore --staged` 一般用来对放入到暂存区的文件恢复到未提交的状态

```shell
git add /. # 此刻已经将当前 .git 所在目录下的所有变动了的文件暂存到了缓冲区

git restore --staged . # 将缓冲区中的所有的文件全部回滚到工作区
```

## git log

`git log` 负责打印 git commit 的历史记录，如果觉得查看不方便， 可以使用 `git log --pretty=oneline` 美化打印。

如果想看到分支详细图，还可以使用 `git log --graph` 查看。


## git reset \[--hard\]？\<commit-id\>

`git reset` 命令类似于时光穿梭，可以让你回退到指定的 commit

```shell
git reset --hard HEAD^ # 移动到 HEAD 往前的一个commit, 在移动之前，当前 HEAD 所在的那个 commit 将会被丢弃
```

## git reflog

前面用 `git reset` 命令通过"时光穿梭"回退到了过去的节点，万一我们又想回到现在该怎么办。如果你记得 最新的那个commit id，可以直接

`git reset --hard <commit-id>` 回到最新的版本。实在不记得了也没关系。

`git reflog` 记录了我们每一次 git 操作的历史记录，可以借助这个命令，找到之前提交的那个最新的 commit-id.

## git checkout -- \<file\>

如果想对**工作区**的文件中的修改全部撤销，可以使用该命令，请记住，**这个命令只能用于工作区的文件改动的撤销**。添加到了暂存区的改动是无法通过这个命令撤销。

```shell
git checkout -- main.txt # 必须带上 -- 这个flag
```

`git checkout -- <file>` 这个命令还可以对误删的文件进行撤回操作，例如我们在工作区误删了 A 文件，此时这个A 文件还没有被添加到暂存区，则可以使用这个命令撤销删除的操作

## fast-forward

> 通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。

使用 `--no-ff` 方式禁止 fast-forward 模式。 

那么 `--no-ff` 这个命令什么场景下用？什么是 fast-forward 模式？

问题先一个个解决。

如果在 dev 分支 提交了一个 commit，我们需要切换到 master 分支 merge 这些commit。

```git
git switch master

git merge dev
```

我们一般都会这样做，`fast-forward` 模式是 enabled，这样当 master 分支 merge 时，git就会在merge时生成一个新的commit。

如果我们不需要这样的信息，可以直接 `git merge --no-ff -m "merge-it" dev`

## git stash

假设一个这样的场景，小帅在自己新建的 dev 分支开发到一半，被产品经理喊去修改一个紧急的bug，小帅脑海里第一想到的是在 master 分支中新建一个 issue 分支。但是切换到 master 分支之前，得先处理 dev 分支中的代码。虽然可以本地提交一个 dev 的commit，但是小帅现在还不想提交。

有没有一个办法可以暂存 dev 中的代码且不提交呢？

接下来，就该 `git stash` 出场了。`git stash` 命令可以暂存本地的代码。小帅也同时想到了这个命令，于是他打开 `cmd` 飞快的敲入以下几个命令：

```git
git stash

git switch -b issue-01
```

接下来愉快的去修 bug 去了。等小帅 修复好了 issue 分支的代码并合并到主分支后，接下来又切换到了 dev 分支继续愉快的开发了~

```git
git switch dev

git stash pop # 通过该命令取出暂存了的代码, 执行该命令后，暂存区里的记录将被删除
```

每执行一次 `git stash pop` 都会从栈顶取出当前 frame 的代码，直到栈为空。 

:::warning 注意
`git stash` 会同时暂存工作区和暂存区的改动。
可以用 `git stash list` 查看所有暂存的记录
:::

## cherry-pick

小帅解决了产品经理提出的问题后，继续在 dev 分支开发，但是转念一想，dev 分支就是从 master 分支签出来的，那么岂不是 dev 分支也有这个 bug，那怎么在 dev 分支也修复这个 bug 呢？

幸好聪明的小帅灵机一动，想到了 `cherry pick`，只要从 master 分支找到解决那个 bug 的 commit-id, cherry-pick 这个 commit 不就解决了吗！于是小帅立即打开 `cmd` 敲出如下面命令：

```git
git switch dev
git cherry-pick <commit-id> # 找到 issue 分支提交的那个 commit-id
```
## git rebase

`git rebase` 作用和 `git merge` 类似，但是使用 `git rebase` 能够让不同分支的代码合并到主分支的 commit 时间线更加清晰明了。

## git 相对引用

使用相对引用，可以更容易的将 HEAD 移动到指定的 commit, 而通过 hash 值的话不容易阅读也不容易记，而且还需要通过 `git log` 查看指定的 commit 的 hash 值。

相对引用有两种用法：

- 使用 ^ 向上移动 1 个提交记录
- 使用 ~\<num\> 向上移动多个提交记录，如 ~3

:::tip
假如当前的 branch 是 main 分支 且 HEAD 默认指向的是 main 分支的最近一次提交记录，所以 main^ 相当于“main 的父节点”。main^^ 是 main 的第二个父节点
:::

`git checkout HEAD^`

`git checkout HEAD^^`

这种输入的方式，比使用 commit 的哈希值要快捷多了！

如果你想在提交树中向上移动很多步的话，敲那么多 ^ 貌似也挺烦人的，Git 当然也考虑到了这一点，于是又引入了操作符 ~。

例如， `git checkout HEAD~4`, 表示向上移动4步，这样比使用 HEAD 更加快捷。

那么，移动分支有什么用呢？

假如，我们想让 main 分支指向 HEAD 的第三级提交，可以这样做：

`git branch -f main HEAD~3`, 其中, `-f` 表示让分支指向另一个提交。

## git 撤销变更

如果要撤销对 commit 后的文件的更改，git 提供了两个命令可以做到变更撤销

- git reset
- git revert

`git reset` 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”, git reset 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。

`git reset HEAD^` 回退 HEAD 指向的上一个 commit。

`git reset HEAD` 回退 HEAD 指向当前的 commit。

`git revert` 我的理解也是撤销更改，但是 `git reset` 仅仅是撤销本地的 commit 的更改, 而 `git revert` 是撤销已经同步到了远程仓库的更改。

回退并不是真正意义上的往回走，而是达到类似于删除旧的 commit 的历史记录的效果。

## git cherry-pick

如果希望将 某个分支下的 commit，例如我们这里称之为 `commit-b`。希望将 `patch` 分支下的编号为 `commit-b` 的 commit pick到 master 分支。

那么 `cherry-pick` 非常有用。

```shell
git cherry-pick <提交号>...
```

```git
git checkout master

git cherry-pick commit-b
```

## 交互式 rebase

交互式 rebase 指的是使用带参数 --interactive 的 rebase 命令, 简写为 -i。交互式 `git rebase -i` 会打开一个 GUI 界面。我们可以通过这个 GUI 界面对 要 merge 的 commit 进行排序后，生成一份新的 commit 副本。