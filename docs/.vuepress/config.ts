import type { SidebarConfig } from '@vuepress/theme-default';


const sidebar: SidebarConfig = {
    '/guide': [
        {
            text: "指南",
            children: [
                '/guide/css-doc/index.md',
                '/guide/broswer-doc/index.md',
                '/guide/js-doc/index.md',
                '/guide/vue-doc/index.md',
                '/guide/ts-doc/README.md',
                '/guide/gd-map/README.md'
            ]
        }
    ]
}

const themeConfig = {
    darkMode: true,
    lastUpdated: true,
    lastUpdatedText: "上一次更新时间",
    logo: "/logo.png",
    repo: "https://github.com/daiwanxing/frontend-notes",
    repoLabel: "GitHub",
    sidebar: sidebar,
    editLink: false,
    contributors: false,
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
        ['link', { rel: 'icon', href: '/frontend-notes/whale-16x16.png', type: "image/png", sizes:"16x16" }],
        ['link', { rel: 'icon', href: '/frontend-notes/fav.png', type: "image/png", sizes:"32x32" }],
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