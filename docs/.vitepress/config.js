import catalog from "../genCatalog";
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
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
         }
      ]
   ],
   themeConfig: {
      logo: "/logo.svg",
      lastUpdatedText: "最近一次更新于",
      sidebar: catalog,
      nav: [
         { text: "JavaScript", link: "/content/js" },
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
