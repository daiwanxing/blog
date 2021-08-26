## 高德地图 web端使用指南

### 事件

1. Map 、 覆盖物 、 叠加层 绑定事件都是通过 object.on("事件名", "回调函数")来绑定， 解绑事件通过调用off函数来解绑


2. 销毁地图可以调用`destory()`方法， 在vue组件中建议在beforeUnMount的时候调用`AMap.destroy()` 并且对覆盖物、地图相关绑定的方法全部解绑

3. 监听地图加载完毕可以通过`map.on("complete", callback)`

地图、覆盖物、图层 都可以通过on方法绑定事件，off解绑事件

## 如何使用高德地图API？

一般通过安装`@amap/amap-jsapi-loader`这个package，可以方便我们使用高德地图一系列api。

```ts
AMap.load(config) // 会返回一个带有AMap对象的Promise
```
通过 `new AMap()` 生成一个地图实例`map`.

map中的`add`方法： `map.add(overlay)`一般用于添加覆盖物、图层
之类的到地图上，addControl则是添加控件.

高德地图的控件有： `AMap.Scale`, `AMap.ToolBar`, `AMap.OverView`等等。

Scale控件一般就是比例尺，在当前的缩放层级上，一小格是多少M/KM，

ToolBar控件集成了缩放、平移、定位等功能。

OverView 鹰眼控件，在地图右下角显示缩略图

## 海量图

海量图数据会随着地图的缩放，数据越加密集或者分散，

海量图的数据源得是一个数组，数组的每一项（数据项）数据格式不做要求，但必须包含点的坐标信息以及索引

海量图的`TopN`区域，是四叉树节点代表的区域，如果该区域内的视图面积小于一定阈值，则展示四叉树某一块区域内的所有点进行绘制，也称为TopN区域
海量图中图片的绘制性能要差于canvas，所以尽量使用canvas进行绘制