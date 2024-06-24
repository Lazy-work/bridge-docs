import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Reactive",
  description: "Opt-in reactivity for React",
  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Reactive Library | Opt-in reactivity for React' }],
    ['meta', { property: 'og:site_name', content: 'Reactive Library' }],
    ['meta', { property: 'og:image', content: 'https://reactive-lib.netlify.app/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://reactive-lib.netlify.app/' }],
  ],
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Why this library ?', link: '/guide/' },
      { text: 'Guide (Vue)', link: '/guide/vue/' }
    ],

    sidebar: {
      '/guide/vue/': [
        {
          text: 'Guide (Vue)',
          items: [
            { text: 'Getting Started', link: '/guide/vue/' },
            { text: 'Integration with React', link: '/guide/vue/integration-with-react' },
            { text: 'Using vue libraries', link: '/guide/vue/using-vue-libraries' },
            { text: 'Logic sharing', link: '/guide/vue/logic-sharing' },
            { text: 'Difference with React', link: '/guide/vue/difference-with-react' },
            { text: 'Difference with Vue', link: '/guide/vue/difference-with-vue' },
            { text: 'Equivalence table', link: '/guide/vue/equivalence' },
            { text: 'Compatibility table', link: '/guide/vue/compatibility' },
            {
              text: 'Need a compiler ?', items: [
                { text: 'Introduction', link: '/guide/vue/need-a-compiler' },
                { text: 'Under the hood', link: '/guide/vue/need-a-compiler/under-the-hood' },
                { text: 'Some Extra', link: '/guide/vue/need-a-compiler/extra' }
              ]
            },
            { text: 'Reactivity Fundamentals (Vue docs)', link: 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html' },
            { text: 'Computed Properties (Vue docs)', link: 'https://vuejs.org/guide/essentials/computed.html' },
            { text: 'Composition API Reference (Vue docs)', link: 'https://vuejs.org/api/#composition-api' }
          ]
        }
      ],
      '/guide/solid/': [
        {
          text: 'Guide (Solid)',
          items: [
            { text: 'Getting Started', link: '/guide/solid/' },
            { text: 'Integration with React', link: '/guide/solid/integration-with-react' },
            { text: 'Logic sharing', link: '/guide/solid/logic-sharing' },
            { text: 'Difference with React', link: '/guide/solid/difference-with-react' },
            { text: 'Difference with Vue', link: '/guide/solid/difference-with-solid' },
            { text: 'Compatibility', link: '/guide/solid/compatibility' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lazy-work/reactive-vue' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 William (Abdullah) NGBAMA'
    }
  }
})
