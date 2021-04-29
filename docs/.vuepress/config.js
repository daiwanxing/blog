module.exports = {
    title: '前端笔记小站',
    base: "/frontend-notes/",
    description: '用来记录自己平日的学习笔记',
    themeConfig: {
        logo: "/logo.png",
        sidebarDepth: 2,
        sidebar: [
            {
                title: "网页渲染",
                path: "/render-html/"
            },
            {
                title: "vue-router4 特性",
                path: "/vue-router/",
                sidebarDepth: 2
            },
            {
                title: "js语法疏漏",
                path: "/js/"
            }
        ]
    }
}