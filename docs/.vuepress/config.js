
const themeConfig = {
    darkMode: true,
    lastUpdated: true,
    lastUpdatedText: "上一次更新时间",
    logo: "/logo.png",
    repo: "https://github.com/daiwanxing/frontend-notes",
    repoLabel: "GitHub",
    sidebar: {
        '/guide/': [
            {
                text: 'CSS章节',
                link: "/guide/css-doc",
                activeMatch: "/"
            },
            {
                text: "浏览器章节",
                link: "/guide/broswer-doc"
            },
            {
                text: "JavaScript章节",
                link: "/guide/js-doc"
            },
            {
                text: "Vue章节",
                link: "/guide/vue-doc",
                children: [
                    {
                        text: "Vue3 源码",
                        link: "/guide/vue-doc/vue3.md",
                    }
                ]
            },
            {
                text: "ts章节",
                link: "/guide/ts-doc"
            }
        ]
    },
    editLink: false
}

module.exports = {
    title: '前端笔记小册',
    lang: "zh-CN",
    base: "/frontend-notes/",
    description: '总结、归纳、提炼',
    port: 8088,
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
    // themeConfig 的配置项属于主题配置
    themeConfig,
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        '@vuepress/nprogress',
        '@vuepress/medium-zoom'
    ]
}