---
title: 玩转Intl.DateTimeFormat
description: JS内置的日期格式化对象Intl.DateTimeFormat
---

# Intl.DateTimeFormat 揭秘

## 前言

在日常的业务开发中， 你也许会遇到对日期的格式化处理的需求，比如将 `new Date.now()` 格式化成 `YYYY年 MM月 DD日 HH时MM分SS秒`，又或者将其格式化成 `2023癸卯年正月十二星期日`。

这看起来似乎也不算很难，我们可以借助 `moment.js` 或者 `dayjs` 等相关的日期格式化的库解决这类问题，毕竟 JS 内置的 `Date` 对象在日期格式化方面的能力太弱了。

但引入库也是有格外的 bundle 开销的，像 `momentjs` 这类体积过于庞大且无法 `tree-shake` 的库，已经淡出了开发者的视线。幸好我们迎来了 `dayjs` 这类轻巧的（不安装格外的插件下打包最小 2kb）且支持 `immutable` 以及 `tree-shake` 的插件，看起来已经很完美了。

其实，有个可能鲜为人知的内置日期对象早在 2012 年提供对日期的灵活转换了，那就是 `Intl.DateTimeFormat`。由于刚出来的时候兼容性不佳且有很多 API 还未完善，很少有人提起过。

但是在2023年的今天，如果你不考虑兼容太过老旧的浏览器的话，已经可以放心去使用 `Intl.DateTimeFormat` 全部 API 了。

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

接下来一起看看有哪些可用的属性。

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
dateStyle` 可以与 `timeStyle` 一起使用，但不能与其他配置项（例如`week`、`hour`、`month`等）一起使用(`timeStyle同样如此`)。
:::

## calendar

`calendar`属性指定调用 `format()` 时使用的本地国家传统日历格式样式，例如中国有[农历甲子年](https://baike.baidu.com/item/%E4%B8%80%E7%94%B2%E5%AD%90/10167980?fromModule=lemma_inlink)。

可取的值如下：

> "buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic", "gregory", "hebrew", "indian", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "iso8601", "japanese", "persian", "roc", "islamicc".


```js
// 2023癸卯年正月廿二星期日
new Intl.DateTimeFormat("zh", { dateStyle: "short", calendar: "chinese" }).format();
```

## dayPeriod

`dayPeriod`属性指定调用 `format()` 时使用的时间段。例如 `上午`、`下午`。

`dayPeriod` 可枚举的值有：`narrow`, `short`, `short`，不过在中文和英语中，这三个值毫无区别。


```js
// 下午
new Intl.DateTimeFormat("zh", { dayPeriod: "long" }).format();

// in the evening
new Intl.DateTimeFormat("en-US", { dayPeriod: "long" }).format();
```

:::warning 注意
`dayPeriod` 无法和 `dateStyle` 或 `timeStyle` 一同使用。
:::

## hour12

`hour12`属性指定调用 `format()` 时是否使用的 12 小时制来表示时间。可枚举的值有: `true`、`false`。

```js
// 下午06:55:26
new Intl.DateTimeFormat("zh", { timeStyle: "medium", hour12: true }).format();
// 6:57:19 PM
new Intl.DateTimeFormat("en-US", { timeStyle: "medium", hour12: true }).format();
```

## weekday,year,month,day

前面说过 `timeStyle` 和 `dateStyle` 是不能与 `weekday`,`year`等属性一起使用的，那么这些属性的用途是什么呢？

回顾上文中的各种示例，我们都是围绕日期与时间进行格式化操作，其中日期最小的格式化是缩小到了`年`、`月`和`日`。

假如我们只需要格式化 `月` 或者 `年`，`周`这种最细粒度的日期单位的话，这些属性就能派上用场了。

我在下面的表格中列出来了在格式化输出中使用的日期和时间格式以及允许值

| Property        |                Values           |
| ------------ | :--------------------------------: |
| weekday       | `narrow`, `short`, `long` |
| year      |       `2-digit`, `numeric`   |
| month     |   `2-digit`, `numeric`, `narrow`, `short`, `long`    |
| day     |   `2-digit`, `numeric`    |
| hour     |   `2-digit`, `numeric`     |
| minute     |   `2-digit`, `numeric`     |
| second     |   `2-digit`, `numeric`     |

- `2-digit` 表示两位数表示法
  - ```js
    // 输出 02月
    new Intl.DateTimeFormat("zh", { month: "2-digit"}).format();
    ```
- `numeric` 一位数表示法
  - ```js
    // 输出 2月
    new Intl.DateTimeFormat("zh", { month: "2-digit"}).format();
    ```
- `short` 
  - 日期的简写，在英语语言中，例如 weekday 中 `Friday` 会格式成 `Fri`
  - 在中文语言中，星期日 会被格式成 `周日`
- `long`
  - 日期的完整书写，在英语语言中，例如 weekday 中 `Friday` 会被完整格式成 `Friday`
  - 在中文语言中，例如星期日会被完整格式成 `星期日`
- `narrow`
  - 日期的最短简写，在英语语言中，例如 weekday 中 `Friday` 会取单词第一个字母格式成 `F`
  - 在中文语言中，例如星期日会被完整格式成 `日`

更多的属性以及允许值我们可以从 tc39 中 [proposal-intl-datetime-style](https://tc39.es/proposal-intl-datetime-style/) 一章节查阅

## Intl.DateTimeFormat对象实例

上文说了很多关于 options 对象的部分属性作用，其实还有很多的并不常用的属性本文并未进行讨论，读者若感兴趣可以在 mdn 上找到更多详细的内容。

现在将视野回到 `Intl.DateTimeFormat` 生成的实例上，`DateTimeFormat` 实例的 `format` 方法会根据 `options` 配置项以及 `locales` 格式化日期内容，当调用 `format()` 方法默认根据当前的日期格式化，我们也可以传递一个指定的 `Date` 或者 `日期时间戳` 对其格式化。

```js
// 2022年3月31日
new Intl.DateTimeFormat("zh", { dateStyle: "medium" }).format(new Date("2022-03-31 00:00:01"));

// 2022年3月31日
new Intl.DateTimeFormat("zh", { dateStyle: "medium" }).format(1648656001000);
```

## 总结

通过以上的例子，我们了解到了 `Intl.DateTimeFormat` 的使用方式，`Intl.DateTimeFormat` 是一个日期格式化对象。可以指定不同国家的语言字符串，以及配置相关属性实现强大的日期格式化操作。

如果在业务中，我们只需要对日期进行格式操作，可以完全不用依赖 `dayjs`等相关库，借助内置的 API，既能减少一个 package 的安装，而且还可以实现我们的业务需求。