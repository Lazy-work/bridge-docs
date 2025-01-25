# Using the Unison Compiler in an existing React codebase

This page outlines different patterns to integrate the Unison compiler into a React codebase while avoiding conflicts. 

> **Note**: If you're using the compiler in manual mode, you can skip this page.

## Directive Mode

Directive mode is ideal for incremental adoption, allowing you to precisely specify which parts of your code should be processed or skipped by the compiler.

### Targeting by Inclusion

#### By Component

You can explicitly target individual components for Unison compilation by adding the `"use bridge"` directive within the component:

```jsx
function Counter() {
  "use bridge";

  const count = ref(0);

  return <button onClick={() => count.value++}>count is {count.value}</button>;
}
```

#### By File

Alternatively, target entire files for Unison compilation by placing the `"use bridge"` directive at the top of the file:

```jsx
"use bridge";

import { ref } from "@unisonjs/vue";

function Counter() {
  const count = ref(0);

  return <button onClick={() => count.value++}>count is {count.value}</button>;
}
```

### Targeting by Exclusion

#### Exclude by Component

You can exclude specific components from Unison compilation by using the `"no unison"` directive inside the component:

```jsx
"use unison";
import { ref } from "@unisonjs/vue";

function Counter() {
  const count = ref(0);

  return <button onClick={() => count.value++}>count is {count.value}</button>;
}

function App() {
  "no unison"; // Skip compilation for the App component
  return <Counter />;
}
```

---

## Full Mode

Full mode assumes that most of your codebase will be handled by the Unison compiler. However, you can still fine-tune its behavior using **include** and **exclude** options in the Unison.js plugin configuration.

### Include

To target specific folders or files for Unison compilation while keeping the rest of the code under standard React, use the `include` option:

```ts
unisonVue({
  include: /components\/unison\/.*\.(mdx|js|jsx|ts|tsx)$/, // Target components in the "components/unison/" folder
});
```

### Exclude

If your codebase primarily uses Unison.js but you want to exclude certain files or folders from compilation, use the `exclude` option:

```ts
unisonVue({
  exclude: /components\/react\/.*\.(mdx|js|jsx|ts|tsx)$/, // Exclude components in the "components/react/" folder
});
```

---

## Excluding Specific Files or Components

### Exclude a File

You can skip Unison compilation for an entire file by adding the `"no unison"` directive at the top of the file:

```jsx
"no unison";

import { useState, useCallback } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((count) => count + 1);
  });

  return <button onClick={increment}>count is {count}</button>;
}

function App() {
  return <Counter />;
}
```

### Exclude a Component

To exclude a specific component from compilation, add the `"no unison"` directive inside the component:

```jsx
import { ref } from "@unisonjs/vue";

function Counter() {
  const count = ref(0);

  return <button onClick={() => count.value++}>count is {count.value}</button>;
}

function App() {
  "no unison"; // Skip compilation for the App component
  return <Counter />;
}
```