---
title: 玩转Intl.DateTimeFormat
description: JS内置的日期格式化对象Intl.DateTimeFormat
---

# Intl.DateTimeFormat 揭秘

## 前言

在日常的业务开发中， 你也许会遇到对日期的格式化处理的需求，比如将 `new Date.now()` 格式化成 `YYYY年 MM月 DD日 HH时MM分SS秒`，又或者将其格式化成 `2023癸卯年闰二月12星期日`。

这看起来似乎也不算很难，相信你脑海里第一时间想到的是借助 `moment.js` 或者 `dayjs` 这类的日期操作库去解决这类问题，毕竟内置的 `Date` 对象缺少太多灵活格式化的 API 了。

但引入库也是有格外的 bundle 开销的，像 `momentjs` 这类体积过于庞大且无法 `tree-shake` 的库，渐渐淡出了开发者的视线。幸好我们等来了 `dayjs` 这类轻巧（不安装格外的插件下打包最小 2kb）且支持 `immutable` 的插件，看起来已经很完美了。

其实，有个可能鲜为人知的内置日期对象早在 2012 年提供对日期的灵活转换了，那就是 `Intl.DateTimeFormat`。由于刚出来的时候兼容性不佳且有很多 API 还未完善，很少有人提起过。

但是在今天，如果你不考虑兼容 `chrome76` 以下的版本的话，可以放心去使用 `Intl.DateTimeFormat` 全部 API 了。

![](https://awesomescreenshot.s3.amazonaws.com/image/3951069/37019360-0d97c8d0400f7c023150f18b16361947.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20230212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230212T084953Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=2ad61e9f2cb8f5eec3d8b9589d86ae9bbc04107e142cefb7e4e4750264c8203a)

## 认识 Intl.DateTimeFormat

> Intl.DateTimeFormat 对象能使日期和时间在特定的语言环境下格式化。

`Intl.DateTimeFormat`函数需要通过 `new` 关键字构造调用并返回一个 `Intl.DateTimeFormat` 对象。

> 注：其实也可以不需要通过 `new` 关键字构造调用， 但不使用 `new` 会导致非预期的行为，例如 `this` 可能会指向另一个`Intl.DateTimeFormat`。

`Intl.DateTimeFormat`构造函数接收两个参数，这两个参数都是可选的。

第一个参数是 `locales`, 可以理解为需要 `format` 的日期语言是哪国的， `locales` 可以是一个 `Array<string>` 也可以是 `string`。

```js
// 如果是一个数组，则意味着指定多个 fallback language
// 在本例中，如果指定的日期内容无法被`zh-Hant`匹配，则继续往左匹配 `zh`，如果 `zh` 也没有匹配到，则会使用默认值
// match-pattern 可以通过 https://datatracker.ietf.org/doc/html/rfc4647#section-3.4 查阅
Intl.DateTimeFormat(["zh", "zh-Hant"]);

Intl.DateTimeFormat("zh");
```

第二个参数 `options` 给定一个具有多个属性的对象，用于指定如何格式给定的日期内容。

## dateStyle

`dateStyle`属性指定调用 `format()` 时使用的日期格式样式，其枚举值如下：

-  `full`， 格式的日期内容包含`年月日`以及`本周的星期几`
-  `long`， 格式的日期内容包含`年月日`
-  `medium`，格式的日期内容包含`年月日`（如果 `locale` 为 `en-US`等英语语言，则月份的单词是简写形式，例如 `February` 会被输出 `Feb`）
-  `short`，格式的日期内容包含`年月日`（拼接日期的单位会被简写符号替代，例如`/`,`-`）

## 示例

```js
// 输出 2023年2月12日星期日
new Intl.DateTimeFormat("zh", { dateStyle: "full" }).format();
// 输出 2023年2月12日
new Intl.DateTimeFormat("zh", { dateStyle: "long" }).format();
// 输出 2023年2月12日
new Intl.DateTimeFormat("zh", { dateStyle: "medium" }).format();

// `long` 和 `medium`在英语中书写有区别
// February 12, 2023
new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format();
// Feb 12, 2023
new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format();

// 2023/2/12 （short不会拼接日期单位）
new Intl.DateTimeFormat("zh", { dateStyle: "short" }).format();
```

## timeStyle

`timeStyle`属性指定调用 `format()` 时使用的时间格式样式，其枚举值如下：

- `full`，格式的时间内容包含`国家`，`时`，`分`，`秒`
- `long` , 格式的时间内容包含`时区`，`时`，`分`，`秒`
- `medium`，格式的时间内容包含`时`，`分`，`秒`
- `short`，格式的时间内容包含`时`，`分`

## 示例

```js
// 中国标准时间 17:37:16
new Intl.DateTimeFormat("zh", { timeStyle: "full" }).format();
// GMT+8 17:37:21
new Intl.DateTimeFormat("zh", { timeStyle: "long" }).format();
// 17:37:37
new Intl.DateTimeFormat("zh", { timeStyle: "medium" }).format();
// 17:37
new Intl.DateTimeFormat("zh", { timeStyle: "short" }).format();

// 5:38:02 PM GMT+8
new Intl.DateTimeFormat("en-US", { timeStyle: "long" }).format();
// 5:37:58 PM
new Intl.DateTimeFormat("en-US", { timeStyle: "medium" }).format();
// 5:37 PM
new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format();
```

:::warning 提醒
`dateStyle` 可以与 `timeStyle` 一起使用，但不能与其他选项（例如工作日、小时、月份等）一起使用(`timeStyle同样如此`)。
:::