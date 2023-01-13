# 谈谈事件循环(event-loop)

事件循环在前端圈子里，是一个经常被谈起的技术知识。互联网上也有很多关于事件循环的技术文章，有写的好的，也有很多都是为了蹭访问量的水文。总之，事件循环的确是一个难懂，需要反复理解并且稍加实践的概念。光在脑子里靠抽象的去理解是不够的，如果能结合实际，写一个例子会更有助于我们理解。

前端工程师为什么需要了解事件循环，部分人纯粹就是为了应付面试，对还抱有这种想法的人，我认为最多是个初级前端工程师。如果你没有理解事件循环，你就无法知道:

-  为什么`Promise`、`MutationObserver`、`queueMicroTask`等 api 的回调任务总是优先于`setTimeout`执行.
-  Vue 中的`nextTick`这个 api 为什么可以让我们获取到最新的 DOM 并操作.
-  UI-Render 到底是在什么时候进行的.

要想好好讲清楚事件循环, 弄明白上面几个问题，就必须得先讲讲`javascript`中绕不开的几个概念知识。

## callback-stack

`callback-stack`也称之为回调栈， 在 js 中所有的函数都会被放入这个栈中执行，`callback-stack`遵循 LIFO 的特点。最先被放入到栈中的函数最后被执行,栈中存放每个函数的地方称之为`frame`，每个`frame`代表函数被调用一次。

:::tip
当 js 引擎执行`调用函数`这个操作时，才会把该函数推入到`callback-stack`中。请注意，并不是解析代码的时候 push，而是执行的时候 push。
:::

```js{13}
function foo() {
   baz();
}

function baz() {
   bar();
}

function bar() {
   //
}

foo();
```

当 js 执行到上面高亮的一行代码`foo()`，会将 foo 推入到`callback`中, 假设此时的栈是 empty 的，那么栈目前的情况通过可视化来描述就是.

<iframe src="https://codesandbox.io/embed/mystifying-wind-d4p3lo?fontsize=14&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="mystifying-wind-d4p3lo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

可以看到执行`foo`，`foo`先被推入到栈中，，接着在`foo()`函数体内执行`baz()`，此时`baz()`也随之被推入到栈中，要注意的是，`foo()`仍未执行完噢，所以`foo`函数仍然在栈中。继续在`baz()`函数体内执行代码，遇到了`bar()`这行函数调用的代码，所以`bar()`也被推入到栈中。执行完`bar()`函数中所有的代码后`bar()`出栈，依次重复这样的操作，直到栈中所有的任务执行完毕，栈为空。

##
