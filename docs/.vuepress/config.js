module.exports = {
    title: '前端笔记小册',
    base: "/frontend-notes/",
    port: 8088,
    description: '用来记录自己平日的学习笔记',
    locales: {
        "/": {
            lang: "zh-CN",
            title: "前端笔记小册"
        }  
    },
    head: [
        ['link', { rel: 'icon', href: '/fav.ico'}],
        ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0"}]
    ],
    themeConfig: {
        search: true,
        lastUpdated: '上次更新时间',
        logo: "/logo.png",
        sidebarDepth: 2,
        sidebar: [
            {
                title: "浏览器笔记",
                path: "/broswer-doc/",
            },
            {
                title: "vue-router4 笔记",
                path: "/vue-router4-doc/",
            },
            {
                title: "javascript笔记",
                path: "/js-doc/",
            },
            {
                title: "css 笔记",
                path: "/css-doc/",
            },
            {
                title: "Vue3响应式系统简单实现",
                path: "/js-doc/reactive"
            },
            {
                title: "自用封装的简单工具类",
                path: "/tool-kit/"
            },
            {
                title: "常用浏览器内核版本",
                path: "/tool-kit/core.md"
            },
            {
                title: "Vue笔记",
                path: "/vue-doc/"
            },
            {
                title: "业务笔记",
                path: "/business-doc/"
            }
        ]
    }
}