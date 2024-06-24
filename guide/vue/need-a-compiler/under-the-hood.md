# Under the hood

This page will give more details about what the compiler does for you

## From code to compiled

### Moving callbacks out of JSX

Before :

```js
const Counter = $reactive(() => {
  const count = ref(0);

  return () => (
    <button onClick={() => count.value++}> count is {count.value}</button>
  );
});
```

After :

```js
const Counter = $reactive(() => {
  const count = ref(0);

  const cb = () => count.value++;

  return () => <button onClick={cb}>count is {count.value}</button>;
});
```

### Moving static parts to the component body

Before :

```js
const Component = $reactive(() => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return () => (
    <div>
      <div>
        <p>This is a counter :</p>
      </div>
      <button onClick={increment}>{count.value}</button>
    </div>
  );
});
```

After :

```js
const Component = $reactive(() => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  const static = (
    <div>
      <p>This is a counter :</p>
    </div>
  );

  return () => (
    <div>
      {static}
      <button onClick={increment}>{count.value}</button>
    </div>
  );
});
```

### Wrapping dynamic JSX Elements in `computed`

Before :

```js
const Component = $reactive(() => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  const static = (
    <div>
      <p>This is a counter :</p>
    </div>
  );

  return () => (
    <div>
      {static}
      <button onClick={increment}>{count.value}</button>
    </div>
  );
});
```

After (approximate, not the exact compiled code):

```js
const Component = $reactive(() => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  const static = (
    <div>
      <p>This is a counter :</p>
    </div>
  );

  const dynamic1 = computed(() => (
    <button onClick={increment}>{count.value}</button>
  ));

  const dynamic2 = computed(() => (
    <div>
      {static}
      {unref(dynamic1)}
    </div>
  ));

  return () => unref(dynamic2);
});
```

## Explanation

Since the body of the component is executed once, moving static parts avoids unnecessary re-creation of JSX objects and callbacks.

Every JSX element that contains an object's property or a function call in its children or attributes is potentially dependent on a state. Therefore, the compiler will individually wrap every non-static part of the JSX in a computed.

Because computed automatically defines its state dependencies, static parts are never recreated, and dynamic parts are recreated only on state changes when needed.