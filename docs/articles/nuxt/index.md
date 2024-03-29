# Nuxt 学习之路

> 开设此专栏的目的是为了记录自己学习 Nuxt 这一技术的经历之路

## 什么是 Nuxt

Nuxt 官方宣称它是一个*全栈*的 Web 应用框架， Nuxt 天然集成 Vue，可以在 Nuxt 中使用 Vuejs 相关的语法和 API。

所以，学习 Nuxt 之前如果你已经会了 Vue，那么上手 Nuxt 要相对轻松很多。

## 为什么需要 Nuxt

我们用 Vuejs 可以开发极为复杂且交互繁杂的大型 Web 应用程序，但是 Vuejs 是运行在浏览器端并生成 HTML 文件，这导致如果你构建的 Web 应用程序很难被搜索引擎索引。因为，我们用 Vuejs 构建的 SPA 应用一开始只有一个空的 HTML 文件。

当客户端请求服务器这个 HTML 文件到浏览器时，搜索引擎索引到的仅是一个空白的 HTML 文件。

当这个 HTML 文件被下载到浏览器后，接着下载相关的脚本文件，这其中就有 Vue 相关的脚本，它会在浏览器中执行一系列 API并生成 HTML 字符串渲染到浏览器中。

我借用 Nuxt 官网文档的一张图可以表达的更加清楚。

![https://nuxt.com/assets/docs/concepts/rendering/dark/csr.svg](https://nuxt.com/assets/docs/concepts/rendering/dark/csr.svg)

Vuejs 开发的单页面应用由于只有一个 HTML，且内容完全是在客户端生成，这种内容渲染方式称之为客户端渲染（CSR），这种方式对于博客、购物、门户等网站来说非常不利用 SEO。

它们需要频繁、及时的被搜索引擎索引内容，但是由于客户端渲染方案需要等 JS 完成内容的渲染，这对于爬虫而言索引页面耗费的时间很长。

因此，这就是 Nuxt 诞生的原因。它既支持 CSR 也支持 SSR，还支持**通用渲染（CSR + SSR 的结合）**。（在 Nuxt 3 中对通用渲染进行了更一步的优化，拓展出了边缘渲染和混合渲染）

> Universal Rendering（通用渲染）是我认为 Nuxt 中一个最为折中的方法，它既能够在服务端渲染生成好的 HTML 内容，也能在客户端用 Vue 接管动态内容的渲染。
>
> 当浏览器请求启用了通用（客户端+服务器端）渲染的URL时，服务器会向浏览器返回完全渲染的HTML页面。无论页面是预先生成并缓存还是动态渲染的，Nuxt在服务器环境中运行JavaScript（Vue.js）代码，生成HTML文档。用户可以立即获取应用程序的内容，与客户端渲染相反。这一步类似于PHP或Ruby应用程序执行的传统服务器端渲染。

> 为了不失去客户端渲染方法的好处，例如动态接口和页面转换，一旦下载了HTML文档，客户端会在后台加载在服务器上运行的JavaScript代码。浏览器再次解释它（因此是通用渲染），Vue.js控制文档并启用交互。将静态页面变为可交互的过程称为“水合”。

> 通用渲染允许Nuxt应用程序提供快速的页面加载时间，同时保留客户端渲染的好处。此外，由于内容已经存在于HTML文档中，爬虫可以在没有额外负担的情况下索引它。

![https://nuxt.com/assets/docs/concepts/rendering/dark/ssr.svg](https://nuxt.com/assets/docs/concepts/rendering/dark/ssr.svg)

回到标题本身，为什么要学习 Nuxt？学习 Nuxt 除了让自己掌握一门新技术，提升自己的竞争能力之外。如果公司需要对某个新产品要求要支持 SEO，那么 Nuxt 就能派上用场了，最后还能对纯前端开发者理解 SSR 拓展新的知识广度。

