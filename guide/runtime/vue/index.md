---
outline: deep
---

# Getting started

## Installing the library

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

```js twoslash [vite.config.js]
import { bridgeVue } from "vite-plugin-bridge";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    bridgeVue({ compiler: false }),
    // ...
  ],
});
```

:::
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
