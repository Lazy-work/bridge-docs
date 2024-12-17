# Compilation Mode

Bridge.js provides flexible compilation options to suit your needs. By default, the Bridge compiler transforms all functional components in the codebase. However, if your project contains standard React components, this behavior might not be ideal. To handle this, Bridge.js offers three distinct compilation modes.

---

### **Full Mode** (Default)

In **Full Mode**, the compiler targets every component in the codebase. This is the default behavior and requires no additional configuration.

#### Configuration:

```js
// bridge plugin config
{
  mode: "full",
  //...
}
```

#### Example:

```js
function Counter() {
  const count = ref(0);

  return <button onClick={() => count.value++}>count is {count.value}</button>;
}
```

#### Skipping Specific Components:

If you want to exclude a specific component from compilation, you can use the `"no bridge"` directive by placing it at the top of your component.

```js
function Counter() {
  "no bridge"; // [!code highlight]
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>count is {count}</button>;
}
```

---

### **Directive Mode**

In **Directive Mode**, the compiler targets only components that explicitly include the `"use bridge"` directive. This is useful if you want to limit the scope of Bridge.js transformations.

#### Configuration:

```js
// bridge plugin options
{
  mode: "directive",
  //...
}
```

#### Example:

```js
function Counter() {
  "use bridge"; // Enables Bridge compilation for this component
  const count = ref(0);

  return <button onClick={() => count.value++}>count is {count.value}</button>;
}
```

---

### **Manual Mode**

For maximum control, **Manual Mode** allows you to explicitly wrap components with the `$bridge` function. Only components wrapped this way will be transformed by the compiler.

#### Configuration:

```js
// bridge plugin options
{
  mode: "manual",
  //...
}
```

#### Example:

```js
const Counter = $bridge(() => {
  const count = ref(0);

  return <button onClick={() => count.value++}>count is {count.value}</button>;
});
```

---

### **Including and Excluding Files**

Bridge.js supports fine-grained control over which files are compiled by using the `include` and `exclude` options. These options work in the same way as the [Vite React plugin's configuration](https://vitejs.dev/plugins/official.html#vite-react).

#### Configuration:

```js
// bridge plugin options
{
  include: ["**/*.jsx", "**/*.tsx"], // Glob patterns for files to include
  exclude: ["node_modules/**", "**/*.test.jsx"], // Glob patterns for files to exclude
  //...
}
```

#### Example:

```js
{
  mode: "directive", // Or any other mode
  include: ["src/components/**/*.bridge.jsx"],
  exclude: ["**/*.test.jsx", "**/legacy/**"]
}
```

With these options, you can target specific files or directories while excluding others, giving you complete control over the compilation process.

---

### Choosing the Right Mode

- **Full Mode**: Best for projects where most components need to be compiled.
- **Directive Mode**: Ideal when you only want specific components to use Bridge.js.
- **Manual Mode**: Use when you need precise, explicit control over which components are transformed.

Combine these modes with the `include` and `exclude` options to tailor Bridge.js to your project's unique requirements.
