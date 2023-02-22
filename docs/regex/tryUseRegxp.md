# 用正则解析字符串

## 解析一个 URL 中的 host,pathname 以及 hash

这是今天刷掘金遇到别人分享的一道面试题，但是题目并未要求用什么思路去解析。

例如，有一个如下的 URL

```http
https://chat.openai.com/chat/981b9ccc-abf1-4bce-9901-dd3d0f915b0b/#/redirect
```
需要你过滤出其中的 host、pathname 还有 hash。

解法有很多，可以自己去实现一个 parser。也可以借助相关的内置对象

例如 `URL` 对象。

```js
const url = new URL("https://chat.openai.com/chat/981b9ccc-abf1-4bce-9901-dd3d0f915b0b/#/redirect")

url.host; // chat.openai.com
url.hash; // #/redirect
url.pathname; // /chat/981b9ccc-abf1-4bce-9901-dd3d0f915b0b/
```

我想到了用正则完成这个需求

```md
https://chat.openai.com/chat/981b9ccc-abf1-4bce-9901-dd3d0f915b0b/#/redirect
```

仔细分析这个字符串，我们需要用到分组捕获三个匹配，这三个匹配分别是：

- `chat.openai.com`
- `/chat/981b9ccc-abf1-4bce-9901-dd3d0f915b0b/`
- `#/redirect`

要想匹配第一个分组，

```js
"https://chat.openai.com/chat/981b9ccc-abf1-4bce-9901-dd3d0f915b0b/#/redirect"
.match(/https?:\/\/([^\/]+)(.*(?=#))(.+)/)
```

这里用到了三个分组，第一个分组捕获 host, 第二个捕获 pathname, 最后一个捕获 hash。