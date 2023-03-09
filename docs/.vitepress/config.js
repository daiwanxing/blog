import cssTableContents from "../content/css/table-contents";
import tsTableContents from "../content/ts/table-contents";
import jsTableContents from "../content/js/table-contents";
import RegExTableContents from "../content/regex/table-contents";
import GitTableContents from "../content/git/table-content";
import VueTableContents from "../content/Vue/table-content";
import { defineConfig } from "vitepress";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { sitebase } from "../config";
import path from "node:path";


export default defineConfig({
   title: "Wonder Dai的博客",
   description: "一个关于所有我接触到的前端知识记录的网站",
   lang: "zh-CN",
   lastUpdated: true,
   ignoreDeadLinks: true,
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
            href: `${sitebase}logo-32x32.ico`,
            type: "image/x-icon",
            size: "32x32",
         },
      ],
      [
         "link",
         {
            rel: "icon",
            href: `${sitebase}logo-64x64.ico`,
            type: "image/x-icon",
            size: "64x64",
         },
      ],
      [
         "link",
         {
            rel: "icon",
            href: `${sitebase}logo-128x128.ico`,
            type: "image/x-icon",
            size: "128x128",
         },
      ],
      [
         "link",
         {
            rel: "apple-touch-icon",
            href: `${sitebase}logo-32x32.ico`,
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
   ],
   themeConfig: {
      logo: "/blog.png",
      lastUpdatedText: "最近一次更新于",
      sidebar: {
         "/content/js/": jsTableContents,
         "/content/ts/": tsTableContents,
         "/content/vue/": VueTableContents,
         "/content/css/": cssTableContents,
         "/content/regex/": RegExTableContents,
         "/content/git/": GitTableContents,
      },
      nav: [
         { text: "JavaScript", link: "/content/js/",  },
         { text: "TypeScript", link: "/content/ts/" },
         { text: "Vue", link: "/content/vue/" },
         { text: "CSS", link: "/content/css/" },
         { text: "Regex", link: "/content/regex/" },
         { text: "Git", link: "/content/git/" },
         {
            text: "Other",
            items: [
               {
                  items: [
                     {
                        text: "🚀deploy github-pages",
                        link: "/content/other/deploy-page/",
                     },
                     {
                        text: "👋2022",
                        link: "/content/other/about-me/goodbye-2022.md",
                     },
                  ],
               },
            ],
         },
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
      resolve: {
         alias: {
            "@": path.join(__dirname, "docs"),
         },
      },
   },
});
