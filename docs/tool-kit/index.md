## 自用，封装的简单工具类

检测一个容器是否出现在视口内
```js
    /**
     *  判断容器是否在视口内
     * @param element 容器
     * @param isWhole 是否完全出现在容器范围内
    **/
    function detectBoxInViewPort (element, isWhole = false) {
        const VIEW_PORT_HEIGHT = window.innerHeight; // 窗口高度
        const elementOffsetTop = $(element).offset().top; // 容器距离页面顶部的距离
        const scrollTop = $(window).scrollTop(); // 当前滚动的位置
        let visible = false; // 是否可见
        const pageTop = scrollTop + VIEW_PORT_HEIGHT; // 滚动的距离 + 视口的距离
        if (isWhole) {
            const elementHeight = $(element).height();
            if (pageTop > elementOffsetTop + elementHeight) {
                visible = true;
            }
        } else {
            if (pageTop > elementOffsetTop) {
                visible = true;
            }
        }
        return visible;
    }
```