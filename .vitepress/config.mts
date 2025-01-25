import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Unison.js",
  description: "Opt-in reactivity for React",
  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Unison.js Framework | Opt-in reactivity for React' }],
    ['meta', { property: 'og:site_name', content: 'Unison.js Framework' }],
    ['meta', { property: 'og:image', content: 'https://unisonjs.netlify.app/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://unisonjs.netlify.app/' }],
  ],
  themeConfig: {
    logo: { src: "/logo.svg", width: 24, height: 24 },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Why this library ?", link: "/guide/" },
      // { text: "Guide (Core)", link: "/guide/core/"  },
      { text: "Guide (Vue)", link: "/guide/runtime/vue/"  },
      // { text: "Guide (Solid)", link: "/guide/solid/"  },
    ],
    sidebar: {
      "/guide/runtime/vue/": [
        {
          text: "Guide (Vue)",
          items: [
            { text: "Getting Started", link: "/guide/runtime/vue/" },
            {
              text: "Difference with React",
              link: "/guide/runtime/vue/difference-with-react",
            },
            {
              text: "Difference with Vue",
              link: "/guide/runtime/vue/difference-with-vue",
            },
            {
              text: "Conditional rendering",
              link: "/guide/runtime/vue/conditional-rendering",
            },
            { text: "Logic sharing", link: "/guide/runtime/vue/logic-sharing" },
            {
              text: "Integration with React",
              link: "/guide/runtime/vue/integration-with-react",
            },
            {
              text: "Using vue libraries",
              link: "/guide/runtime/vue/using-vue-libraries",
            },
            { text: "Equivalence table", link: "/guide/runtime/vue/equivalence" },
            { text: "Compatibility table", link: "/guide/runtime/vue/compatibility" },
            {
              text: "Reactivity Fundamentals (Vue docs)",
              link: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
            },
            {
              text: "Computed Properties (Vue docs)",
              link: "https://vuejs.org/guide/essentials/computed.html",
            },
            {
              text: "Composition API Reference (Vue docs)",
              link: "https://vuejs.org/api/#composition-api",
            },
          ],
        },
      ],
      "/guide/compiler/vue/": [
        {
          text: "Guide (Vue)",
          items: [
            { text: "Getting Started", link: "/guide/compiler/vue/" },
            {
              text: "Difference with React",
              link: "/guide/compiler/vue/difference-with-react",
            },
            {
              text: "Difference with Vue",
              link: "/guide/compiler/vue/difference-with-vue",
            },
            {
              text: "Conditional rendering",
              link: "/guide/compiler/vue/conditional-rendering",
            },
            { text: "Logic sharing", link: "/guide/compiler/vue/logic-sharing" },
            {
              text: "Integration with React",
              link: "/guide/compiler/vue/integration-with-react",
            },
            {
              text: "Compiler in an existing React codebase",
              link: "/guide/compiler/vue/incremental-compiler"
            },
            {
              text: "Using Vue libraries",
              link: "/guide/compiler/vue/using-vue-libraries",
            },
            {
              text: "Compilation mode",
              link: "/guide/compiler/vue/mode",
            },
            // {
            //   text: "Async components",
            //   link: "/guide/compiler/vue/async-component",
            // },
            {
              text: "Extra",
              link: "/guide/compiler/vue/extra",
            },
            { text: "Equivalence table", link: "/guide/compiler/vue/equivalence" },
            { text: "Compatibility table", link: "/guide/compiler/vue/compatibility" },
            {
              text: "Reactivity Fundamentals (Vue docs)",
              link: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
            },
            {
              text: "Computed Properties (Vue docs)",
              link: "https://vuejs.org/guide/essentials/computed.html",
            },
            {
              text: "Composition API Reference (Vue docs)",
              link: "https://vuejs.org/api/#composition-api",
            },
          ],
        },
      ],
      "/guide/solid/": [
        {
          text: "Guide (Solid)",
          items: [
            { text: "Getting Started", link: "/guide/solid/" },
            {
              text: "Integration with React",
              link: "/guide/solid/integration-with-react",
            },
            { text: "Logic sharing", link: "/guide/solid/logic-sharing" },
            {
              text: "Difference with React",
              link: "/guide/solid/difference-with-react",
            },
            {
              text: "Difference with Vue",
              link: "/guide/solid/difference-with-solid",
            },
            { text: "Compatibility", link: "/guide/solid/compatibility" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Lazy-work/unisonjs" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 William (Abdullah) NGBAMA",
    },
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          firebase: "vscode-icons:file-type-firebase",
          ".gitlab-ci.yml": "vscode-icons:file-type-gitlab",
          farm: localIconLoader(import.meta.url, "assets/farm.svg"),
          rolldown: localIconLoader(
            import.meta.url,
            "assets/rolldown.svg",
          ),
          // rspack: localIconLoader(
          //   import.meta.url,
          //   "assets/rspack.svg",
          // ),
        },
      }),
    ],
    optimizeDeps: {
      include: [
        "@shikijs/vitepress-twoslash/client"
      ],
    },
  },
});
