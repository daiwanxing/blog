## 高德地图 web端使用指南

### 事件

1. Map 、 覆盖物 、 叠加层 绑定事件都是通过 object.on("事件名", "回调函数")来绑定， 解绑事件通过调用off函数来解绑


2. 销毁地图可以调用`destory()`方法， 在vue组件中建议在beforeUnMount的时候调用`AMap.destroy()` 并且对覆盖物、地图相关绑定的方法全部解绑

3. 监听地图加载完毕可以通过`map.on("complete", callback)`