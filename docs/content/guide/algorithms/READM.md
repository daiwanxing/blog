## 链表 (Linked-list)

### 数组
在JavaScript这门动态语言中，数组这一数据结构的实现在JS层面本质上也是一个Object，因其动态分配size的特性，性能不及静态语言的Array。

### 链表

链表是一组节点组成的集合，每一个节点都使用一个对象的引用指向它的后继。指向另一个节点的引用叫链，链表中的每一个节点由头节点和尾节点组成，头节点通常存储数据，尾节点存储后继节点的引用（链表中的最后一个节点的尾节点通常指向一个值为`null`的节点）。

### 为什么链表大部分场景性能优于数组

#### 插入、删除操作

在数组中，插入一个元素到数组内的某个位置，都需要重新索引整个数组，（尾部插入则不需要索引整个数组），动态调整数组的长度，这对于一个smaller数组而言这点性能开销可以完全忽略不计，但是数组项足够大的场景下，例如存储某个数组存储了1万条数据，往数组头部插入一个数据后，整个数组将要重新索引，每个数组项的下标都需要进行改变，这是较为耗费时间的，总耗时为O(N), 其中N为数组的长度。

而对于一个链表而言，没有索引维护的开销，插入某个元素到指定节点，只需要将新元素链接到指定节点后，以及断开指定的节点下一个引用，并将该引用作为新元素的下一个节点，无论链表的节点有多少个，其操作时间永远为O(1)。

<blockquote>参考链接：<a herf="https://medium.com/nerd-for-tech/why-use-a-linked-list-instead-of-an-array-f75cdebaad22">Why Use A Linked List Instead Of An Array?</a></blockquote>

### 链接的种类

1. 单链表 (Single-linked-list)

    第一个节点即为链表的头部，通常也用head元素来定义.

2. 双链表 (double-linked-list)

    和单链表不同的是，链表的每一个节点不仅存储了`next`也同时存储了`previous`，头节点的`previous`和尾节点的`next`为null.

3. 循环链表
    链表的尾节点的`next`的引用永远指向头节点.


## 算法

### 快速排序

快排是一种处理大数据集最快的排序算法之一，是一种采用递归算法、分而治之将数据分解成包含较小和较大的不同子序列。

算法的核心是采用递归，每次切分后将切分的数组第一个元素视作为基准值(pivot)，将比pivot大的值放置在右侧，比它小的放置在左侧。接着再次递归调用当前函数并将切分后的数组传递，当切分到最小个数时，也就是数组的长度为0，则将这些切分后的数组连结起来变成一个有序数组。


```ts
// 快速排序法
function qSort(list: number[]): any {
    if (list.length === 0) return [];
    // 选择第一个数为基准值
    const pivot = list[0];
    round++;
    // 将小于pivot的值放置在左边，大于Pivot的值置于右边
    const left = [];
    const right = [];
    for (let idx = 1; idx < list.length; idx++) {
        const val = list[idx];
        if (val < pivot) {
            left.push(val);
        } else {
            right.push(val);
        }
    }

    return qSort(left).concat(pivot, qSort(right));
}

const mockData = [];

for (let idx = 0; idx < 100; idx++){
    mockData.push(Math.round(Math.random() * 1000));
}

console.log(qSort(mockData));
```

## 二分查找