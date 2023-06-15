# 选择排序

## 概念

> 选择排序的工作原理是：在**未排序**序列中找到最小（大）元素， 存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小 （大）元素，然后放到已排序序列的末尾。 以此类推，直到所有元素均排序完毕。

### 动图演示

![https://fhfirehuo.github.io/Attacking-Java-Rookie/image/c3/ss-1.jpg](https://fhfirehuo.github.io/Attacking-Java-Rookie/image/c3/ss-1.jpg)

根据上面的动图，每一趟排序完毕后，都会将未排序的序列中某个元素放入到已排序序列的末尾。所以每次在未排序序列中的比较都是是已排序序列中的下个元素开始进行比较。

## 代码实现（降序）

```js
function selectedSort(data) {
   const len = data.length;
   for (let i = 0; i < len; i++) {
      let max = data[i];
      let maxIdx = i;
      for (let j = i + 1; j < len; j++) {
         const number = data[j];
         if (number > max) {
            max = number;
            maxIdx = j;
         }
      }
      if (maxIdx !== i) {
         const temp = data[i];
         data[i] = max;
         data[maxIdx] = temp;
      }
   }
   return data;
}

selectedSort([5, 1, 2, 9, -1, 10]); // [10, 9, 5, 2, 1, -1]
```

## 算法复杂度

**时间复杂度**: O(n<sup>2</sup>)

**空间复杂度**: O(1)

## 总结

选择排序算法不是一个稳定的算法。

在稳定的排序算法中，具有相同关键字的元素在排序后的顺序与排序前的顺序保持一致。然而，在选择排序中，当相同的元素出现在不同的位置时，它们的相对顺序可能会发生改变。

选择排序的基本思想是每次从未排序的元素中选择最小（或最大）的元素，然后将其放置在已排序序列的末尾。在这个过程中，如果相同的元素出现在不同的位置，它们可能会被交换到不同的位置，导致排序后它们的相对顺序发生变化。