---
outline: deep
---

# Getting started

## Installation

::: code-group

```bash [NPM]
$ npm install @bridge/core @bridge/vue unplugin-bridge
```

```bash [Yarn]
$ yarn add @bridge/core @bridge/vue unplugin-bridge
```

```bash [PNPM]
$ pnpm install @bridge/core @bridge/vue unplugin-bridge
```

```bash [Bun]
$ bun install @bridge/core @bridge/vue unplugin-bridge
```

:::

::: code-group

```ts [Vite]
// vite.config.ts
import { bridgeVue } from "unplugin-bridge/vite";

export default defineConfig({
  plugins: [
    bridgeVue({
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
    require("unplugin-bridge/webpack")({
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
    require("unplugin-bridge/rspack")({
      compiler: false,
      /* options */
    }),
    //...
  ],
};
```

```ts [Farm]
// farm.config.ts
import { bridgeVue } from "unplugin-bridge/farm";

export default defineConfig({
  plugins: [
    bridgeVue({
      compiler: false,
      /* options */
    })
    //...
  ],
});
```

```js [Rollup]
// rollup.config.js
import { bridgeVue } from "unplugin-bridge/rollup";

export default {
  plugins: [
    bridgeVue({
      compiler: false,
      /* options */
    }),
    //...
  ],
};
```

```js [Rolldown]
// rolldown.config.js
import { bridgeVue } from "unplugin-bridge/rolldown";

export default {
  plugins: [
    bridgeVue({
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
import { bridgeVue } from "unplugin-bridge/esbuild";

build({
  plugins: [
    bridgeVue({
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
import { bridgeVue } from "unplugin-bridge/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    bridgeVue({
      compiler: false,
      /* options */
    }),
  ],
});
```

::: warning
Bridge.js doesn't work with Tanstack Start
:::

### Babel {#babel}

The compiler includes a Babel plugin which you can use in your build pipeline to run the compiler.

After installing, add it to your Babel config. Please note that it’s critical that the compiler run first in the pipeline:

```js
// babel.config.js
const sharedBridgeConfig = {
  signals: ["ref", "shallowRef", "reactive", "shallowReactive", "readonly"],
  module: "@bridge/vue",
};

const BridgeFastRefreshConfig = {
  ...sharedBridgeConfig,
  /* ... */
};

module.exports = function () {
  return {
    plugins: [
      ["babel-plugin-bridge-fast-refresh", BridgeFastRefreshConfig],
      // ...
    ],
  };
};
```

### Expo

Expo uses Babel via Metro, so refer to the [Usage with Babel](#babel) section for installation instructions.

### Metro (React Native)

React Native uses Babel via Metro, so refer to the [Usage with Babel](#babel) section for installation instructions.

## Creating a Bridge component

Bridge components are function thats needs to be wrap in the `$bridge` function and return the jsx as a function

```js
import { $bridge, ref } from "@bridge/vue";

const Counter = $bridge(() => {
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
