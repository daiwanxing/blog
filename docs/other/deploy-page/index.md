---
aside: false
---


# 如何使用github-Pages部署Web应用

github-pages是github的一个官方托管工具，可以托管来自Repo中的项目页面.

> GitHub Pages is designed to host your personal, organization, or project pages from a GitHub repository.

我们需要登录 github 网站打开一个想要托管页面的Repo, 接着我们需要找到`Settings`这个menu， 如下图红圈标出的部分。

![](https://pic1.zhimg.com/80/v2-1ea883413d38fc8eb5406a6e909d2606_r.jpg)

点击`Settings`后，找到`Pages`这个菜单， 如下图红圈标出的部分

![](/github-pages-step02.png)


在`Branch`下， 有一句提示
> GitHub Pages is currently disabled. Select a source below to enable GitHub Pages for this repository. Learn more.

当前仓库的GitHub-Pages 默认是 disabled，需要手动启用。我们选择一个分支作为github-pages的托管分支，这里我选择的是`main`分支，选择什么分支看个人的情况而定。

![](/github-pages-step03.png)

选择下拉列表的指定分支后，branch下拉框的右侧还有一个下拉框，用于指定分支下的指定目录。默认只有两个值，`/root` 和 `/docs`。`/root`很好理解，就是当前仓库的根目录作为github-pages的托管目录，而`/docs`指的是当前仓库的`/docs`文件夹作为github-pages的托管目录，这里默认`/root`即可。

![](/github-pages-step04.png)

接着，点击`save`按钮即可。

如果我们不需要指定域名，可以跳过下面的`Custom Domain`设置。 然后我们可以看到一则部署成功的提示以及部署后的URL，我这里的是 [https://daiwanxing.github.io/daiwanxing/](https://daiwanxing.github.io/daiwanxing/) 可以看到一个Repo就这样部署成功了。

![](/github-pages-step06.png)


需要注意的是github-pages服务器只会读取的是你的仓库中的index.html 或者 `README.md`文件，并且加载`index.html`文件内的相关脚本以及样式资源。

如果是使用`Vite`等构建工具开发的项目，是需要build后生成的dist目录作为github-pages的托管目录，因为build后的`dist`目录才是你的项目最终的可运行的产物。

但是我们不可能每次手动run build然后push到远程仓库，这样很繁琐。为此，我们需要借助一些CI/CD的工具，我这里使用的是 [travis-ci](https://www.travis-ci.org/)，具体怎么使用 travis 后续我会继续往下写，当然你也可以不使用`travis-ci`。也可以用github自带的CI工具。

在Vite文档中，有一份详细的部署static-site的教程，我们也可以阅读这个教程来操作 [deploying-a-static-site](https://vitejs.dev/guide/static-deploy.html#deploying-a-static-site)。


> 参考资料: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site