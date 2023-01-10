# 探寻正则的基础知识 🎨

## 如何生成一个正则表达式

在 JavaScript 中想要创建一个正则表达式有两种办法

```js
const regex_01 = /your_regex/;

const regex_02 = new RegExp(your_regex);
```

大部分人都会偏好第一种方式，因为代码量更少，可以少敲几个按键，我也同样喜欢第一种方式创建一个正则。正则表达式里的内容可以称之为`pattern`，该 `pattern` 负责匹配输入的字符串里的子串。

:::info 提示
上述两种方式创建的正则表达式并无性能上的区别。
:::

先来一个最为简单的匹配例子, 编写一个正则表达式匹配`Hello`是否是输入的字符串中的子串

```ts
const input_str = "Hello RegEx!";

/Hello/.test(input_str); // true
```

这种精确匹配当然是毫无意义的，我们之所以用正则是因为垂涎它的模糊匹配功能。

## 模糊匹配

那么什么是模糊匹配？模糊匹配是灵活的，是有条件的对字符串进行匹配的。

例如我们想匹配子串在输入的字符串中可以出现多次也可以一次都不出现

```ts
const input_str = "foo bar baz oooh!";

input_str.match(/o{1,3}/g); // ["oo", "ooo"]
```

这里用到了量词`{m,n}`， 含义是字符`o`在字符串中至少出现 1 次，最多出现 3 次， 后面的`g`是修饰符`global`的缩写, 表示的是全局匹配。

至于修饰符是何物，看官您先别着急， 后面的章节会拎出来讲下.

上面的这个正则的可视化的形式如下图所示：

<iframe frameborder="0" width="100%" height="120" src="https://jex.im/regulex/#!embed=true&flags=&re=o%7B1%2C3%7D"></iframe>

您也可以在线通过 [regulex](https://jex.im/regulex/#) 这个正则的可视化网站进行查看。

除了形如`{m,n}`这种量词的模糊匹配，还有限定在某些字符范围内的字符组匹配。

例如，我想从`hello world`中仅匹配`e`,`w`,`d`这三个字符, 可以通过`/[ewd]/`限定匹配的范围，表示匹配一个字符，它可以是"e"、"w"、"d"之一。

```ts
const input_str = "hello world";

input_str.match(/[ewd]/g); // ["e", "w", "d"]
```

如果要限定匹配的范围仅为小写字母，我们可以这样写`[a-z]`,表示匹配一个字符，字符可以是小写的字母 a-z，如果还要匹配限定范围内的特殊字符，例如`/`,`?`，可以使用转义符`[\?\/a-z]`。

那如果我们想匹配非`a-z`中的任意其他字符呢？

可以在方括号中使用`^`表示排除范围内的字符`[^a-z]`, 这样就无法匹配`a-z`中的字符了

<iframe frameborder="0" width="100%" height="120" src="https://jex.im/regulex/#!embed=true&flags=&re=%5B%5Ea-z%5D"></iframe>

相信你已经见识到了正则中字符组匹配与量词匹配的强大之处了，当然这还只是开胃菜了，咱们接着往下说。

## 修饰符

## 量词

## 字符组
