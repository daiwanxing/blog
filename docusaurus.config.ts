import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Klein's Diary",
  tagline: "Klein 的技术日志",
  favicon: "img/favicon.ico",
  url: "https://blog-klein.vercel.app/",
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  
  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: `Klein's Diary`,
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/daiwanxing/blog/tree/docusaurus",
          position: "right",
          className: "header-github-link",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Social Media",
          items: [
            {
              label: "掘金",
              href: "https://juejin.cn/user/4031266619656920",
            },
            {
              label: "Github",
              href: "https://github.com/daiwanxing",
            },
            {
              label: "X",
              href: "https://x.com/daiwxing/with_replies",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Klein's Diary, Inc. Built with Docusaurus.`,
    },
    algolia: {
      // 这里的 appId、apiKey 和 indexName 是你在申请 DocSearch 时得到的
      appId: "T0DLH6IHEJ",
      apiKey: "1cf7cceb17269ae1e231cf91505357e1",
      indexName: "1",
      contextualSearch: true, // 可选：启用上下文搜索
      searchParameters: {}, // 可选：传递额外的搜索参数
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
