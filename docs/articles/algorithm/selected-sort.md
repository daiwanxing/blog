# 选择排序

## 概念

> 选择排序的工作原理是：在**未排序**序列中找到最小（大）元素， 存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小 （大）元素，然后放到已排序序列的末尾。 以此类推，直到所有元素均排序完毕。


选择排序是最稳定的算法之一，因为算法复杂度与其数据量没有任何关系，时间复杂度恒等于 *O(n<sup>2</sup>)*

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

**时间复杂度**: O(n2)

**空间复杂度**: O(1)
