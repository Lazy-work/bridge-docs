---
outline: deep
---

# Using vue libraries

The Reactive (Vue) library leverages most of the Vue Composition API, allowing you to use Vue libraries with minimal configuration in your React projects. To set this up, add the following lines to your `package.json` :

```json
{
  // for npm
  "overrides": {
    "vue-demi": "npm:@lazywork/reactive-vue",
    "vue": "npm:@lazywork/reactive-vue"
  },
  // for yarn/pnpm
  "resolutions": {
    "vue-demi": "npm:@lazywork/reactive-vue",
    "vue": "npm:@lazywork/reactive-vue"
  }
}
```

If you're using vite, you also need to exclude `@lazywork/reactive-vue`, `vue` and `vue-demi` from `optimizeDeps`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["vue-demi", "vue", "@lazywork/reactive-vue"],
  },
});
```

## But why using vue libraries in a React project ???

### Remove overhead

The Reactive library leverage the integration of React Hook however to do so, no only it needs a extra work to enable state tracking and notify changes but also it prevents the Reactive library to overlap React mechanism.

Using Vue libraries instead of React libraries can significantly reduce overhead by eliminating the need for React primitives such as `useState`, `useEffect` and so on.

::: details Details
![image info](/using-vue-lib.png)
:::

## Vue code-sharing

Using Vue libraries can be advantageous for code-sharing between Vue and React projects. For example, you might use Vue for your web app and React Native for your mobile app, leveraging a shared state management library like Pinia across both platforms. This approach allows you to maintain a consistent state management solution while only needing to adapt the templating.
