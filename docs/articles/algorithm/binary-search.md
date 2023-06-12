# 二分查找法

## 概念

> 二分查找算法，也称折半搜索算法、对数搜索算法，是一种在**有序数组**中查找某一特定元素的搜索算法。
>
> 搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数组大于> 或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使> 搜索范围缩小一半。

二分查找法示意图：

![https://upload.wikimedia.org/wikipedia/commons/f/f7/Binary_search_into_array.png](https://upload.wikimedia.org/wikipedia/commons/f/f7/Binary_search_into_array.png)

例如上面图中的这个数组：`[1, 3, 4, 6, 7, 9, 10, 13, 14]`，其数组长度为 9。如果要查找数据为 `7` 的是下标耗费的时是最短的。

因为中间元素恰好就是 `7` `（Math.floor(9 / 2) === 4）`。

那么，如果要查找的数据是 `10` 呢？

根据二分查找的定义，首先从数组的中间元素开始查找，如果要查找的元素小于数组的中间元素，则从小于中间元素的那一区间继续查找。如果要查找的元素大于数组中间的元素，则从大于中间元素的那一区间继续查找。

这个数组的中间元素是 `7`，由于 `10 > 7`，故从大于中间元素的区间继续查找：`[9, 10 ,13, 14]`

`[9, 10, 13, 14]` 的中间元素是：`index =（Math.floor(4 / 2)` 也就是 `13`。

由于 `10 < 13`，故从小于中间元素的区间继续查找：`[9, 10]`;

此时，数组的中间元素是 `10`，由于 `10 === 10`，匹配成功，退出查找。

## 代码实现

### 递归实现

```js
function binarySearch(data, target, start = 0, end = data.length) {
   if (!target) throw Error("need target params");

   const len = data.length;

   if (start > end) return -1;

   const middleIndex = Math.floor(start + (end - start) / 2);
   const middleItem = data[middleIndex];

   if (target === middleItem) return middleIndex;

   if (target < middleItem) {
      return binarySearch(data, target, start, middleIndex - 1);
   } else {
      return binarySearch(data, target, middleIndex + 1, end);
   }
}

console.log(binarySearch([1, 3, 4, 6, 7, 9, 10, 13, 14], 1)); // 0
```

### while 循环实现

```js
function binarySearch(data, target) {
  let value = -1;

  let start = 0;
  let end = data.length;

  while (start < end) {
    const middleIndex = Math.floor(start + (end - start) / 2);
    const middleItem = data[middleIndex];

    if (target == middleItem) {
      value = middleIndex;
      break;
    }

    if (target < middleItem) {
      end = middleIndex - 1;
    } else {
      start = middleIndex + 1;
    }

    if (end === start) value = middleIndex;
  }

  return
```

## 算法复杂度

**时间复杂度**: _O(log n)_ (n 在此处是数组的元素数量，O 是大 O 记号，_log_ 是对数)

**空间复杂度**: _O(1)_
