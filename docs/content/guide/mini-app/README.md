# 微信小程序开发笔记


1. 为什么建议替换Page采用Component构建页面

流行的VantUI都是采用Component构造器构造页面的，主要是Component构造器可以实现计算属性，以及observers对props、data内数据的监听。另外还有behaviors可以实现类型Vue中的mixins实现逻辑复用。

关于page的生命周期和Component的生命周期执行顺序:

```js
// 组件实例被创建 到 组件实例进入页面节点树
component created -> component attched -> 
// 页面页面加载 到  组件在视图层布局完成
page onLoad -> component ready -> 
// 页面卸载 到 组件实例被从页面节点树移除
page OnUnload -> component detached
```