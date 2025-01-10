---
outline: deep
---

# Getting started

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
import { unisonVue } from "unplugin-unisonjs/vite";

export default defineConfig({
  plugins: [
    unisonVue({
      compiler: false,
      /* options */
    }),
    //...
  ],
});
```

```js [webpack]
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-unisonjs/webpack")({
      compiler: false,
      /* options */
    }),
    //...
  ],
};
```

```js [Rspack]
// rspack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-unisonjs/rspack")({
      compiler: false,
      /* options */
    }),
    //...
  ],
};
```

```ts [Farm]
// farm.config.ts
import { unisonVue } from "unplugin-unisonjs/farm";

export default defineConfig({
  plugins: [
    unisonVue({
      compiler: false,
      /* options */
    })
    //...
  ],
});
```

```js [Rollup]
// rollup.config.js
import { unisonVue } from "unplugin-unisonjs/rollup";

export default {
  plugins: [
    unisonVue({
      compiler: false,
      /* options */
    }),
    //...
  ],
};
```

```js [Rolldown]
// rolldown.config.js
import { unisonVue } from "unplugin-unisonjs/rolldown";

export default {
  plugins: [
    unisonVue({
      compiler: false,
      /* options */
    }),
    //...
  ],
};
```

```js [esbuild]
// esbuild.config.js
import { build } from "esbuild";
import { unisonVue } from "unplugin-unisonjs/esbuild";

build({
  plugins: [
    unisonVue({
      compiler: false,
      /* options */
    }),
    //...
  ],
});
```

```js [Astro]
// astro.config.mjs
import { defineConfig } from "astro/config";
import { unisonVue } from "unplugin-unisonjs/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    unisonVue({
      compiler: false,
      /* options */
    }),
  ],
});
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
  module: "@unisonjs/vue",
};

const UnisonFastRefreshConfig = {
  ...sharedUnisonConfig,
  /* ... */
};

module.exports = function () {
  return {
    plugins: [
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

## Creating a Unison component

Unison components are function thats needs to be wrap in the `$unison` function and return the jsx as a function

```js
import { $unison, ref } from "@unisonjs/vue";

const Counter = $unison(() => {
  const count = ref(0);

  setInterval(() => count.value++, 1000);

  return () => (
    <div>
      <p>Count: {count.value}</p>
    </div>
  );
});
```


## New to Vue ?

If you haven't used Vue before, especially the Vue Composition API, I suggest you check out the Vue documentation on reactivity before continuing with this documentation :

- [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

- [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
