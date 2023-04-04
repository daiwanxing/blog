<script setup>
import linearExample from './components/linear-example.vue';
</script>

# CSS3 渐变

`CSS` 渐变可以分为：线性渐变、径向渐变和锥形渐变三种，渐变不能使用 `transition` 进行颜色值的过渡，因为渐变最终呈现的只是一张图片，无法对图片进行过渡。

渐变的一大特点是可以创建多种颜色并指定渐变的角度。

大部分人使用最多的应该是线性渐变，也是最简单的渐变，只需要指定两种以上的颜色，就能创建一个平滑的颜色过渡渐变。

`CSS3` 渐变被划分在了 [`CSS Images Module Level 3`](https://www.w3.org/TR/css-images-3/#linear-gradients) 中，它属于 CSS3 中的图像模块规范，我们可以点击查看每个属性的最新规范定义。

### 线性渐变

线性渐变通过使用 `linear-gradient()` 函数创建，可以设置渐变的角度从指定方向开始渐变。

例如：

```css
div {
   /* to right 是一个角度的关键字，会被解析成 90deg, 而 to top 解析成 0deg */
   background: linear-gradient(to right, blue, yellow);
}
```

<linearExample show1 />

角度可以使用一系列的关键字值，也可以使用具体的数值和单位。缺省角度值为 180deg (也就是 to bottom)；

> For the purpose of this argument, 0deg points upward, and positive angles represent clockwise rotation, so 90deg point toward the right.

> The unit identifier may be omitted if the \<angle\> is zero.

除了渐变的方向可以使用具体的数值外，还可以对渐变的颜色使用数值表示渐变的开始位置和停止位置。

<linearExample show2 />

```css
.box-2 {
   background: linear-gradient(3.3deg, blue 30% 50%, yellow 50% 70%, red 80%);
}
```
