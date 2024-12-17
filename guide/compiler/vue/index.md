---
outline: deep
---

# Need a compiler ?

While you can use the Bridge.js without any compilation, a compiler is provided to optimize Bridge components and improve the developer experience.

## What are the Benefits?

The compiler is simple but efficient. Leveraging the strong context and primitives provided by the Bridge library (thanks to the Vue Model), the compiler performs optimizations that can be done manually but automatically for you.

### Key Benefits:

1. **Static JSX Optimization**: The compiler identifies static parts of the returned JSX within a component's body and ensures these parts are executed only once.
2. **Granular Reactivity**: For the remaining dynamic parts, the compiler uses `computed` to regenerate them granularly as needed.
3. **Automatic Template Wrapping**: The JSX is not returned as a function. Instead, the compiler automatically wraps the template for you.
4. **Automatic Component conversion**: The compiler converts component in Bridge component automatically.
5. **Async client components**: The compiler allow to create async client components

These optimizations result in more efficient and performant Bridge components, enhancing the overall development experience.

## Manual installation

::: code-group

```bash [NPM]
$ npm install @bridge/core @bridge/vue vite-plugin-bridge
```

```bash [Yarn]
$ yarn add @bridge/core @bridge/vue vite-plugin-bridge
```

```bash [PNPM]
$ pnpm install @bridge/core @bridge/vue vite-plugin-bridge
```

```bash [Bun]
$ bun install @bridge/core @bridge/vue vite-plugin-bridge
```

:::

```js twoslash [vite.config.js]
import { bridgeVue } from "vite-plugin-bridge";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    bridgeVue(),
    // ...
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
  module: '@bridge/vue'
}
const BridgeCompilerConfig = {
  ...sharedBridgeConfig,
  /* ... */
};
const BridgeFastRefreshConfig = {
  ...sharedBridgeConfig,
  /* ... */
};

module.exports = function () {
  return {
    plugins: [
      ["babel-plugin-bridge-compiler", BridgeCompilerConfig], // must run first!
      ["babel-plugin-bridge-fast-refresh", BridgeFastRefreshConfig],
      // ...
    ],
  };
};
```

### Expo

Expo uses Babel via Metro, so refer to the queueJob,
  queuePostFlushCb,
  flushJobsUntil,
  flushPostJobsUntil,
  flushPreFlushCbs,
  flushPostFlushCbs,
  switchToAuto,
  switchToManual,
  toggleMode,
  getJobAt,
  endFlush,
  SchedulerJobFlags, section for installation instructions.

### Metro (React Native)

React Native uses Babel via Metro, so refer to the flush:  section for installation instructions.
