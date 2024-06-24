---
outline: deep
---

# Need a compiler ?

While you can use the Reactive library without any compilation, a compiler is provided to optimize reactive components.

## What are the Benefits?

The compiler is simple but efficient. Leveraging the strong context and primitives provided by the Reactive library  (thanks to the Vue Model), the compiler performs optimizations that can be done manually but automatically for you.

### Key Benefits:

1. **Static JSX Optimization**: The compiler identifies static parts of the returned JSX within a component's body and ensures these parts are executed only once.
2. **Granular Reactivity**: For the remaining dynamic parts, the compiler uses `computed` to regenerate them granularly as needed.
3. **Automatic Template Wrapping**: The JSX is not returned as a function. Instead, the compiler automatically wraps the template for you.

These optimizations result in more efficient and performant reactive components, enhancing the overall development experience.

## Installation

::: code-group

```bash [NPM]
$ npm install babel-plugin-reactive-vue-optimizer @lazywork/reactive-vue-jsx-runtime
```

```bash [Yarn]
$ yarn add babel-plugin-reactive-vue-optimizer @lazywork/reactive-vue-jsx-runtime
```

```bash [PNPM]
$ pnpm install babel-plugin-reactive-vue-optimizer @lazywork/reactive-vue-jsx-runtime
```

```bash [Bun]
$ bun install babel-plugin-reactive-vue-optimizer @lazywork/reactive-vue-jsx-runtime
```

:::

### Babel {#babel}

The compiler includes a Babel plugin which you can use in your build pipeline to run the compiler.

After installing, add it to your Babel config. Please note that it’s critical that the compiler run first in the pipeline:

```js
// babel.config.js
const ReactCompilerConfig = {
  /* ... */
};

module.exports = function () {
  return {
    plugins: [
      "babel-plugin-reactive-vue-optimizer", // must run first!
      // ...
    ],
  };
};
```

### Vite {#vite}

If you use Vite, you can add the plugin to vite-plugin-react:

```js
// vite.config.js

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: ["babel-plugin-reactive-vue-optimizer"],
        },
      }),
    ],
    // ...
  };
});
```

### Remix {#remix}

Install vite-plugin-babel, and add the compiler’s Babel plugin to it:

::: code-group

```bash [NPM]
$ npm install vite-plugin-babel
```

```bash [Yarn]
$ yarn add vite-plugin-babel
```

```bash [PNPM]
$ pnpm install vite-plugin-babel
```

```bash [Bun]
$ bun install vite-plugin-babel
```

:::

```js
// vite.config.js
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [
    remix({
      /* ... */
    }),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [["babel-plugin-reactive-vue-optimizer"]],
        loader: (path) => {
          if (extname(path) === ".jsx") {
            return "jsx";
          }

          if (extname(path) === ".tsx") {
            return "tsx";
          }
        },
      },
    }),
  ],
});
```

### Webpack

You can create your own loader for Reactive Compiler, like so:


```js
const BabelPluginReactiveCompiler = require("babel-plugin-reactive-vue-optimizer");

function reactiveCompilerLoader(sourceCode, sourceMap) {
  // ...
  const result = transformSync(sourceCode, {
    // ...
    plugins: [BabelPluginReactiveCompiler],
    // ...
  });

  if (result === null) {
    this.callback(Error(`Failed to transform "${options.filename}"`));
    return;
  }

  this.callback(
    null,
    result.code,
    result.map === null ? undefined : result.map
  );
}

module.exports = reactiveCompilerLoader;
```

### Expo

Expo uses Babel via Metro, so refer to the [Usage with Babel](#babel) section for installation instructions.

### Metro (React Native)

React Native uses Babel via Metro, so refer to the [Usage with Babel](#babel) section for installation instructions.