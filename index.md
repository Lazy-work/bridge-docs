---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Unison.js Framework"
  text: "React but more reactive"
  tagline: "Ease the complexity of reactivity in React"
  image:
    src: /logo-with-shadow.png
    alt: Unison
  actions:
    - theme: brand
      text: Get started
      link: /guide/runtime/vue/
    - theme: alt
      text: Why this library ?
      link: /guide/

features:
  - icon: ⚙️
    title: Runtime first
    details: Every primitive works without needing a compiler
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="-11.5 -10.23174 23 20.46348">
            <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
            <g stroke="#61dafb" stroke-width="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
    title: Compatible React eco-system
    details: Full compatibility with React, its eco-system and existing React codebase
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 220.8"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"/><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"/></svg>
    title: Vue Composition API
    details: Leverage the Vue Composition API in your React project
  - icon: 🌐️
    title: Compatible Vue eco-system
    details: Works with Vue libraries and composables
  - icon: 📦
    title: Tiny library
    details: ~ 10kb minified and gzip
  - icon: 🛠️
    title: Small compiler (Optional)
    details: A small compiler for code optimization and reduce boilerplate
---
