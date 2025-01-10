---
outline: deep
---

# Integration with React

## Using a react component inside a Unison component and vice-versa

When you declare a Unison component, it produces a React component that renders standard JSX. You can pass your component as a child as usual.

## Using React hook inside a Unison component

In a Unison component, you can't use React hooks as usual. Technically, you can call a React hook, but due to the one-time execution paradigm of a Unison component, the hook won't be called over time and it might introduce some bugs.

To bring a react hook to the unisonjs world, you need to wrap it with: `toUnisonHook`

```js
import { useQuery as uq } from "@tanstack/react-query";
import { $unison, toUnisonHook } from "@unisonjs/vue";

const useQuery = toUnisonHook(uq);

const TodoList = $unison(() => {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return () => (
    <ul>
      {data.value.map((item) => (
        <li>{item.text}</li>
      ))}
    </ul>
  );
});

export default TodoList;
```

By default, `toUnisonHook` will track individually every first depth properties of an object.
Also it tracks only non-object values to prevent excessive rerender.

If you need to track the result as a whole, you can pass `{ shallow: true }` as an option to `toUnisonHook`

```js
import { useQueryClient as uqc } from "@tanstack/react-query";
import { toUnisonHook, $unison } from "@unisonjs/vue";

const useQueryClient = toUnisonHook(uqc, { shallow: true });

const PrintQueryClient = $unison(() => {
  const client = useQueryClient();

  return () => <p>{JSON.stringify(client.value)}</p>;
});

export default PrintQueryClient;
```

## Using Unison (Vue) primitives inside a React component

You can consume Unison (Vue) primitives like `ref` or `reactive` inside standard React components by using the `useUnison` hook. This enables React components to integrate seamlessly with unisonjs state.

### Example with `ref`

```js
import { ref, useUnison } from "@unisonjs/vue";

const count = ref(0);

function Counter() {
  useUnison();

  return <button onClick={() => count.value++}>count is {count.value}</button>;
}
```

### Example with `reactive`

```js
import { reactive, useUnison } from "@unisonjs/vue";

const store = reactive({ count: 0 });

function Counter() {
  useUnison();

  return (
    <button onClick={() => store.count++}>
      count is {store.count}
    </button>
  );
}
```

### Example with a Custom Hook

```js
// hooks/counter.js
import { ref } from "@unisonjs/vue";

const count = ref(0);

export function useCounter() {
  return {
    value: count.value,
    increment: () => count.value++,
    decrement: () => count.value--,
  };
}
```

```js
// components/Counter.jsx
import { useUnison } from "@unisonjs/vue";
import { useCounter } from "../hooks/counter";

function Counter() {
  useUnison();
  const { value, increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{value}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Using composable inside a react component

If you have created some composables that you want to use in a normal React component, you can wrap your composables with the `createReactHook` helper :

```js
import { createReactHook } from "@unisonjs/vue";

export const useOnlineStatus = createReactHook(() => {
  const isOnline = ref(true);

  function handleOnline() {
    isOnline.value = true;
  }
  function handleOffline() {
    isOnline.value = false;
  }

  watchPostEffect((onCleanup) => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    onCleanup(() => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    });
  });
  return isOnline;
});
```

Don't forget to call the `useUnison()` hook

```js
// components/online-status.jsx
import { useUnison } from "@unisonjs/vue";

function OnlineStatus() {
  useUnison();
  const isOnline = useOnlineStatus();

  return <p>Connected: {isOnline.value}</p>;
}
```
