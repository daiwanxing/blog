import cssTableContents from "../css/table-contents";
import tsTableContents from "../ts/table-contents";
import jsTableContents from "../js/table-contents";
import RegExTableContents from "../regex/table-contents";
import GitTableContents from "../git/table-content";
import { defineConfig } from "vitepress";

const ProjectBase = "/blog/";

export default defineConfig({
   title: "Wonder Dai的博客",
   description: "一个关于所有我接触到的前端知识记录的网站",
   lang: "zh-CN",
   lastUpdated: true,
   ignoreDeadLinks: true,
   base: ProjectBase,
   // markdown: {
   //    externalLinks: {
   //       target: '_blank', rel: 'nofollow noopener noreferrer'
   //    }
   // },
   head: [
      [
         "link",
         {
            rel: "icon",
            href: `${ProjectBase}logo-32x32.ico`,
            type: "image/x-icon",
            size: "32x32",
         },
      ],
      [
         "link",
         {
            rel: "icon",
            href: `${ProjectBase}logo-64x64.ico`,
            type: "image/x-icon",
            size: "64x64",
         },
      ],
      [
         "link",
         {
            rel: "icon",
            href: `${ProjectBase}logo-128x128.ico`,
            type: "image/x-icon",
            size: "128x128",
         },
      ],
      [
         "link",
         {
            rel: "apple-touch-icon",
            href: `${ProjectBase}logo-32x32.ico`,
            size: "32x32",
         },
      ],
   ],
   themeConfig: {
      lastUpdatedText: "最近一次更新于",
      sidebar: {
         "/js/": jsTableContents,
         "/ts/": tsTableContents,
         "/css/": cssTableContents,
         "/regex/": RegExTableContents,
         "/git/": GitTableContents,
      },
      nav: [
         { text: "JavaScript", link: "/js/", activeMatch: "/js/" },
         { text: "TypeScript", link: "/ts/", activeMatch: "/ts/" },
         { text: "CSS", link: "/css/", activeMatch: "/css/" },
         { text: "Regex", link: "/regex/", activeMatch: "/regex/" },
         { text: "Git", link: "/git/", activeMatch: "/git/" },
         {
            text: "Other",
            items: [
               {
                  items: [
                     {
                        text: "🚀deploy github-pages",
                        link: "/other/deploy-page/"
                     },
                     {
                        text: "👋2022",
                        link: "/other/about-me/goodbye-2022.md",
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
   },
});
