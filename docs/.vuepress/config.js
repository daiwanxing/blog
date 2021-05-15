module.exports = {
    title: '前端笔记小站',
    base: "/frontend-notes/",
    port: 8088,
    description: '用来记录自己平日的学习笔记',
    locales: {
        "/": {
            lang: "zh-CN",
            title: "前端学习小站"
        }  
    },
    themeConfig: {
        lastUpdated: '上次更新时间',
        logo: "/logo.png",
        sidebarDepth: 2,
        sidebar: [
            {
                title: "浏览器笔记",
                path: "/broswer-doc/"
            },
            {
                title: "vue-router4 笔记",
                path: "/vue-router4-doc/",
                sidebarDepth: 2
            },
            {
                title: "javascript 笔记",
                path: "/js-doc/",
                sidebarDepth: 2
            },
            {
                title: "css 笔记",
                path: "/css-doc/",
                sidebarDepth: 2
            }
        ]
    }
}