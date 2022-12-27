# 可选链和??的语法使用

可选链:  ?. chrome 80+支持

双问号: ?? chrome 85+支持

```js

const demo = {};

const res = demo?.name; // 如果demo.name存在返回demo.name的值，否则就是undefined

const subject = null;

const result = subject || 2; // 如果 ?? 前面的是null或者undefined则输出问号后面的值， 和 || 语法不同。

```