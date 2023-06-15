# 插入排序

## 概念

插入排序（_Insertion-Sort_） 的算法描述是一种简单直观的排序算法。 它的工作原理是通过构建有序序列，对于未排序数据， 在已排序序列中从后向前扫描，找到相应位置并插入。 插入排序在实现上，通常采用 in-place 排序（即只需用到 O(1)的额外空间的排序）， 因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位， 为最新元素提供插入空间。

```js
function InsertionSort(data) {
   const len = data.length;

   for (let i = 1; i < len; i++) {
      const current = data[i];

      const sorted = data[j];

      let j = i - 1;

      while (j >= 0 && sorted > current) {
         data[j + 1] = sorted;
         j--;
      }

      data[j + 1] = current;
   }

   return data;
}
```
