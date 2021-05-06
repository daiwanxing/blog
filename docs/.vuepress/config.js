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
                title: "浏览器相关",
                path: "/render-html/"
            },
            {
                title: "vue-router4 特性",
                path: "/vue-router/",
                sidebarDepth: 2
            },
            {
                title: "javascript相关知识",
                path: "/js/",
                sidebarDepth: 2
            }
        ]
    }
}