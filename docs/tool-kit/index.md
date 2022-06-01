## 检测一个容器是否出现在视口内


注意： 目前有更好的现成的API提供我们给某一个元素侦测其是否出现在视口内，例如`element.getBoundingClientRect` [兼容性非常可观](https://caniuse.com/?search=getBoundingClientRect)，另外有更加灵活的`Intersection-observer` API（不需要兼容IE的产品可大胆使用）。

所以我们无需重复的去造一个轮子，而且造好的轮子还不一定能有各个浏览器厂商实现的规范好用。


`element.getBoundingClientRect` 这个API只能适用于判断一个元素是否出现在’窗口‘的视口内，而无法判断一个元素是否出现在’具有滚动条的容器视口‘内，为此自己手写了一个方法：

```js
    function elementVisibleInContainer (container, el) {
        // 注意， container需要设置position: relative, el必须是container的定位子级
        let isVisible = false;
        let containerViewHeight = container.clientHeight;
        let elOffsetTop = el.offsetTop;
        let elHeight = el.clientHeight;
        // 求出滚动的偏移值 + 滚动条所在的视口高度（非窗口视口）
        let scrollTotal = container.scrollTop + containerViewHeight;
        // 滚动的高度 减去 要判断的元素距离最近的父级的顶部偏移值， 可以得出，容器在视口内可以被'看见'的高度
        let visibleHeight = scrollTotal - elOffsetTop;
        // 视口的高度 - 容器可以被看见的高度， 可以得到容器本可以显示到视口的高度
        let blank = containerViewHeight - visibleHeight;
        if (blank < containerViewHeight && ((blank > 0 && blank < containerViewHeight) || blank > 0  - elHeight)) {
            isVisible = true;
        }
        return isVisible;
    }
```

### 记录一次如何用vue-cli忽略控制台配置信息以及改变打包时的进度样式展示


vue-cli 打包时控制台会不断输出当前打包的资源路径和依赖信息，导致不断的滚动控制台信息，不优雅美观，对于前端而言只需要关注当前的打包进度即可，不需要关注打包时实时输出的信息。

解决办法：

使用`yarn add webpackbar`， `webpackbar`是一个美观、简洁的打包分析库，让开发者实时了解当前的打包进度，可配置化输出打包完后的各个资源信息.

由于vue-cli4使用的是webpack4.*, 所以可以用stats option来忽略掉控制台警告

```js
{
    chainWebpack: (config) => {
        config.plugins.delete("progress");
        config.plugin("webpackbar").use(WebpackBar);
        config.stats({
            // 这里我选择忽略掉vue3的deep选择器使用方式警告
            warningsFilter: (warning) => {
                const reg = /::v-deep usage as a combinator has been deprecated/;
                return reg.test(warning);
            },
        });
    }
}
```