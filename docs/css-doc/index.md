## 用svg实现一个loading

1. background-size 设定两个值和设定一个值的区别

 ```css
        background-size: 100%; /* x轴的背景拉伸到容器的宽度，y轴auto */
        background-size: 100% 100%; /* x轴和y轴的宽高拉伸到容器的宽高 */
 ```

2. background-size: cover 和 contain 的区别

都是等比例缩放图片的宽高，区别在于contain总是会显示图片的全部的内容，不会发生裁剪，所以如果图片原始尺寸大于容器尺寸，会造成容器的一侧有一部分空白区域，而cover是将背景完全的覆盖到容器的区域，会发生裁剪，不会失真图片。



## animation 布局
