# ref Vs ShallowRef

Vue 3 声明一个响应式变量提供了 `ref` 和 `reactive` 两种 API。

我平常会根据业务的需要，选择合适的响应式 API。

本文主要想说说 ref 和 shallowRef 我对这两个 API 的理解。

`ref` 和 `shallowRef` 两个方法的签名都是一致，不同之处在于，`shallowRef` 只会监听 `.value` 的值的变化，如果 `shallowRef` 接收的是一个对象，那么对象的值的变化，是无法被 Observer 的。
