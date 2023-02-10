import cssTableContents from "../css/table-contents";
import tsTableContents from "../ts/table-contents";
import jsTableContents from "../js/table-contents";
import RegExTableContents from "../regex/table-contents";
import GitTableContents from "../git/table-content";

const ProjectBase = "/frontend-notes/";

export default {
   title: "Wonder Dai的博客",
   lang: "zh-CN",
   lastUpdated: true,
   ignoreDeadLinks: true,
   base: ProjectBase,
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
         { text: "javascript", link: "/js/", activeMatch: "/js/" },
         { text: "typescript", link: "/ts/", activeMatch: "/ts/" },
         { text: "css", link: "/css/", activeMatch: "/css/" },
         { text: "regex", link: "/regex/", activeMatch: "/regex/" },
         { text: "git", link: "/git/", activeMatch: "/git/" },
         {
            text: "other",
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
};
