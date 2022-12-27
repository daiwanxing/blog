# cookie 操作

cookie是由服务端响应给浏览器的，一般只有同源的情况下，浏览器才会自动保存cookie信息，如果需要跨域也能保存响应头的cookie信息。则服务器需要设置：

`Access-Control-Allow-Origin:  前端项目的域名`,`Access-Control-Allow-Credentials: true`,浏览器在请求的时候设置`withCredentials: true`,
对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。否则该请求将会失败。

通过调用`document.cookie`方法我们可以一串包含所有cookie信息的字符串，也可以通过该属性对某个cookie属性进行设置，<strong>每次调用document.cookie只能对一个cookie进行设置或更新，同时对多个cookie属性进行设置则会导致静默失败。</strong>

如果要删除一个cookie，直接将max-age设置为0或者-1即可删除，如果对expires进行设置过去的时间，则会在当前页关闭后清除，保留在本次会话中。如果设置cookie的时候没有定义expires/max-age，则cookie会在对话结束之后过期。

[更多资料请点击MDN-cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

## 子元素滚动到顶部或者尾部如何防止父元素也滚动？

一般这种业务场景出现在一个具有滚动条的浮层侧边栏，以及父元素body也有滚动条，那么我们在浮层侧边栏上滚动到顶部或者尾部，此时就不能再继续滚动条了，但是body会开始进行滚动，这就是浏览器的默认行为。

而我们为了更好的用户体验，希望子元素滚动到顶部或者尾部时，禁止body滚动。那么需要借助js来帮我们完成这个交互逻辑。

pc端的解决方案参考了[张鑫旭-父子滚动-pc](https://www.zhangxinxu.com/wordpress/2015/12/element-scroll-prevent-parent-element-scroll-js/),
移动端同样如此：[张鑫旭-父子滚动-h5](https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/?shrink=1)

另外需注意：`mousewheel`是一个非standard的属性，而且已经被deprecated,非Gecko浏览器都实现了它，建议用wheel事件替换
```js
$(element).wheel(function () {}); //  注意mousewheel在firefox的类似事件名为DOMMouseScroll
// 其实有一种歪路子，当我子元素滚动的时候，我干掉父元素的滚动条，不就行了吗，当子元素消失的时候，
// 再让父元素滚动条出来，但是这种办法适用于浮层的情况，可以遮掉body的滚动条，用户本身就看不到，也不会有何影响。
// 所以这不是一种较为完美的解决办法
// 最好的移动端办法是，借助touchmove, touchstart 和 touchend
// touchStart获取第一次记录的触摸位置信息，判断是否往上走（负值）且滚动的位置已经到了底部，就执行默认事件，禁止父级和子级滚动
```