---
outline: deep
---

# Need a compiler ?

While you can use the Unison framework without any compilation, a compiler is provided to optimize Unison components.

## What are the Benefits?

The compiler is simple but efficient. Leveraging the strong context and primitives provided by the Unison framework (thanks to the Vue Model), the compiler performs optimizations that can be done manually but automatically for you.

### Key Benefits:

1. **Static JSX Optimization**: The compiler identifies static parts of the returned JSX within a component's body and ensures these parts are executed only once.
2. **Granular Reactivity**: For the remaining dynamic parts, the compiler uses `computed` to regenerate them granularly as needed.
3. **Automatic Template Wrapping**: The JSX is not returned as a function. Instead, the compiler automatically wraps the template for you.
4. **Automatic Component conversion**: The compiler converts component in Unison component automatically.
5. **Async client components** (Coming soon): The compiler allow to create async client components

These optimizations result in more efficient and performant Unison components, enhancing the overall development experience.

## Installation

::: code-group

```bash [NPM]
$ npm install @unisonjs/core @unisonjs/vue unplugin-unisonjs
```

```bash [Yarn]
$ yarn add @unisonjs/core @unisonjs/vue unplugin-unisonjs
```

```bash [PNPM]
$ pnpm install @unisonjs/core @unisonjs/vue unplugin-unisonjs
```

```bash [Bun]
$ bun install @unisonjs/core @unisonjs/vue unplugin-unisonjs
```

:::

::: code-group

```ts [Vite]
// vite.config.ts
import { unisonVue } from 'unplugin-unisonjs/vite'

export default defineConfig({
  plugins: [
    unisonVue({
      /* options */
    }),
    react(),
    //...
  ],
})
```

```js [webpack]
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-unisonjs/webpack')({
      /* options */
    }),
    //...
  ],
}
```


```ts [Farm]
// farm.config.ts
import { unisonVue } from 'unplugin-unisonjs/farm'

export default defineConfig({
  plugins: [
    unisonVue({
      /* options */
    }),
  ],
})
```

```js [Rollup]
// rollup.config.js
import { unisonVue } from 'unplugin-unisonjs/rollup'

export default {
  plugins: [
    unisonVue({
      /* options */
    }),
  ],
}
```

```js [Rolldown]
// rolldown.config.js
import { unisonVue } from 'unplugin-unisonjs/rolldown'

export default {
  plugins: [
    unisonVue({
      /* options */
    }),
  ],
}
```

```js [esbuild]
// esbuild.config.js
import { build } from 'esbuild'
import { unisonVue } from 'unplugin-unisonjs/esbuild'

build({
  plugins: [unisonVue({ /* options */ })],
})
```

```js [Astro]
// astro.config.mjs
import { defineConfig } from 'astro/config'
import { unisonVue } from 'unplugin-unisonjs/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [unisonVue({ /* options */ })],
})
```


::: warning
Unison.js doesn't work with Tanstack Start
:::

### Babel {#babel}

The compiler includes a Babel plugin which you can use in your build pipeline to run the compiler.

After installing, add it to your Babel config. Please note that it’s critical that the compiler run first in the pipeline:

```js
// babel.config.js
const sharedUnisonConfig = {
  signals: ["ref", "shallowRef", "reactive", "shallowReactive", "readonly"],
  module: '@unisonjs/vue'
}
const UnisonCompilerConfig = {
  ...sharedUnisonConfig,
  /* ... */
};
const UnisonFastRefreshConfig = {
  ...sharedUnisonConfig,
  /* ... */
};

module.exports = function () {
  return {
    plugins: [
      ["babel-plugin-unisonjs-compiler", UnisonCompilerConfig], // must run first!
      ["babel-plugin-unisonjs-fast-refresh", UnisonFastRefreshConfig],
      // ...
    ],
  };
};
```


### Expo

Expo uses Babel via Metro, so refer to the [Usage with Babel](#babel) section for installation instructions.

### Metro (React Native)

React Native uses Babel via Metro, so refer to the [Usage with Babel](#babel) section for installation instructions.
