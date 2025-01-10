# Additional Features

## Simplify Your Code with Reactivity Transform

Since the Unison framework implements the Vue Composition API, you can also use the "Reactivity Transform" plugin from Vue Macros to streamline your code.

### Setup

To set this up, add the following line to your `package.json`:

```json
{
  "dependencies": {
    "vue": "npm:@unisonjs/vue"
  }
}
```

If you're using vite, you also need to exclude `@unisonjs/vue`, `vue` and `vue-demi` from `optimizeDeps`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  //...
  optimizeDeps: {
    exclude: ["vue-demi", "vue", "@unisonjs/vue"],
  },
});
```

Next, follow the instructions on the [Vue Macros documentation page](https://vue-macros.dev/features/reactivity-transform.html) to complete the setup.

### Caution

Ensure that the "Reactivity Transform" plugin is configured **before** the Unison compiler.

### Example

Using this plugin, you can transform your code from:

```js
import { ref } from "@unisonjs/vue";

function Counter() {
  const count = ref(0);

  const increment = () => count.value++;

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>Count: {count.value}</p>
    </div>
  );
};
```

to this (with a Svelte-like syntax):

```js
function Counter() {
  const count = $ref(0);

  const increment = () => count++;

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}
```

By using the Reactivity Transform plugin, you can write more concise and readable code.
