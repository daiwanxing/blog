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
                     link: "/articles/git/",
                  },
               ],
            },
         ],
         "/articles/javascript": [
            {
               text: "JavaScript Category",
               items: [
                  {
                     text: "对时间切片的理解",
                     link: "/articles/javascript/time-slice",
                  },
                  {
                     text: "发布订阅模型",
                     link: "/articles/javascript/pub-sub.model",
                  },
                  {
                     text: "反复被提及的事件循环",
                     link: "/articles/javascript/event-loopV2",
                  },
                  {
                     text: "Intl.DateTimeFormat 揭秘",
                     link: "/articles/javascript/Intl.DateTimeFormat",
                  },
                  {
                     text: "JavaScript 内存管理探秘（译）",
                     link: "/articles/javascript/memory-discover",
                  },
                  {
                     text: "CMD 和 ESM",
                     link: "/articles/javascript/module-system",
                  },
                  {
                     text: "性能利器 - Web-Worker",
                     link: "/articles/javascript/web-worker",
                  },
                  {
                     text: "Symbol 元属性",
                     link: "/articles/javascript/metaPropertyAboutSymbol",
                  },
                  {
                     text: "eslint 配置指南",
                     link: "/articles/javascript/eslint",
                  },
                  {
                     text: "UnoCSS 初探",
                     link: "/articles/javascript/unocss"
                  }
               ],
            },
         ],
         "/articles/typescript": [
            {
               text: "TypeScript Category",
               items: [
                  {
                     text: "搭建 typescript 开发环境",
                     link: "/articles/typescript/typescript-env"
                  },
                  {
                     text: "declare 关键字",
                     link: "/articles/typescript/declare",
                  },
                  {
                     text: "TS 内置的功能类型",
                     link: "/articles/typescript/implement-utility-type",
                  },
                  {
                     text: "使用三斜线指令",
                     link: "/articles/typescript/three-triple-line",
                  },
                  {
                     text: "如何配置 tsconfig.json",
                     link: "/articles/typescript/tsconfig",
                  },
                  {
                     text: "Typescript 更新日志",
                     link: "/articles/typescript/typescript-changelog",
                  },
                  {
                     text: "重新认识 TypeScript",
                     link: "/articles/typescript/type-narrow",
                  },
               ],
            },
         ],
         "/articles/css": [
            {
               text: "CSS Category",
               items: [
                  {
                     text: "巧用 aspect-ratio 设置宽高比",
                     link: "/articles/css/aspect-ratio"
                  },
                  {
                     text: "font-family 容易忽略的细节",
                     link: "/articles/css/font-family"
                  },
                  {
                     text: "CSS3 新尺寸关键字",
                     link: "/articles/css/unit-keywords"
                  },
                  {
                     text: "CSS3 新伪类选择器",
                     link: "/articles/css/new_pseudo_selector"
                  },
                  {
                     text: "CSS3 渐变",
                     link: "/articles/css/gradient"
                  }
               ]
            }
         ],
         "/articles/vue": [
            {
               text: "Vue Category",
               items: [
                  {
                     text: "深入了解 Transition",
                     link: "/articles/vue/transition"
                  },
                  {
                     text: "ref vs shallowRef",
                     link: "/articles/vue/refVsShallowRef"
                  }
               ]
            }
         ],
         "/articles/math": [
            {
               text: "Math Category",
               items: [
                  {
                     text: "数学公式",
                     link: "/articles/math/formula"
                  },
               ]
            }
         ],
         "/articles/algorithm": [
            {
               text: "Overview",
               items: [
                  {
                     text: "冒泡排序",
                     link: "/articles/algorithm/bubble-sort"
                  },
                  {
                     text: "二分查找",
                     link: "/articles/algorithm/binary-search"
                  }
               ]
            }
         ],
         "/life/": [
            {
               text: "My Life",
               link: "/life/",
            },
            {
               text: "2022-12-31",
               link: "/life/2022-12-31",
            },
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
                  text: "TypeScript",
                  link: articleRef("typescript/"),
               },
               {
                  text: "CSS",
                  link: articleRef("css/aspect-ratio"),
               },
               {
                  text: "Vue",
                  link: articleRef("vue/transition"),
               },
               {
                  text: "前端算法",
                  link: articleRef("algorithm/"),
               },
               {
                  text: "git常见操作",
                  link: articleRef("git/"),
               },
               {
                  text: "小程序踩过的坑",
                  link: articleRef("mini-program"),
               },
               {
                  text: "数学",
                  link: articleRef("math/"),
               }
            ],
         },
         { text: "生活", link: "/life/" },
         { text: "follow", link: "/follow/" },
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
