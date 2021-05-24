## 检测一个容器是否出现在视口内

```js
    /**
     *  判断容器是否在视口内
     * @param selector 选择器
     * @param isWhole 容器本身是否完全暴露在视口范围内
    **/
   function detectBoxInViewPort (selector, isWhole = false) {
        const VIEW_PORT_HEIGHT = window.innerHeight; // 窗口高度
        const elementOffsetTop = $(selector).offset().top; // 容器距离页面顶部的距离
        const scrollTop = $(window).scrollTop(); // 当前滚动的位置

        const scrollOptions = {
            top: 0,
            behavior:"smooth"
        };

        let visibleOptions = {
            visible: false,
            scrollShowHandler: function () {
                // 如果 容器在视口可见范围内或者在视口的上方，则往上偏移到视口最顶部(如果距离不够，则不滚)
                if (VIEW_PORT_HEIGHT + scrollTop > elementOffsetTop) {
                    const result = elementOffsetTop + $(selector).height() + VIEW_PORT_HEIGHT - $(selector).height();
                    if (document.documentElement.scrollHeight > result) {
                        scrollOptions.top = elementOffsetTop;
                        window.scrollTo(scrollOptions);
                    }
                } else {
                    const blankSpace = window.innerHeight - $(selector).height();
                    scrollOptions.top = elementOffsetTop - blankSpace;
                    window.scrollTo(scrollOptions)
                }
            }
        }
        const pageTop = scrollTop + VIEW_PORT_HEIGHT; // 滚动的距离 + 视口的距离
        if (isWhole) {
            if (pageTop> elementOffsetTop + $(selector).height()) {
                visibleOptions.visible = true;
            }
        } else {
            if (pageTop > elementOffsetTop) {
                visibleOptions.visible = true;
            }
        }
        return visibleOptions;
    }
```