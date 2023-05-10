# 在 Nuxt 中异步请求数据

Nuxt 中内置了几个开箱即用的请求数据方法。

它们分别是：

- `$fetch`
- `useFetch`
- `useLazyFecth`
- `useAsyncData`
- `useLazyAsyncData`

我第一次认识到在 Nuxt 中有这么多调用 API 的方法时，内心是懵逼的。不明白 Nuxt 的开发者为什么要创建这么多的请求 API 的方法。

好在他们的官方文档描述的很清楚，每个 API 都过一遍后，结合实际使用就能上手了。

## $fetch

`$fetch` 是基于 [`unjs/ofetch`](https://github.com/unjs/ofetch) 而来的，`$fetch` 会执行两次调用请求，第一次请求发生在服务端，第二次请求发生在客户端。

为什么要触发两次调用呢？根据文档的解释，是因为 `$fetch` 并不会自动序列化响应数据并传输到客户端。也就是 `$fetch` 拿到的数据不会挂载到 `window.__NUXT` 上了。

当然我们也可以做一些处理，只让它在服务端上运行。但是在客户端就拿不到这个数据了。

```js
// 仅在服务端执行请求
if (process.server) {
    const data = await $fetch("/artcile/detail");
}

// 此时，如果该组件已经在客户端执行后，则无法获取到 data 的数据。因为 $fetch 并不会传输数据到客户端。
```

## useFetch

`useFetch` 这个 API 用来异步请求数据，它的执行时机由打开页面的方式而决定，假设 B 页面需要请求很多接口，用户从 A 页面导航到 B 页面，那么这些请求是客户端发出。

如果是初次打开的页面就是 B 页面，则这些请求会在服务端进行。换言之，`useFetch` 的具体请求场合根据是否用户初次打开页面而决定。`useFetch` 的执行只会发生在 CSR 或者 SSR 中的其中一个。

```js
const { data, pending } = await $fetch("/artcile/detail");
```

> `useFetch` 会 block 掉导航（仅在 CSR 期间），这句话的意思是只有当请求接口的数据返回成功或者失败后，才会导航页面。如果不希望请求的数据会
> 阻塞导航，可以使用 `useLazyFetch`，这个 API 不会阻塞导航，而是优先导航页面，当数据返回过来后再填充数据到页面中。