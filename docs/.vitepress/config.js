import catalog from "../genCatalog";
import { defineConfig } from "vitepress";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { sitebase } from "../config";
import { articleRef } from "./helper";
import path from "node:path";

export default defineConfig({
   title: "Wonder Dai的博客",
   description: "一个关于所有我接触到的前端知识记录的网站",
   lang: "zh-CN",
   lastUpdated: true,
   base: sitebase,
   markdown: {
      externalLinks: {
         target: "_blank",
         rel: "nofollow noopener noreferrer",
      },
   },
   head: [
      [
         "link",
         {
            rel: "icon",
            href: `${sitebase}startup.ico`,
            type: "image/x-icon",
            size: "32x32",
         },
      ],
      [
         "link",
         {
            rel: "apple-touch-icon",
            href: `${sitebase}startup.ico`,
            size: "32x32",
         },
      ],
      [
         "meta",
         {
            name: "keywords",
            content:
               "技术博客,Dai的技术博客,前端博客,JavaScript博客,CSS博客,TypeScript博客",
         },
      ],
      [
         "meta",
         {
            name: "google-site-verification",
            content: "kRWzKjC0N0Yp71d-ty7YSgTff9lcENF9_t20iF_Lq5o",
         },
      ],
      [
         "script",
         {
            src: "https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID",
            async: true,
         },
      ],
      [
         "script",
         {
            src: `${sitebase}gtag.js`,
         },
      ],
      [
         "link",
         {
            importance: "high",
            rel: "preload",
            href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
         },
      ],
      [
         "link",
         {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
         },
      ],
   ],
   themeConfig: {
      logo: "/logo.svg",
      lastUpdatedText: "最近一次更新于",
      sidebar: {
         "/articles/git/": [
            {
               text: "Git Category",
               items: [
                  {
                     text: "Git 操作命令",
                     link: "/articles/git/"
                  }
               ]
            },
         ],
         "/articles/javascript": [
            {
               text: "JavaScript Category",
               items: [
                  {
                     text: "对时间切片的理解",
                     link: "/articles/javascript/time-slice"
                  },
                  {
                     text: "发布订阅模型",
                     link: "/articles/javascript/pub-sub.model"
                  },
                  {
                     text: "反复被提及的事件循环",
                     link: "/articles/javascript/event-loopV2"
                  },
                  {
                     text: "Intl.DateTimeFormat 揭秘",
                     link: "/articles/javascript/Intl.DateTimeFormat"
                  },
                  {
                     text: "JavaScript 内存管理探秘（译）",
                     link: "/articles/javascript/memory-discover"
                  },
                  {
                     text: "CMD 和 ESM",
                     link: "/articles/javascript/module-system"
                  },
                  {
                     text: "性能利器 - Web-Worker",
                     link: "/articles/javascript/web-worker"
                  },
                  {
                     text: "Symbol 元属性",
                     link: "/articles/javascript/metaPropertyAboutSymbol"
                  }
               ]
            }
         ],
         '/life/': [
            {
               text: "My Life",
               link: "/life/",
            },
            {
               text: "2022-12-31",
               link: "/life/2022-12-31"
            }
         ],
      },
      nav: [
         {
            text: "🎯技术文章",
            items: [
               {
                  text: "JavaScript",
                  link: articleRef("javascript/time-slice"),
               },
               {
                  text: "CSS",
                  link: articleRef("css"),
               },
               {
                  text: "前端算法",
                  link: articleRef("algorithm"),
               },
               {
                  text: "git常见操作",
                  link: articleRef("git/"),
               },
               {
                  text: "小程序踩过的坑",
                  link: articleRef("mini-program"),
               },
            ],
         },
         { text: "✏️生活", link: "/life/", activeMatch: /life/ },
         { text: "我的 follow", link: "/follow/" },
         { text: "关于我", link: "/about/" },
      ],
      socialLinks: [
         { icon: "github", link: "https://github.com/daiwanxing" },
         { icon: "twitter", link: "https://twitter.com/OcovqgH046VC8u2" },
      ],
      algolia: {
         apiKey: "ae81d80179c619f04fa6af80a06fbb47",
         appId: "RTKFWXT5ZN",
         indexName: "daiwanxingio",
      },
   },
   vite: {
      plugins: [
         AutoImport({
            resolvers: [ElementPlusResolver()],
         }),
         Components({
            resolvers: [ElementPlusResolver()],
         }),
      ],
      ssr: {
         noExternal: ["element-plus"],
      },
      resolve: {
         alias: {
            "@": path.join(__dirname, "docs"),
         },
      },
   },
});
