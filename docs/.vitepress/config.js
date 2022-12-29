export default {
   title: "daiwanxing的日志",
   lang: "zh-CN",
   lastUpdated: true,
   ignoreDeadLinks: true,
   base: "/frontend-notes/",
   description:
      "一个developer将这几年开发生涯中走过的弯路、学到的技术以及总结的经验写下来给自己看的一本碎碎念的日志",
   head: [
      [
         "link",
         {
            rel: "icon",
            href: "/logo-32x32.ico",
            type: "image/x-icon",
            size: "32x32",
         },
      ],
      [
         "link",
         {
            rel: "icon",
            href: "/logo-64x64.ico",
            type: "image/x-icon",
            size: "64x64",
         },
      ],
      [
         "link",
         {
            rel: "icon",
            href: "/logo-128x128.ico",
            type: "image/x-icon",
            size: "128x128",
         },
      ],
      [
         "link",
         { rel: "apple-touch-icon", href: "/logo-32x32.ico", size: "32x32" },
      ],
   ],
   themeConfig: {
      lastUpdatedText: "最近一次更新于",
      sidebar: {
         "/js/": [
            {
               text: "javascript",
               items: [
                  {
                     text: "聊聊requestAnimationFrame",
                     link: "/js/requestAnimationFrame",
                  },
                  {
                     text: "WeakMap&WeakSet",
                     link: "/js/WeakMap&WeakSet",
                  },
               ],
            },
         ],
         "/ts/": [
            {
               text: "typescript",
               items: [
                  {
                     text: "typescript练习题",
                     link: "/ts/",
                  },
                  {
                     text: "类型系统",
                     link: "/ts/type-narrow.md",
                  },
                  {
                     text: "如何配置tsconfig.json",
                     link: "/ts/tsconfig.md",
                  },
                  {
                     text: "declare关键字的使用",
                     link: "/ts/declare.md",
                  },
                  {
                     text: "三斜线指令是什么",
                     link: "/ts/three-triple-line.md",
                  },
               ],
            },
         ],
      },
      nav: [
         { text: "javascript", link: "/js/", activeMatch: "/js/" },
         { text: "typescript", link: "/ts/", activeMatch: "/ts/" },
         { text: "css", link: "https://github.com/..." },
         {
            text: "其他",
            items: [
               {
                  items: [{ text: "告别2022", link: "..." }],
               },
            ],
         },
      ],
      socialLinks: [{ icon: "github", link: "https://github.com/daiwanxing" }],
   },
};
