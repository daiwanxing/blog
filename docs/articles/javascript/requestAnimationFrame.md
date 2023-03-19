# requestAnimationFrame - 编写优雅动画的秘籍

requestAnimationFrame 是一个出来很久的 API 了，该 API 接受一个回调函数，浏览器会在***恰当***的时候回调执行该函数。注意，我把恰当二字着重强调了一下。根据文档相关的资料再结合自己在业务中用到该函数的理解，这里的恰当是指的是浏览器会在 render 页面完后，总是会将回调函数放在下一次渲染页面之前执行。我看到很多写相关的博客都在反复强调这个 api 是根据屏幕的刷新率执行回调，这是不完全对的。

例如有一台刷新率为 60hz 的显示器，60hz意味着每一秒刷新60次。 可通过计算得 `1s / 60hz = 16.6ms` 每 16.6ms 刷新一次屏幕。但是实际刷新时间可能会略有不同，具体取决于具体设备和其他因素。

即便抛开其他影响刷新率的因素，浏览器也并不会每隔16.6ms回调执行一次`requestAnimationFrame`，而是我之前提到过的将回调函数的执行时机安排在***下一次即将重新绘制页面之前调用***。大部分情况会在下一次显示刷新时进行，但如果浏览器正忙于执行其他任务或设备资源不足，则可能会延迟执行，因为我们知道js是单线程的，当前任务没有被执行完的时候，是绝对不会执行下一个任务的。

```js
const TEN_SECONDS = 1000 * 10; // 10s

let countTime = 0;
let called = 0;
function foo(timeStamp) {
  if (countTime === 0) countTime = timeStamp;
  if (timeStamp - countTime <= TEN_SECONDS) {
    console.log(++called);
    window.requestAnimationFrame(foo);
  }
}

window.requestAnimationFrame(foo);
```

假定在60hz的显示器下，called最终的值会累加到`600`左右（1000 * 10 / 16.6ms = 602.4096...）,但实际会根据当前页面其他的任务运行情况而决定。
下面是一个我在codesandbox上跑的一个示例，在60hz的显示器下，会回调执行600次左右，但是当不断回调执行requestAnimationFrame的同时鼠标滚动页面会发现执行次数就会减少很多。

<iframe src="https://codesandbox.io/embed/intelligent-rubin-u68y5x?autoresize=1&fontsize=14&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="intelligent-rubin-u68y5x"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

前面叙述了很多关于`requestAnimationFrame()`是什么时机被调用的，接下来侧重说说这个API为什么能为业务代码带来优化。

我们编写的回调函数的执行时机最终完全交给了浏览器，浏览器内部会知道什么时机调用这个函数最佳与刷新率保持协调。

开发者利用`requestAnimationFrame()`能编写复杂的动画，其性能相比`setInterval()`更强，渲染更为流畅。而且当页面置于后台，`requestAnimationFrame()`会被暂停调用以提升性能和电池寿命。