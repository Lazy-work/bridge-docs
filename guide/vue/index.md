---
outline: deep
---

# Getting started

## Installing the library

::: code-group

```bash [NPM]
$ npm install @lazywork/reactive-vue
```

```bash [Yarn]
$ yarn add @lazywork/reactive-vue
```

```bash [PNPM]
$ pnpm install @lazywork/reactive-vue
```

```bash [Bun]
$ bun install @lazywork/reactive-vue
```

:::
## Creating a reactive component

Reactive components are function thats needs to be wrap in the `$reactive` function and return the jsx as a function

```js
import { $reactive, ref } from "@lazywork/reactive-vue";

const Counter = $reactive(() => {
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