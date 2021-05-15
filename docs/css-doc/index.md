## 用svg实现一个loading

1. background-size 设定两个值和设定一个值的区别

 ```css
        background-size: 100%; /* x轴的背景拉伸到容器的宽度，y轴auto */
        background-size: 100% 100%; /* x轴和y轴的宽高拉伸到容器的宽高 */
 ```

2. background-size: cover 和 contain 的区别

都是等比例缩放图片的宽高，区别在于contain总是会显示图片的全部的内容，不会发生裁剪，所以如果图片原始尺寸大于容器尺寸，会造成容器的一侧有一部分空白区域，而cover是将背景完全的覆盖到容器的区域，会发生裁剪，不会失真图片。


dwx的作业：
 
1. 手写一个 loading （svg 和 css两种实现）
2. 吃透linear-gradient 知识
3. 像img和input这种可替换的元素，设置伪元素是无效的

4. setInterval和setTimeout，在你给的delay值小于1s，且当前tab处于inactive的时候，chrome会自动将delay改为1s,tab处于active的时候又会改回你设置的delay值